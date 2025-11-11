// api/auth/role/route.ts
import { auth } from "@clerk/nextjs/server"; // or your auth lib
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ role: null }, { status: 401 });
  }

  // Fetch role from DB
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user) {
    return NextResponse.json({ role: null }, { status: 404 });
  }

  return NextResponse.json({ role: user.role });
}
