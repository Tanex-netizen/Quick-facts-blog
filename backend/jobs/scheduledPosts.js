const DEFAULT_INTERVAL_MS = Number(process.env.SCHEDULER_INTERVAL_MS || 60000);

async function publishDuePosts(supabase) {
  const now = new Date();
  const nowIso = now.toISOString();

  const { data, error } = await supabase
    .from('posts')
    .select('id, scheduled_at, published_at')
    .lte('scheduled_at', nowIso)
    .is('published_at', null);

  if (error) {
    console.error('Failed to fetch scheduled posts', error);
    return;
  }

  if (!data || data.length === 0) {
    return;
  }

  const updates = data.map((row) => ({
    id: row.id,
    published_at: row.scheduled_at || nowIso,
  }));

  const { error: updateError } = await supabase.from('posts').upsert(updates, { onConflict: 'id' });

  if (updateError) {
    console.error('Failed to publish scheduled posts', updateError);
  }
}

function startScheduledPostsWorker(supabase, intervalMs = DEFAULT_INTERVAL_MS) {
  async function run() {
    try {
      await publishDuePosts(supabase);
    } catch (error) {
      console.error('Scheduled post worker crashed', error);
    }
  }

  // Kick off immediately on startup.
  run();

  const timer = setInterval(run, intervalMs);
  timer.unref?.();

  return () => clearInterval(timer);
}

module.exports = {
  publishDuePosts,
  startScheduledPostsWorker,
};
