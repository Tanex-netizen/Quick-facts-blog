const { Router } = require('express');

const { mapPost } = require('../utils/mapPost');

const router = Router();

function normalizePostPayload(body) {
  const { title, description, imageUrl, category, scheduledAt } = body;

  if (!title || !title.trim()) {
    const err = new Error('`title` is required.');
    err.status = 400;
    throw err;
  }

  const now = new Date();
  let isoScheduledAt = null;
  let isoPublishedAt = now.toISOString();
  if (scheduledAt) {
    const parsed = new Date(scheduledAt);
    if (Number.isNaN(parsed.getTime())) {
      const err = new Error('`scheduledAt` must be a valid date string.');
      err.status = 400;
      throw err;
    }
    isoScheduledAt = parsed.toISOString();
    if (parsed > now) {
      isoPublishedAt = null;
    }
  } else {
    isoScheduledAt = null;
  }

  return {
    title: title.trim(),
    description: description?.trim() || null,
    image_url: imageUrl || null,
    category: category?.trim() || null,
    scheduled_at: isoScheduledAt,
    published_at: isoPublishedAt,
  };
}

router.post('/', async (req, res, next) => {
  try {
    const payload = normalizePostPayload(req.body);
    const supabase = req.app.locals.supabase;

    if (!supabase) {
      return res.status(503).json({ error: 'Backend not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.' });
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([payload])
      .select()
      .single();

    if (error) {
      error.status = error.status || 500;
      throw error;
    }

    res.status(201).json(mapPost(data));
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const supabase = req.app.locals.supabase;
    const { category, status } = req.query;

    // If Supabase is not configured, return mock data
    if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes('your-project')) {
      const mockPosts = [
        {
          id: '1',
          title: 'Welcome to Quick Facts Blog',
          description: 'This is a sample post. Configure your Supabase credentials in backend/.env to see real data.',
          image_url: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800',
          category: 'Technology',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          scheduled_at: null
        },
        {
          id: '2',
          title: 'Amazing Space Facts',
          description: 'Discover the wonders of the universe with these incredible space facts.',
          image_url: 'https://images.unsplash.com/photo-1446776858070-78d87d557b9e?w=800',
          category: 'Space',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          scheduled_at: null
        },
        {
          id: '3',
          title: 'Health Tips for Daily Life',
          description: 'Simple health tips that can make a big difference in your daily routine.',
          image_url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
          category: 'Health',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          scheduled_at: null
        }
      ];
      
      let filteredPosts = mockPosts;
      if (category) {
        filteredPosts = mockPosts.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      
      return res.json(filteredPosts.map(mapPost));
    }

    let query = supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: true })
      .order('created_at', { ascending: false });

    if (typeof category === 'string' && category.trim()) {
      query = query.ilike('category', category.trim());
    }

    if (status === 'scheduled') {
      query = query
        .is('published_at', null)
        .order('scheduled_at', { ascending: true, nullsFirst: true });
    } else if (status === 'published') {
      query = query.not('published_at', 'is', null);
    }

    const { data, error } = await query;

    if (error) {
      error.status = error.status || 500;
      throw error;
    }

    res.json(data.map(mapPost));
  } catch (error) {
    next(error);
  }
});

router.get('/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const supabase = req.app.locals.supabase;

        const normalizedCategory = category.trim();
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .ilike('category', normalizedCategory)
      .order('created_at', { ascending: false });

    if (error) {
      error.status = error.status || 500;
      throw error;
    }

    res.json(data.map(mapPost));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const supabase = req.app.locals.supabase;

    // If Supabase is not configured, return mock data
    if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes('your-project')) {
      const mockPosts = {
        '1': {
          id: '1',
          title: 'Welcome to Quick Facts Blog',
          description: 'This is a sample post. Configure your Supabase credentials in backend/.env to see real data.',
          image_url: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800',
          category: 'Technology',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          scheduled_at: null
        },
        '2': {
          id: '2',
          title: 'Amazing Space Facts',
          description: 'Discover the wonders of the universe with these incredible space facts.',
          image_url: 'https://images.unsplash.com/photo-1446776858070-78d87d557b9e?w=800',
          category: 'Space',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          scheduled_at: null
        },
        '3': {
          id: '3',
          title: 'Health Tips for Daily Life',
          description: 'Simple health tips that can make a big difference in your daily routine.',
          image_url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
          category: 'Health',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          scheduled_at: null
        }
      };
      
      const post = mockPosts[id];
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.json(mapPost(post));
    }

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      error.status = error.status || 500;
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(mapPost(data));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = normalizePostPayload(req.body);
    const supabase = req.app.locals.supabase;

    if (!supabase) {
      return res.status(503).json({ error: 'Backend not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.' });
    }

    const { data, error } = await supabase
      .from('posts')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Post not found' });
      }
      error.status = error.status || 500;
      throw error;
    }

    res.json(mapPost(data));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const supabase = req.app.locals.supabase;

    if (!supabase) {
      return res.status(503).json({ error: 'Backend not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.' });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      error.status = error.status || 500;
      throw error;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
