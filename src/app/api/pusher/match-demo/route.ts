import { NextResponse } from "next/server";
import { getPusherServer } from "@/lib/pusher-server";

const DEMO_DRIVERS = [
  { id: "DRV-001", name: "Rajan Kumar", score: 4.9, tier: "Elite", distance: "2.3 km", eta: "8 min", match: 96 },
  { id: "DRV-002", name: "Suresh Nair", score: 4.7, tier: "Gold", distance: "3.1 km", eta: "11 min", match: 91 },
  { id: "DRV-003", name: "Anand Singh", score: 4.8, tier: "Platinum", distance: "4.5 km", eta: "14 min", match: 88 },
];

const MAX_JOB_ID_LENGTH = 100;

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const rawJobId =
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>).jobId
        : undefined;
    const jobId =
      typeof rawJobId === "string" && rawJobId.length <= MAX_JOB_ID_LENGTH
        ? rawJobId
        : `demo-${Date.now()}`;

    const driver = DEMO_DRIVERS[Math.floor(Math.random() * DEMO_DRIVERS.length)];
    const pusher = getPusherServer();

    await pusher.trigger("jor-demo", "matching-started", { jobId });

    // Simulate match latency. The callback owns its own error handling so a
    // failed broadcast can never surface as an unhandled rejection.
    setTimeout(() => {
      pusher
        .trigger("jor-demo", "driver-matched", {
          driver,
          matchTime: Math.floor(Math.random() * 180 + 60),
        })
        .catch(() => {
          // Non-critical demo broadcast — safe to ignore on failure.
        });
    }, 3000);

    return NextResponse.json({ status: "matching", jobId });
  } catch {
    return NextResponse.json(
      { error: "Failed to trigger match demo" },
      { status: 500 }
    );
  }
}
