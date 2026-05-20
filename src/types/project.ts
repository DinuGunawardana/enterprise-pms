/**
 * Enterprise project structure
 */
export interface Project {

  /**
   * Unique project ID
   */
  id: string;

  /**
   * Project title
   */
  name: string;

  /**
   * Description
   */
  description: string;

  /**
   * Department relation
   */
  department_id: string;

  /**
   * Project creator
   */
  created_by: string;

  /**
   * Active / Archived / Completed
   */
  status: string;

  /**
   * Timeline
   */
  start_date: string;

  end_date: string;

  /**
   * Timestamps
   */
  created_at: string;

  updated_at: string;
}