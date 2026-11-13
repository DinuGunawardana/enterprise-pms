import type { Department, Employee, AccessRole } from "@/types";
export const accessRoles:AccessRole[]=[
{id:"system-super-admin",name:"System Super Admin",rank:0,scope:"Entire organization",description:"Full system configuration and organization-wide administration."},
{id:"ceo",name:"CEO",rank:1,scope:"Entire organization",description:"Organization-wide executive oversight."},
{id:"management",name:"Management",rank:2,scope:"Organization / assigned areas",description:"Management oversight, reporting and approvals."},
{id:"supervisor-executive",name:"Supervisor / Executive",rank:3,scope:"Assigned departments",description:"Department-level coordination and supervision."},
{id:"team-lead",name:"Team Lead",rank:4,scope:"Assigned teams",description:"Team workload and task coordination."},
{id:"tech-lead",name:"Tech Lead",rank:5,scope:"Assigned technical teams",description:"Technical direction and review."},
{id:"software-engineer",name:"Software Engineer",rank:6,scope:"Assigned projects and tasks",description:"Execution of assigned project work."}];
export const initialDepartments:Department[]=[
{id:"DEP-RD",name:"R&D",code:"RD",managerId:"EMP-001",description:"Research, experimentation and product innovation",active:true},
{id:"DEP-SE",name:"Software Engineering",code:"SE",managerId:"EMP-002",description:"Software architecture, engineering and delivery",active:true},
{id:"DEP-PD",name:"Product Development",code:"PD",managerId:"EMP-003",description:"Product design and development",active:true},
{id:"DEP-QA",name:"Quality Assurance",code:"QA",managerId:"EMP-004",description:"Quality planning, verification and testing",active:true}];
export const initialEmployees:Employee[]=[
{id:"EMP-001",name:"Sanduni Gunawardana",email:"sanduni.gunawardana@example.com",phone:"",jobTitle:"Executive Software Engineer",departmentId:"DEP-RD",accessRoleId:"supervisor-executive",status:"Active",location:"Sri Lanka",joinedDate:"2021-06-01",managerId:"",skills:["AI","Data Science","Software Engineering"],projectIds:["PRJ-024","PRJ-021"],bio:"Executive Software Engineer working across research and software product development."},
{id:"EMP-002",name:"Amal Perera",email:"amal.perera@example.com",phone:"",jobTitle:"Senior Software Engineer",departmentId:"DEP-SE",accessRoleId:"tech-lead",status:"Active",location:"Sri Lanka",joinedDate:"2022-03-14",managerId:"EMP-001",skills:["Next.js","TypeScript","Backend"],projectIds:["PRJ-021","PRJ-019"],bio:"Senior engineer supporting software delivery."},
{id:"EMP-003",name:"Nadeesha Silva",email:"nadeesha.silva@example.com",phone:"",jobTitle:"UI/UX Designer",departmentId:"DEP-PD",accessRoleId:"team-lead",status:"Active",location:"Sri Lanka",joinedDate:"2023-01-09",managerId:"EMP-001",skills:["UI Design","Prototyping"],projectIds:["PRJ-024","PRJ-019"],bio:"Designs user experiences and interface systems."},
{id:"EMP-004",name:"Dilan Karunaratne",email:"dilan.karunaratne@example.com",phone:"",jobTitle:"QA Engineer",departmentId:"DEP-QA",accessRoleId:"software-engineer",status:"Active",location:"Sri Lanka",joinedDate:"2023-08-21",managerId:"EMP-002",skills:["Testing","Automation"],projectIds:["PRJ-021","PRJ-019"],bio:"Supports test planning and verification."},
{id:"EMP-005",name:"Avishka Hirushan",email:"avishka.hirushan@example.com",phone:"",jobTitle:"Software Engineering Intern",departmentId:"DEP-SE",accessRoleId:"software-engineer",status:"Active",location:"Sri Lanka",joinedDate:"2026-06-08",managerId:"EMP-002",skills:["React","JavaScript"],projectIds:["PRJ-021"],bio:"Software engineering intern."},
{id:"EMP-006",name:"Suwaathmi Ravindran",email:"suwaathmi.ravindran@example.com",phone:"",jobTitle:"AI / Data Science Intern",departmentId:"DEP-RD",accessRoleId:"software-engineer",status:"Active",location:"Sri Lanka",joinedDate:"2026-06-08",managerId:"EMP-001",skills:["Python","Machine Learning"],projectIds:["PRJ-024"],bio:"AI and data science intern."}];
