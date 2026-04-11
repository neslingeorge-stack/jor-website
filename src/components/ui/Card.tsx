"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: "ember" | "verified" | "amber" | "info" | "none";
  topAccent?: "ember" | "verified" | "amber" | "info";
}

const glowColors = {
  ember: "hover:border-ember/40",
  verified: "hover:border-verified/40",
  amber: "hover:border-amber/40",
  info: "hover:border-info/40",
  none: "",
} as const;

const accentColors = {
  ember: "before:bg-ember",
  verified: "before:bg-verified",
  amber: "before:bg-amber",
  info: "before:bg-info",
} as const;

export function Card({
  children,
  className,
  hoverGlow = "ember",
  topAccent,
}: CardProps) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(
        "relative rounded-2xl border border-steel/30 bg-carbon p-10 transition-colors duration-300",
        glowColors[hoverGlow],
        topAccent &&
          `before:absolute before:left-0 before:right-0 before:top-0 before:h-1 before:rounded-t-2xl ${accentColors[topAccent]}`,
        className
      )}
    >
      {children}
    </motion.div>
  );
}
