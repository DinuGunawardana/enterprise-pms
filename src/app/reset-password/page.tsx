'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import {
  Loader2,
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

export default function ResetPasswordPage() {

  /**
   * Router
   */
  const router = useRouter();

  /**
   * Form states
   */
  const [password, setPassword] =
    useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  /**
   * UI states
   */
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  /**
   * Password visibility
   */
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  /**
   * Form validation
   */
  function validateForm() {

    if (
      !password ||
      !confirmPassword
    ) {

      return 'Please fill all fields.';
    }

    if (password.length < 8) {

      return (
        'Password must be at least 8 characters.'
      );
    }

    if (password !== confirmPassword) {

      return 'Passwords do not match.';
    }

    return null;
  }

  /**
   * Handle password update
   */
  async function handleReset(
    e: React.FormEvent
  ) {

    e.preventDefault();

    /**
     * Reset messages
     */
    setError('');
    setSuccess('');

    /**
     * Validate form
     */
    const validationError =
      validateForm();

    if (validationError) {

      setError(validationError);

      return;
    }

    try {

      setLoading(true);

      /**
       * Update password
       */
      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        throw error;
      }

      /**
       * Success state
       */
      setSuccess(
        'Password updated successfully.'
      );

      /**
       * Redirect to login
       */
      setTimeout(() => {

        router.push('/login');

      }, 2500);

    } catch (error: any) {

      console.error(error);

      setError(
        error?.message ||
        'Password reset failed.'
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-8
          shadow-2xl
          backdrop-blur-xl
        "
      >

        {/* Header */}
        <div className="mb-8 text-center">

          <div
            className="
              mx-auto
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-indigo-500/20
            "
          >

            <Lock
              className="text-indigo-400"
              size={26}
            />

          </div>

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Reset Password
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-slate-400
            "
          >
            Enter your new password below.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleReset}
          className="space-y-5"
        >

          {/* Password */}
          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  pr-12
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/30
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-white
                "
              >
                {showPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
                }
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  pr-12
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/30
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-white
                "
              >
                {showConfirmPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
                }
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (

            <div
              className="
                rounded-xl
                border
                border-red-500/30
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* Success */}
          {success && (

            <div
              className="
                rounded-xl
                border
                border-emerald-500/30
                bg-emerald-500/10
                px-4
                py-3
                text-sm
                text-emerald-400
              "
            >
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-indigo-600
              px-4
              py-3
              font-medium
              text-white
              transition
              hover:bg-indigo-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (

              <Loader2
                className="animate-spin"
                size={20}
              />

            ) : (

              'Update Password'
            )}

          </button>

        </form>

      </div>

    </main>
  );
}