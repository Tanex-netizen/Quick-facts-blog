const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const { createServer } = require('../server');

test('POST /api/posts creates a post', async () => {
  const insertedRow = {
    id: 'post-1',
    title: 'Space Exploration',
    description: 'Exploring the cosmos',
    image_url: 'https://example.com/image.jpg',
    category: 'Science',
    scheduled_at: null,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  const supabaseStub = {
    from() {
      return {
        insert() {
          return {
            select() {
              return {
                async single() {
                  return { data: insertedRow, error: null };
                },
              };
            },
          };
        },
      };
    },
  };

  const app = createServer({ supabaseClient: supabaseStub, enableWorkers: false });

  const response = await request(app)
    .post('/api/posts')
    .send({
      title: 'Space Exploration',
      description: 'Exploring the cosmos',
      imageUrl: 'https://example.com/image.jpg',
      category: 'Science',
    })
    .expect(201);

  assert.equal(response.body.title, 'Space Exploration');
  assert.equal(response.body.status, 'published');
});

test('GET /api/posts returns posts', async () => {
  const rows = [
    {
      id: 'post-2',
      title: 'Marine Facts',
      description: 'Oceans are deep.',
      image_url: null,
      category: 'Nature',
      scheduled_at: null,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ];

  const chain = {
    select() {
      return this;
    },
    order() {
      return this;
    },
    ilike() {
      return this;
    },
    is() {
      return this;
    },
    not() {
      return this;
    },
    then(resolve, reject) {
      return Promise.resolve({ data: rows, error: null }).then(resolve, reject);
    },
  };

  const supabaseStub = {
    from() {
      return chain;
    },
  };

  const app = createServer({ supabaseClient: supabaseStub, enableWorkers: false });

  const response = await request(app).get('/api/posts').expect(200);

  assert.equal(response.body.length, 1);
  assert.equal(response.body[0].title, 'Marine Facts');
});

test('GET /api/posts/:id returns 404 when not found', async () => {
  const supabaseStub = {
    from() {
      return {
        select() {
          return {
            eq() {
              return {
                async maybeSingle() {
                  return { data: null, error: null };
                },
              };
            },
          };
        },
      };
    },
  };

  const app = createServer({ supabaseClient: supabaseStub, enableWorkers: false });

  await request(app).get('/api/posts/non-existent').expect(404);
});

test('GET /api/posts/category/:category returns posts', async () => {
  const rows = [
    {
      id: 'post-3',
      title: 'Tech Trends',
      description: 'AI everywhere',
      image_url: null,
      category: 'Technology',
      scheduled_at: null,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ];

  const chain = {
    select() {
      return this;
    },
    ilike() {
      return this;
    },
    order() {
      return this;
    },
    then(resolve, reject) {
      return Promise.resolve({ data: rows, error: null }).then(resolve, reject);
    },
  };

  const supabaseStub = {
    from() {
      return chain;
    },
  };

  const app = createServer({ supabaseClient: supabaseStub, enableWorkers: false });

  const response = await request(app).get('/api/posts/category/Technology').expect(200);

  assert.equal(response.body[0].category, 'Technology');
});

test('POST /api/uploads/image requires file payload', async () => {
  const app = createServer({
    supabaseClient: {
      from() {
        throw new Error('Supabase should not be called for this test');
      },
    },
    enableWorkers: false,
  });

  const response = await request(app).post('/api/uploads/image').send({}).expect(400);

  assert.equal(response.body.error, 'Missing `file` in request body.');
});
