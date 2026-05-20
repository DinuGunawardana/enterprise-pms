/**
 * Project membership structure
 */
export interface ProjectMember {

  id: string;

  project_id: string;

  user_id: string;

  member_role: string;

  joined_at: string;
}