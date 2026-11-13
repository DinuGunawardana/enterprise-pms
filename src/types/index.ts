export type ProjectStatus = "On track" | "At risk" | "Planning" | "Completed" | "On hold";
export interface ProjectMember { id:string; name:string; role:string; initials:string; color:string }
export interface ProjectMilestone { id:string; title:string; dueDate:string; status:"Completed"|"In progress"|"Upcoming"|"Overdue" }
export interface ProjectActivity { id:string; actor:string; initials:string; action:string; target:string; dateLabel:string; color:string }
export interface ProjectSummary { id:string; name:string; description:string; department:string; owner:string; progress:number; taskCount:number; completedTasks:number; status:ProjectStatus; priority:"Low"|"Medium"|"High"|"Critical"; startDate:string; dueDate:string; color:string; members:ProjectMember[]; milestones:ProjectMilestone[]; activity:ProjectActivity[]; archived?:boolean }
export type TaskStatus = "TODO"|"IN_PROGRESS"|"REVIEW"|"DONE";
export type TaskPriority = "LOW"|"MEDIUM"|"HIGH"|"CRITICAL";
export interface TaskSubtask { id:string; title:string; completed:boolean }
export interface TaskItem { id:string; title:string; description:string; projectId:string; assignee:string; reporter:string; dueDate:string; startDate:string; status:TaskStatus; priority:TaskPriority; labels:string[]; subtasks:TaskSubtask[]; createdAt:string; updatedAt:string }
export interface DashboardTask {id:string;title:string;project:string;assignee:string;dueLabel:string;status:TaskStatus;priority:TaskPriority}

export type EmployeeStatus = "Active" | "Inactive" | "On leave";
export interface AccessRole { id:string; name:string; rank:number; scope:string; description:string }
export interface Department { id:string; name:string; code:string; managerId:string; description:string; active:boolean }
export interface Employee { id:string; name:string; email:string; phone:string; jobTitle:string; departmentId:string; accessRoleId:string; status:EmployeeStatus; location:string; joinedDate:string; managerId:string; skills:string[]; projectIds:string[]; bio:string }

export type CalendarEventType = "MEETING" | "MILESTONE" | "REMINDER";
export interface CalendarEvent { id:string; title:string; date:string; startTime:string; endTime:string; type:CalendarEventType; projectId:string; description:string; location:string; createdAt:string }

export type DocumentVisibility = "PRIVATE" | "SHARED" | "DEPARTMENT" | "GLOBAL";
export type DocumentPermission = "VIEW" | "COMMENT" | "EDIT";
export type DocumentKind = "NOTE" | "PDF" | "WORD" | "SPREADSHEET" | "PRESENTATION" | "IMAGE" | "OTHER";
export interface DocumentShare { id:string; targetType:"USER"|"DEPARTMENT"; targetId:string; permission:DocumentPermission }
export interface PmsDocument {
 id:string; title:string; description:string; kind:DocumentKind; visibility:DocumentVisibility;
 ownerId:string; ownerName:string; departmentId:string; projectId:string; fileName:string;
 mimeType:string; size:number; dataUrl:string; content:string; shares:DocumentShare[];
 createdAt:string; updatedAt:string; archived:boolean;
}
