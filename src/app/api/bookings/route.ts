import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ bookedSlots: [] });
  }

  const bookings = await prisma.booking.findMany({
    where: { scheduledDate: new Date(date) },
    select: { timeSlot: true },
  });

  return NextResponse.json({ bookedSlots: bookings.map((b) => b.timeSlot) });
}

export async function POST(req: Request) {
  try {
    // 1️⃣ Get the currently logged-in Clerk user
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Find your internal User by clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 3️⃣ Get booking details from request
    const body = await req.json();
    const { date, timeSlot } = body;
    const bookingDate = new Date(date);

    // 4️⃣ Enforce max 5 bookings per day
    const count = await prisma.booking.count({
      where: { scheduledDate: bookingDate },
    });
    if (count >= 5) {
      return NextResponse.json(
        { message: "Maximum bookings reached for this day" },
        { status: 400 }
      );
    }

    // 5️⃣ Prevent double-booking same slot
    const existing = await prisma.booking.findFirst({
      where: { scheduledDate: bookingDate, timeSlot },
    });
    if (existing) {
      return NextResponse.json(
        { message: "This timeslot is already booked" },
        { status: 400 }
      );
    }

    // 6️⃣ Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id, // ✅ use your internal user UUID
        scheduledDate: bookingDate,
        timeSlot,
      },
    });

    return NextResponse.json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    return NextResponse.json({ message: "Failed to book" }, { status: 500 });
  }
}
