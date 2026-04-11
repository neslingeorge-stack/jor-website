import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | JOR",
  description:
    "JOR is building India's driver matching engine. Founded by Neslin Elias George. A FleetPrime Solutions Pvt. Ltd. product.",
};

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-void">
      <section className="relative flex min-h-[60vh] items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-ember">
            ABOUT JOR
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,90px)] font-black leading-[0.92] text-white">
            THE ROAD
            <br />
            <span className="text-ember">STARTS HERE.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-body text-lg text-silver">
            JOR is India&apos;s first AI-powered driver matching engine.
            Built to close the 5-million-driver gap in India&apos;s trucking
            industry. No brokers. No phone trees. No delays. Just verified
            drivers matched to jobs in minutes.
          </p>
          <div className="mt-12 border-t border-steel/30 pt-8">
            <p className="font-heading text-sm font-semibold text-white">
              Neslin Elias George
            </p>
            <p className="font-body text-sm text-silver">
              Founder &amp; CEO, FleetPrime Solutions Pvt. Ltd.
            </p>
            <p className="mt-1 font-body text-xs text-smoke">
              Bangalore, Karnataka, India
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
