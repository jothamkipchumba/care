import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🔐 Fetch current user role
  const currentUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true, id: true },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 🚫 Patients can only access their own profile
  if (currentUser.role === "PATIENT" && currentUser.id !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const patient = await prisma.user.findUnique({
      where: { id },
      include: {
        allergies: true,
        healthRecords: true,
        medications: true,
        medicalHistory: true,
        visits: { orderBy: { date: "desc" }, take: 10 },
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data: patient });
  } catch (err) {
    console.error("Profile API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
