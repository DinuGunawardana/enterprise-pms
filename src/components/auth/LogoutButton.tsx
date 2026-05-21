'use client';

import { useRouter }
from 'next/navigation';

import {
  logout,
} from '../../services/authService';

import {
  useAuthStore,
} from '../../store/authStore';

export default function LogoutButton() {

  const router = useRouter();

  const {
    clearAuth,
  } = useAuthStore();

  async function handleLogout() {

    try {

      /**
       * Supabase logout
       */
      await logout();

      /**
       * Clear Zustand store
       */
      clearAuth();

      /**
       * Redirect
       */
      router.push('/login');

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <button
      onClick={handleLogout}
      className="
        rounded-lg
        bg-red-500
        px-4
        py-2
        text-white
        transition
        hover:bg-red-600
      "
    >
      Logout
    </button>
  );
}