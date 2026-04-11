"use client";

import { cn } from "@/lib/utils";

interface FloatingBlobProps {
  className?: string;
  color?: string;
  size?: string;
  delay?: string;
}

export function FloatingBlob({
  className,
  color = "rgba(255,140,0,0.07)",
  size = "400px",
  delay = "0s",
}: FloatingBlobProps) {
  return (
    <div
      className={cn("pointer-events-none absolute animate-blob-morph", className)}
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(80px)",
        animationDelay: delay,
      }}
      aria-hidden="true"
    />
  );
}
