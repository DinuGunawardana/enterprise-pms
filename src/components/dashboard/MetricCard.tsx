import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
export function MetricCard({ label, value, note, icon: Icon, tone }: {
  label: string; value: string | number; note: string; icon: LucideIcon; tone: "teal" | "blue" | "amber" | "rose";
}) {
  const tones = { teal: "bg-teal-50 text-teal-700", blue: "bg-blue-50 text-blue-700", amber: "bg-amber-50 text-amber-700", rose: "bg-rose-50 text-rose-700" };
  return <Card className="p-5">
    <div className="flex items-start justify-between"><div className="text-xs font-medium text-slate-500">{label}</div><div className={`rounded-lg p-2 ${tones[tone]}`}><Icon size={17}/></div></div>
    <div className="mt-3 metric-value">{value}</div><div className="mt-1 text-xs text-slate-500">{note}</div>
  </Card>;
}
