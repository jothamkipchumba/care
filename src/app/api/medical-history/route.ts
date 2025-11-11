import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { medicalHistory: true },
  });

  return NextResponse.json(user?.medicalHistory || []);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { condition, notes, diagnosedAt } = body;

  const newHistory = await prisma.medicalHistory.create({
    data: {
      userId: (await prisma.user.findUnique({ where: { clerkId: userId } }))!
        .id,
      condition,
      notes,
      diagnosedAt: diagnosedAt ? new Date(diagnosedAt) : undefined,
    },
  });

  return NextResponse.json(newHistory);
}
