import { create } from 'zustand';

/**
 * Structure of auth state
 */
interface AuthState {

  user: any;

  /**
   * Updates current user
   */
  setUser: (user: any) => void;
}

/**
 * Global authentication store
 */
export const useAuthStore =
  create<AuthState>((set) => ({

    user: null,

    /**
     * Updates user globally
     */
    setUser: (user) =>
      set({
        user,
      }),
  }));