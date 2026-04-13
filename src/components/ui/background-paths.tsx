"use client";

import { cn } from "@/lib/utils";

/**
 * Lightweight animated SVG paths — uses CSS animations instead of framer-motion.
 * Reduced from 36 to 10 paths for performance.
 */
function FloatingPaths({
  position,
  color = "text-ink",
}: {
  position: number;
  color?: string;
}) {
  const paths = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 18 * position} -${189 + i * 22}C-${
      380 - i * 18 * position
    } -${189 + i * 22} -${312 - i * 18 * position} ${216 - i * 22} ${
      152 - i * 18 * position
    } ${343 - i * 22}C${616 - i * 18 * position} ${470 - i * 22} ${
      684 - i * 18 * position
    } ${875 - i * 22} ${684 - i * 18 * position} ${875 - i * 22}`,
    width: 0.5 + i * 0.08,
    opacity: 0.04 + i * 0.02,
    duration: 25 + i * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className={cn("w-full h-full", color)}
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            strokeDasharray="8 12"
            className="animate-flow-path"
            style={{
              animationDuration: `${path.duration}s`,
              animationDelay: `${-path.id * 2}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={className}>
      <FloatingPaths position={1} color={color} />
      <FloatingPaths position={-1} color={color} />
    </div>
  );
}
