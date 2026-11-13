import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: ReactNode;
};
export function Button({ variant = "secondary", size = "md", className = "", children, ...props }: Props) {
  return <button className={`btn btn-${variant} ${size === "sm" ? "px-2.5 py-1.5 text-[11px]" : ""} ${className}`} {...props}>{children}</button>;
}
