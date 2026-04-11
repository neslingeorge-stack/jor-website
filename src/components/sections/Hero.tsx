"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  staggerContainer,
  fadeUp,
  fadeInDown,
  fadeInRight,
} from "@/lib/animations";
import { HERO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LivePulse } from "@/components/ui/LivePulse";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { RoadGridBg } from "@/components/effects/RoadGridBg";
import { NoiseTexture } from "@/components/effects/NoiseTexture";

const TRUST_TAG_COLOR_MAP: Record<string, string> = {
  verified: "bg-verified/15 text-verified border-verified/25",
  info: "bg-info/15 text-info border-info/25",
  amber: "bg-amber/15 text-amber border-amber/25",
  ember: "bg-ember/15 text-ember border-ember/25",
};

const TRUST_DOT_MAP: Record<string, string> = {
  verified: "bg-verified",
  info: "bg-info",
  amber: "bg-amber",
  ember: "bg-ember",
};

export function Hero() {

  return (
    <section
      className={cn(
        "relative h-dvh w-full overflow-hidden",
        "bg-void"
      )}
      aria-label="Hero section"
    >
      {/* Background layers — z-ordered */}
      <RoadGridBg />

      {/* GlowOrb: top-right ember */}
      <GlowOrb
        position="top-right"
        color="ember"
        size="600px"
        blur="200px"
        opacity="0.12"
      />

      {/* GlowOrb: bottom-left amber */}
      <GlowOrb
        position="bottom-left"
        color="amber"
        size="400px"
        blur="150px"
        opacity="0.08"
      />

      {/* Noise texture */}
      <NoiseTexture opacity="0.04" />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(8,8,8,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main content — sits above background layers */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-20 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* ── LEFT COLUMN ── */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-8"
            >
              {/* Eyebrow badge */}
              <motion.div variants={fadeInDown}>
                <Badge variant="live">
                  <LivePulse color="ember" />
                  {HERO.eyebrow}
                </Badge>
              </motion.div>

              {/* H1 headline */}
              <div className="flex flex-col gap-1" aria-label="JOR Headline">
                {HERO.headline.map((word, i) => {
                  const isLast = i === HERO.headline.length - 1;
                  return (
                    <div
                      key={word}
                      className="overflow-hidden"
                    >
                      <motion.span
                        variants={fadeUp}
                        className={cn(
                          "block font-display font-black uppercase leading-[0.92] tracking-tight",
                          isLast
                            ? "italic text-ember"
                            : "text-white"
                        )}
                        style={{
                          fontSize: "var(--text-display-xl)",
                        }}
                      >
                        {word}
                      </motion.span>
                    </div>
                  );
                })}
              </div>

              {/* Subheadline */}
              <motion.p
                variants={fadeUp}
                className="max-w-[480px] font-body text-lg leading-relaxed text-silver"
              >
                {HERO.subheadline}
              </motion.p>

              {/* Trust tags */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-2"
              >
                {HERO.trustTags.map((tag) => (
                  <span
                    key={tag.label}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-heading font-medium",
                      TRUST_TAG_COLOR_MAP[tag.color] ??
                        "bg-graphite/50 text-silver border-steel/30"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        TRUST_DOT_MAP[tag.color] ?? "bg-silver"
                      )}
                    />
                    {tag.label}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-4"
              >
                <Button variant="ember" size="lg">
                  {HERO.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  {HERO.ctaSecondary}
                </Button>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN — Phone mockup ── */}
            <motion.div
              variants={fadeInRight}
              initial="initial"
              animate="animate"
              className="hidden items-center justify-center lg:flex"
            >
              <motion.div
                initial={{ y: 0, rotate: -3 }}
                animate={{
                  y: [0, -18, 0],
                  rotate: -3,
                  transition: {
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  },
                }}
                whileHover={{
                  rotate: 0,
                  transition: { duration: 0.4 },
                }}
                className="relative cursor-default"
              >
                {/* Phone frame */}
                <div
                  className={cn(
                    "relative w-[320px] overflow-hidden rounded-[40px] border border-steel/40 bg-carbon shadow-2xl",
                    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[40px] before:bg-gradient-to-br before:from-white/[0.04] before:to-transparent"
                  )}
                  style={{ height: "620px" }}
                  role="img"
                  aria-label="JOR app mockup showing a driver job card"
                >
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-2">
                    <span className="font-mono text-[11px] text-silver">9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[11px] text-silver">●●●</span>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="border-b border-steel/20 px-6 pb-4">
                    <div className="flex items-center justify-between">
                      <Image
                        src="/jor-logo-white.webp"
                        alt="JOR"
                        width={60}
                        height={20}
                        className="h-5 w-auto object-contain"
                      />
                      <div className="flex items-center gap-1.5 rounded-full bg-verified/10 px-2.5 py-1 text-verified">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified/50" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
                        </span>
                        <span className="font-mono text-[10px] font-medium uppercase tracking-wider">
                          Live
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job card inside phone */}
                  <div className="px-4 pt-5">
                    <p className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-widest text-smoke">
                      New Match — AI Matched
                    </p>

                    <div className="rounded-2xl border border-ember/25 bg-graphite/40 p-4">
                      {/* Route */}
                      <div className="mb-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-verified/40 bg-verified/10">
                            <span className="text-[8px] font-bold text-verified">A</span>
                          </div>
                          <div>
                            <p className="font-body text-[11px] text-smoke">Pickup</p>
                            <p className="font-heading text-sm font-semibold text-white">
                              Peenya Industrial Area
                            </p>
                          </div>
                        </div>
                        <div className="ml-3 h-4 w-px bg-steel/50" />
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ember/40 bg-ember/10">
                            <span className="text-[8px] font-bold text-ember">B</span>
                          </div>
                          <div>
                            <p className="font-body text-[11px] text-smoke">Drop</p>
                            <p className="font-heading text-sm font-semibold text-white">
                              Whitefield ITPL
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Pay + Distance */}
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-void/60 p-2.5 text-center">
                          <p className="font-mono text-sm font-bold text-ember">₹2,400</p>
                          <p className="font-body text-[9px] text-smoke">Fixed Pay</p>
                        </div>
                        <div className="rounded-xl bg-void/60 p-2.5 text-center">
                          <p className="font-mono text-sm font-bold text-white">18 km</p>
                          <p className="font-body text-[9px] text-smoke">Distance</p>
                        </div>
                        <div className="rounded-xl bg-void/60 p-2.5 text-center">
                          <p className="font-mono text-sm font-bold text-amber">6T</p>
                          <p className="font-body text-[9px] text-smoke">Payload</p>
                        </div>
                      </div>

                      {/* Driver info */}
                      <div className="flex items-center gap-3 rounded-xl bg-void/40 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ember/20 font-display text-sm font-black text-ember">
                          RK
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-heading text-sm font-semibold text-white">
                            Rajan Kumar
                          </p>
                          <p className="font-mono text-[10px] text-smoke">
                            ★ 4.9 · LMV-TR · JOR Elite
                          </p>
                        </div>
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-verified/10">
                          <span className="text-[8px] text-verified">✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Accept / Decline buttons */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="flex h-10 items-center justify-center rounded-xl bg-ember font-heading text-sm font-semibold text-void">
                        Accept
                      </div>
                      <div className="flex h-10 items-center justify-center rounded-xl border border-steel/40 font-heading text-sm font-semibold text-silver">
                        Decline
                      </div>
                    </div>

                    {/* Match score */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-smoke">
                        AI Match Score
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-steel/30">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-ember to-amber"
                            style={{ width: "94%" }}
                          />
                        </div>
                        <span className="font-mono text-[10px] font-bold text-ember">
                          94%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating glow underneath phone */}
                <div
                  className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2"
                  style={{
                    width: "280px",
                    height: "60px",
                    background: "radial-gradient(ellipse, rgba(255,140,0,0.2) 0%, transparent 70%)",
                    filter: "blur(16px)",
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 flex justify-center pb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-smoke">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-smoke" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade → obsidian */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #0F0F0F 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
