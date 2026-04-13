"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FloatingBlob } from "@/components/effects/FloatingBlob";

const FLEET_FEATURES = [
  "Post a job in under 2 minutes",
  "AI-matched, Aadhaar-verified drivers only",
  "Instant, scheduled, or recurring jobs",
  "Escrow payment — pay only on completion",
  "GST-compliant invoice per job",
  "Full fleet dashboard for multiple jobs",
  "SOS alerts + live GPS every active job",
] as const;

const DRIVER_FEATURES = [
  "Browse jobs matched to your license",
  "Accept or decline — complete freedom",
  "Earn per trip — no full-time commitment",
  "UPI · Bank Transfer · JOR Wallet payouts",
  "Get paid instantly on job completion",
  "Build your JOR Score — unlock Elite tier",
  "Aadhaar + license KYC (one-time, free)",
] as const;

const DRIVER_TIERS = ["Bronze", "Silver", "Gold", "Platinum", "Elite"] as const;

const CARD_VARIANTS = {
  initial: { opacity: 0, y: 40 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

interface FeatureListProps {
  features: readonly string[];
  checkColor: string;
  textColor: string;
}

function FeatureList({ features, checkColor, textColor }: FeatureListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {features.map((feat) => (
        <li key={feat} className="flex items-start gap-2.5">
          <Check
            className={["mt-0.5 h-4 w-4 shrink-0", checkColor].join(" ")}
            strokeWidth={2.5}
          />
          <span className={["font-body text-sm leading-snug", textColor].join(" ")}>
            {feat}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface BreakdownRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  accent?: "ember" | "verified";
}

function BreakdownRow({ label, value, highlight, accent }: BreakdownRowProps) {
  const valueClass =
    accent === "ember"
      ? "text-ember"
      : accent === "verified"
        ? "text-verified"
        : highlight
          ? "text-ink font-semibold"
          : "text-smoke";

  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs text-smoke">{label}</span>
      <span className={["font-mono text-xs", valueClass].join(" ")}>{value}</span>
    </div>
  );
}

export function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-offwhite py-24 lg:py-32"
      aria-label="Pricing"
    >
      {/* Subtle top border */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,140,0,0.2), transparent)",
        }}
        aria-hidden="true"
      />
      <FloatingBlob
        className="top-[30%] left-[-10%]"
        color="rgba(255,140,0,0.04)"
        size="400px"
        delay="-4s"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-4 text-center"
        >
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            PRICING
          </span>
          <h2
            className="font-display font-black uppercase leading-[0.9] tracking-tight text-ink"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            Transparent by design.
          </h2>
          <p className="mx-auto max-w-[480px] font-body text-base leading-relaxed text-smoke">
            One commission model. No subscriptions, no hidden fees, no broker
            cuts. JOR earns only when drivers complete jobs — aligning our
            incentives with yours.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ── CARD 1: Fleet Owners ── */}
          <motion.div
            variants={CARD_VARIANTS}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            custom={0}
            className="relative overflow-hidden rounded-2xl border border-steel/30 bg-white"
          >
            {/* Ember top accent */}
            <div
              className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(to right, transparent, #FF8C00, #F5A623, transparent)",
              }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-8 p-8">
              {/* Header */}
              <div>
                <p className="mb-1 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
                  Fleet Owners
                </p>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-display font-black leading-none text-ink"
                    style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
                  >
                    30%
                  </span>
                  <span className="font-display font-black text-2xl uppercase text-ember">
                    Commission
                  </span>
                </div>
                <p className="mt-1 font-body text-sm text-smoke">Per completed job</p>
              </div>

              {/* Breakdown table */}
              <div className="rounded-xl border border-ember/20 bg-offwhite/90 p-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-smoke">
                  Example · ₹3,000 job
                </p>
                <div className="flex flex-col gap-2.5">
                  <BreakdownRow label="You post" value="₹3,000" highlight />
                  <div className="h-px bg-steel/20" />
                  <BreakdownRow label="JOR commission (30%)" value="₹900" accent="ember" />
                  <BreakdownRow label="Driver earns" value="₹2,100" accent="verified" />
                </div>
              </div>

              {/* Features */}
              <FeatureList
                features={FLEET_FEATURES}
                checkColor="text-ember"
                textColor="text-smoke"
              />

              {/* Add-on */}
              <div className="flex items-center gap-3 rounded-xl border border-amber/20 bg-amber/5 px-4 py-3">
                <Zap className="h-4 w-4 shrink-0 text-amber" />
                <div>
                  <span className="font-heading text-sm font-semibold text-ink">
                    JOR Boost
                  </span>
                  <span className="ml-2 font-mono text-sm text-amber">₹49/job</span>
                  <p className="font-body text-xs text-smoke">
                    Priority-list your urgent jobs instantly
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button variant="ember" size="lg" fullWidth>
                Post a Job Free →
              </Button>
            </div>
          </motion.div>

          {/* ── CARD 2: Drivers ── */}
          <motion.div
            variants={CARD_VARIANTS}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            custom={1}
            className="relative overflow-hidden rounded-2xl border border-verified/30 bg-white"
          >
            {/* Green top accent */}
            <div
              className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(to right, transparent, #10B981, transparent)",
              }}
              aria-hidden="true"
            />

            {/* MOST POPULAR badge */}
            <div className="absolute top-4 right-6">
              <span className="inline-flex items-center rounded-full border border-verified/30 bg-verified/10 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-widest text-verified">
                MOST POPULAR
              </span>
            </div>

            <div className="flex flex-col gap-8 p-8">
              {/* Header */}
              <div>
                <p className="mb-1 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
                  Drivers
                </p>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-display font-black leading-none text-ink"
                    style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
                  >
                    ₹0
                  </span>
                </div>
                <p className="mt-1 font-body text-sm text-smoke">
                  Forever free for drivers
                </p>
              </div>

              {/* Earnings breakdown */}
              <div className="rounded-xl border border-verified/20 bg-offwhite/90 p-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-smoke">
                  Example earnings breakdown
                </p>
                <div className="flex flex-col gap-2.5">
                  <BreakdownRow label="Job posted at" value="₹3,000" highlight />
                  <div className="h-px bg-steel/20" />
                  <BreakdownRow label="Platform commission" value="₹900" accent="ember" />
                  <BreakdownRow label="You take home" value="₹2,100" accent="verified" />
                </div>
              </div>

              {/* Features */}
              <FeatureList
                features={DRIVER_FEATURES}
                checkColor="text-verified"
                textColor="text-smoke"
              />

              {/* Driver tiers */}
              <div>
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-widest text-smoke">
                  Tier progression
                </p>
                <div className="flex flex-wrap gap-2">
                  {DRIVER_TIERS.map((tier, i) => {
                    const isTop = tier === "Elite";
                    return (
                      <span
                        key={tier}
                        className={[
                          "rounded-full border px-3 py-1 font-heading text-xs font-semibold",
                          isTop
                            ? "border-amber/40 bg-amber/10 text-amber"
                            : i >= 3
                              ? "border-verified/30 bg-verified/5 text-verified"
                              : "border-steel/30 bg-graphite/40 text-smoke",
                        ].join(" ")}
                      >
                        {tier}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <Button variant="green" size="lg" fullWidth>
                Join Free — Get Verified →
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="font-body text-base text-smoke">
            Running large-scale fleet operations?{" "}
            <span className="text-ink">Enterprise API + volume pricing available.</span>
          </p>
          <Button variant="outline" size="md">
            Talk to Enterprise Sales →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
