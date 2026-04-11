import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Drivers | JOR",
  description:
    "Join JOR as a verified commercial driver. Browse AI-matched jobs, earn per trip, get paid instantly. Free to join, forever.",
};

export default function DriversPage() {
  return (
    <main className="min-h-dvh bg-void">
      <section className="relative flex min-h-[60vh] items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-verified">
            FOR DRIVERS
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,90px)] font-black leading-[0.92] text-white">
            YOUR LICENSE.
            <br />
            YOUR TERMS.
            <br />
            <span className="text-verified">YOUR EARNINGS.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl font-body text-lg text-silver">
            Browse jobs matched to your license category. Accept or decline with
            complete freedom. Earn per trip. Get paid instantly on completion.
            Free to join — forever.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 rounded-lg bg-verified px-8 py-4 font-heading text-base font-bold text-void transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Join as a Driver — It&apos;s Free
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
