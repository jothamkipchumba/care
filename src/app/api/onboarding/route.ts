import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import prisma from "../../../lib/prisma";
import { prisma } from "../../../lib/prisma";
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser(); // get Clerk's user info
    if (!clerkUser?.emailAddresses[0]?.emailAddress) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const body = await req.json();
    console.log("Onboarding data:", body);

    // Try to find existing user (in case they somehow already exist)
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (user) {
      return NextResponse.json(
        { error: "User already onboarded" },
        { status: 400 }
      );
    }

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
          gender: body.gender,
          address: body.address,
          emergencyPhone: body.emergencyPhone,
          onboarded: true,
        },
      });
    } else {
      // If somehow they already exist, just update missing info
      user = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
          gender: body.gender,
          address: body.address,
          emergencyPhone: body.emergencyPhone,
          onboarded: true,
        },
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
