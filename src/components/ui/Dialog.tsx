"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Dialog({ open, title, description, onClose, children, footer }: {
  open: boolean; title: string; description?: string; onClose: () => void; children: ReactNode; footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return <div className="dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
        <div><h2 id="dialog-title" className="text-base font-bold">{title}</h2>{description && <p className="mt-1 text-xs text-slate-500">{description}</p>}</div>
        <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Close dialog"><X size={18}/></button>
      </div>
      <div className="p-5">{children}</div>
      {footer && <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">{footer}</div>}
    </section>
  </div>;
}
