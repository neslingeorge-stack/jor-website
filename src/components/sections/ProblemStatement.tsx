"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { PROBLEM_CARDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { RoadGridBg } from "@/components/effects/RoadGridBg";

type CardColor = "ember" | "amber" | "silver";

const CARD_ICONS = [AlertTriangle, Clock, TrendingDown] as const;

const STAT_COLOR_MAP: Record<CardColor, string> = {
  ember: "text-ember",
  amber: "text-amber",
  silver: "text-silver",
};

const ICON_COLOR_MAP: Record<CardColor, string> = {
  ember: "text-ember bg-ember/10 border-ember/20",
  amber: "text-amber bg-amber/10 border-amber/20",
  silver: "text-silver bg-steel/20 border-steel/30",
};

const TOP_ACCENT_MAP: Record<CardColor, "ember" | "amber" | "info"> = {
  ember: "ember",
  amber: "amber",
  silver: "info",
} as const;

export function ProblemStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-void py-28 lg:py-36"
      aria-labelledby="problem-statement-heading"
    >
      {/* Subtle diagonal road-line background pattern at low opacity */}
      <RoadGridBg className="opacity-[0.03]" />

      {/* Faint center radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,140,0,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Headline block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-center"
        >
          <h2
            id="problem-statement-heading"
            className="font-display font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            <span className="text-white">INDIA'S TRUCKS ARE READY.</span>
            <br />
            <span className="text-ember">THE DRIVERS AREN'T.</span>
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-20 max-w-2xl text-center font-body text-lg leading-relaxed text-silver"
        >
          India's commercial transport sector is paralysed by a structural driver
          shortage. Every idle truck is a loss. Every delayed shipment is a
          broken promise. JOR is the fix.
        </motion.p>

        {/* Problem cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-3"
        >
          {PROBLEM_CARDS.map((card, i) => {
            const Icon = CARD_ICONS[i];
            const color = card.color as CardColor;

            return (
              <motion.div key={card.label} variants={fadeUp}>
                <Card
                  hoverGlow={color === "silver" ? "none" : color}
                  topAccent={TOP_ACCENT_MAP[color]}
                  className="flex h-full flex-col gap-6 p-8"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-xl border",
                      ICON_COLOR_MAP[color]
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  {/* Stat */}
                  <div>
                    <p
                      className={cn(
                        "font-mono font-bold leading-none",
                        STAT_COLOR_MAP[color]
                      )}
                      style={{ fontSize: "clamp(40px, 4vw, 64px)" }}
                      aria-label={`Statistic: ${card.stat}`}
                    >
                      {card.stat}
                    </p>
                  </div>

                  {/* Label + body */}
                  <div className="flex flex-col gap-2">
                    <p className="font-heading text-base font-semibold text-white">
                      {card.label}
                    </p>
                    <p className="font-body text-sm leading-relaxed text-silver">
                      {card.body}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Glow divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlowDivider label="Enter JOR" className="mt-8" />
        </motion.div>
      </div>
    </section>
  );
}
