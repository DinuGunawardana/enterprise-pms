"use client";
import {useEffect,useState} from "react";
import {Button} from "@/components/ui/Button";
import {Dialog} from "@/components/ui/Dialog";
import {Input} from "@/components/ui/Input";
import {Select} from "@/components/ui/Select";
import type {ProjectSummary} from "@/types";
const blank={name:"",description:"",department:"R&D",owner:"Sanduni Gunawardana",priority:"Medium" as ProjectSummary["priority"],startDate:"",dueDate:""};
type FormValue=typeof blank;
export function ProjectFormDialog({open,onClose,onSave,project}:{open:boolean;onClose:()=>void;onSave:(v:FormValue)=>void;project?:ProjectSummary|null}){
 const [form,setForm]=useState<FormValue>(blank);const [error,setError]=useState("");
 useEffect(()=>{if(open){setForm(project?{name:project.name,description:project.description,department:project.department,owner:project.owner,priority:project.priority,startDate:project.startDate,dueDate:project.dueDate}:blank);setError("")}},[open,project]);
 const set=(k:keyof FormValue,v:string)=>setForm(x=>({...x,[k]:v}));
 function submit(e:React.FormEvent){e.preventDefault();if(form.name.trim().length<3){setError("Project name must contain at least 3 characters.");return}if(form.startDate&&form.dueDate&&form.dueDate<form.startDate){setError("Due date cannot be earlier than start date.");return}onSave({...form,name:form.name.trim(),description:form.description.trim()})}
 return <Dialog open={open} onClose={onClose} title={project?"Edit project":"Create project"} description={project?"Update project information.":"Add a project to the workspace."} footer={<><Button onClick={onClose}>Cancel</Button><Button variant="primary" type="submit" form="project-form">{project?"Save changes":"Create project"}</Button></>}>
 <form id="project-form" onSubmit={submit} className="space-y-4">
 <div><label className="mb-1.5 block text-xs font-semibold">Project name *</label><Input autoFocus required minLength={3} maxLength={100} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Enter project name"/></div>
 <div><label className="mb-1.5 block text-xs font-semibold">Description</label><textarea className="field min-h-20 resize-y" maxLength={500} value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Briefly describe the project"/></div>
 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-xs font-semibold">Department *</label><Select value={form.department} onChange={e=>set("department",e.target.value)}>{["R&D","Software Engineering","Product Development","Human Resources","Finance","Operations"].map(x=><option key={x}>{x}</option>)}</Select></div><div><label className="mb-1.5 block text-xs font-semibold">Project owner *</label><Select value={form.owner} onChange={e=>set("owner",e.target.value)}>{["Sanduni Gunawardana","Amal Perera","Nadeesha Silva","Dilan Karunaratne"].map(x=><option key={x}>{x}</option>)}</Select></div></div>
 <div><label className="mb-1.5 block text-xs font-semibold">Priority</label><Select value={form.priority} onChange={e=>set("priority",e.target.value as FormValue["priority"])}>{["Low","Medium","High","Critical"].map(x=><option key={x}>{x}</option>)}</Select></div>
 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-xs font-semibold">Start date</label><Input type="date" value={form.startDate} onChange={e=>set("startDate",e.target.value)}/></div><div><label className="mb-1.5 block text-xs font-semibold">Due date</label><Input type="date" value={form.dueDate} onChange={e=>set("dueDate",e.target.value)}/></div></div>
 {error&&<p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
 </form></Dialog>
}
