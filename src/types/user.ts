/**
 * Represents enterprise user
 */
export interface User {

  /**
   * Unique identifier
   */
  id: string;

  /**
   * Full employee name
   */
  full_name: string;

  /**
   * Login email
   */
  email: string;

  /**
   * Enterprise role
   */
  role: string;

  /**
   * Hierarchy level
   */
  priority_level: number;

  /**
   * Department relationship
   */
  department_id: string | null;

  /**
   * Active account state
   */
  is_active: boolean;

  /**
   * Global admin
   */
  is_system_admin: boolean;

  /**
   * Department admin
   */
  is_department_admin: boolean;
}