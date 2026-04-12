"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";
import { ShaderMesh } from "@/components/ui/shader-gradient";
import { FloatingBlob } from "@/components/effects/FloatingBlob";

// ─── Types ────────────────────────────────────────────────────────────────────

type DemoState = "idle" | "searching" | "matched";

// ─── Left panel: Post a Job form ──────────────────────────────────────────────

interface PostJobFormProps {
  onFind: () => void;
  disabled: boolean;
}

function PostJobForm({ onFind, disabled }: PostJobFormProps) {
  return (
    <div className="rounded-2xl border border-steel/30 bg-white p-6 space-y-5">
      <div>
        <p className="font-heading text-sm font-semibold text-smoke uppercase tracking-widest mb-4">
          Post a Job
        </p>
      </div>

      {/* Vehicle type */}
      <div className="space-y-1.5">
        <label className="font-mono text-[10px] text-smoke uppercase tracking-wider">
          Vehicle Type
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none rounded-lg border border-steel/30 bg-graphite/50 px-3 py-2.5 font-body text-sm text-smoke focus:border-ember/50 focus:outline-none focus:ring-1 focus:ring-ember/30"
            defaultValue="heavy"
          >
            <option value="heavy">Heavy Truck · 12-Wheeler</option>
            <option value="medium">Medium Truck · 6-Wheeler</option>
            <option value="light">Light Commercial · Mini Truck</option>
            <option value="tanker">Tanker · Specialised</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="h-3.5 w-3.5 text-smoke" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <label className="font-mono text-[10px] text-smoke uppercase tracking-wider">
          Pickup Location
        </label>
        <input
          type="text"
          defaultValue="Peenya Industrial Area, Bangalore"
          className="w-full rounded-lg border border-steel/30 bg-graphite/50 px-3 py-2.5 font-body text-sm text-smoke placeholder:text-smoke focus:border-ember/50 focus:outline-none focus:ring-1 focus:ring-ember/30"
          readOnly
        />
      </div>

      {/* Pay range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] text-smoke uppercase tracking-wider">
            Pay Range
          </label>
          <span className="font-mono text-xs font-semibold text-amber">₹2,500 – ₹3,200</span>
        </div>
        {/* Slider visual (decorative) */}
        <div className="relative h-1.5 rounded-full bg-steel/40">
          <div
            className="absolute left-[15%] right-[20%] h-full rounded-full bg-gradient-to-r from-ember to-amber"
          />
          <div className="absolute left-[15%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ember bg-white shadow-md" />
          <div className="absolute right-[20%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber bg-white shadow-md" />
        </div>
        <div className="flex justify-between">
          <span className="font-mono text-[10px] text-smoke">₹1,000</span>
          <span className="font-mono text-[10px] text-smoke">₹5,000</span>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="ember"
        size="lg"
        fullWidth
        onClick={onFind}
        disabled={disabled}
        className="mt-2"
      >
        {disabled ? "Matching…" : "Find Driver →"}
      </Button>
    </div>
  );
}

// ─── Right panel: idle state ──────────────────────────────────────────────────

function IdlePanel() {
  return (
    <motion.div
      key="idle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-[340px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-steel/30 bg-white/80 p-6"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-steel/30 bg-graphite/40">
        <svg className="h-6 w-6 text-smoke" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      </div>
      <p className="font-body text-sm text-smoke text-center">
        Post a job to see matching<br />happen in real time
      </p>
    </motion.div>
  );
}

// ─── Right panel: searching state ────────────────────────────────────────────

function SearchingPanel() {
  return (
    <motion.div
      key="searching"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-[340px] flex-col items-center justify-center gap-6 rounded-2xl border border-amber/20 bg-white/80 p-6"
    >
      {/* Radar rings */}
      <div className="relative flex h-28 w-28 items-center justify-center">
        {[28, 52, 76, 104].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-amber/25"
            style={{ width: size, height: size }}
            animate={{
              opacity: [0.7, 0.1, 0.7],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-amber/20 border border-amber/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <svg className="h-5 w-5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      {/* Searching text with animated dots */}
      <div className="flex items-center gap-1">
        <span className="font-heading text-base font-semibold text-ink">Searching</span>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="font-heading text-base font-semibold text-amber"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
          >
            .
          </motion.span>
        ))}
      </div>

      <p className="font-body text-xs text-smoke text-center">
        Scoring 8 match factors across<br />nearby verified drivers
      </p>

      {/* Factor pills animating in */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-[260px]">
        {[
          "Proximity",
          "License Match",
          "JOR Score",
          "Availability",
          "Route XP",
        ].map((label, i) => (
          <motion.span
            key={label}
            className="rounded-full border border-steel/30 bg-graphite/40 px-2.5 py-1 font-mono text-[10px] text-smoke"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Right panel: matched state ───────────────────────────────────────────────

function MatchedPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="matched"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="rounded-2xl border border-verified/30 bg-white/80 p-6 space-y-4"
    >
      {/* Match banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-verified"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] text-verified uppercase tracking-widest">
            Driver Matched
          </span>
        </div>
        <span className="rounded-full bg-verified/10 border border-verified/30 px-2.5 py-1 font-mono text-xs font-bold text-verified">
          96% Match
        </span>
      </div>

      {/* Driver card */}
      <motion.div
        className="rounded-xl border border-steel/30 bg-graphite/40 p-4 space-y-3"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Avatar + name row */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber/30 to-ember/20 border border-amber/30 font-mono text-sm font-bold text-amber">
            RK
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-heading text-sm font-bold text-ink">Rajan Kumar</p>
              <span className="rounded bg-amber/10 border border-amber/30 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-amber">
                ELITE
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="h-3 w-3 text-amber" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 1l1.39 2.81L10.5 4.3l-2.25 2.19.53 3.08L6 8l-2.78 1.47.53-3.08L1.5 4.3l3.11-.49L6 1z" />
              </svg>
              <span className="font-mono text-xs text-amber font-semibold">4.8</span>
              <span className="font-mono text-[10px] text-smoke">· 247 jobs</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-mono text-xs text-smoke">2.3 km</p>
            <p className="font-mono text-[10px] text-ember font-semibold">8 min ETA</p>
          </div>
        </div>

        {/* Verification badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: "Aadhaar ✓", color: "text-verified border-verified/30 bg-verified/10" },
            { label: "License ✓", color: "text-verified border-verified/30 bg-verified/10" },
            { label: "Background ✓", color: "text-verified border-verified/30 bg-verified/10" },
          ].map((badge) => (
            <span
              key={badge.label}
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold",
                badge.color
              )}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Score bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-smoke">Match Score</span>
            <span className="font-mono text-[10px] font-bold text-verified">96%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-steel/30">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-verified to-verified/60"
              initial={{ width: 0 }}
              animate={{ width: "96%" }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </motion.div>

      {/* Accept / Decline */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button variant="green" size="md" fullWidth>
          Accept Driver
        </Button>
        <Button variant="outline" size="md" fullWidth>
          Decline
        </Button>
      </motion.div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full font-mono text-[10px] text-smoke hover:text-silver transition-colors pt-1"
      >
        ↩ Try again
      </button>
    </motion.div>
  );
}

// ─── Micro stats ──────────────────────────────────────────────────────────────

const MICRO_STATS = [
  { value: "3m 42s", label: "Average match time" },
  { value: "96.4%", label: "Match acceptance rate" },
  { value: "₹0", label: "Cost to join as driver" },
] as const;

// ─── Section ──────────────────────────────────────────────────────────────────

export function LiveMatchDemo() {
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: "-60px" });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  const handleFind = () => {
    if (demoState !== "idle") return;
    setDemoState("searching");
    timerRef.current = setTimeout(() => {
      setDemoState("matched");
    }, 3000);
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setDemoState("idle");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      id="live-demo"
      ref={sectionRef}
      className="relative bg-offwhite py-24 lg:py-32 overflow-hidden"
      aria-labelledby="demo-headline"
    >
      <ShaderMesh variant="light" />
      <FloatingBlob
        className="bottom-[10%] right-[-8%]"
        color="rgba(255,140,0,0.04)"
        size="350px"
        delay="-5s"
      />

      {/* Glow backdrop */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember opacity-[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* Headline */}
        <motion.div
          ref={headlineRef}
          variants={fadeUp}
          initial="initial"
          animate={headlineInView ? "animate" : "initial"}
          className="mb-14 lg:mb-18 text-center"
        >
          <h2
            id="demo-headline"
            className="font-display font-black uppercase leading-none text-ink"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            WATCH IT HAPPEN.
          </h2>
          <p className="mt-4 font-body text-base text-smoke">
            This is what a JOR match looks like in real time.
          </p>
        </motion.div>

        {/* Demo panel */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={headlineInView ? "animate" : "initial"}
          style={{ transitionDelay: "0.15s" }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8"
        >
          {/* Left: form */}
          <PostJobForm onFind={handleFind} disabled={demoState !== "idle"} />

          {/* Right: state machine */}
          <div>
            <AnimatePresence mode="wait">
              {demoState === "idle" && <IdlePanel key="idle" />}
              {demoState === "searching" && <SearchingPanel key="searching" />}
              {demoState === "matched" && (
                <MatchedPanel key="matched" onReset={handleReset} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Micro stats */}
        <motion.div
          ref={statsRef}
          variants={fadeUp}
          initial="initial"
          animate={statsInView ? "animate" : "initial"}
          style={{ transitionDelay: "0.1s" }}
          className="mt-14 grid grid-cols-1 gap-px sm:grid-cols-3 rounded-2xl border border-steel/20 overflow-hidden"
        >
          {MICRO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center gap-1 bg-white px-6 py-8",
                i < MICRO_STATS.length - 1 && "sm:border-r sm:border-steel/20"
              )}
            >
              <span className="font-mono text-3xl font-black text-ink tracking-tight">
                {stat.value}
              </span>
              <span className="font-body text-sm text-smoke text-center">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
