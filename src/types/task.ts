/**
 * Enterprise task structure
 */
export interface Task {

  id: string;

  project_id: string;

  title: string;

  description: string;

  assigned_to: string;

  created_by: string;

  status: string;

  priority: string;

  due_date: string;

  is_archived: boolean;

  created_at: string;

  updated_at: string;
}