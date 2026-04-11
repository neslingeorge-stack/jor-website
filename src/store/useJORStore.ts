import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LiveMetrics {
  activeDrivers: number;
  jobsToday: number;
  avgMatchTime: string;
  successRate: string;
  lastUpdated: number;
}

interface WaitlistState {
  count: number;
  userSubmitted: boolean;
  userRole: "fleet" | "driver" | null;
  userName: string;
  position: number;
}

interface DemoState {
  status: "idle" | "matching" | "matched";
  matchedDriver: Record<string, unknown> | null;
  matchTime: number | null;
  formData: { vehicleType: string; location: string; pay: number };
}

interface NavState {
  isScrolled: boolean;
  isMobileOpen: boolean;
  activeSection: string;
}

interface JORStore {
  metrics: LiveMetrics;
  setMetrics: (m: Partial<LiveMetrics>) => void;

  waitlist: WaitlistState;
  setWaitlist: (w: Partial<WaitlistState>) => void;

  demo: DemoState;
  setDemo: (d: Partial<DemoState>) => void;
  resetDemo: () => void;

  nav: NavState;
  setNav: (n: Partial<NavState>) => void;

  hasSeenHero: boolean;
  setHasSeenHero: (v: boolean) => void;
  preferredRole: "fleet" | "driver" | null;
  setPreferredRole: (r: "fleet" | "driver" | null) => void;
}

export const useJORStore = create<JORStore>()(
  persist(
    (set) => ({
      metrics: {
        activeDrivers: 1842,
        jobsToday: 387,
        avgMatchTime: "4.2",
        successRate: "97.8",
        lastUpdated: Date.now(),
      },
      setMetrics: (m) =>
        set((s) => ({
          metrics: { ...s.metrics, ...m, lastUpdated: Date.now() },
        })),

      waitlist: {
        count: 47,
        userSubmitted: false,
        userRole: null,
        userName: "",
        position: 0,
      },
      setWaitlist: (w) =>
        set((s) => ({ waitlist: { ...s.waitlist, ...w } })),

      demo: {
        status: "idle",
        matchedDriver: null,
        matchTime: null,
        formData: {
          vehicleType: "Heavy Commercial Truck",
          location: "Peenya Industrial",
          pay: 2800,
        },
      },
      setDemo: (d) => set((s) => ({ demo: { ...s.demo, ...d } })),
      resetDemo: () =>
        set((s) => ({
          demo: { ...s.demo, status: "idle", matchedDriver: null, matchTime: null },
        })),

      nav: { isScrolled: false, isMobileOpen: false, activeSection: "hero" },
      setNav: (n) => set((s) => ({ nav: { ...s.nav, ...n } })),

      hasSeenHero: false,
      setHasSeenHero: (v) => set({ hasSeenHero: v }),
      preferredRole: null,
      setPreferredRole: (r) => set({ preferredRole: r }),
    }),
    {
      name: "jor-website-state",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({
        hasSeenHero: state.hasSeenHero,
        preferredRole: state.preferredRole,
        waitlist: {
          count: state.waitlist.count,
          userSubmitted: state.waitlist.userSubmitted,
          userRole: state.waitlist.userRole,
          userName: state.waitlist.userName,
          position: state.waitlist.position,
        },
      }),
    }
  )
);
