"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Lock, Star, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TRUST_PILLARS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { FloatingBlob } from "@/components/effects/FloatingBlob";

type PillarColor = "ember" | "info" | "amber" | "verified";

const PILLAR_ICONS: LucideIcon[] = [ShieldCheck, Lock, Star, MapPin];

const borderColorMap: Record<PillarColor, string> = {
  ember: "border-l-ember",
  info: "border-l-info",
  amber: "border-l-amber",
  verified: "border-l-verified",
};

const hoverBorderMap: Record<PillarColor, string> = {
  ember: "hover:border-ember/50 hover:shadow-[0_0_24px_rgba(255,140,0,0.12)]",
  info: "hover:border-info/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.12)]",
  amber: "hover:border-amber/50 hover:shadow-[0_0_24px_rgba(245,166,35,0.12)]",
  verified: "hover:border-verified/50 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]",
};

const iconColorMap: Record<PillarColor, string> = {
  ember: "text-ember",
  info: "text-info",
  amber: "text-amber",
  verified: "text-verified",
};

const badgeBgMap: Record<PillarColor, string> = {
  ember: "bg-ember/10 text-ember border-ember/25",
  info: "bg-info/10 text-info border-info/25",
  amber: "bg-amber/10 text-amber border-amber/25",
  verified: "bg-verified/10 text-verified border-verified/25",
};

const cardVariant = {
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

export function TrustInfrastructure() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-offwhite"
      style={{
        background:
          "linear-gradient(160deg, var(--color-offwhite) 0%, var(--color-offwhite) 100%)",
      }}
    >
      <FloatingBlob
        className="top-[20%] left-[-10%]"
        color="rgba(59,130,246,0.03)"
        size="400px"
        delay="-2s"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mb-16 flex flex-col items-center gap-5 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-display text-xs font-bold uppercase tracking-widest text-ember"
          >
            BUILT FOR TRUST
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display font-extrabold text-ink"
            style={{ fontSize: "var(--text-display-md)", lineHeight: 1.1 }}
          >
            Trust is not a feature.
            <br />
            It&apos;s the foundation.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl font-body text-base leading-relaxed text-smoke"
          >
            India&apos;s trucking industry runs on 5 million informal, unverified driver
            relationships. JOR replaces phone-tree hiring with identity-verified,
            escrow-protected, GPS-tracked jobs — giving fleet owners and drivers a
            platform they can trust with their livelihood.
          </motion.p>
        </motion.div>

        {/* 2×2 Pillar Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            const color = pillar.color as PillarColor;

            return (
              <motion.div
                key={pillar.title}
                custom={i}
                variants={cardVariant}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                className={cn(
                  "group relative flex flex-col gap-5 rounded-2xl border border-steel/20 bg-white p-8",
                  "border-l-[3px] transition-all duration-300",
                  borderColorMap[color],
                  hoverBorderMap[color]
                )}
              >
                {/* Icon */}
                <div className={cn("flex h-12 w-12 items-center justify-center", iconColorMap[color])}>
                  <Icon size={48} strokeWidth={1.5} />
                </div>

                {/* Heading */}
                <h3 className="font-heading text-lg font-bold leading-snug text-ink">
                  {pillar.title}
                </h3>

                {/* Body */}
                <p className="font-body text-sm leading-relaxed text-smoke">
                  {pillar.body}
                </p>

                {/* Tag badge */}
                <div className="mt-auto pt-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 font-heading text-xs font-medium",
                      badgeBgMap[color]
                    )}
                  >
                    {pillar.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote strip */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.6 }}
          className="mt-20 w-full rounded-2xl border border-steel/20 bg-offwhite/80 px-8 py-10 text-center"
        >
          <blockquote>
            <p
              className="font-display font-semibold italic leading-tight text-amber"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
            >
              &ldquo;JOR is not a contact book. Every job goes through AI matching.
              The match is the product.&rdquo;
            </p>
            <footer className="mt-4 font-body text-sm text-smoke">
              — Neslin Elias George, Founder
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
