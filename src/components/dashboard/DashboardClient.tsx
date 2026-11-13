"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, CircleAlert, Clock3, Plus, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "./MetricCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { activity, demoProjects, demoTasks } from "@/data/demo";
import type { DashboardTask, ProjectSummary } from "@/types";

type CreateKind = "project" | "task" | "document";
const initialWidgets = { metrics: true, projects: true, activity: true, tasks: true };
function dateLabel() {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(new Date()).toUpperCase();
}
function titleCase(value: string) { return value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); }

export function DashboardClient() {
  const [projects, setProjects] = useState<ProjectSummary[]>(demoProjects);
  const [tasks, setTasks] = useState<DashboardTask[]>(demoTasks);
  const [search, setSearch] = useState("");
  const [widgets, setWidgets] = useState(initialWidgets);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createKind, setCreateKind] = useState<CreateKind>("task");
  const [newTitle, setNewTitle] = useState("");
  const [newProject, setNewProject] = useState("Enterprise PMS");
  const [notice, setNotice] = useState("");

  const filteredProjects = useMemo(() => projects.filter(p => `${p.name} ${p.department} ${p.id}`.toLowerCase().includes(search.toLowerCase())), [projects, search]);
  const filteredTasks = useMemo(() => tasks.filter(t => `${t.title} ${t.project} ${t.id} ${t.priority} ${t.status}`.toLowerCase().includes(search.toLowerCase())), [tasks, search]);
  const filteredActivity = activity.filter(a => `${a.name} ${a.action} ${a.target}`.toLowerCase().includes(search.toLowerCase()));
  const metrics = {
    activeProjects: projects.length + 4,
    openTasks: tasks.length + 42,
    completed: 28,
    overdue: 5,
  };
  const openCreate = (kind: CreateKind) => { setCreateKind(kind); setNewTitle(""); setCreateOpen(true); setNotice(""); };
  const submitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    if (createKind === "project") {
      setProjects(prev => [{ id: `PRJ-${String(25 + prev.length).padStart(3, "0")}`, name: title, description: "", department: "Unassigned", owner: "Sanduni Gunawardana", progress: 0, taskCount: 0, completedTasks: 0, status: "Planning", priority: "Medium", startDate: "", dueDate: "", color: "#0f766e", members: [], milestones: [], activity: [] }, ...prev]);
      setNotice(`Project "${title}" added to this demo session.`);
    } else if (createKind === "task") {
      setTasks(prev => [{ id: `TSK-${150 + prev.length}`, title, project: newProject, assignee: "You", dueLabel: "Not set", status: "TODO", priority: "MEDIUM" }, ...prev]);
      setNotice(`Task "${title}" added to this demo session.`);
    } else {
      setNotice(`Document "${title}" draft entry created in this demo session. File storage is not connected.`);
    }
    setCreateOpen(false);
  };
  const toggleWidget = (key: keyof typeof initialWidgets) => setWidgets(prev => ({ ...prev, [key]: !prev[key] }));

  return <AppShell searchValue={search} onSearchChange={setSearch}>
    <main className="content">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><div className="mb-2 text-[11px] font-semibold tracking-wide text-teal-700">{dateLabel()}</div><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Good morning, Sanduni <span aria-hidden>👋</span></h1><p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening across your workspace today.</p></div>
        <div className="flex gap-2">
          <Button onClick={() => setCustomizeOpen(true)}><SlidersHorizontal size={15}/> Customize</Button>
          <Button variant="primary" onClick={() => openCreate("task")}><Plus size={16}/> Create new</Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-teal-100 bg-teal-50/70 px-4 py-3 text-xs text-teal-900">
        <div><span className="font-bold">Preview environment</span><span className="ml-2 text-teal-800/80">Figures and people are demonstration data. Changes are temporary and reset on refresh.</span></div>
        {search && <button onClick={() => setSearch("")} className="font-semibold underline">Clear search</button>}
      </div>
      {notice && <div role="status" className="mb-5 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}

      {widgets.metrics && <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active projects" value={metrics.activeProjects} note="Across all departments" icon={BriefcaseBusiness} tone="teal"/>
        <MetricCard label="Open tasks" value={metrics.openTasks} note="12 assigned to you" icon={Clock3} tone="blue"/>
        <MetricCard label="Completed this month" value={metrics.completed} note="↑ 12% from last month" icon={CheckCircle2} tone="teal"/>
        <MetricCard label="Overdue tasks" value={metrics.overdue} note="Requires attention" icon={CircleAlert} tone="rose"/>
      </section>}

      <section className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
        {widgets.projects && <Card className="overflow-hidden">
          <CardHeader title="Project overview" description="Progress across active projects" action={<button className="text-xs font-semibold text-teal-700" onClick={() => setNotice("Project navigation will be implemented in the Projects stage.")}>View all <ArrowUpRight className="ml-1 inline" size={13}/></button>}/>
          <div className="divide-y divide-slate-100">
            {filteredProjects.length ? filteredProjects.map(project => <div key={project.id} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="h-9 w-1 shrink-0 rounded-full" style={{ background: project.color }}/><div className="min-w-0"><div className="truncate text-xs font-semibold text-slate-800">{project.name}</div><div className="mt-1 text-[11px] text-slate-500">{project.department} · {project.taskCount} tasks</div></div></div><Badge tone={project.status === "At risk" ? "warning" : project.status === "Planning" ? "neutral" : "success"}>{project.status}</Badge></div>
              <div className="mt-3 flex items-center gap-3"><div className="progress-track flex-1"><div className="progress-fill" style={{ width: `${project.progress}%`, background: project.color }}/></div><span className="w-9 text-right text-[11px] font-semibold text-slate-600">{project.progress}%</span></div>
            </div>) : <div className="p-8 text-center text-xs text-slate-500">No projects match “{search}”.</div>}
          </div>
        </Card>}

        {widgets.activity && <Card className="overflow-hidden">
          <CardHeader title="Recent activity" description="Latest workspace updates"/>
          <div className="space-y-5 p-5">
            {filteredActivity.length ? filteredActivity.map((item, index) => <div key={index} className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-slate-700" style={{ background: item.color }}>{item.initials}</div>
              <div className="min-w-0"><p className="text-xs leading-5 text-slate-700"><span className="font-semibold">{item.name}</span> {item.action} <span className="font-semibold">{item.target}</span></p><p className="mt-1 text-[10px] text-slate-400">{item.time}</p></div>
            </div>) : <p className="text-xs text-slate-500">No activity matches your search.</p>}
          </div>
          <div className="border-t border-slate-100 px-5 py-3"><button onClick={() => setNotice("The full activity log will be implemented in a later stage.")} className="text-xs font-semibold text-teal-700">View activity log <ArrowUpRight className="ml-1 inline" size={13}/></button></div>
        </Card>}
      </section>

      {widgets.tasks && <Card className="overflow-hidden">
        <CardHeader title="My tasks" description="Your current priorities and upcoming work" action={<button onClick={() => setNotice("The complete task manager will be implemented in the Tasks stage.")} className="text-xs font-semibold text-teal-700">View all tasks <ArrowUpRight className="ml-1 inline" size={13}/></button>}/>
        <DataTable headers={["Task", "Project", "Priority", "Status", "Due date"]}>
          {filteredTasks.length ? filteredTasks.map(task => <tr key={task.id} className="hover:bg-slate-50/70">
            <td className="px-5 py-4"><div className="text-xs font-semibold text-slate-800">{task.title}</div><div className="mt-1 text-[10px] text-slate-400">{task.id}</div></td>
            <td className="px-4 py-4 text-xs text-slate-600">{task.project}</td>
            <td className="px-4 py-4"><Badge tone={task.priority === "CRITICAL" ? "danger" : task.priority === "HIGH" ? "warning" : task.priority === "MEDIUM" ? "info" : "neutral"}>{task.priority}</Badge></td>
            <td className="px-4 py-4 text-xs text-slate-600">{titleCase(task.status.replace("_", " "))}</td>
            <td className="px-5 py-4 text-xs text-slate-600">{task.dueLabel}</td>
          </tr>) : <tr><td colSpan={5} className="px-5 py-8 text-center text-xs text-slate-500">No tasks match “{search}”.</td></tr>}
        </DataTable>
      </Card>}
      <p className="mt-5 text-center text-[10px] text-slate-400">NEXUS PMS · Frontend preview · Demo data only</p>
    </main>

    <Dialog open={customizeOpen} onClose={() => setCustomizeOpen(false)} title="Customize dashboard" description="Choose which dashboard sections are visible." footer={<Button variant="primary" onClick={() => setCustomizeOpen(false)}>Done</Button>}>
      <div className="space-y-4">
        {([{key:"metrics",label:"Summary metrics"},{key:"projects",label:"Project overview"},{key:"activity",label:"Recent activity"},{key:"tasks",label:"My tasks"}] as const).map(item => <label key={item.key} className="flex cursor-pointer items-center justify-between gap-4 text-sm"><span>{item.label}</span><input type="checkbox" checked={widgets[item.key]} onChange={() => toggleWidget(item.key)} className="h-4 w-4 accent-teal-700"/></label>)}
      </div>
    </Dialog>

    <Dialog open={createOpen} onClose={() => setCreateOpen(false)} title="Create new" description="Add a temporary item to this frontend preview." footer={<><Button onClick={() => setCreateOpen(false)}>Cancel</Button><Button variant="primary" type="submit" form="create-form">Create {createKind}</Button></>}>
      <form id="create-form" onSubmit={submitCreate} className="space-y-4">
        <div><label className="mb-1.5 block text-xs font-semibold text-slate-700">Item type</label><Select value={createKind} onChange={e => setCreateKind(e.target.value as CreateKind)}><option value="task">Task</option><option value="project">Project</option><option value="document">Document</option></Select></div>
        <div><label className="mb-1.5 block text-xs font-semibold text-slate-700">{createKind === "project" ? "Project name" : createKind === "document" ? "Document title" : "Task title"}</label><Input autoFocus required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder={createKind === "task" ? "e.g. Review project requirements" : createKind === "project" ? "e.g. New product initiative" : "e.g. Technical specification"}/></div>
        {createKind === "task" && <div><label className="mb-1.5 block text-xs font-semibold text-slate-700">Project</label><Select value={newProject} onChange={e => setNewProject(e.target.value)}>{projects.map(p => <option key={p.id}>{p.name}</option>)}</Select></div>}
        <p className="text-[11px] leading-5 text-slate-500">This preview stores changes in browser memory only. They will be lost when the page is refreshed.</p>
      </form>
    </Dialog>
  </AppShell>;
}
