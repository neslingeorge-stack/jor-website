import Image from "next/image";
import { cn } from "@/lib/utils";

interface JORIconProps {
  className?: string;
  size?: number;
}

export function JORIcon({ className, size = 40 }: JORIconProps) {
  return (
    <Image
      src="/jor-icon.webp"
      alt="JOR App Icon"
      width={size}
      height={size}
      className={cn("rounded-xl", className)}
    />
  );
}
