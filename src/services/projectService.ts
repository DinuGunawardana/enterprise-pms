import { supabase } from '../lib/supabase';

/**
 * Fetches all projects
 */
export async function getProjects() {

  /**
   * Queries projects table
   */
  const { data, error } =
    await supabase
      .from('projects')
      .select('*');

  /**
   * Error handling
   */
  if (error) {
    throw error;
  }

  return data;
}

/**
 * Creates new project
 */
export async function createProject(
  projectData: any
) {

  const { data, error } =
    await supabase
      .from('projects')
      .insert(projectData)
      .select();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Updates project
 */
export async function updateProject(
  projectId: string,
  updates: any
) {

  const { data, error } =
    await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Archives project
 */
export async function archiveProject(
  projectId: string
) {

  const { data, error } =
    await supabase
      .from('projects')
      .update({
        status: 'Archived',
      })
      .eq('id', projectId)
      .select();

  if (error) {
    throw error;
  }

  return data;
}