"use client";

import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Mesh gradient background — warm JOR brand tones.
 * Use as an absolute-positioned layer behind section content.
 */
export function ShaderMesh({
  className,
  variant = "warm",
  speed = 0.25,
}: {
  className?: string;
  variant?: "warm" | "cool" | "dark" | "light";
  speed?: number;
}) {
  const colorSets: Record<string, string[]> = {
    warm: ["#F5F3EF", "#FF8C00", "#F5A623", "#EDE9E3", "#FF6B00"],
    cool: ["#F5F3EF", "#3B82F6", "#10B981", "#EDE9E3", "#06b6d4"],
    dark: ["#1C1C1E", "#FF8C00", "#2A2A2E", "#333338", "#FF6B00"],
    light: ["#FAFAFA", "#FF8C00", "#F5F3EF", "#EDE9E3", "#F5A623"],
  };

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={colorSets[variant]}
        speed={speed}
      />
    </div>
  );
}

/**
 * Wireframe mesh overlay — subtle animated wireframe grid.
 */
export function ShaderWireframe({
  className,
  speed = 0.15,
}: {
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-15"
        colors={["#F5F3EF", "#44444A", "#A8A8A8", "#666666"]}
        speed={speed}
        distortion={0.3}
      />
    </div>
  );
}

/**
 * Pulsing border circle — decorative accent element.
 */
export function ShaderPulse({
  className,
  size = 80,
  label,
}: {
  className?: string;
  size?: number;
  label?: string;
}) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <PulsingBorder
        colors={["#FF8C00", "#FF6B00", "#F5A623", "#10B981", "#3B82F6", "#FF8C00", "#ffffff"]}
        colorBack="#00000000"
        speed={1.2}
        roundness={1}
        thickness={0.1}
        softness={0.2}
        intensity={4}
        spots={4}
        spotSize={0.1}
        pulse={0.1}
        smoke={0.4}
        smokeSize={3}
        style={{
          width: size * 0.75,
          height: size * 0.75,
          borderRadius: "50%",
        }}
      />
      {label && (
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ transform: "scale(1.5)" }}
        >
          <defs>
            <path id="pulse-circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-smoke font-heading text-[8px] uppercase tracking-[0.3em]">
            <textPath href="#pulse-circle" startOffset="0%">
              {label}
            </textPath>
          </text>
        </motion.svg>
      )}
    </div>
  );
}
