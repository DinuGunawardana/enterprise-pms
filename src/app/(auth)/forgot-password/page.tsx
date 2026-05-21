'use client';

import Link from 'next/link';

import { useState } from 'react';

import {
  Loader2,
  Mail,
} from 'lucide-react';

import {
  forgotPassword,
} from '../../../services/authService';

export default function ForgotPasswordPage() {

  /**
   * Form state
   */
  const [email, setEmail] =
    useState('');

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
   * Email validation
   */
  function isValidEmail(email: string) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);
  }

  /**
   * Handle reset request
   */
  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    /**
     * Reset messages
     */
    setError('');
    setSuccess('');

    /**
     * Validate email
     */
    if (!email) {

      setError(
        'Please enter your email.'
      );

      return;
    }

    if (!isValidEmail(email)) {

      setError(
        'Please enter a valid email.'
      );

      return;
    }

    try {

      setLoading(true);

      /**
       * Send reset email
       */
      await forgotPassword(email);

      /**
       * Success state
       */
      setSuccess(
        'Password reset email sent. Please check your inbox.'
      );

    } catch (error: any) {

      console.error(error);

      setError(
        error?.message ||
        'Failed to send reset email.'
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

            <Mail
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
            Forgot Password
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-slate-400
            "
          >
            Enter your email to receive a password reset link.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
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
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/30
              "
            />

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

              'Send Reset Link'
            )}

          </button>

        </form>

        {/* Footer */}
        <div
          className="
            mt-6
            text-center
            text-sm
            text-slate-400
          "
        >

          Remember your password?{' '}

          <Link
            href="/login"
            className="
              font-medium
              text-indigo-400
              transition
              hover:text-indigo-300
            "
          >
            Back to Login
          </Link>

        </div>

      </div>

    </main>
  );
}