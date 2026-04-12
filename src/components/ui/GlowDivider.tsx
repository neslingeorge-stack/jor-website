import { cn } from "@/lib/utils";

interface GlowDividerProps {
  className?: string;
  label?: string;
}

export function GlowDivider({ className, label }: GlowDividerProps) {
  return (
    <div className={cn("relative flex items-center justify-center py-12", className)}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-ember/60 to-transparent" />
      {label && (
        <span className="absolute bg-offwhite px-6 font-heading text-xs font-semibold uppercase tracking-widest text-ember">
          {label}
        </span>
      )}
    </div>
  );
}
