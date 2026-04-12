import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecosystem & Roadmap | JOR",
  description:
    "From matching engine to transportation OS. See JOR's 4-phase roadmap from Bangalore MVP to Pan-India platform.",
};

export default function EcosystemPage() {
  return (
    <main className="min-h-dvh bg-offwhite">
      <section className="relative flex min-h-[60vh] items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-ember">
            THE VISION
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,90px)] font-black leading-[0.92] text-ink">
            A MATCHING ENGINE
            <br />
            <span className="text-ember">TODAY.</span>
          </h1>
          <p className="mt-2 font-display text-[clamp(32px,4vw,56px)] font-black leading-[0.92] text-smoke">
            A Transportation OS Tomorrow.
          </p>
        </div>
      </section>
    </main>
  );
}
