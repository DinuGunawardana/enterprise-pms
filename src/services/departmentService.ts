import { supabase } from '../lib/supabase';

/**
 * Fetch all departments
 */
export async function getDepartments() {

  const { data, error } =
    await supabase
      .from('departments')
      .select('*');

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Creates department
 */
export async function createDepartment(
  departmentData: any
) {

  const { data, error } =
    await supabase
      .from('departments')
      .insert(departmentData)
      .select();

  if (error) {
    throw error;
  }

  return data;
}