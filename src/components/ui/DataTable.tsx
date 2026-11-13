import type { ReactNode } from "react";
export function DataTable({ headers, children }: { headers: string[]; children: ReactNode }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left">
    <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400"><tr>{headers.map(h => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>
    <tbody className="divide-y divide-slate-100">{children}</tbody>
  </table></div>;
}
