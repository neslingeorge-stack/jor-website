import { NextResponse } from "next/server";
import { getPusherServer } from "@/lib/pusher-server";

// In-memory demo counter. This intentionally does not persist across cold
// starts or scale horizontally — it only drives the live "social proof"
// animation and is not a source of truth.
let waitlistCount = 47;

const ALLOWED_TYPES = ["driver", "fleet"] as const;
type SignupType = (typeof ALLOWED_TYPES)[number];

// Defensive caps so a single request can never allocate unbounded memory.
const MAX_FIELD_LENGTH = 200;
const MAX_BODY_BYTES = 10_000;

/** Indian phone numbers: optional +91/0 prefix followed by a 10-digit number. */
const PHONE_PATTERN = /^(?:\+?91|0)?[6-9]\d{9}$/;

function asCleanString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_FIELD_LENGTH) return undefined;
  return trimmed;
}

export async function POST(request: Request) {
  try {
    // Reject oversized payloads up front when the client declares a length.
    const declaredLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Payload too large" },
        { status: 413 }
      );
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Payload too large" },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON" },
        { status: 400 }
      );
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const type = asCleanString(data.type);
    const phone = asCleanString(data.phone);

    if (!type || !ALLOWED_TYPES.includes(type as SignupType)) {
      return NextResponse.json(
        { success: false, error: "A valid type ('driver' or 'fleet') is required" },
        { status: 400 }
      );
    }

    if (!phone || !PHONE_PATTERN.test(phone)) {
      return NextResponse.json(
        { success: false, error: "A valid phone number is required" },
        { status: 400 }
      );
    }

    // Optional fields are sanitised; anything malformed is simply dropped.
    const name = asCleanString(data.name);
    const company = asCleanString(data.company);
    const licenseType = asCleanString(data.licenseType);
    const fleetSizeRaw = data.fleetSize;
    const fleetSize =
      typeof fleetSizeRaw === "number" && Number.isFinite(fleetSizeRaw)
        ? fleetSizeRaw
        : asCleanString(fleetSizeRaw);

    waitlistCount++;

    try {
      await getPusherServer().trigger("jor-waitlist", "new-signup", {
        count: waitlistCount,
        role: type,
        city: "Bangalore",
        timestamp: Date.now(),
      });
    } catch {
      // Pusher broadcast is non-critical — continue even if it fails.
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
