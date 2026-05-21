'use client';

import {
  useEffect,
} from 'react';

import {
  supabase,
} from '../lib/supabase';

import {
  useAuthStore,
} from '../store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  /**
   * Zustand actions
   */
  const {
    setUser,
    setSession,
    setLoading,
    clearAuth,
  } = useAuthStore();

  useEffect(() => {

    /**
     * Restore existing session
     */
    async function restoreSession() {

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (session) {

        setSession(session);

        setUser(session.user);

      } else {

        clearAuth();
      }

      /**
       * Stop loading
       */
      setLoading(false);
    }

    restoreSession();

    /**
     * Listen for auth changes
     */
    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {

          if (session) {

            setSession(session);

            setUser(session.user);

          } else {

            clearAuth();
          }

          setLoading(false);
        }
      );

    /**
     * Cleanup listener
     */
    return () => {

      authListener.subscription.unsubscribe();
    };

  }, [
    setUser,
    setSession,
    setLoading,
    clearAuth,
  ]);

  return children;
}