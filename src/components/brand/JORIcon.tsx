import { cn } from "@/lib/utils";

interface JORIconProps {
  className?: string;
  size?: number;
}

export function JORIcon({ className, size = 40 }: JORIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="JOR Icon"
    >
      <rect width="40" height="40" rx="10" fill="#FF8C00" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="var(--font-barlow-condensed), sans-serif"
        fontWeight="900"
        fontSize="20"
        fill="#080808"
      >
        JOR
      </text>
    </svg>
  );
}
