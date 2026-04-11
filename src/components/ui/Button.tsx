"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-heading font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember",
  {
    variants: {
      variant: {
        ember:
          "bg-ember text-void hover:bg-flame hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,140,0,0.3)]",
        green:
          "bg-verified text-void hover:bg-verified/90 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
        outline:
          "border border-white/30 text-white bg-transparent hover:bg-white/10",
        ghost: "text-silver hover:text-white bg-transparent",
      },
      size: {
        sm: "text-sm px-4 py-2 rounded-lg",
        md: "text-sm px-6 py-3 rounded-lg",
        lg: "text-base px-8 py-4 rounded-lg",
        xl: "text-base px-10 py-4 rounded-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "ember",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
