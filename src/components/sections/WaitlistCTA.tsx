"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, CheckCircle, Lock } from "lucide-react";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { RoadGridBg } from "@/components/effects/RoadGridBg";
import { NoiseTexture } from "@/components/effects/NoiseTexture";
import { Badge } from "@/components/ui/Badge";
import { LivePulse } from "@/components/ui/LivePulse";
import { Button } from "@/components/ui/Button";

// ── Steering wheel icon (inline SVG — not in lucide) ──────────────────────────
function SteeringWheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="19.07" y1="4.93" x2="14.83" y2="9.17" />
    </svg>
  );
}

// ── Form field component ───────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function Field({ id, label, type = "text", placeholder, value, onChange, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-heading text-xs font-semibold text-smoke">
        {label}
        {required && <span className="ml-0.5 text-ember">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={[
          "w-full rounded-lg border border-steel/30 bg-ink/5 px-4 py-3",
          "font-body text-sm text-ink placeholder-smoke",
          "outline-none transition-colors duration-200",
          "focus:border-ember/60 focus:ring-1 focus:ring-ember/30",
        ].join(" ")}
      />
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  required?: boolean;
}

function SelectField({ id, label, placeholder, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-heading text-xs font-semibold text-smoke">
        {label}
        {required && <span className="ml-0.5 text-ember">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={[
          "w-full rounded-lg border border-steel/30 bg-white px-4 py-3",
          "font-body text-sm text-ink",
          "outline-none transition-colors duration-200",
          "focus:border-ember/60 focus:ring-1 focus:ring-ember/30",
          value === "" ? "text-smoke" : "text-ink",
        ].join(" ")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── Success state ─────────────────────────────────────────────────────────────
function SuccessState({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center gap-4 py-12 text-center"
    >
      <CheckCircle className="h-12 w-12 text-verified" strokeWidth={1.5} />
      <div>
        <p className="font-display font-black text-2xl uppercase text-ink">
          You&apos;re on the list!
        </p>
        <p className="mt-2 font-body text-sm text-smoke">{label}</p>
      </div>
    </motion.div>
  );
}

// ── Fleet Owner form ──────────────────────────────────────────────────────────
const FLEET_SIZE_OPTIONS = [
  { value: "1-5", label: "1 – 5 vehicles" },
  { value: "6-20", label: "6 – 20 vehicles" },
  { value: "21-50", label: "21 – 50 vehicles" },
  { value: "50+", label: "50+ vehicles" },
] as const;

function FleetForm() {
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/5 p-8 backdrop-blur-sm">
      {/* Card header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember/10 text-ember">
          <Truck className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-black text-xl uppercase text-ink">
            Fleet Owners
          </h3>
          <p className="font-body text-xs text-smoke">
            Post your first job in under 2 minutes
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <SuccessState
            key="success"
            label="We'll reach out with early access details before the Bangalore launch."
          />
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <Field
              id="fleet-company"
              label="Company Name"
              placeholder="e.g. Sharma Logistics Pvt. Ltd."
              value={company}
              onChange={setCompany}
              required
            />
            <Field
              id="fleet-phone"
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={setPhone}
              required
            />
            <SelectField
              id="fleet-size"
              label="Fleet Size"
              placeholder="Select fleet size"
              value={fleetSize}
              onChange={setFleetSize}
              options={FLEET_SIZE_OPTIONS}
              required
            />
            <div className="mt-2">
              <Button variant="ember" size="lg" fullWidth type="submit">
                Get Early Access →
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Driver form ───────────────────────────────────────────────────────────────
const LICENSE_OPTIONS = [
  { value: "LMV", label: "LMV — Light Motor Vehicle" },
  { value: "HMV", label: "HMV — Heavy Motor Vehicle" },
  { value: "HGMV", label: "HGMV — Heavy Goods Motor Vehicle" },
  { value: "Tanker", label: "Tanker — Hazardous / Non-hazardous" },
] as const;

function DriverForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/5 p-8 backdrop-blur-sm">
      {/* Card header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-verified/10 text-verified">
          <SteeringWheelIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-black text-xl uppercase text-ink">
            Drivers
          </h3>
          <p className="font-body text-xs text-smoke">
            Free to join. Earn on every completed trip.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <SuccessState
            key="success"
            label="Welcome to JOR. You'll get onboarding instructions before launch."
          />
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <Field
              id="driver-name"
              label="Full Name"
              placeholder="e.g. Rajan Kumar"
              value={name}
              onChange={setName}
              required
            />
            <Field
              id="driver-phone"
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={setPhone}
              required
            />
            <SelectField
              id="driver-license"
              label="License Type"
              placeholder="Select license category"
              value={license}
              onChange={setLicense}
              options={LICENSE_OPTIONS}
              required
            />
            <div className="mt-2">
              <Button variant="green" size="lg" fullWidth type="submit">
                Register as Driver →
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function WaitlistCTA() {
  return (
    <section
      className="relative overflow-hidden bg-offwhite py-24 lg:py-32"
      aria-label="Early access waitlist"
    >
      {/* Background layers */}
      <RoadGridBg />
      <NoiseTexture opacity="0.04" />

      {/* Large ember glow orb behind content */}
      <GlowOrb
        position="center"
        color="ember"
        size="800px"
        blur="300px"
        opacity="0.2"
      />

      {/* Radial vignette to contain the glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(245,243,239,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col items-center gap-5 text-center"
        >
          {/* Live badge */}
          <Badge variant="live">
            <LivePulse color="ember" />
            <span>LIVE — Early Access Open</span>
          </Badge>

          {/* Headline */}
          <h2
            className="font-display font-black uppercase leading-[0.88] tracking-tight"
            style={{ fontSize: "var(--text-display-xl)" }}
            aria-label="The road starts here"
          >
            <span className="block text-ink">THE ROAD /</span>
            <span className="block italic text-ember">STARTS HERE.</span>
          </h2>

          {/* Subtext */}
          <p
            className="max-w-[520px] font-body leading-relaxed text-smoke"
            style={{ fontSize: "18px" }}
          >
            JOR is launching in Bangalore — India&apos;s commercial transport
            capital. Be among the first fleet owners and drivers on the
            platform before we open to the public.
          </p>
        </motion.div>

        {/* Form cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <FleetForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <DriverForm />
          </motion.div>
        </div>

        {/* Trust micro-copy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <Lock className="h-3 w-3 text-smoke" />
          <p className="font-body text-xs text-smoke">
            No spam · Your data stays private · Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
