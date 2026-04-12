"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface VideoHeroSectionProps {
  headline?: string[];
  subtext?: string;
  ctaLabel?: string;
  ctaSecondaryLabel?: string;
  stats?: { value: string; label: string }[];
  videoSrc?: string;
}

const DEFAULT_STATS = [
  { value: "40+", label: "Cities covered" },
  { value: "3M+", label: "Drivers on platform" },
];

export function VideoHeroSection({
  headline = ["India's trucks are", "ready. Drivers aren't."],
  subtext = "Trusted by fleet operators across India, JOR solves the driver shortage crisis through AI-powered matching, verified credentials, and transparent pricing.",
  ctaLabel = "Get Started",
  ctaSecondaryLabel = "Learn more",
  stats = DEFAULT_STATS,
  videoSrc = "https://mybycketvercelprojecttest.s3.sa-east-1.amazonaws.com/animation-bg.mp4",
}: VideoHeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] w-full overflow-hidden flex items-end"
      aria-label="Video hero section"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: "brightness(0.4)" }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(28,28,30,0.85)] via-[rgba(28,28,30,0.4)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,28,30,0.9)] via-transparent to-transparent" />
        {/* Orange accent glow */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[rgba(255,140,0,0.1)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[1400px] mx-auto px-6 lg:px-[60px] py-16 lg:py-20 flex flex-col lg:flex-row justify-between items-end gap-12">
        {/* Left Content */}
        <div className="max-w-[800px]">
          <motion.h2
            className="text-[clamp(40px,7vw,80px)] font-display font-bold leading-[1.05] mb-6 tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {headline.map((line, i) => (
              <span key={i} className="block">
                {i === headline.length - 1 ? (
                  <span className="text-ember">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h2>

          <motion.p
            className="text-lg leading-relaxed text-white/70 mb-10 font-body max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtext}
          </motion.p>

          <motion.div
            className="flex gap-5 items-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button className="flex items-center gap-2.5 bg-ember text-white py-3.5 px-7 rounded-lg font-heading text-sm font-semibold hover:bg-flame hover:translate-x-0.5 transition-all duration-200">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-transparent text-white/70 py-3.5 px-7 font-body text-sm font-medium hover:text-white transition-colors duration-200">
              {ctaSecondaryLabel}
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="flex gap-12 lg:gap-20 items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[clamp(40px,5vw,64px)] font-display font-bold leading-none mb-2 text-white">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 font-body">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Top gradient fade from offwhite */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[3] h-24"
        style={{
          background: "linear-gradient(to bottom, #F5F3EF 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom gradient fade to offwhite */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-24"
        style={{
          background: "linear-gradient(to top, #F5F3EF 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
