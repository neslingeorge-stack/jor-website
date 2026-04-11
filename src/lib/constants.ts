export const SITE = {
  name: "JOR",
  tagline: "The Road Starts Here",
  company: "FleetPrime Solutions Pvt. Ltd.",
  city: "Bangalore, Karnataka, India",
  description:
    "Post a job. Get a verified commercial driver matched in minutes. No brokers. No calls. No delays.",
} as const;

export const NAV_LINKS = [
  {
    label: "Platform",
    children: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Live Demo", href: "/#live-demo" },
      { label: "Ecosystem", href: "/ecosystem" },
    ],
  },
  { label: "For Fleet Owners", href: "/fleet" },
  { label: "For Drivers", href: "/drivers" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export const HERO = {
  eyebrow: "LAUNCHING IN BANGALORE",
  headline: ["INDIA'S", "DRIVER", "MATCHING", "ENGINE."],
  subheadline:
    "Post a job. Get a verified commercial driver matched in minutes. No brokers. No calls. No delays. Just. On. Road.",
  trustTags: [
    { label: "Aadhaar Verified", color: "verified" },
    { label: "Escrow Protected", color: "info" },
    { label: "AI Matched", color: "amber" },
    { label: "Live GPS", color: "ember" },
  ],
  ctaPrimary: "Post a Job — Fleet Owners",
  ctaSecondary: "Join as a Driver",
} as const;

export const SOCIAL_PROOF_ITEMS = [
  "5M+ Driver Shortage in India",
  "₹162 Cr Projected ARR by Year 5",
  "Aadhaar-Verified Drivers Only",
  "< 5 Min Match Time Target",
  "30% Commission · Transparent Pricing",
  "24/7 Operations · Zero Downtime",
  "Bangalore Industrial Launch · 20km Zone",
  "MACH Architecture · Enterprise Ready",
] as const;

export const PROBLEM_CARDS = [
  {
    stat: "5,000,000+",
    label: "Verified driver shortage across India",
    body: "Fleet owners lose ₹12,000–₹50,000 per idle truck per day while searching for drivers through informal channels.",
    color: "ember" as const,
  },
  {
    stat: "3–8 hrs",
    label: "Average driver search time",
    body: "Phone trees, broker networks, personal contacts — the current system is broken, slow, and unverified.",
    color: "amber" as const,
  },
  {
    stat: "₹2.3L Cr",
    label: "Lost annually to fleet idle time",
    body: "India's logistics efficiency gap is one of the highest in Asia. JOR is built to close it.",
    color: "silver" as const,
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    heading: "Post in Under 2 Minutes",
    body: "Describe the job: vehicle type, route, date, pay preference. Instant, scheduled, or recurring. Fixed pay or open bidding.",
    color: "ember" as const,
  },
  {
    number: "02",
    heading: "AI Scores 8 Factors Simultaneously",
    body: "Location proximity · License category match · JOR Score · Availability · Rating history · Job acceptance rate · Vehicle familiarity · Route experience",
    color: "amber" as const,
  },
  {
    number: "03",
    heading: "OTP Confirmed. Escrow Activated.",
    body: "Driver accepts → fleet owner gets live ETA → OTP confirms pickup → GPS tracking starts → payment held in escrow → released instantly on completion.",
    color: "verified" as const,
  },
] as const;

export const FLEET_FEATURES = [
  "Post a job in under 2 minutes",
  "AI-matched, Aadhaar-verified drivers only",
  "Instant, scheduled, or recurring jobs",
  "Escrow payment — pay only on completion",
  "GST-compliant invoice per job",
  "Full fleet dashboard — multiple simultaneous jobs",
  "JOR Boost: ₹49 to priority-list urgent jobs",
  "SOS alerts + live GPS for every active job",
] as const;

export const DRIVER_FEATURES = [
  "Browse jobs matched to your license category",
  "Accept or decline — complete freedom",
  "Earn per trip — no full-time commitment",
  "UPI · Bank Transfer · JOR Wallet payouts",
  "Get paid instantly on job completion",
  "Build your JOR Score and unlock Elite tier",
  "Free to join — forever",
  "Aadhaar + license verification required (one-time)",
] as const;

export const TRUST_PILLARS = [
  {
    title: "Aadhaar + License + Background",
    body: "Every driver is verified against government databases before their first payout. KYC is not optional. There are no exceptions.",
    tag: "Active on all drivers",
    color: "ember" as const,
  },
  {
    title: "Money Moves Only When Jobs Close",
    body: "Fleet owner pays upfront. Funds held in JOR escrow. Released the moment both parties confirm job completion. No disputes about payment.",
    tag: "End-to-end protected",
    color: "info" as const,
  },
  {
    title: "Mandatory. Both Ways. Every Time.",
    body: "Fleet owners rate drivers. Drivers rate fleet owners. Ratings are permanent, public, and non-negotiable. Platform quality depends on it.",
    tag: "Post-job · Mandatory",
    color: "amber" as const,
  },
  {
    title: "Real-Time Visibility + Emergency Response",
    body: "Every active job is tracked live. Fleet owner sees driver on map. Drivers have SOS button with immediate response escalation. Cargo route checkpoints for long-haul jobs.",
    tag: "Active during all jobs",
    color: "verified" as const,
  },
] as const;

export const PHASES = [
  {
    label: "PHASE 1 — MVP · Bangalore · Now",
    status: "LAUNCHING",
    active: true,
    features: [
      "Live driver matching (instant + scheduled + recurring)",
      "Driver App + Fleet Owner App + Admin Dashboard",
      "AI matching engine — 8-factor scoring",
      "Escrow payments + KYC verification",
      "JOR Score + rating system",
    ],
    target: "2,000 drivers · 500 fleet owners · ₹85L ARR target",
  },
  {
    label: "PHASE 2 · Karnataka-wide · Months 9–18",
    status: "PLANNED",
    active: false,
    features: [
      "ML-powered matching (>80% acceptance rate target)",
      "Mechanic module + Service Hub",
      "Enterprise API (B2B tier)",
      "Predictive maintenance alerts",
      "Middle East market preparation",
    ],
    target: "5,000 drivers · 2,000 fleet owners · ₹6.37 Cr ARR",
  },
  {
    label: "PHASE 3 · South India · Months 19–36",
    status: "PLANNED",
    active: false,
    features: [
      "Parts marketplace",
      "Insurance integration (HDFC Ergo, TATA AIG)",
      "Dynamic pricing engine + surge",
      "Load board + freight matching",
      "Driver training platform (IRTSA-certified)",
    ],
    target: "18,000 drivers · 8,000 fleet owners · ₹46.45 Cr ARR",
  },
  {
    label: "PHASE 4 · Pan-India · Years 4–5",
    status: "HORIZON",
    active: false,
    features: [
      "AI agent layer (7 languages + voice)",
      "Driver fintech (loans, insurance, equipment)",
      "Used vehicle marketplace",
      "International expansion",
      "Foundation model (JOR-specific LLM)",
    ],
    target: "60,000 drivers · 25,000 fleet owners · ₹162.30 Cr ARR",
  },
] as const;

export const METRICS = [
  { value: "5M+", label: "Driver shortage JOR targets" },
  { value: "< 5min", label: "Match time target" },
  { value: "30%", label: "Commission — transparent, fixed" },
  { value: "24/7", label: "No downtime, ever" },
  { value: "₹162 Cr", label: "Projected ARR — Year 5" },
] as const;

export const FOOTER_LINKS = {
  platform: [
    "How It Works",
    "AI Matching",
    "Live Tracking",
    "Driver Verification",
    "Payment & Escrow",
    "JOR Score",
  ],
  company: ["About", "Founder", "Roadmap", "Pricing", "Blog", "Press Kit"],
  getStarted: [
    "Fleet Owners",
    "Drivers",
    "Enterprise API",
    "Contact",
    "Support",
  ],
} as const;
