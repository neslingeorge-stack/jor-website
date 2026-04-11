"use client";

import { cn } from "@/lib/utils";

interface LivePulseProps {
  className?: string;
  color?: "ember" | "verified" | "alert";
}

const colorMap = {
  ember: "bg-ember",
  verified: "bg-verified",
  alert: "bg-alert",
} as const;

const glowMap = {
  ember: "bg-ember/40",
  verified: "bg-verified/40",
  alert: "bg-alert/40",
} as const;

export function LivePulse({ className, color = "verified" }: LivePulseProps) {
  return (
    <span className={cn("relative inline-flex h-2.5 w-2.5", className)}>
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          glowMap[color]
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-2.5 w-2.5 rounded-full",
          colorMap[color]
        )}
      />
    </span>
  );
}
