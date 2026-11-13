"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bell, CalendarDays, ChevronDown, CircleHelp, FileText, FolderKanban, LayoutDashboard, ListTodo, Settings, Users, Workflow, X } from "lucide-react";

const mainLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "My Tasks", icon: ListTodo },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/documents", label: "Documents", icon: FileText },
];
const workspaceLinks = [
  { href: "/team", label: "People & Teams", icon: Users },
  { href: "/reports", label: "Reports", icon: Activity },
];
export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const link = (item: typeof mainLinks[number]) => {
    const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
    const Icon = item.icon;
    return <Link key={item.href} href={item.href} onClick={onClose} className={`nav-link ${active ? "active" : ""}`} title={item.label}>
      <Icon size={17} strokeWidth={1.8}/><span className="nav-label">{item.label}</span>
    </Link>;
  };
  return <>
    {mobileOpen && <button aria-label="Close navigation" className="sidebar-backdrop" onClick={onClose}/>}
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="flex h-[68px] items-center justify-between gap-3 border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600"><Workflow size={20}/></div>
          <div className="brand-name"><div className="text-sm font-bold tracking-wide">NEXUS</div><div className="text-[10px] text-slate-400">PROJECT WORKSPACE</div></div>
        </div>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-white/10 sm:hidden" aria-label="Close menu"><X size={18}/></button>
      </div>
      <button className="mx-3 mt-5 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-left">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-200">CB</div>
        <div className="workspace-name min-w-0 flex-1"><div className="truncate text-xs font-semibold">CBA Workspace</div><div className="text-[10px] text-slate-400">Organization</div></div>
        <ChevronDown className="workspace-name text-slate-400" size={15}/>
      </button>
      <nav className="flex-1 px-3 pb-4">
        <div className="nav-section-label">Workspace</div><div className="space-y-1">{mainLinks.map(link)}</div>
        <div className="nav-section-label">Management</div><div className="space-y-1">{workspaceLinks.map(link)}</div>
        <div className="nav-section-label">System</div>
        <Link href="/notifications" onClick={onClose} className={`nav-link ${pathname.startsWith("/notifications") ? "active" : ""}`}><Bell size={17}/><span className="nav-label">Notifications</span><span className="nav-label ml-auto rounded-full bg-teal-500 px-1.5 py-0.5 text-[10px]">3</span></Link>
        <Link href="/settings" onClick={onClose} className={`nav-link ${pathname.startsWith("/settings") ? "active" : ""}`}><Settings size={17}/><span className="nav-label">Settings</span></Link>
      </nav>
      <div className="border-t border-white/10 p-3">
        <button className="nav-link mb-2"><CircleHelp size={17}/><span className="nav-label">Help & support</span></button>
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-[11px] font-bold">SG</div>
          <div className="profile-copy min-w-0 flex-1"><div className="truncate text-xs font-semibold">Sanduni Gunawardana</div><div className="text-[10px] text-slate-400">Executive Software Engineer</div></div>
          <ChevronDown className="profile-copy text-slate-400" size={14}/>
        </div>
      </div>
    </aside>
  </>;
}
