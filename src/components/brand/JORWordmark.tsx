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

  // Dark logo is 433x90 (~4.8:1), white logo is 379x411 (~0.92:1 but displayed as wordmark)
  const aspectRatio = variant === "dark" ? 0.21 : 0.33;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={Math.round(width * aspectRatio)}
      className={cn("h-auto w-auto object-contain", className)}
      priority
    />
  );
}
