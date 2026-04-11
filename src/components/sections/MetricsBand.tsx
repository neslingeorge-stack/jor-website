"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { METRICS } from "@/lib/constants";

const CONTAINER_VARIANTS = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const ITEM_VARIANTS = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function MetricsBand() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="w-full bg-ember py-14 lg:py-16"
      aria-label="JOR key metrics"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="flex flex-wrap items-center justify-center gap-0"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              variants={ITEM_VARIANTS}
              className={[
                "flex flex-col items-center gap-2 px-8 py-6 text-center",
                i !== 0 ? "border-l border-void/20" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Stat number */}
              <span
                className="font-display font-black leading-none tracking-tight text-void"
                style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
              >
                {metric.value}
              </span>

              {/* Label */}
              <span className="max-w-[140px] font-heading text-sm font-semibold leading-snug text-void/70">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
