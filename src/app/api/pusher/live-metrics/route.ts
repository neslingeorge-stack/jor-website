import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher-server";

export async function POST() {
  try {
    const metrics = {
      activeDrivers: Math.floor(Math.random() * 200 + 1800),
      jobsToday: Math.floor(Math.random() * 100 + 340),
      avgMatchTime: (Math.random() * 2 + 3).toFixed(1),
      successRate: (Math.random() * 2 + 97).toFixed(1),
      timestamp: Date.now(),
    };
    await pusherServer.trigger("jor-live", "metrics-update", metrics);
    return NextResponse.json(metrics);
  } catch {
    return NextResponse.json(
      { error: "Failed to broadcast metrics" },
      { status: 500 }
    );
  }
}
