import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | JOR",
  description:
    "Transparent pricing by design. 30% commission for fleet owners. Free forever for drivers. No subscriptions, no hidden fees.",
};

export default function PricingPage() {
  return (
    <main className="min-h-dvh bg-offwhite">
      <section className="relative flex min-h-[60vh] items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-ember">
            PRICING
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,90px)] font-black leading-[0.92] text-ink">
            TRANSPARENT
            <br />
            <span className="text-ember">BY DESIGN.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl font-body text-lg text-smoke">
            JOR charges a single commission. No subscriptions for drivers. No
            monthly fees for fleet owners. You pay when value is delivered.
          </p>
        </div>
      </section>
    </main>
  );
}
