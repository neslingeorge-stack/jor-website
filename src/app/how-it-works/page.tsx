import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | JOR",
  description:
    "From job post to driver confirmed in under 5 minutes. AI matching, escrow payments, live GPS tracking.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-dvh bg-void">
      <section className="relative flex min-h-[60vh] items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-ember">
            HOW IT WORKS
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,90px)] font-black leading-[0.92] text-white">
            FROM JOB POST TO
            <br />
            <span className="text-ember">DRIVER CONFIRMED.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl font-body text-lg text-silver">
            In under 5 minutes. Every time. Post a job, AI matches 8 factors
            simultaneously, driver accepts with OTP confirmation, escrow
            activates, GPS tracking starts.
          </p>
        </div>
      </section>
    </main>
  );
}
