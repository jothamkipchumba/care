import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// GET -> search patients
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🔐 Fetch the current user’s role
  const currentUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 🚫 Block patients from accessing this API
  if (currentUser.role === "PATIENT") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ✅ Allow staff/admin/etc.
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";

  try {
    const patients = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: q, mode: "insensitive" } },
          { lastName: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { phone: { contains: q, mode: "insensitive" } },
          { nationalId: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 20,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        nationalId: true,
      },
    });

    return NextResponse.json({ data: patients });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
