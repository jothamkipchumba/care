// app/api/check-onboarding/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // adjust path to your prisma client

export async function GET() {
  try {
    // 1. Get Clerk session
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Check if user exists in DB
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { onboarded: true, role: true },
    });

    if (!user) {
      return NextResponse.json(
        { onboarded: false, error: "User not found in DB" },
        { status: 404 }
      );
    }

    // 3. Return onboarding status
    return NextResponse.json({
      onboarded: user.onboarded,
      role: user.role,
    });
  } catch (error) {
    console.error("Error checking onboarding:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
