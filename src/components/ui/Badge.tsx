import type { ReactNode } from "react";
type Tone = "neutral" | "success" | "warning" | "danger" | "info" | "teal";
const tones: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600", success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700", danger: "bg-rose-50 text-rose-700",
  info: "bg-blue-50 text-blue-700", teal: "bg-teal-50 text-teal-700",
};
export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`pill ${tones[tone]}`}>{children}</span>;
}
