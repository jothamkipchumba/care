"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type MedicalHistory = {
  id: string;
  condition: string;
  notes?: string;
  diagnosedAt?: string;
};

type Allergy = {
  id: string;
  substance: string;
  reaction?: string;
  severity?: string;
};

type Visit = {
  id: string;
  date: string;
  symptoms?: string;
  diagnosis?: string;
  notes?: string;
  staff?: { user?: { firstName?: string; lastName?: string } };
  medications?: { name: string; dosage?: string; frequency?: string }[];
};

export default function DashboardPage() {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [role, setRole] = useState<string | null>(null);

  const [historyForm, setHistoryForm] = useState({ condition: "", notes: "" });
  const [allergyForm, setAllergyForm] = useState({
    substance: "",
    reaction: "",
    severity: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchDashboardData() {
      // ✅ 1. Get user role
      const roleRes = await fetch("/api/auth/role");
      const roleData = await roleRes.json();
      setRole(roleData.role);

      // ✅ 2. Onboarding check
      const res = await fetch("/api/check-onboarding");
      const data = await res.json();

      if (!data.onboarded) {
        router.push("/onboarding");
        return;
      }

      // ✅ 3. Fetch medical history
      const historyRes = await fetch("/api/medical-history");
      setMedicalHistory(await historyRes.json());

      // ✅ 4. Fetch allergies
      const allergyRes = await fetch("/api/allergies");
      setAllergies(await allergyRes.json());

      // ✅ 5. Fetch visits
      const visitsRes = await fetch("/api/visits/getvisit");
      setVisits(await visitsRes.json());
    }

    fetchDashboardData();
  }, [router]);

  async function addMedicalHistory() {
    if (!historyForm.condition.trim()) return;

    const res = await fetch("/api/medical-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(historyForm),
    });

    if (res.ok) {
      const data: MedicalHistory = await res.json();
      setMedicalHistory([...medicalHistory, data]);
      setHistoryForm({ condition: "", notes: "" });
    }
  }

  async function addAllergy() {
    if (!allergyForm.substance.trim()) return;

    const res = await fetch("/api/allergies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allergyForm),
    });

    if (res.ok) {
      const data: Allergy = await res.json();
      setAllergies([...allergies, data]);
      setAllergyForm({ substance: "", reaction: "", severity: "" });
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* ✅ Responsive Header Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* ✅ ROLE-BASED ACTION BUTTONS (WRAP ON MOBILE) */}
        <div className="flex flex-wrap gap-3 justify-start md:justify-end max-w-full">
          {role && role !== "PATIENT" && (
            <Button
              className="bg-blue-600 text-white"
              onClick={() => router.push("/dashboard/visit")}
            >
              Visits
            </Button>
          )}

          {role && role !== "PATIENT" && (
            <Button
              className="bg-blue-600 text-white"
              onClick={() => router.push("/records")}
            >
              Records
            </Button>
          )}

          {role && role !== "PATIENT" && (
            <Button
              className="bg-blue-600 text-white"
              onClick={() => router.push("/dashboard/bookings")}
            >
              Bookings
            </Button>
          )}

          {role === "ADMIN" && (
            <Button
              className="bg-black text-white"
              onClick={() => router.push("/dashboard/staff")}
            >
              Staff Dashboard
            </Button>
          )}
        </div>
      </div>

      {/* ✅ Medical History Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Condition"
            value={historyForm.condition}
            onChange={(e) =>
              setHistoryForm({ ...historyForm, condition: e.target.value })
            }
          />
          <Input
            placeholder="Notes"
            value={historyForm.notes}
            onChange={(e) =>
              setHistoryForm({ ...historyForm, notes: e.target.value })
            }
          />
          <Button onClick={addMedicalHistory} className="md:w-32">
            Add
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicalHistory.map((h) => (
            <div
              key={h.id}
              className="border rounded-xl p-4 shadow-sm bg-blue-50"
            >
              <p className="font-semibold text-lg">{h.condition}</p>
              {h.notes && <p className="text-gray-700 mt-1">{h.notes}</p>}
              {h.diagnosedAt && (
                <p className="text-gray-500 text-sm mt-2">
                  Diagnosed: {new Date(h.diagnosedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Allergies Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Allergies</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Substance"
            value={allergyForm.substance}
            onChange={(e) =>
              setAllergyForm({ ...allergyForm, substance: e.target.value })
            }
          />
          <Input
            placeholder="Reaction"
            value={allergyForm.reaction}
            onChange={(e) =>
              setAllergyForm({ ...allergyForm, reaction: e.target.value })
            }
          />
          <Input
            placeholder="Severity"
            value={allergyForm.severity}
            onChange={(e) =>
              setAllergyForm({ ...allergyForm, severity: e.target.value })
            }
          />
          <Button onClick={addAllergy} className="md:w-32">
            Add
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allergies.map((a) => (
            <div
              key={a.id}
              className="border rounded-xl p-4 shadow-sm bg-red-50"
            >
              <p className="font-semibold text-lg">{a.substance}</p>
              {a.reaction && (
                <p className="text-gray-700 mt-1">Reaction: {a.reaction}</p>
              )}
              {a.severity && (
                <p className="text-gray-700 mt-1">Severity: {a.severity}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Visits Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Visits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visits.map((v) => (
            <div
              key={v.id}
              className="border rounded-xl p-4 shadow-sm bg-green-50"
            >
              <p className="font-semibold">
                Staff: {v.staff?.user?.firstName} {v.staff?.user?.lastName}
              </p>
              <p className="text-gray-700 mt-1">
                Date: {new Date(v.date).toLocaleString()}
              </p>
              {v.symptoms && <p>Symptoms: {v.symptoms}</p>}
              {v.diagnosis && <p>Diagnosis: {v.diagnosis}</p>}
              {v.notes && <p>Notes: {v.notes}</p>}
              {(v.medications ?? []).length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">Medications:</p>
                  <ul className="list-disc list-inside">
                    {(v.medications ?? []).map((m, i) => (
                      <li key={i}>
                        {m.name} {m.dosage && `- ${m.dosage}`}
                        {m.frequency && ` (${m.frequency})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
