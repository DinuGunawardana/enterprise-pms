import type { DashboardTask, ProjectSummary } from "@/types";

export const demoProjects: ProjectSummary[] = [
  { id: "PRJ-024", name: "CALMable Platform", department: "R&D", progress: 72, taskCount: 34, status: "On track", color: "#0f766e" },
  { id: "PRJ-021", name: "Enterprise PMS", department: "Software Engineering", progress: 38, taskCount: 52, status: "On track", color: "#6366f1" },
  { id: "PRJ-019", name: "GRABit Mobile", department: "Product Development", progress: 56, taskCount: 27, status: "At risk", color: "#d97706" },
  { id: "PRJ-016", name: "Research Analytics", department: "R&D", progress: 21, taskCount: 19, status: "Planning", color: "#0891b2" },
];

export const demoTasks: DashboardTask[] = [
  { id: "TSK-148", title: "Finalize dashboard interaction patterns", project: "Enterprise PMS", assignee: "You", dueLabel: "Today", status: "IN_PROGRESS", priority: "HIGH" },
  { id: "TSK-143", title: "Review HRV feature extraction results", project: "CALMable Platform", assignee: "You", dueLabel: "Today", status: "REVIEW", priority: "CRITICAL" },
  { id: "TSK-139", title: "Prepare sprint acceptance criteria", project: "Enterprise PMS", assignee: "You", dueLabel: "Tomorrow", status: "TODO", priority: "MEDIUM" },
  { id: "TSK-132", title: "Update mobile onboarding flow", project: "GRABit Mobile", assignee: "You", dueLabel: "Nov 16", status: "IN_PROGRESS", priority: "LOW" },
];

export const activity = [
  { initials: "AK", name: "Amal Perera", action: "moved a task to Review", target: "API integration checklist", time: "18 min ago", color: "#dbeafe" },
  { initials: "NS", name: "Nadeesha Silva", action: "commented on", target: "CALMable research report", time: "1 hour ago", color: "#fce7f3" },
  { initials: "DK", name: "Dilan Karunaratne", action: "created a new task in", target: "Enterprise PMS", time: "3 hours ago", color: "#ede9fe" },
];
