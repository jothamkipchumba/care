import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const nationalId = searchParams.get("nationalId");
  const dateOfBirth = searchParams.get("dateOfBirth");
  const email = searchParams.get("email");

  try {
    const patients = await prisma.user.findMany({
      where: {
        role: "PATIENT",
        AND: [
          firstName
            ? { firstName: { contains: firstName, mode: "insensitive" } }
            : {},
          lastName
            ? { lastName: { contains: lastName, mode: "insensitive" } }
            : {},
          nationalId ? { nationalId: { equals: nationalId } } : {},
          dateOfBirth ? { dateOfBirth: new Date(dateOfBirth) } : {},
          email ? { email: { contains: email, mode: "insensitive" } } : {},
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        nationalId: true,
        dateOfBirth: true,
      },
    });

    return NextResponse.json(patients);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
