import { createClient } from '@supabase/supabase-js';

/**
 * Gets Supabase project URL
 * from environment variables
 */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * Gets public anonymous key
 */
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Creates reusable Supabase client
 *
 * This client is used everywhere:
 * - auth
 * - database
 * - storage
 */
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// console.log(supabase);