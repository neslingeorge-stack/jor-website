"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlowingLinesProps {
  className?: string;
  variant?: "light" | "dark";
}

export function FlowingLines({ className, variant = "light" }: FlowingLinesProps) {
  const strokeColor = variant === "light" ? "#FF8C00" : "#FF8C00";
  const strokeOpacity = variant === "light" ? 0.12 : 0.08;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flowing curve 1 — large S-curve */}
        <motion.path
          d="M-100 400 C200 200, 400 600, 700 350 S1100 100, 1540 450"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeOpacity={strokeOpacity}
          strokeDasharray="8 16"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Flowing curve 2 — gentler wave */}
        <motion.path
          d="M-50 600 C300 400, 500 700, 800 500 S1200 300, 1540 550"
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity={strokeOpacity * 0.7}
          strokeDasharray="6 20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.8 }}
        />

        {/* Flowing curve 3 — tight wave top area */}
        <motion.path
          d="M-100 150 C200 50, 500 250, 750 120 S1100 -20, 1540 200"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeOpacity={strokeOpacity * 0.5}
          strokeDasharray="4 24"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
}
