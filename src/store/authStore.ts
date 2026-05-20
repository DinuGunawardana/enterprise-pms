import { create } from 'zustand';

/**
 * Enterprise user structure
 */
interface User {

  id: string;

  email: string;

  full_name?: string;

  role?: string;
}

/**
 * Authentication state structure
 */
interface AuthState {

  /**
   * Current logged in user
   */
  user: User | null;

  /**
   * Updates current user
   */
  setUser: (
    user: User | null
  ) => void;
}

/**
 * Global authentication store
 */
export const useAuthStore =
  create<AuthState>((set) => ({

    /**
     * Default state
     */
    user: null,

    /**
     * Updates user globally
     */
    setUser: (
      user: User | null
    ) =>
      set({
        user,
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