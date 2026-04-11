"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { LivePulse } from "@/components/ui/LivePulse";
import { fadeUp, staggerContainer } from "@/lib/animations";

const REVENUE_DATA = [
  { label: "Mon", rev: 4.1, trips: 312 },
  { label: "Tue", rev: 4.8, trips: 348 },
  { label: "Wed", rev: 5.2, trips: 374 },
  { label: "Thu", rev: 4.7, trips: 331 },
  { label: "Fri", rev: 6.1, trips: 421 },
  { label: "Sat", rev: 7.3, trips: 488 },
  { label: "Sun", rev: 5.8, trips: 402 },
];

const SERVICE_DATA = [
  { name: "Freight", value: 42, color: "#FF8C00" },
  { name: "Container", value: 24, color: "#3B82F6" },
  { name: "Tanker", value: 18, color: "#F5A623" },
  { name: "Tipper", value: 10, color: "#10B981" },
  { name: "Others", value: 6, color: "#666666" },
];

const chartTooltipStyle = {
  backgroundColor: "#161616",
  border: "1px solid #333333",
  borderRadius: "8px",
  color: "#FFFFFF",
  fontSize: "12px",
};

export function AdminPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-void py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-ember"
          >
            ADMIN DASHBOARD
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[var(--text-display-md)] font-black leading-[0.92] text-white"
          >
            This is what JOR looks like.
            <br />
            <span className="text-ember">From the inside.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl font-body text-lg text-silver"
          >
            Fleet owners get a full operations dashboard. Admins get real-time
            visibility into every job, driver, and rupee.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="relative rounded-2xl border border-steel/20 bg-carbon/80 shadow-2xl shadow-ember/5 backdrop-blur-sm"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-steel/20 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-alert/80" />
              <div className="h-3 w-3 rounded-full bg-pending/80" />
              <div className="h-3 w-3 rounded-full bg-verified/80" />
            </div>
            <div className="ml-4 flex-1 rounded-md bg-graphite/50 px-4 py-1">
              <span className="font-mono text-xs text-silver">
                admin.jor.in &middot; Live Dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LivePulse color="ember" />
              <span className="font-mono text-xs text-ember">
                LIVE &middot; Bangalore
              </span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6">
            {/* KPI pills */}
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-graphite/50 px-4 py-2">
                <LivePulse color="verified" />
                <span className="font-mono text-sm font-semibold text-white">
                  1,842
                </span>
                <span className="text-xs text-silver">Active Drivers</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-graphite/50 px-4 py-2">
                <LivePulse color="ember" />
                <span className="font-mono text-sm font-semibold text-white">
                  387
                </span>
                <span className="text-xs text-silver">Jobs Today</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-graphite/50 px-4 py-2">
                <span className="font-mono text-sm font-semibold text-amber">
                  4.2 min
                </span>
                <span className="text-xs text-silver">Avg Match Time</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-graphite/50 px-4 py-2">
                <span className="font-mono text-sm font-semibold text-verified">
                  97.8%
                </span>
                <span className="text-xs text-silver">Success Rate</span>
              </div>
            </div>

            {/* Charts grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Revenue sparkline */}
              <div className="rounded-xl border border-steel/20 bg-obsidian/50 p-4">
                <p className="mb-3 font-heading text-sm font-semibold text-silver">
                  Revenue (7-day) — ₹ Lakhs
                </p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={REVENUE_DATA}>
                    <XAxis
                      dataKey="label"
                      stroke="#666666"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis stroke="#666666" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Line
                      type="monotone"
                      dataKey="rev"
                      stroke="#FF8C00"
                      strokeWidth={2}
                      dot={{ fill: "#FF8C00", r: 3 }}
                      activeDot={{ r: 5, fill: "#FF6B00" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Trip volume */}
              <div className="rounded-xl border border-steel/20 bg-obsidian/50 p-4">
                <p className="mb-3 font-heading text-sm font-semibold text-silver">
                  Trip Volume (Weekly)
                </p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={REVENUE_DATA}>
                    <XAxis
                      dataKey="label"
                      stroke="#666666"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis stroke="#666666" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Bar dataKey="trips" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Area chart - driver onboarding */}
              <div className="rounded-xl border border-steel/20 bg-obsidian/50 p-4">
                <p className="mb-3 font-heading text-sm font-semibold text-silver">
                  Driver Onboarding Trend
                </p>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={REVENUE_DATA}>
                    <XAxis
                      dataKey="label"
                      stroke="#666666"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis stroke="#666666" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <defs>
                      <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="trips"
                      stroke="#F5A623"
                      strokeWidth={2}
                      fill="url(#amberGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Pie chart - service distribution */}
              <div className="rounded-xl border border-steel/20 bg-obsidian/50 p-4">
                <p className="mb-3 font-heading text-sm font-semibold text-silver">
                  Service Distribution
                </p>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={160}>
                    <PieChart>
                      <Pie
                        data={SERVICE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {SERVICE_DATA.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={chartTooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-1.5">
                    {SERVICE_DATA.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-mono text-xs text-silver">
                          {item.name} {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AdminPreview;
