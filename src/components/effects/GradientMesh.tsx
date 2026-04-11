"use client";

import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
  variant?: "warm" | "cool" | "neutral";
}

export function GradientMesh({ className, variant = "warm" }: GradientMeshProps) {
  const gradients: Record<string, string> = {
    warm: "radial-gradient(at 20% 30%, rgba(255,140,0,0.06) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(245,166,35,0.05) 0%, transparent 50%), radial-gradient(at 50% 80%, rgba(255,107,0,0.04) 0%, transparent 50%)",
    cool: "radial-gradient(at 20% 30%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 50%), radial-gradient(at 50% 80%, rgba(59,130,246,0.04) 0%, transparent 50%)",
    neutral: "radial-gradient(at 20% 30%, rgba(168,168,168,0.04) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(100,100,100,0.03) 0%, transparent 50%), radial-gradient(at 50% 80%, rgba(200,200,200,0.03) 0%, transparent 50%)",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 animate-gradient-mesh",
        className
      )}
      style={{ background: gradients[variant] }}
      aria-hidden="true"
    />
  );
}
