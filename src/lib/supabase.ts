import {
  createBrowserClient,
} from '@supabase/ssr';

/**
 * Browser-side Supabase client
 */
export const supabase =
  createBrowserClient(
    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    {

      auth: {

        /**
         * Required for:
         * - password reset
         * - magic links
         * - recovery sessions
         */
        detectSessionInUrl: true,

        /**
         * Persist auth automatically
         */
        persistSession: true,

        /**
         * Refresh JWT automatically
         */
        autoRefreshToken: true,
      },
    }
  );