"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
export function AppShell({ children, onSearchChange, searchValue = "" }: { children: React.ReactNode; searchValue?: string; onSearchChange?: (value: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="app-shell">
    <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)}/>
    <div className="main-area">
      <Topbar onMenuClick={() => setMobileOpen(true)} searchValue={searchValue} onSearchChange={onSearchChange ?? (() => {})}/>
      {children}
    </div>
  </div>;
}
