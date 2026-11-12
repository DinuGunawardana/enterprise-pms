import { activity, demoProjects, demoTasks } from "@/data/demo";

export async function getDashboardData() {
  // Demo adapter. Replace this implementation with a Supabase-backed service later.
  return {
    projects: demoProjects,
    tasks: demoTasks,
    activity,
    metrics: {
      activeProjects: 8,
      openTasks: 46,
      completedThisMonth: 28,
      overdueTasks: 5,
    },
  };
}
