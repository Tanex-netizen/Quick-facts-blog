import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load backend environment variables
dotenv.config({ path: '../backend/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const categories = [
  'Science',
  'Technology',
  'Nature',
  'History',
  'Health',
  'Space'
];

async function seedCategories() {
  console.log('Seeding categories...');
  
  for (const name of categories) {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select();
    
    if (error) {
      if (error.code === '23505') {
        console.log(`✓ Category "${name}" already exists`);
      } else {
        console.error(`✗ Error inserting "${name}":`, error.message);
      }
    } else {
      console.log(`✓ Category "${name}" created`);
    }
  }
  
  console.log('\nDone!');
  process.exit(0);
}

seedCategories();
