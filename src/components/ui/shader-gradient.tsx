"use client";

import { cn } from "@/lib/utils";

/**
 * Lightweight CSS mesh gradient — replaces heavy WebGL @paper-design/shaders-react.
 * Uses layered radial gradients with CSS animation for a similar visual effect.
 */
export function ShaderMesh({
  className,
  variant = "warm",
}: {
  className?: string;
  variant?: "warm" | "cool" | "dark" | "light";
}) {
  const gradients: Record<string, string> = {
    warm: "radial-gradient(ellipse at 20% 30%, rgba(255,140,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(245,166,35,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(255,107,0,0.04) 0%, transparent 50%)",
    cool: "radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 50%)",
    dark: "radial-gradient(ellipse at 30% 40%, rgba(255,140,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(42,42,46,0.3) 0%, transparent 50%)",
    light: "radial-gradient(ellipse at 30% 30%, rgba(255,140,0,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(245,166,35,0.04) 0%, transparent 50%)",
  };

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden animate-gradient-mesh", className)}
      style={{ background: gradients[variant] }}
      aria-hidden="true"
    />
  );
}

/**
 * Lightweight CSS wireframe overlay — subtle grid pattern with gentle animation.
 */
export function ShaderWireframe({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]", className)}
      style={{
        backgroundImage:
          "linear-gradient(rgba(68,68,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(68,68,74,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Pulsing border circle — pure CSS replacement for WebGL PulsingBorder.
 */
export function ShaderPulse({
  className,
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full animate-pulse"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: "conic-gradient(from 0deg, #FF8C00, #FF6B00, #F5A623, #10B981, #3B82F6, #FF8C00)",
          opacity: 0.6,
          filter: "blur(4px)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
