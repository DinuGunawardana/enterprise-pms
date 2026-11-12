import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { getDashboardData } from "@/services/dashboardService";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, CircleAlert, Clock3, Plus, SlidersHorizontal } from "lucide-react";

function priorityStyle(priority: string) {
  if (priority === "CRITICAL") return "bg-rose-50 text-rose-700";
  if (priority === "HIGH") return "bg-amber-50 text-amber-700";
  if (priority === "MEDIUM") return "bg-blue-50 text-blue-700";
  return "bg-slate-100 text-slate-600";
}
function statusLabel(status: string) {
  return status.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  return (
    <AppShell>
      <main className="content">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-medium text-teal-700">THURSDAY, 12 NOVEMBER 2026</div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Good morning, Sanduni <span aria-hidden>👋</span></h1>
            <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening across your workspace today.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"><SlidersHorizontal size={15}/> Customize</button>
            <button className="flex items-center gap-2 rounded-lg bg-teal-700 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-800"><Plus size={16}/> Create new</button>
          </div>
        </div>

        <div className="mb-7 rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-white px-5 py-3 text-xs text-teal-900">
          <span className="font-semibold">Preview environment</span><span className="ml-2 text-teal-800/80">All figures and people shown are demonstration data. No live company systems are connected.</span>
        </div>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Active projects" value={data.metrics.activeProjects} note="Across all departments" icon={BriefcaseBusiness} tone="teal"/>
          <MetricCard label="Open tasks" value={data.metrics.openTasks} note="12 assigned to you" icon={Clock3} tone="blue"/>
          <MetricCard label="Completed this month" value={data.metrics.completedThisMonth} note="↑ 12% from last month" icon={CheckCircle2} tone="teal"/>
          <MetricCard label="Overdue tasks" value={data.metrics.overdueTasks} note="Requires attention" icon={CircleAlert} tone="rose"/>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
          <div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div><h2 className="text-sm font-bold">Project overview</h2><p className="mt-1 text-xs text-slate-500">Progress across active projects</p></div>
              <button className="text-xs font-semibold text-teal-700">View all <ArrowUpRight className="ml-1 inline" size={13}/></button>
            </div>
            <div className="divide-y divide-slate-100">
              {data.projects.map((project) => (
                <div key={project.id} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-9 w-1 rounded-full" style={{ background: project.color }}/>
                      <div className="min-w-0"><div className="truncate text-xs font-semibold text-slate-800">{project.name}</div><div className="mt-1 text-[11px] text-slate-500">{project.department} · {project.taskCount} tasks</div></div>
                    </div>
                    <span className={`pill whitespace-nowrap ${project.status === "At risk" ? "bg-amber-50 text-amber-700" : project.status === "Planning" ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}>{project.status}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3"><div className="progress-track flex-1"><div className="progress-fill" style={{ width: `${project.progress}%`, background: project.color }}/></div><span className="w-9 text-right text-[11px] font-semibold text-slate-600">{project.progress}%</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="border-b border-slate-100 px-5 py-4"><h2 className="text-sm font-bold">Recent activity</h2><p className="mt-1 text-xs text-slate-500">Latest workspace updates</p></div>
            <div className="space-y-5 p-5">
              {data.activity.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-slate-700" style={{ background: item.color }}>{item.initials}</div>
                  <div className="min-w-0"><p className="text-xs leading-5 text-slate-700"><span className="font-semibold">{item.name}</span> {item.action} <span className="font-semibold">{item.target}</span></p><p className="mt-1 text-[10px] text-slate-400">{item.time}</p></div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 px-5 py-3"><button className="text-xs font-semibold text-teal-700">View activity log <ArrowUpRight className="ml-1 inline" size={13}/></button></div>
          </div>
        </section>

        <section className="panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div><h2 className="text-sm font-bold">My tasks</h2><p className="mt-1 text-xs text-slate-500">Your current priorities and upcoming work</p></div>
            <button className="text-xs font-semibold text-teal-700">View all tasks <ArrowUpRight className="ml-1 inline" size={13}/></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3 font-semibold">Task</th><th className="px-4 py-3 font-semibold">Project</th><th className="px-4 py-3 font-semibold">Priority</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold">Due date</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {data.tasks.map((task) => <tr key={task.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4"><div className="text-xs font-semibold text-slate-800">{task.title}</div><div className="mt-1 text-[10px] text-slate-400">{task.id}</div></td>
                  <td className="px-4 py-4 text-xs text-slate-600">{task.project}</td>
                  <td className="px-4 py-4"><span className={`pill ${priorityStyle(task.priority)}`}>{task.priority}</span></td>
                  <td className="px-4 py-4 text-xs text-slate-600">{statusLabel(task.status)}</td>
                  <td className="px-5 py-4 text-xs text-slate-600">{task.dueLabel}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>
        <p className="mt-5 text-center text-[10px] text-slate-400">NEXUS PMS · Frontend foundation · Demo data only</p>
      </main>
    </AppShell>
  );
}
