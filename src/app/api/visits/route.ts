import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    console.log("🔐 Authenticating user...");
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    console.log("🔎 Fetching current user from DB...");
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });

    if (!currentUser) {
      console.error("❌ Clerk user exists but not found in DB");
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    if (currentUser.role === "PATIENT") {
      return NextResponse.json(
        { error: "Patients cannot create visits" },
        { status: 403 }
      );
    }

    const body = await req.json();
    console.log("📦 Incoming body:", body);

    const {
      userId, // patient id
      staffEmail,
      symptoms,
      diagnosis,
      notes,
      vitals = {},
      medications = [],
    } = body;

    if (!userId || !staffEmail) {
      return NextResponse.json(
        { error: "Missing required fields: userId or staffEmail" },
        { status: 400 }
      );
    }

    console.log("👩‍⚕️ Finding staff by email...");
    const staff = await prisma.staff.findFirst({
      where: { user: { email: staffEmail } },
      include: { user: true },
    });

    if (!staff) {
      console.error("❌ No staff found with that email");
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    // Filter out empty medications
    const validMedications = medications.filter(
      (m: any) => m.name?.trim() || m.dosage?.trim() || m.frequency?.trim()
    );

    // Build visit data
    const visitData: any = {
      userId,
      staffId: staff.id,
      symptoms,
      diagnosis,
      notes,
      temperature: vitals.temperature ? parseFloat(vitals.temperature) : null,
      weight: vitals.weight ? parseFloat(vitals.weight) : null,
      height: vitals.height ? parseFloat(vitals.height) : null,
      bloodPressure: vitals.bloodPressure || null,
      heartRate: vitals.heartRate ? parseInt(vitals.heartRate) : null,
      respirationRate: vitals.respirationRate
        ? parseInt(vitals.respirationRate)
        : null,
      oxygenSaturation: vitals.oxygenSaturation
        ? parseInt(vitals.oxygenSaturation)
        : null,
    };

    if (validMedications.length > 0) {
      visitData.medications = {
        create: validMedications.map((m: any) => ({
          userId,
          name: m.name,
          dosage: m.dosage,
          frequency: m.frequency,
          startDate: m.startDate ? new Date(m.startDate) : null,
          endDate: m.endDate ? new Date(m.endDate) : null,
          prescribedBy: m.prescribedBy,
        })),
      };
    }

    console.log("📝 Creating visit record...");
    const visit = await prisma.visit.create({
      data: visitData,
      include: { medications: true },
    });

    console.log("✅ Visit created successfully");
    return NextResponse.json(visit);
  } catch (err: any) {
    console.error("💥 Server error:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
