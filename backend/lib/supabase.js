const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // Provide a helpful hint so we can catch misconfiguration early.
  console.warn('Supabase credentials are missing. Update backend/.env with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

let supabaseClient;

function getSupabaseClient() {
  if (!supabaseClient) {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Cannot create Supabase client without SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
    }

    supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

module.exports = {
  getSupabaseClient,
};
