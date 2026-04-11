import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher-server";

let waitlistCount = 47;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, phone, name, company, fleetSize, licenseType } = body;

    if (!type || !phone) {
      return NextResponse.json(
        { success: false, error: "Phone and type are required" },
        { status: 400 }
      );
    }

    waitlistCount++;

    try {
      await pusherServer.trigger("jor-waitlist", "new-signup", {
        count: waitlistCount,
        role: type,
        city: "Bangalore",
        timestamp: Date.now(),
      });
    } catch {
      // Pusher broadcast is non-critical — continue even if it fails
    }

    return NextResponse.json({
      success: true,
      data: {
        message:
          type === "fleet"
            ? "You are on the fleet owner priority list."
            : "You are registered as a driver.",
        position: waitlistCount,
        name,
        company,
        fleetSize,
        licenseType,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ count: waitlistCount });
}
