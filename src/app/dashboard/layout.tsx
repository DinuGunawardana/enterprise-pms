import {
  redirect,
} from 'next/navigation';

import {
  createClient,
} from '../../lib/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  /**
   * Server Supabase client
   */
  const supabase =
    await createClient();

  /**
   * Get session
   */
  const {
    data: { user },
  } =
    await supabase.auth.getUser();

    if (!user) {

      redirect('/login');
    }

  return children;
}