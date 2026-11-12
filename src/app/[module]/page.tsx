import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, Construction } from "lucide-react";

const moduleInfo: Record<string, { title: string; description: string }> = {
  projects: { title: "Projects", description: "Create, organize and monitor projects across departments." },
  tasks: { title: "My Tasks", description: "Manage your assignments, priorities and task workflow." },
  calendar: { title: "Calendar", description: "View project milestones, task due dates and schedules." },
  documents: { title: "Documents", description: "Browse project documentation and manage shared files." },
  team: { title: "People & Teams", description: "Manage employees, departments and organizational roles." },
  reports: { title: "Reports", description: "Review project progress, workload and operational performance." },
  notifications: { title: "Notifications", description: "Stay informed about assignments, comments and deadlines." },
  settings: { title: "Settings", description: "Configure your profile and workspace preferences." },
};

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const info = moduleInfo[module] ?? { title: "Workspace", description: "This module is part of the planned PMS frontend." };
  return <AppShell>
    <main className="content">
      <div className="mb-7">
        <Link href="/" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-700"><ArrowLeft size={14}/> Back to dashboard</Link>
        <h1 className="text-2xl font-bold tracking-tight">{info.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{info.description}</p>
      </div>
      <div className="panel flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700"><Construction size={25}/></div>
        <h2 className="text-base font-bold">Module foundation created</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">This screen is intentionally a placeholder. We will implement its real frontend workflow in sequence, using the approved master project plan.</p>
        <span className="mt-5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-600">Planned for upcoming development stage</span>
      </div>
    </main>
  </AppShell>;
}
