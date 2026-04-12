import dynamic from "next/dynamic";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

const SocialProofBar = dynamic(
  () => import("@/components/sections/SocialProofBar").then((m) => m.SocialProofBar),
);
const VideoHeroSection = dynamic(
  () => import("@/components/ui/hero-landing-page").then((m) => m.VideoHeroSection),
);
const ProblemStatement = dynamic(
  () => import("@/components/sections/ProblemStatement").then((m) => m.ProblemStatement),
);
const HowItWorks = dynamic(
  () => import("@/components/sections/HowItWorks").then((m) => m.HowItWorks),
);
const LiveMatchDemo = dynamic(
  () => import("@/components/sections/LiveMatchDemo").then((m) => m.LiveMatchDemo),
);
const AdminPreview = dynamic(
  () => import("@/components/sections/AdminPreview"),
);
const TwoSides = dynamic(
  () => import("@/components/sections/TwoSides").then((m) => m.TwoSides),
);
const TrustInfrastructure = dynamic(
  () => import("@/components/sections/TrustInfrastructure").then((m) => m.TrustInfrastructure),
);
const EcosystemRoadmap = dynamic(
  () => import("@/components/sections/EcosystemRoadmap").then((m) => m.EcosystemRoadmap),
);
const MetricsBand = dynamic(
  () => import("@/components/sections/MetricsBand").then((m) => m.MetricsBand),
);
const PricingSection = dynamic(
  () => import("@/components/sections/PricingSection").then((m) => m.PricingSection),
);
const WaitlistCTA = dynamic(
  () => import("@/components/sections/WaitlistCTA").then((m) => m.WaitlistCTA),
);

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <SocialProofBar />
        <VideoHeroSection />
        <ProblemStatement />
        <HowItWorks />
        <section id="live-demo">
          <LiveMatchDemo />
        </section>
        <AdminPreview />
        <TwoSides />
        <TrustInfrastructure />
        <EcosystemRoadmap />
        <MetricsBand />
        <PricingSection />
        <section id="waitlist">
          <WaitlistCTA />
        </section>
      </main>
      <Footer />
    </>
  );
}
