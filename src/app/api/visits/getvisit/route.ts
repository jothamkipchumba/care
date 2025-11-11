// /app/api/visits/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user in your database
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });
    console.log("Current User:", currentUser);

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let visits;
    if (currentUser.role === "PATIENT") {
      // If the user is a patient, show only their visits
      visits = await prisma.visit.findMany({
        where: { userId: currentUser.id },
        include: {
          staff: { include: { user: true } },
          medications: true,
        },
        orderBy: { date: "desc" },
      });
    } else {
      // Staff or admin can see all visits
      visits = await prisma.visit.findMany({
        include: {
          user: true,
          staff: { include: { user: true } },
          medications: true,
        },
        orderBy: { date: "desc" },
      });
    }

    return NextResponse.json(visits);
  } catch (err: any) {
    console.error("Error fetching visits:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
