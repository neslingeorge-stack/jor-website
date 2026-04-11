"use client";

import { cn } from "@/lib/utils";

interface RoadGridBgProps {
  className?: string;
}

export function RoadGridBg({ className }: RoadGridBgProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className="h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="road-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#FF8C00"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="road-grid-dash"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="40"
              y1="0"
              x2="40"
              y2="80"
              stroke="#FF8C00"
              strokeWidth="0.3"
              strokeDasharray="4 12"
            />
            <line
              x1="0"
              y1="40"
              x2="80"
              y2="40"
              stroke="#FF8C00"
              strokeWidth="0.3"
              strokeDasharray="4 12"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#road-grid)" />
        <rect width="100%" height="100%" fill="url(#road-grid-dash)" />
      </svg>
    </div>
  );
}
