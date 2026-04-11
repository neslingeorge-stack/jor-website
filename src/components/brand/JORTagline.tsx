import { cn } from "@/lib/utils";

interface JORTaglineProps {
  className?: string;
}

export function JORTagline({ className }: JORTaglineProps) {
  return (
    <p
      className={cn(
        "font-body text-sm italic text-silver",
        className
      )}
    >
      The Road Starts Here
    </p>
  );
}
