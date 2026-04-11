import Image from "next/image";
import { cn } from "@/lib/utils";

interface JORWordmarkProps {
  className?: string;
  variant?: "light" | "dark";
  width?: number;
}

export function JORWordmark({
  className,
  variant = "light",
  width = 120,
}: JORWordmarkProps) {
  const src =
    variant === "light" ? "/jor-logo-white.webp" : "/jor-logo-dark.webp";
  const alt = "JOR — Just On Road";

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={Math.round(width * 0.33)}
      className={cn("h-auto w-auto object-contain", className)}
      priority
    />
  );
}
