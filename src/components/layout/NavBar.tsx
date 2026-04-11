"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { JORWordmark } from "@/components/brand/JORWordmark";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string };
type NavLink =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: readonly NavChild[] };

const SCROLL_THRESHOLD = 80;

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

interface DropdownMenuProps {
  children: readonly NavChild[];
  isOpen: boolean;
}

function DropdownMenu({ children, isOpen }: DropdownMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl border border-steel/30 bg-obsidian/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <div className="py-1.5">
            {children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="flex items-center px-4 py-2.5 font-heading text-sm text-silver hover:text-white hover:bg-white/5 transition-colors duration-150"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DesktopNavItemProps {
  link: NavLink;
  isActive: boolean;
}

function DesktopNavItem({ link, isActive }: DesktopNavItemProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (link.children) {
    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={cn(
            "flex items-center gap-1 font-heading text-sm font-medium transition-colors duration-200",
            isActive ? "text-white" : "text-silver hover:text-white"
          )}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          {link.label}
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform duration-200",
              dropdownOpen && "rotate-180"
            )}
          />
        </button>
        <DropdownMenu children={link.children} isOpen={dropdownOpen} />
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      className={cn(
        "relative font-heading text-sm font-medium transition-colors duration-200 pb-0.5",
        isActive ? "text-white" : "text-silver hover:text-white",
        "group"
      )}
    >
      {link.label}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-px w-full rounded-full bg-ember transition-transform duration-200 origin-left",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl bg-void/80 border-b border-steel/30"
            : "bg-transparent border-b border-transparent"
        )}
        style={{ height: "72px" }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="JOR Home">
            <JORWordmark className="h-7 w-auto" />
          </Link>

          {/* Center: Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {(NAV_LINKS as readonly NavLink[]).map((link) => (
              <DesktopNavItem
                key={link.label}
                link={link}
                isActive={
                  link.children
                    ? link.children.some((c) => isActive(c.href))
                    : isActive(link.href)
                }
              />
            ))}
          </nav>

          {/* Right: CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/early-access">
              <Button variant="ember" size="sm">Get Early Access →</Button>
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-silver hover:text-white hover:bg-white/5 transition-colors duration-200"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col bg-void/97 backdrop-blur-2xl pt-[72px]"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-1 px-6 pt-8 pb-6 overflow-y-auto flex-1">
              {(NAV_LINKS as readonly NavLink[]).map((link) => {
                if (link.children) {
                  const hasActive = link.children.some((c) => isActive(c.href));
                  return (
                    <div key={link.label} className="flex flex-col">
                      <button
                        onClick={() =>
                          setMobileDropdownOpen((prev) => !prev)
                        }
                        className={cn(
                          "flex items-center justify-between py-3.5 font-heading text-lg font-medium transition-colors duration-200 border-b border-steel/20",
                          hasActive ? "text-white" : "text-silver"
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200 text-smoke",
                            mobileDropdownOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" as const }}
                            className="overflow-hidden"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={cn(
                                  "flex items-center py-3 pl-4 font-heading text-base transition-colors duration-150 border-b border-steel/10",
                                  isActive(child.href)
                                    ? "text-white"
                                    : "text-smoke hover:text-silver"
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "flex items-center py-3.5 font-heading text-lg font-medium transition-colors duration-200 border-b border-steel/20",
                      isActive(link.href)
                        ? "text-white"
                        : "text-silver hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-ember" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="flex flex-col gap-3 px-6 pb-10">
              <Link href="/signin" className="w-full">
                <Button variant="outline" size="md" fullWidth>Sign In</Button>
              </Link>
              <Link href="/early-access" className="w-full">
                <Button variant="ember" size="md" fullWidth>Get Early Access →</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
