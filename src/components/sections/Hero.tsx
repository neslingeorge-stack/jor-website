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
import { FlowingLines } from "@/components/effects/FlowingLines";
import { FloatingBlob } from "@/components/effects/FloatingBlob";
import { GradientMesh } from "@/components/effects/GradientMesh";
import { ParticleField } from "@/components/effects/ParticleField";

const TRUST_TAG_COLOR_MAP: Record<string, string> = {
  verified: "bg-verified/10 text-verified border-verified/20",
  info: "bg-info/10 text-info border-info/20",
  amber: "bg-amber/10 text-amber border-amber/20",
  ember: "bg-ember/10 text-ember border-ember/20",
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
        "bg-offwhite"
      )}
      aria-label="Hero section"
    >
      {/* ── Background layers ── */}

      {/* Gradient mesh — subtle warm tones */}
      <GradientMesh variant="warm" />

      {/* Flowing animated lines */}
      <FlowingLines variant="light" />

      {/* Floating morphing blobs */}
      <FloatingBlob
        className="top-[-10%] right-[-5%]"
        color="rgba(255,140,0,0.05)"
        size="600px"
        delay="0s"
      />
      <FloatingBlob
        className="bottom-[-15%] left-[-10%]"
        color="rgba(245,166,35,0.04)"
        size="500px"
        delay="-4s"
      />
      <FloatingBlob
        className="top-[40%] left-[60%]"
        color="rgba(255,107,0,0.03)"
        size="300px"
        delay="-8s"
      />

      {/* Particle network */}
      <ParticleField color="rgba(255,140,0,0.5)" count={25} className="z-[1]" />

      {/* Soft radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(245,243,239,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
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
                <Badge variant="live" className="bg-ember/10 text-ember border-ember/20">
                  <LivePulse color="ember" />
                  {HERO.eyebrow}
                </Badge>
              </motion.div>

              {/* H1 headline — dark text on light bg */}
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
                            : "text-ink"
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

              {/* Subheadline — dark muted text */}
              <motion.p
                variants={fadeUp}
                className="max-w-[480px] font-body text-lg leading-relaxed text-smoke"
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
                        "bg-steel/10 text-smoke border-steel/20"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        TRUST_DOT_MAP[tag.color] ?? "bg-smoke"
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
                <Button variant="outline" size="lg" className="border-steel/30 text-ink hover:bg-ink/5">
                  {HERO.ctaSecondary}
                </Button>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN — 3D Phone mockup ── */}
            <motion.div
              variants={fadeInRight}
              initial="initial"
              animate="animate"
              className="hidden items-center justify-center lg:flex perspective-container"
            >
              <motion.div
                initial={{ y: 0, rotateX: 4, rotateY: -8 }}
                animate={{
                  y: [0, -18, 0],
                  rotateX: [4, 2, 4],
                  rotateY: [-8, -4, -8],
                  transition: {
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotateX: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotateY: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  },
                }}
                whileHover={{
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1.03,
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                className="relative cursor-default"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Phone frame — dark phone on light background */}
                <div
                  className={cn(
                    "relative w-[320px] overflow-hidden rounded-[40px] border border-steel/20 bg-carbon shadow-[0_30px_80px_-20px_rgba(28,28,30,0.3),0_10px_40px_-10px_rgba(255,140,0,0.08)]",
                    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[40px] before:bg-gradient-to-br before:from-white/[0.06] before:to-transparent"
                  )}
                  style={{
                    height: "620px",
                    transformStyle: "preserve-3d",
                  }}
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

                {/* 3D Floating shadow underneath phone */}
                <div
                  className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2"
                  style={{
                    width: "260px",
                    height: "40px",
                    background: "radial-gradient(ellipse, rgba(28,28,30,0.15) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    transform: "translateX(-50%) rotateX(60deg)",
                  }}
                  aria-hidden="true"
                />

                {/* Floating 3D accent rings */}
                <motion.div
                  className="pointer-events-none absolute -top-6 -right-8 h-20 w-20 rounded-full border border-ember/15"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 90, 180],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg)" }}
                  aria-hidden="true"
                />
                <motion.div
                  className="pointer-events-none absolute -bottom-4 -left-6 h-14 w-14 rounded-full border border-amber/10"
                  animate={{
                    y: [0, 8, 0],
                    rotate: [180, 90, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d", transform: "rotateX(50deg)" }}
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

      {/* Bottom gradient fade → charcoal (void) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #1C1C1E 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
