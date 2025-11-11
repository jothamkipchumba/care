import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure current user is ADMIN
    const admin = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Parse body
    const { email, staffRole, title, department, salary } = await req.json();

    // Find user by email
    const targetUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update role in User table
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: staffRole },
    });

    // Create/Update staff record
    const staff = await prisma.staff.upsert({
      where: { userId: updatedUser.id },
      update: { title, department, salary, role: staffRole },
      create: {
        userId: updatedUser.id,
        title,
        department,
        salary,
        role: staffRole,
      },
    });

    return NextResponse.json({ user: updatedUser, staff });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
