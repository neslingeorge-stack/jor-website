import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher-server";

const DEMO_DRIVERS = [
  { id: "DRV-001", name: "Rajan Kumar", score: 4.9, tier: "Elite", distance: "2.3 km", eta: "8 min", match: 96 },
  { id: "DRV-002", name: "Suresh Nair", score: 4.7, tier: "Gold", distance: "3.1 km", eta: "11 min", match: 91 },
  { id: "DRV-003", name: "Anand Singh", score: 4.8, tier: "Platinum", distance: "4.5 km", eta: "14 min", match: 88 },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const driver = DEMO_DRIVERS[Math.floor(Math.random() * DEMO_DRIVERS.length)];

    await pusherServer.trigger("jor-demo", "matching-started", {
      jobId: body.jobId,
    });

    setTimeout(async () => {
      await pusherServer.trigger("jor-demo", "driver-matched", {
        driver,
        matchTime: Math.floor(Math.random() * 180 + 60),
      });
    }, 3000);

    return NextResponse.json({ status: "matching", jobId: body.jobId });
  } catch {
    return NextResponse.json(
      { error: "Failed to trigger match demo" },
      { status: 500 }
    );
  }
}
