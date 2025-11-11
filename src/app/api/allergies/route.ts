import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { allergies: true },
  });

  return NextResponse.json(user?.allergies || []);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { substance, reaction, severity } = body;

  const newAllergy = await prisma.allergy.create({
    data: {
      userId: (await prisma.user.findUnique({ where: { clerkId: userId } }))!
        .id,
      substance,
      reaction,
      severity,
    },
  });

  return NextResponse.json(newAllergy);
}
