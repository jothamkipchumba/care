import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Verify role
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || user.role === "PATIENT") {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const url = new URL(req.url);
  const dateFilter = url.searchParams.get("date"); // yyyy-mm-dd

  let whereClause = {};

  // ✅ If a date filter exists, only include that date
  if (dateFilter) {
    whereClause = {
      scheduledDate: {
        gte: new Date(dateFilter + "T00:00:00"),
        lte: new Date(dateFilter + "T23:59:59"),
      },
    };
  }

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    orderBy: [{ scheduledDate: "asc" }, { timeSlot: "asc" }],
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
          gender: true,
          dateOfBirth: true,
          address: true,
          emergencyPhone: true,
        },
      },
    },
  });

  return NextResponse.json(bookings);
}
