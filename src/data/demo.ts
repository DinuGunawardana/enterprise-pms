import type { ProjectSummary, DashboardTask } from "@/types";
const members = [
 {id:"U1",name:"Sanduni Gunawardana",role:"Project Lead",initials:"SG",color:"#ccfbf1"},
 {id:"U2",name:"Amal Perera",role:"Software Engineer",initials:"AP",color:"#dbeafe"},
 {id:"U3",name:"Nadeesha Silva",role:"UI/UX Designer",initials:"NS",color:"#fce7f3"},
 {id:"U4",name:"Dilan Karunaratne",role:"QA Engineer",initials:"DK",color:"#ede9fe"}
];
const projectActivity = [
 {id:"A1",actor:"Amal Perera",initials:"AP",action:"updated the status of",target:"API integration checklist",dateLabel:"Today · 10:42 AM",color:"#dbeafe"},
 {id:"A2",actor:"Nadeesha Silva",initials:"NS",action:"added a comment to",target:"User experience review",dateLabel:"Yesterday · 3:18 PM",color:"#fce7f3"},
 {id:"A3",actor:"Dilan Karunaratne",initials:"DK",action:"completed",target:"Sprint test plan",dateLabel:"Yesterday · 11:05 AM",color:"#ede9fe"}
];
export const demoProjects:ProjectSummary[] = [
 {id:"PRJ-024",name:"CALMable Platform",description:"A physiological stress and relaxation monitoring platform using HRV-based analysis and personalized insights.",department:"R&D",owner:"Sanduni Gunawardana",progress:72,taskCount:34,completedTasks:24,status:"On track",priority:"High",startDate:"2026-08-01",dueDate:"2026-12-18",color:"#0f766e",members, milestones:[{id:"M1",title:"Requirements and protocol finalized",dueDate:"2026-08-20",status:"Completed"},{id:"M2",title:"Feature extraction validation",dueDate:"2026-11-20",status:"In progress"},{id:"M3",title:"Integrated evaluation",dueDate:"2026-12-05",status:"Upcoming"},{id:"M4",title:"Final report and handover",dueDate:"2026-12-18",status:"Upcoming"}],activity:projectActivity},
 {id:"PRJ-021",name:"Enterprise PMS",description:"An internal enterprise project management and collaboration platform for teams, projects, tasks and documentation.",department:"Software Engineering",owner:"Sanduni Gunawardana",progress:38,taskCount:52,completedTasks:20,status:"On track",priority:"Critical",startDate:"2026-11-01",dueDate:"2027-03-31",color:"#6366f1",members,milestones:[{id:"M5",title:"Frontend foundation",dueDate:"2026-11-13",status:"Completed"},{id:"M6",title:"Project management module",dueDate:"2026-11-27",status:"In progress"},{id:"M7",title:"Task management module",dueDate:"2026-12-18",status:"Upcoming"}],activity:projectActivity},
 {id:"PRJ-019",name:"GRABit Mobile",description:"A mobile application for discovering and interacting with connected vending machine locations.",department:"Product Development",owner:"Amal Perera",progress:56,taskCount:27,completedTasks:15,status:"At risk",priority:"Medium",startDate:"2026-07-15",dueDate:"2026-12-10",color:"#d97706",members:members.slice(0,3),milestones:[{id:"M8",title:"Mobile application prototype",dueDate:"2026-09-01",status:"Completed"},{id:"M9",title:"BLE integration testing",dueDate:"2026-11-18",status:"Overdue"},{id:"M10",title:"Pilot release",dueDate:"2026-12-10",status:"Upcoming"}],activity:projectActivity.slice(0,2)},
 {id:"PRJ-016",name:"Research Analytics",description:"Research data processing, analysis and reporting workflows for internal studies.",department:"R&D",owner:"Nadeesha Silva",progress:21,taskCount:19,completedTasks:4,status:"Planning",priority:"Low",startDate:"2026-11-05",dueDate:"2027-02-28",color:"#0891b2",members:members.slice(0,2),milestones:[{id:"M11",title:"Research scope definition",dueDate:"2026-11-25",status:"In progress"},{id:"M12",title:"Data pipeline design",dueDate:"2026-12-15",status:"Upcoming"}],activity:projectActivity.slice(0,1)}
];
export const demoTasks:DashboardTask[] = [
 {id:"TSK-148",title:"Finalize dashboard interaction patterns",project:"Enterprise PMS",assignee:"You",dueLabel:"Today",status:"IN_PROGRESS",priority:"HIGH"},
 {id:"TSK-143",title:"Review HRV feature extraction results",project:"CALMable Platform",assignee:"You",dueLabel:"Today",status:"REVIEW",priority:"CRITICAL"},
 {id:"TSK-139",title:"Prepare sprint acceptance criteria",project:"Enterprise PMS",assignee:"You",dueLabel:"Tomorrow",status:"TODO",priority:"MEDIUM"},
 {id:"TSK-132",title:"Update mobile onboarding flow",project:"GRABit Mobile",assignee:"You",dueLabel:"Nov 16",status:"IN_PROGRESS",priority:"LOW"}
];
export const activityFeed = [
 {initials:"AK",name:"Amal Perera",action:"moved a task to Review",target:"API integration checklist",time:"18 min ago",color:"#dbeafe"},
 {initials:"NS",name:"Nadeesha Silva",action:"commented on",target:"CALMable research report",time:"1 hour ago",color:"#fce7f3"},
 {initials:"DK",name:"Dilan Karunaratne",action:"created a new task in",target:"Enterprise PMS",time:"3 hours ago",color:"#ede9fe"}
];

export const activity = activityFeed;
