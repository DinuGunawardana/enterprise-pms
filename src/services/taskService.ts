import { supabase } from '../lib/supabase';

/**
 * Fetch all tasks
 */
export async function getTasks() {

  /**
   * Queries tasks table
   */
  const { data, error } =
    await supabase
      .from('tasks')
      .select('*');

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Creates task
 */
export async function createTask(
  taskData: any
) {

  const { data, error } =
    await supabase
      .from('tasks')
      .insert(taskData)
      .select();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Updates task
 */
export async function updateTask(
  taskId: string,
  updates: any
) {

  const { data, error } =
    await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Deletes task
 */
export async function deleteTask(
  taskId: string
) {

  const { error } =
    await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

  if (error) {
    throw error;
  }
}