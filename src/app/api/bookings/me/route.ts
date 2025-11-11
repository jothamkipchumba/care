// src/app/api/bookings/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { scheduledDate: "asc" },
  });

  return NextResponse.json({ bookings });
}
