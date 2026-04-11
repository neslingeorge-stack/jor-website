import { cn } from "@/lib/utils";

interface JORWordmarkProps {
  className?: string;
  variant?: "light" | "dark";
}

export function JORWordmark({ className, variant = "light" }: JORWordmarkProps) {
  const fill = variant === "light" ? "#FFFFFF" : "#080808";

  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      aria-label="JOR"
    >
      <text
        x="0"
        y="32"
        fontFamily="var(--font-barlow-condensed), sans-serif"
        fontWeight="900"
        fontSize="38"
        letterSpacing="2"
        fill={fill}
      >
        JOR
      </text>
      <rect x="85" y="28" width="20" height="4" rx="2" fill="#FF8C00" />
    </svg>
  );
}
