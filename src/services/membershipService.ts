import { supabase } from '../lib/supabase';

/**
 * Adds member to project
 */
export async function addProjectMember(
  projectId: string,
  userId: string,
  role: string = 'Member'
) {

  const { data, error } =
    await supabase
      .from('project_members')
      .insert({
        project_id: projectId,
        user_id: userId,
        member_role: role,
      })
      .select();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Removes member from project
 */
export async function removeProjectMember(
  membershipId: string
) {

  const { error } =
    await supabase
      .from('project_members')
      .delete()
      .eq('id', membershipId);

  if (error) {
    throw error;
  }
}

/**
 * Gets project members
 */
export async function getProjectMembers(
  projectId: string
) {

  const { data, error } =
    await supabase
      .from('project_members')
      .select(`
        *,
        users (
          full_name,
          email
        )
      `)
      .eq('project_id', projectId);

  if (error) {
    throw error;
  }

  return data;
}