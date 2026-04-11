import { cn } from "@/lib/utils";

interface GlowOrbProps {
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
  color?: "ember" | "amber" | "verified" | "info";
  size?: string;
  blur?: string;
  opacity?: string;
  className?: string;
}

const positionMap = {
  "top-right": "top-0 right-0 -translate-y-1/4 translate-x-1/4",
  "top-left": "top-0 left-0 -translate-y-1/4 -translate-x-1/4",
  "bottom-right": "bottom-0 right-0 translate-y-1/4 translate-x-1/4",
  "bottom-left": "bottom-0 left-0 translate-y-1/4 -translate-x-1/4",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
} as const;

const colorMap = {
  ember: "bg-ember",
  amber: "bg-amber",
  verified: "bg-verified",
  info: "bg-info",
} as const;

export function GlowOrb({
  position,
  color = "ember",
  size = "600px",
  blur = "200px",
  opacity = "0.12",
  className,
}: GlowOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full",
        positionMap[position],
        colorMap[color],
        className
      )}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur})`,
        opacity,
      }}
      aria-hidden="true"
    />
  );
}
