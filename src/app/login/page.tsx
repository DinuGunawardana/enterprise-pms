'use client';

import { useState } from 'react';

import { login } from '../../services/authService';

export default function LoginPage() {

  /**
   * Stores email input
   */
  const [email, setEmail] =
    useState('');

  /**
   * Stores password input
   */
  const [password, setPassword] =
    useState('');

  /**
   * Handles login button click
   */
  async function handleLogin() {

    try {

      /**
       * Calls login service
       */
      await login(email, password);

      alert('Login Successful');

    } catch (error) {

      console.error(error);

      alert('Login Failed');
    }
  }

  return (

    <div className="flex min-h-screen items-center justify-center">

      <div className="w-full max-w-md rounded-lg border p-6 shadow">

        <h1 className="mb-6 text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border p-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-black p-3 text-white"
        >
          Login
        </button>

      </div>

    </div>
  );
}