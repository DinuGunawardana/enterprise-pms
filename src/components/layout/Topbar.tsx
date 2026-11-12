"use client";

import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  "/": "Dashboard", "/projects": "Projects", "/tasks": "My Tasks",
  "/calendar": "Calendar", "/documents": "Documents", "/team": "People & Teams",
  "/reports": "Reports", "/notifications": "Notifications", "/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  return (
    <header className="topbar">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 sm:hidden" aria-label="Open menu"><Menu size={19}/></button>
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden text-slate-400 sm:inline">Workspace</span>
          <ChevronRight size={14} className="hidden text-slate-300 sm:inline"/>
          <span className="font-semibold">{labels[pathname] ?? "Workspace"}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400 md:flex">
          <Search size={14}/> Search anything <kbd className="ml-5 rounded border px-1.5 py-0.5 text-[10px]">⌘ K</kbd>
        </button>
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell size={19}/><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-teal-600"/>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800">SG</div>
      </div>
    </header>
  );
}
