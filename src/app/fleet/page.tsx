import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Fleet Owners | JOR",
  description:
    "Post a job and get AI-matched, Aadhaar-verified drivers in minutes. Escrow payments, live GPS, transparent 30% commission.",
};

export default function FleetPage() {
  return (
    <main className="min-h-dvh bg-offwhite">
      <section className="relative flex min-h-[60vh] items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-ember">
            FOR FLEET OWNERS
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,90px)] font-black leading-[0.92] text-ink">
            YOUR TRUCK.
            <br />
            OUR DRIVER
            <br />
            <span className="text-ember">NETWORK.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl font-body text-lg text-smoke">
            Post a job in under 2 minutes. Get AI-matched, Aadhaar-verified
            drivers. Escrow payment protection. Live GPS tracking. 30%
            commission — transparent, fixed, no hidden fees.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 rounded-lg bg-ember px-8 py-4 font-heading text-base font-bold text-void transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,140,0,0.3)]"
            >
              Post Your First Job Free
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
