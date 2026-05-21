import { create } from 'zustand';

import { Session, User } from '@supabase/supabase-js';

interface AuthState {

  /**
   * Current authenticated user
   */
  user: User | null;

  /**
   * Current session
   */
  session: Session | null;

  /**
   * Loading state
   */
  loading: boolean;

  /**
   * Authenticated state
   */
  isAuthenticated: boolean;

  /**
   * Set current user
   */
  setUser: (
    user: User | null
  ) => void;

  /**
   * Set session
   */
  setSession: (
    session: Session | null
  ) => void;

  /**
   * Set loading
   */
  setLoading: (
    loading: boolean
  ) => void;

  /**
   * Clears auth state
   */
  clearAuth: () => void;
}

/**
 * Global authentication store
 */
export const useAuthStore =
  create<AuthState>((set) => ({

    user: null,

    session: null,

    loading: true,

    isAuthenticated: false,

    setUser: (user) =>
      set({
        user,
        isAuthenticated: !!user,
      }),

    setSession: (session) =>
      set({
        session,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),

    clearAuth: () =>
      set({
        user: null,
        session: null,
        isAuthenticated: false,
      }),
  }));

// import { create } from 'zustand';

// /**
//  * Structure of auth state
//  */
// interface AuthState {

//   user: any;

//   /**
//    * Updates current user
//    */
//   setUser: (user: any) => void;
// }

// /**
//  * Global authentication store
//  */
// export const useAuthStore =
//   create<AuthState>((set) => ({

//     user: null,

//     /**
//      * Updates user globally
//      */
//     setUser: (user) =>
//       set({
//         user,
//       }),
//   }));