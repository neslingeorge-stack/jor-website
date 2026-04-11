import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "live" | "status" | "trust";
  className?: string;
}

const variantStyles = {
  live: "bg-ember/10 text-ember border-ember/30",
  status: "bg-graphite/50 text-silver border-steel/50",
  trust: "bg-carbon text-silver border-steel/30",
} as const;

export function Badge({ children, variant = "status", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-heading font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
