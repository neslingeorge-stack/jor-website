"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clipboard, Brain, CheckCircle } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ShaderWireframe } from "@/components/ui/shader-gradient";

// ─── Types ───────────────────────────────────────────────────────────────────

type StepColor = "ember" | "amber" | "verified";

interface StepConfig {
  number: string;
  heading: string;
  body: string;
  color: StepColor;
}

// ─── Color maps ──────────────────────────────────────────────────────────────

const iconColorMap: Record<StepColor, string> = {
  ember: "text-ember",
  amber: "text-amber",
  verified: "text-verified",
};

const ghostColorMap: Record<StepColor, string> = {
  ember: "text-ember",
  amber: "text-amber",
  verified: "text-verified",
};

const iconBgMap: Record<StepColor, string> = {
  ember: "bg-ember/10 border-ember/20",
  amber: "bg-amber/10 border-amber/20",
  verified: "bg-verified/10 border-verified/20",
};

const accentMap: Record<StepColor, string> = {
  ember: "border-l-ember",
  amber: "border-l-amber",
  verified: "border-l-verified",
};

// ─── Step icon resolver ───────────────────────────────────────────────────────

const STEP_ICONS = [Clipboard, Brain, CheckCircle] as const;

// ─── Mockup: Step 01 — Post a Job ────────────────────────────────────────────

function PostJobMockup() {
  return (
    <div className="rounded-xl border border-steel/20 bg-white p-5 space-y-3">
      {/* Header bar */}
      <div className="flex items-center gap-2 pb-2 border-b border-steel/20">
        <div className="h-2 w-2 rounded-full bg-ember" />
        <span className="font-mono text-[10px] text-smoke tracking-widest uppercase">
          New Job Post
        </span>
      </div>

      {/* Vehicle type */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] text-smoke uppercase tracking-wider">
          Vehicle Type
        </label>
        <div className="flex items-center justify-between rounded-lg border border-steel/30 bg-graphite/40 px-3 py-2">
          <span className="font-body text-xs text-smoke">Heavy Truck · 12-Wheeler</span>
          <svg className="h-3 w-3 text-smoke" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Pickup */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] text-smoke uppercase tracking-wider">
          Pickup
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-steel/30 bg-graphite/40 px-3 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-verified flex-shrink-0" />
          <span className="font-body text-xs text-smoke">Peenya Industrial Area</span>
        </div>
      </div>

      {/* Destination */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] text-smoke uppercase tracking-wider">
          Destination
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-steel/30 bg-graphite/40 px-3 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-ember flex-shrink-0" />
          <span className="font-body text-xs text-smoke">Whitefield Logistics Park</span>
        </div>
      </div>

      {/* Pay */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] text-smoke uppercase tracking-wider">
          Pay Offer
        </label>
        <div className="flex items-center justify-between rounded-lg border border-steel/30 bg-graphite/40 px-3 py-2">
          <span className="font-mono text-xs text-amber">₹2,800</span>
          <span className="font-mono text-[10px] text-smoke">Fixed Rate</span>
        </div>
      </div>

      {/* Post button */}
      <button className="w-full rounded-lg bg-ember py-2.5 font-heading text-xs font-semibold text-white">
        Post Job →
      </button>
    </div>
  );
}

// ─── Mockup: Step 02 — AI Matching ───────────────────────────────────────────

function MatchingMockup() {
  return (
    <div className="rounded-xl border border-steel/20 bg-white p-5 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-steel/20">
        <motion.div
          className="h-2 w-2 rounded-full bg-amber"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="font-mono text-[10px] text-smoke tracking-widest uppercase">
          AI Matching · 8 Factors
        </span>
      </div>

      {/* Radar visual */}
      <div className="relative flex items-center justify-center py-3">
        {[40, 64, 88].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-amber/30"
            style={{ width: size, height: size }}
            animate={{ opacity: [0.6, 0.15, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
        <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-amber/20 border border-amber/40">
          <Brain className="h-3.5 w-3.5 text-amber" />
        </div>
      </div>

      {/* Driver candidates */}
      {[
        { initials: "RK", name: "Rajan K.", score: "96", badge: "Elite", color: "text-amber" },
        { initials: "MS", name: "Mohan S.", score: "88", badge: "Pro", color: "text-verified" },
        { initials: "VR", name: "Vijay R.", score: "82", badge: "Pro", color: "text-info" },
      ].map((driver, i) => (
        <motion.div
          key={driver.initials}
          className="flex items-center gap-2 rounded-lg border border-steel/20 bg-graphite/30 px-3 py-2"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.25, duration: 0.5 }}
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-steel/40 font-mono text-[10px] font-bold text-smoke">
            {driver.initials}
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-heading text-xs text-ink">{driver.name}</span>
          </div>
          <span className={cn("font-mono text-xs font-bold", driver.color)}>
            {driver.score}%
          </span>
          <span className="rounded bg-graphite px-1.5 py-0.5 font-mono text-[9px] text-smoke">
            {driver.badge}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Mockup: Step 03 — Confirmed ─────────────────────────────────────────────

function ConfirmationMockup() {
  return (
    <div className="rounded-xl border border-steel/20 bg-white p-5 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-steel/20">
        <div className="h-2 w-2 rounded-full bg-verified" />
        <span className="font-mono text-[10px] text-smoke tracking-widest uppercase">
          Job Confirmed
        </span>
      </div>

      {/* Confirmed check */}
      <div className="flex flex-col items-center py-2 gap-1">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-verified bg-verified/10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <CheckCircle className="h-6 w-6 text-verified" />
        </motion.div>
        <span className="font-heading text-xs font-semibold text-ink">Driver Confirmed</span>
      </div>

      {/* Driver card */}
      <div className="flex items-center gap-3 rounded-lg border border-verified/20 bg-verified/5 px-3 py-2">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber/20 font-mono text-xs font-bold text-amber">
          RK
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading text-xs font-semibold text-ink">Rajan Kumar</p>
          <p className="font-mono text-[10px] text-verified">JOR Score 4.8 · Elite</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] text-smoke">2.3 km</p>
          <p className="font-mono text-[10px] text-ember">8 min ETA</p>
        </div>
      </div>

      {/* OTP */}
      <div className="space-y-1">
        <span className="font-mono text-[10px] text-smoke uppercase tracking-wider">
          Pickup OTP
        </span>
        <div className="flex gap-2">
          {["4", "7", "2", "9"].map((digit, i) => (
            <div
              key={i}
              className="flex h-9 flex-1 items-center justify-center rounded-lg border border-verified/30 bg-verified/5 font-mono text-sm font-bold text-verified"
            >
              {digit}
            </div>
          ))}
        </div>
      </div>

      {/* GPS indicator */}
      <div className="flex items-center justify-between rounded-lg border border-steel/20 bg-graphite/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-verified"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] text-smoke">Live GPS Active</span>
        </div>
        <span className="font-mono text-[10px] text-smoke">Escrow Locked</span>
      </div>
    </div>
  );
}

// ─── Step mockup resolver ─────────────────────────────────────────────────────

const STEP_MOCKUPS = [PostJobMockup, MatchingMockup, ConfirmationMockup] as const;

// ─── Animated SVG connector line ─────────────────────────────────────────────

function ConnectorLine({ color }: { color: StepColor }) {
  const pathColorMap: Record<StepColor, string> = {
    ember: "stroke-ember",
    amber: "stroke-amber",
    verified: "stroke-verified",
  };

  return (
    <div className="hidden lg:flex justify-center items-center h-16 my-2">
      <svg width="2" height="64" viewBox="0 0 2 64" fill="none" className="overflow-visible">
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="64"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={pathColorMap[color]}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

// ─── Individual step card ─────────────────────────────────────────────────────

interface StepCardProps {
  step: StepConfig;
  index: number;
  isOdd: boolean;
}

function StepCard({ step, index, isOdd }: StepCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = STEP_ICONS[index];
  const Mockup = STEP_MOCKUPS[index];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      style={{ transitionDelay: `${index * 0.15}s` }}
      className={cn(
        "relative lg:w-[calc(50%-40px)]",
        isOdd ? "lg:ml-auto lg:mr-20" : "lg:mr-auto lg:ml-20"
      )}
    >
      {/* Ghost number */}
      <span
        className={cn(
          "pointer-events-none absolute -top-6 -left-2 select-none font-mono text-[120px] font-black leading-none",
          ghostColorMap[step.color]
        )}
        style={{ opacity: 0.07 }}
        aria-hidden="true"
      >
        {step.number}
      </span>

      {/* Card */}
      <div
        className={cn(
          "relative rounded-2xl border border-steel/30 bg-white p-6 space-y-5",
          "border-l-2",
          accentMap[step.color]
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl border",
            iconBgMap[step.color]
          )}
        >
          <Icon className={cn("h-5 w-5", iconColorMap[step.color])} />
        </div>

        {/* Heading */}
        <h3 className="font-heading font-bold text-ink" style={{ fontSize: 24 }}>
          {step.heading}
        </h3>

        {/* Body */}
        <p className="font-body text-sm leading-relaxed text-smoke">{step.body}</p>

        {/* Mockup */}
        <Mockup />
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HowItWorks() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: "-60px" });

  const steps = HOW_IT_WORKS_STEPS as unknown as StepConfig[];

  return (
    <section
      id="how-it-works"
      className="relative bg-cream py-24 lg:py-32 overflow-hidden"
      aria-labelledby="hiw-headline"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,28,30,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(28,28,30,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <ShaderWireframe />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* Headline */}
        <motion.div
          ref={headlineRef}
          variants={fadeUp}
          initial="initial"
          animate={headlineInView ? "animate" : "initial"}
          className="mb-16 lg:mb-20 text-center"
        >
          <h2
            id="hiw-headline"
            className="font-display font-black uppercase leading-none text-ink"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            FROM JOB POST TO{" "}
            <span className="whitespace-nowrap">DRIVER CONFIRMED.</span>
          </h2>
          <p className="mt-4 font-body text-base text-smoke">
            In under 5 minutes. Every time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number}>
              <StepCard step={step} index={index} isOdd={index % 2 !== 0} />
              {index < steps.length - 1 && (
                <ConnectorLine color={steps[index + 1].color} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
