import { supabase } from '../lib/supabase';

/**
 * Fetch subtasks
 */
export async function getSubtasks(
  taskId: string
) {

  const { data, error } =
    await supabase
      .from('subtasks')
      .select('*')
      .eq('task_id', taskId);

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Create subtask
 */
export async function createSubtask(
  subtaskData: any
) {

  const { data, error } =
    await supabase
      .from('subtasks')
      .insert(subtaskData)
      .select();

  if (error) {
    throw error;
  }

  return data;
}