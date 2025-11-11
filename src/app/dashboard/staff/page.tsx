import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import PromoteStaffForm from "./promotestaf";

export default async function StaffPage() {
  const { userId } = await auth();
  if (!userId) return <div>Unauthorized</div>;

  // Lookup the user in your DB
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });

  if (!user || user.role !== "ADMIN") {
    return <div>❌ Access denied. Admins only.</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Promote User to Staff</h1>
      <PromoteStaffForm />
    </div>
  );
}
