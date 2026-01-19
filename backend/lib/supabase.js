const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Debug logging for env vars (safe - only shows if present, not values)
console.log('🔧 Environment check:');
console.log('   SUPABASE_URL:', supabaseUrl ? `✅ Set (${supabaseUrl.substring(0, 30)}...)` : '❌ Missing');
console.log('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? `✅ Set (${supabaseServiceRoleKey.substring(0, 20)}...)` : '❌ Missing');

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // Provide a helpful hint so we can catch misconfiguration early.
  console.warn('Supabase credentials are missing. Update backend/.env with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

let supabaseClient;

function getSupabaseClient() {
  if (!supabaseClient) {
    if (!supabaseUrl || !supabaseServiceRoleKey || supabaseUrl.includes('your-project')) {
      console.warn('⚠️  Supabase not configured - using mock data mode. Update backend/.env with real credentials.');
      // Return a mock client that won't throw errors
      return null;
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
