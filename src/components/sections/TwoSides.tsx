"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { FLEET_FEATURES, DRIVER_FEATURES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animations";

const featureItem: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

interface PanelProps {
  side: "fleet" | "driver";
  features: readonly string[];
}

function Panel({ side, features }: PanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isFleet = side === "fleet";

  const accentColor = isFleet ? "border-ember" : "border-verified";
  const tagColor = isFleet ? "text-ember" : "text-verified";
  const checkColor = isFleet ? "text-ember" : "text-verified";
  const calloutBorder = isFleet ? "border-ember/30" : "border-verified/30";
  const bg = isFleet ? "bg-offwhite" : "bg-cream";

  const tag = isFleet ? "FOR FLEET OWNERS" : "FOR DRIVERS";
  const heading = isFleet
    ? ["YOUR TRUCK.", "OUR DRIVER", "NETWORK."]
    : ["YOUR LICENSE.", "YOUR TERMS.", "YOUR EARNINGS."];

  const callout = isFleet ? (
    <>
      <span className="font-heading font-bold text-ink">30% Commission</span>
      <span className="text-smoke"> · No hidden fees. No broker cuts. No surprises. One transparent commission on every completed job.</span>
    </>
  ) : (
    <>
      <span className="font-heading font-bold text-ink">Driver Tiers:</span>
      <span className="text-smoke">
        {" "}
        <span className="text-amber">Bronze</span>
        {" → "}
        <span className="text-silver">Silver</span>
        {" → "}
        <span className="text-ember">Gold</span>
        {" → "}
        <span className="text-info">Platinum</span>
        {" → "}
        <span className="text-verified">Elite</span>
        {" "}— unlock better jobs, higher pay, and priority matching as your JOR Score grows.
      </span>
    </>
  );

  const ctaLabel = isFleet
    ? "Post Your First Job Free →"
    : "Join as a Driver — It's Free →";
  const ctaVariant = isFleet ? "ember" : "green";

  return (
    <div
      className={cn(
        "flex w-full flex-col px-8 py-16 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:overflow-y-auto lg:px-12 lg:py-20",
        bg,
        "border-t-4",
        accentColor
      )}
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="flex flex-col gap-8 max-w-lg w-full mx-auto"
      >
        {/* Tag */}
        <motion.p
          variants={fadeUp}
          className={cn(
            "font-display text-xs font-bold uppercase tracking-widest",
            tagColor
          )}
        >
          [{tag}]
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(36px,5vw,64px)] font-extrabold leading-[0.95] tracking-tight text-ink"
        >
          {heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h2>

        {/* Feature list */}
        <motion.ul
          variants={staggerContainer}
          className="flex flex-col gap-3"
        >
          {features.map((feat, i) => (
            <motion.li
              key={i}
              variants={featureItem}
              className="flex items-start gap-3"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center",
                  checkColor
                )}
              >
                <Check size={16} strokeWidth={2.5} />
              </span>
              <span className="font-body text-sm leading-relaxed text-smoke">
                {feat}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Callout strip */}
        <motion.div
          variants={fadeUp}
          className={cn(
            "rounded-xl border bg-graphite px-5 py-4 text-sm leading-relaxed",
            calloutBorder
          )}
        >
          {callout}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <Button
            variant={ctaVariant as "ember" | "green"}
            size="lg"
            fullWidth
          >
            {ctaLabel}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function TwoSides() {
  return (
    <section className="w-full">
      {/* Mobile: stacked. Large: side-by-side sticky panels */}
      <div className="flex flex-col lg:flex-row">
        <Panel side="fleet" features={FLEET_FEATURES} />
        <Panel side="driver" features={DRIVER_FEATURES} />
      </div>
    </section>
  );
}
