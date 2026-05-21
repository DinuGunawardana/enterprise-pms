'use client';

import LogoutButton
from '../../components/auth/LogoutButton';

import {
  useAuthStore,
} from '../../store/authStore';

export default function DashboardPage() {

  const {
    user,
    loading,
  } = useAuthStore();

  /**
   * Prevent hydration flicker
   */
  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-950
          text-white
        "
      >
        Loading...
      </div>
    );
  }

// if (!user) {
//   return null;
// }

  return (

    <main
      className="
        min-h-screen
        bg-slate-950
        p-8
        text-white
      "
    >

      <div
        className="
          mb-8
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Dashboard
          </h1>

          <p
            className="
              mt-2
              text-slate-400
            "
          >
            Welcome back,
            {' '}
            {user?.email}
          </p>

        </div>

        <LogoutButton />

      </div>

    </main>
  );
}