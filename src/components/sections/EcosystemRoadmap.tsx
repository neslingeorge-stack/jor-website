"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { PHASES } from "@/lib/constants";
import { RoadGridBg } from "@/components/effects/RoadGridBg";
import { FloatingBlob } from "@/components/effects/FloatingBlob";

const CARD_FADE_UP = {
  initial: { opacity: 0, y: 40 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

interface StatusBadgeProps {
  status: string;
  active: boolean;
}

function StatusBadge({ status, active }: StatusBadgeProps) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-xs font-heading font-semibold uppercase tracking-widest text-ember">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
        </span>
        {status}
      </span>
    );
  }

  if (status === "HORIZON") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-steel/20 bg-graphite/30 px-3 py-1 text-xs font-heading font-semibold uppercase tracking-widest text-smoke">
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-steel/30 bg-graphite/40 px-3 py-1 text-xs font-heading font-semibold uppercase tracking-widest text-smoke">
      {status}
    </span>
  );
}

interface PhaseCardProps {
  phase: (typeof PHASES)[number];
  index: number;
  isVisible: boolean;
}

function PhaseCard({ phase, index, isVisible }: PhaseCardProps) {
  const isActive = phase.active;
  const isFar = index >= 3;

  const borderClass = isActive
    ? "border-ember/50"
    : index === 1
      ? "border-steel/40"
      : index === 2
        ? "border-steel/25"
        : "border-steel/15";

  const labelClass = isActive
    ? "text-ember"
    : index === 1
      ? "text-smoke"
      : index === 2
        ? "text-smoke"
        : "text-smoke/60";

  const checkClass = isActive
    ? "text-ember"
    : index === 1
      ? "text-smoke"
      : "text-smoke";

  const featureClass = isActive
    ? "text-ink"
    : index === 1
      ? "text-smoke"
      : index === 2
        ? "text-smoke"
        : "text-smoke/60";

  const metricClass = isActive
    ? "text-ember"
    : index === 1
      ? "text-smoke"
      : "text-smoke/60";

  return (
    <motion.div
      variants={CARD_FADE_UP}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      custom={index}
      className={[
        "relative snap-center min-w-[340px] max-w-[380px] rounded-2xl border bg-white p-8 flex flex-col gap-6 shrink-0",
        borderClass,
        isActive
          ? "shadow-[0_0_40px_rgba(255,140,0,0.12)] ring-1 ring-ember/20"
          : "",
        isFar ? "opacity-60" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Ember top accent for active card */}
      {isActive && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
          style={{
            background:
              "linear-gradient(to right, transparent, #FF8C00, transparent)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Header */}
      <div className="flex flex-col gap-3">
        <StatusBadge status={phase.status} active={isActive} />
        <h3
          className={[
            "font-display font-black uppercase leading-tight tracking-tight",
            labelClass,
          ].join(" ")}
          style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}
        >
          {phase.label}
        </h3>
      </div>

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1">
        {phase.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <Check
              className={["mt-0.5 h-4 w-4 shrink-0", checkClass].join(" ")}
              strokeWidth={2.5}
            />
            <span className={["font-body text-sm leading-snug", featureClass].join(" ")}>
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* Target metric */}
      <div
        className={[
          "rounded-xl border border-steel/20 bg-offwhite/80 px-4 py-3 font-mono text-xs leading-relaxed",
          metricClass,
        ].join(" ")}
      >
        {phase.target}
      </div>
    </motion.div>
  );
}

export function EcosystemRoadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-offwhite py-24 lg:py-32"
      aria-label="Ecosystem Roadmap"
    >
      {/* Background */}
      <RoadGridBg className="opacity-[0.04]" />
      <FloatingBlob
        className="top-[15%] right-[-12%]"
        color="rgba(255,107,0,0.04)"
        size="400px"
        delay="-3s"
      />

      {/* Subtle radial fade at edges */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 50%, transparent 30%, rgba(245,243,239,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 flex flex-col gap-4"
          >
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              THE VISION
            </span>
            <h2
              className="font-display font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              <span className="block text-ink">A Matching Engine Today.</span>
              <span className="block text-ember">A Transportation OS Tomorrow.</span>
            </h2>
          </motion.div>
        </div>

        {/* Timeline scroll area */}
        <div className="relative">
          {/* Horizontal connector line — sits behind cards */}
          <div
            className="pointer-events-none absolute top-[84px] left-0 right-0 z-0 mx-auto"
            style={{ maxWidth: "calc(100% - 80px)" }}
            aria-hidden="true"
          >
            <div className="relative mx-6 lg:mx-10">
              {/* Solid segment (Phase 1) */}
              <div className="absolute left-0 top-1/2 h-px w-1/4 -translate-y-1/2 bg-ember/40" />
              {/* Dashed segment (future phases) */}
              <svg
                className="absolute left-1/4 top-1/2 h-px -translate-y-1/2"
                style={{ width: "75%" }}
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#333333"
                  strokeWidth="1"
                  strokeDasharray="8 10"
                />
              </svg>
            </div>
          </div>

          {/* Scrollable card row */}
          <div
            className="overflow-x-auto pb-8 scrollbar-thin"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-6 px-6 lg:px-10" style={{ width: "max-content" }}>
              {PHASES.map((phase, i) => (
                <PhaseCard
                  key={phase.label}
                  phase={phase}
                  index={i}
                  isVisible={isInView}
                />
              ))}
              {/* End spacer */}
              <div className="w-6 shrink-0" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mx-auto mt-4 flex justify-center px-6">
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-smoke">
            Scroll to explore the roadmap →
          </p>
        </div>
      </div>
    </section>
  );
}
