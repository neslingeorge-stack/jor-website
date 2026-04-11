import Link from "next/link";
import { JORWordmark } from "@/components/brand/JORWordmark";
import { JORTagline } from "@/components/brand/JORTagline";
import { SITE, FOOTER_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PLATFORM_HREFS: Record<string, string> = {
  "How It Works": "/how-it-works",
  "AI Matching": "/ai-matching",
  "Live Tracking": "/live-tracking",
  "Driver Verification": "/driver-verification",
  "Payment & Escrow": "/payment-escrow",
  "JOR Score": "/jor-score",
};

const COMPANY_HREFS: Record<string, string> = {
  About: "/about",
  Founder: "/founder",
  Roadmap: "/roadmap",
  Pricing: "/pricing",
  Blog: "/blog",
  "Press Kit": "/press-kit",
};

const GET_STARTED_HREFS: Record<string, string> = {
  "Fleet Owners": "/fleet",
  Drivers: "/drivers",
  "Enterprise API": "/enterprise",
  Contact: "/contact",
  Support: "/support",
};

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

// Inline SVG brand icons — lucide-react 1.8 does not include brand icons
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterXIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#050505" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/joronroad",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/joronroad",
    Icon: LinkedInIcon,
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/joronroad",
    Icon: TwitterXIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@joronroad",
    Icon: YouTubeIcon,
  },
] as const;

interface FooterColumnProps {
  heading: string;
  links: readonly string[];
  hrefs: Record<string, string>;
}

function FooterColumn({ heading, links, hrefs }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-smoke">
        {heading}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((label) => (
          <li key={label}>
            <Link
              href={hrefs[label] ?? "/"}
              className="font-body text-sm text-silver hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full"
      style={{ background: "#050505" }}
      aria-label="Site footer"
    >
      {/* Top gradient border: transparent → ember → transparent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #FF8C00, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-3">
              <Link href="/" aria-label="JOR Home">
                <JORWordmark className="h-7 w-auto" />
              </Link>
              <JORTagline />
            </div>

            <p className="font-body text-sm text-smoke leading-relaxed max-w-xs">
              {SITE.description}
            </p>

            <div className="flex flex-col gap-1">
              <p className="font-body text-xs text-smoke">{SITE.company}</p>
              <p className="font-body text-xs text-smoke">{SITE.city}</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-steel/30 text-smoke hover:text-white hover:border-ember/50 hover:bg-ember/5 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform */}
          <FooterColumn
            heading="Platform"
            links={FOOTER_LINKS.platform}
            hrefs={PLATFORM_HREFS}
          />

          {/* Column 3: Company */}
          <FooterColumn
            heading="Company"
            links={FOOTER_LINKS.company}
            hrefs={COMPANY_HREFS}
          />

          {/* Column 4: Get Started */}
          <FooterColumn
            heading="Get Started"
            links={FOOTER_LINKS.getStarted}
            hrefs={GET_STARTED_HREFS}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-steel/20 mb-6" aria-hidden="true" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6 flex-wrap">
            <p className="font-body text-xs text-smoke">
              &copy; {currentYear} {SITE.company}. All rights reserved.
            </p>
            <nav
              aria-label="Legal navigation"
              className="flex items-center gap-4 flex-wrap"
            >
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-xs text-smoke hover:text-silver transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Easter egg */}
          <p
            className={cn("font-mono text-xs text-smoke/50 select-none shrink-0")}
            title="Made with purpose"
          >
            Built with care on Indian roads.
          </p>
        </div>

        {/* Bottom thin ember line */}
        <div
          className="mt-6 h-px rounded-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255, 140, 0, 0.4), transparent)",
          }}
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
