import { supabase } from '../lib/supabase';

/**
 * Fetches all users
 */
export async function getUsers() {

  /**
   * Queries users table
   */
  const { data, error } =
    await supabase
      .from('users')
      .select('*');

  /**
   * Error handling
   */
  if (error) {
    throw error;
  }

  /**
   * Returns users
   */
  return data;
}

/**
 * Creates new employee
 */
export async function createUser(
  userData: any
) {

  const { data, error } =
    await supabase
      .from('users')
      .insert(userData)
      .select();

  if (error) {
    throw error;
  }

  return data;
}