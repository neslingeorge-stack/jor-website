"use client";

import { SOCIAL_PROOF_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Duplicate items for a seamless infinite loop: animation shifts -50% = one full set
const ITEMS = [...SOCIAL_PROOF_ITEMS, ...SOCIAL_PROOF_ITEMS] as const;

export function SocialProofBar() {
  return (
    <div
      className={cn(
        "relative h-14 w-full overflow-hidden",
        "border-y border-steel/20 bg-offwhite"
      )}
      aria-label="Social proof statistics"
    >
      {/* Left edge fade mask */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20"
        style={{
          background: "linear-gradient(to right, #F5F3EF 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Right edge fade mask */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20"
        style={{
          background: "linear-gradient(to left, #F5F3EF 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Scrolling track */}
      <div className="flex h-full items-center" aria-hidden="true">
        <div
          className="flex shrink-0 items-center"
          style={{
            animation: "marquee 35s linear infinite",
            willChange: "transform",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "running";
          }}
        >
          {ITEMS.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center"
            >
              <span className="whitespace-nowrap px-5 font-mono text-xs text-smoke">
                {item}
              </span>
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>

      {/* Accessible static version for screen readers */}
      <ul className="sr-only">
        {SOCIAL_PROOF_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
