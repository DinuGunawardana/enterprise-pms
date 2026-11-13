import type { HTMLAttributes, ReactNode } from "react";
export function Card({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={`surface-card ${className}`} {...props}>{children}</div>;
}
export function CardHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
    <div><h2 className="text-sm font-bold text-slate-900">{title}</h2>{description && <p className="mt-1 text-xs text-slate-500">{description}</p>}</div>
    {action}
  </div>;
}
