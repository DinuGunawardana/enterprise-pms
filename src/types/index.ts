export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface DashboardTask {
  id: string;
  title: string;
  project: string;
  assignee: string;
  dueLabel: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface ProjectSummary {
  id: string;
  name: string;
  department: string;
  progress: number;
  taskCount: number;
  status: "On track" | "At risk" | "Planning";
  color: string;
}
