"use client";

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
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { CardGlass } from "@/components/ui/card-glass";
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

            {/* ── RIGHT COLUMN — Interactive 3D Scene ── */}
            <motion.div
              variants={fadeInRight}
              initial="initial"
              animate="animate"
              className="hidden lg:flex items-center justify-center"
            >
              <CardGlass className="w-full h-[500px] bg-void/[0.96] relative overflow-hidden rounded-2xl border-steel/20 shadow-[0_30px_80px_-20px_rgba(28,28,30,0.3),0_10px_40px_-10px_rgba(255,140,0,0.08)]">
                <Spotlight
                  className="-top-40 left-0 md:left-60 md:-top-20"
                  fill="white"
                />

                <div className="flex h-full">
                  {/* Left content inside card */}
                  <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-silver">
                      Interactive 3D
                    </h2>
                    <p className="mt-4 font-body text-sm text-silver max-w-[200px] leading-relaxed">
                      Explore the future of driver matching with immersive AI-powered experiences.
                    </p>
                  </div>

                  {/* Right: Spline 3D scene */}
                  <div className="flex-1 relative">
                    <SplineScene
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </CardGlass>
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
