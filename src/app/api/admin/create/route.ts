import { NextResponse } from "next/server";
// import prisma from "../../../../lib/prisma"; // adjust path to your prisma client
import { prisma } from "../../../../lib/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clerkId, email, firstName, lastName, phone } = body;

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "clerkId and email are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        clerkId,
        email,
        firstName,
        lastName,
        phone,
        role: "ADMIN",
        onboarded: true, // Admin doesn't need onboarding
      },
    });

    return NextResponse.json({ admin }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
