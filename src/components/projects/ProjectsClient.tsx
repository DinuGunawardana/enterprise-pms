"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import {Archive,ArrowUpRight,BriefcaseBusiness,CalendarDays,ChevronLeft,ChevronRight,LayoutGrid,List,MoreHorizontal,Plus,Search,Users} from "lucide-react";
import {AppShell} from "@/components/layout/AppShell";
import {Button} from "@/components/ui/Button";
import {Badge} from "@/components/ui/Badge";
import {Card} from "@/components/ui/Card";
import {Dialog} from "@/components/ui/Dialog";
import {Input} from "@/components/ui/Input";
import {Select} from "@/components/ui/Select";
import {ProjectFormDialog} from "./ProjectFormDialog";
import {useProjects} from "@/hooks/useProjects";
import type {ProjectStatus,ProjectSummary} from "@/types";
const PAGE_SIZE=6;
function tone(s:ProjectStatus){return s==="On track"||s==="Completed"?"success":s==="At risk"?"warning":s==="On hold"?"danger":"neutral"}
function date(s:string){return s?new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(s+"T00:00:00")):"Not set"}
export function ProjectsClient(){
 const {projects,setProjects,ready}=useProjects();
 const [query,setQuery]=useState("");const [department,setDepartment]=useState("All departments");const [status,setStatus]=useState("All statuses");const [sort,setSort]=useState("recent");const [view,setView]=useState<"grid"|"list">("grid");const [page,setPage]=useState(1);const [archived,setArchived]=useState(false);
 const [formOpen,setFormOpen]=useState(false);const [editing,setEditing]=useState<ProjectSummary|null>(null);const [archiveTarget,setArchiveTarget]=useState<ProjectSummary|null>(null);const [menu,setMenu]=useState<string|null>(null);const [notice,setNotice]=useState("");
 const departments=["All departments",...Array.from(new Set(projects.map(p=>p.department)))];
 const filtered=useMemo(()=>{let a=projects.filter(p=>(archived?!!p.archived:!p.archived)&&(`${p.name} ${p.id} ${p.description} ${p.owner} ${p.department}`.toLowerCase().includes(query.toLowerCase()))&&(department==="All departments"||p.department===department)&&(status==="All statuses"||p.status===status));if(sort==="name")a.sort((x,y)=>x.name.localeCompare(y.name));if(sort==="progress")a.sort((x,y)=>y.progress-x.progress);if(sort==="due")a.sort((x,y)=>(x.dueDate||"9999").localeCompare(y.dueDate||"9999"));return a},[projects,archived,query,department,status,sort]);
 const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));const current=Math.min(page,pages);const rows=filtered.slice((current-1)*PAGE_SIZE,current*PAGE_SIZE);
 function save(v:{name:string;description:string;department:string;owner:string;priority:ProjectSummary["priority"];startDate:string;dueDate:string}){
  if(editing){setProjects(old=>old.map(p=>p.id===editing.id?{...p,...v}:p));setNotice(`"${v.name}" updated.`)}
  else {const p:ProjectSummary={...v,id:`PRJ-${String(Date.now()).slice(-5)}`,progress:0,taskCount:0,completedTasks:0,status:"Planning",color:"#0f766e",members:[],milestones:[],activity:[]};setProjects(old=>[p,...old]);setNotice(`"${v.name}" created.`);setPage(1)}
  setFormOpen(false);setEditing(null)
 }
 function archive(){if(!archiveTarget)return;setProjects(old=>old.map(p=>p.id===archiveTarget.id?{...p,archived:!archived}:p));setNotice(archived?`"${archiveTarget.name}" restored.`:`"${archiveTarget.name}" archived.`);setArchiveTarget(null)}
 function edit(p:ProjectSummary){setEditing(p);setFormOpen(true);setMenu(null)}
 const create=()=>{setEditing(null);setFormOpen(true)};
 return <AppShell><main className="content">
  <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-teal-700">Workspace / Management</div><h1 className="text-2xl font-bold tracking-tight text-slate-900">Projects</h1><p className="mt-1 text-sm text-slate-500">Plan, organize and track work across your departments.</p></div><Button variant="primary" onClick={create}><Plus size={16}/> Create project</Button></div>
  {notice&&<div role="status" className="mb-5 flex justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">{notice}<button onClick={()=>setNotice("")}>×</button></div>}
  <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">{[{label:"Active projects",value:projects.filter(p=>!p.archived&&p.status!=="Completed").length,icon:BriefcaseBusiness},{label:"On track",value:projects.filter(p=>!p.archived&&p.status==="On track").length,icon:ArrowUpRight},{label:"At risk",value:projects.filter(p=>!p.archived&&p.status==="At risk").length,icon:Users},{label:"Archived",value:projects.filter(p=>p.archived).length,icon:Archive}].map(x=><Card key={x.label} className="p-4"><div className="flex justify-between text-xs text-slate-500"><span>{x.label}</span><x.icon size={15}/></div><div className="mt-2 text-2xl font-bold">{x.value}</div></Card>)}</div>
  <Card className="overflow-visible">
   <div className="flex flex-col gap-3 border-b border-slate-100 p-4 xl:flex-row xl:items-center xl:justify-between">
    <div className="relative w-full xl:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15}/><Input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search projects..." className="pl-9"/></div>
    <div className="flex flex-wrap items-center gap-2">
     <Select value={department} onChange={e=>{setDepartment(e.target.value);setPage(1)}} className="w-auto min-w-[145px]"><option>All departments</option>{departments.slice(1).map(d=><option key={d}>{d}</option>)}</Select>
     <Select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}} className="w-auto min-w-[125px]"><option>All statuses</option>{(["On track","At risk","Planning","Completed","On hold"] as ProjectStatus[]).map(s=><option key={s}>{s}</option>)}</Select>
     <Select value={sort} onChange={e=>setSort(e.target.value)} className="w-auto min-w-[125px]"><option value="recent">Recently added</option><option value="name">Name A–Z</option><option value="progress">Progress</option><option value="due">Due date</option></Select>
     <Button size="sm" variant={archived?"primary":"secondary"} onClick={()=>{setArchived(v=>!v);setPage(1)}}><Archive size={14}/>{archived?"Show active":"Archived"}</Button>
     <div className="flex rounded-lg border border-slate-200 p-1"><button onClick={()=>setView("grid")} className={`rounded-md p-1.5 ${view==="grid"?"bg-teal-50 text-teal-700":"text-slate-400"}`} aria-label="Grid view"><LayoutGrid size={16}/></button><button onClick={()=>setView("list")} className={`rounded-md p-1.5 ${view==="list"?"bg-teal-50 text-teal-700":"text-slate-400"}`} aria-label="List view"><List size={16}/></button></div>
    </div>
   </div>
   {!ready?<div className="p-12 text-center text-sm text-slate-500">Loading projects…</div>:rows.length===0?<div className="p-14 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><BriefcaseBusiness size={22}/></div><h3 className="text-sm font-bold">No projects found</h3><p className="mt-1 text-xs text-slate-500">Try changing your filters or create a new project.</p><Button variant="primary" className="mt-4" onClick={create}><Plus size={14}/> Create project</Button></div>:
   view==="grid"?<div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">{rows.map(p=><div key={p.id} className="relative rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="mb-3 flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="h-9 w-1 shrink-0 rounded-full" style={{background:p.color}}/><div className="min-w-0"><Link href={`/projects/${p.id}`} className="block truncate text-sm font-bold text-slate-900 hover:text-teal-700">{p.name}</Link><p className="mt-0.5 text-[10px] text-slate-400">{p.id}</p></div></div>
    <div className="relative"><button onClick={()=>setMenu(menu===p.id?null:p.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" aria-label={`Actions for ${p.name}`}><MoreHorizontal size={18}/></button>{menu===p.id&&<div className="absolute right-0 top-8 z-10 w-36 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"><button onClick={()=>edit(p)} className="w-full rounded px-3 py-2 text-left text-xs hover:bg-slate-50">Edit project</button><button onClick={()=>{setArchiveTarget(p);setMenu(null)}} className="w-full rounded px-3 py-2 text-left text-xs text-rose-700 hover:bg-rose-50">{archived?"Restore":"Archive"}</button></div>}</div></div>
    <p className="mb-4 line-clamp-2 min-h-9 text-xs leading-5 text-slate-500">{p.description||"No project description provided."}</p><div className="mb-3 flex items-center justify-between"><Badge tone={tone(p.status)}>{p.status}</Badge><span className="text-[11px] text-slate-500">{p.priority} priority</span></div>
    <div className="mb-2 flex justify-between text-[11px]"><span className="font-semibold text-slate-600">Progress</span><span className="font-bold">{p.progress}%</span></div><div className="progress-track"><div className="progress-fill" style={{width:`${p.progress}%`,background:p.color}}/></div>
    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-500"><span className="flex items-center gap-1"><Users size={13}/>{p.members.length} members · {p.taskCount} tasks</span><span className="flex items-center gap-1"><CalendarDays size={13}/>{date(p.dueDate)}</span></div><Link href={`/projects/${p.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-700">Open project <ArrowUpRight size={13}/></Link>
   </div>)}</div>:
   <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left"><thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400"><tr>{["Project","Department","Owner","Status","Progress","Due date","Actions"].map(h=><th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.map(p=><tr key={p.id} className="hover:bg-slate-50/70"><td className="px-5 py-4"><Link href={`/projects/${p.id}`} className="text-xs font-bold hover:text-teal-700">{p.name}</Link><div className="mt-1 text-[10px] text-slate-400">{p.id}</div></td><td className="px-4 py-4 text-xs">{p.department}</td><td className="px-4 py-4 text-xs">{p.owner}</td><td className="px-4 py-4"><Badge tone={tone(p.status)}>{p.status}</Badge></td><td className="px-4 py-4"><div className="flex items-center gap-2"><div className="progress-track w-20"><div className="progress-fill" style={{width:`${p.progress}%`,background:p.color}}/></div><span className="text-[11px]">{p.progress}%</span></div></td><td className="px-4 py-4 text-xs">{date(p.dueDate)}</td><td className="px-4 py-4"><button onClick={()=>edit(p)} className="text-xs font-semibold text-teal-700">Edit</button></td></tr>)}</tbody></table></div>}
   <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3"><span className="text-[11px] text-slate-500">Showing {filtered.length?((current-1)*PAGE_SIZE+1):0}–{Math.min(current*PAGE_SIZE,filtered.length)} of {filtered.length} projects</span><div className="flex items-center gap-2"><Button size="sm" disabled={current===1} onClick={()=>setPage(x=>Math.max(1,x-1))}><ChevronLeft size={14}/> Previous</Button><span className="text-[11px] text-slate-500">Page {current} of {pages}</span><Button size="sm" disabled={current===pages} onClick={()=>setPage(x=>Math.min(pages,x+1))}>Next <ChevronRight size={14}/></Button></div></div>
  </Card>
  <p className="mt-4 text-center text-[10px] text-slate-400">Demo data is saved in this browser only. It is not connected to Supabase.</p>
 </main>
 <ProjectFormDialog open={formOpen} onClose={()=>{setFormOpen(false);setEditing(null)}} onSave={save} project={editing}/>
 <Dialog open={!!archiveTarget} onClose={()=>setArchiveTarget(null)} title={archived?"Restore project?":"Archive project?"} description={archived?"This project will return to the active list.":"This project will be hidden from the active list. Its demo history is retained."} footer={<><Button onClick={()=>setArchiveTarget(null)}>Cancel</Button><Button variant={archived?"primary":"danger"} onClick={archive}>{archived?"Restore project":"Archive project"}</Button></>}>{archiveTarget&&<p className="text-sm"><strong>{archiveTarget.name}</strong> ({archiveTarget.id})</p>}</Dialog>
 </AppShell>
}
