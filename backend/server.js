const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const { getSupabaseClient } = require('./lib/supabase');
const uploadsRouter = require('./routes/uploads');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');
const { startScheduledPostsWorker } = require('./jobs/scheduledPosts');

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:3000'];

function buildCorsOptions() {
  const rawOrigins = process.env.FRONTEND_ORIGIN;

  if (!rawOrigins) {
    return { origin: DEFAULT_ALLOWED_ORIGINS, credentials: true };
  }

  const origins = rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return { origin: origins.length ? origins : DEFAULT_ALLOWED_ORIGINS, credentials: true };
}

function createServer(options = {}) {
  const { supabaseClient, enableWorkers } = options;
  const app = express();

  app.use(cors(buildCorsOptions()));
  app.use(express.json({ limit: '10mb' }));

  const resolvedSupabase = supabaseClient || getSupabaseClient();

  // Attach Supabase for downstream route handlers.
  app.locals.supabase = resolvedSupabase;

  const shouldStartWorkers =
    typeof enableWorkers === 'boolean' ? enableWorkers : process.env.NODE_ENV !== 'test';

  if (shouldStartWorkers) {
    app.locals.stopScheduledPostsWorker = startScheduledPostsWorker(app.locals.supabase);
  }

  app.use('/api/uploads', uploadsRouter);
  app.use('/api/posts', postsRouter);

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use(errorHandler);

  return app;
}

if (require.main === module) {
  const app = createServer();
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Quick Facts backend listening on port ${port}`);
  });
}

module.exports = {
  createServer,
};
