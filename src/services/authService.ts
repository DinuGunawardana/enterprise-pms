import { supabase } from '../lib/supabase';

/**
 * Registers new user
 */
export async function signUp(
  email: string,
  password: string
) {

  /**
   * Supabase creates:
   * - auth account
   * - encrypted password
   * - session
   */
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Logs user into system
 */
export async function login(
  email: string,
  password: string
) {

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sends password reset email
 */
export async function forgotPassword(
  email: string
) {

  const { data, error } =
    await supabase.auth.resetPasswordForEmail(
      email
    );

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Logs user out
 */
export async function logout() {

  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}