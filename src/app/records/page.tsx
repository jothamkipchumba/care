"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type PatientBrief = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  email?: string | null;
  nationalId?: string | null;
};

type PatientFull = PatientBrief & {
  allergies?: {
    id: string;
    substance: string;
    reaction?: string;
    severity?: string;
  }[];
  medicalHistory?: { id: string; condition: string; notes?: string }[];
  visits?: {
    id: string;
    date: string;
    symptoms?: string;
    diagnosis?: string;
    notes?: string;
  }[];
};

export default function PatientRecordsPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<PatientBrief[]>([]);
  const [selected, setSelected] = useState<PatientFull | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  // ✅ Check role on mount
  useEffect(() => {
    async function checkRole() {
      try {
        const res = await fetch("/api/auth/role");
        if (!res.ok) {
          router.push("/unauthorized");
          return;
        }
        const { role } = await res.json();
        if (role === "PATIENT") {
          router.push("/unauthorized");
          return;
        }
      } catch (err) {
        console.error("Role check failed", err);
        router.push("/unauthorized");
      } finally {
        setCheckingRole(false);
      }
    }
    checkRole();
  }, [router]);

  // 🔍 Search patients
  async function searchPatients(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/patients/records?q=${encodeURIComponent(q)}`
      );
      if (!res.ok) throw new Error(`Search failed: ${res.status}`);
      const json = await res.json();
      setResults(json.data || []);
      setSelected(null);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  // 📂 Load full patient details
  async function loadPatient(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/patients/${id}`);
      if (!res.ok) throw new Error(`Load failed: ${res.status}`);
      const json = await res.json();
      setSelected(json.data || null);
    } catch (err) {
      console.error("Load patient error:", err);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  }

  // 🚫 While checking role, show placeholder
  if (checkingRole) {
    return <div className="p-6">Checking permissions...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="bg-white border shadow">
        <CardHeader>
          <CardTitle className="text-black">Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <form onSubmit={searchPatients} className="flex gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter name, phone, or ID..."
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-6">
            {/* Results List */}
            <div>
              <h4 className="font-semibold text-blue-700">Results</h4>
              <ul>
                {results.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => loadPatient(p.id)}
                    className={`p-2 border rounded my-2 cursor-pointer ${
                      selected?.id === p.id ? "bg-blue-100" : "hover:bg-blue-50"
                    }`}
                  >
                    <div className="font-medium text-black">
                      {p.firstName} {p.lastName}
                    </div>
                    <div className="text-sm text-black/70">
                      {p.phone || p.email || p.nationalId || "No contact info"}
                    </div>
                  </li>
                ))}
                {!loading && results.length === 0 && (
                  <div className="text-sm text-black/50 mt-2">No results</div>
                )}
              </ul>
            </div>

            {/* Details */}
            <div className="col-span-2">
              {selected ? (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="p-4 border rounded bg-blue-50">
                    <h3 className="text-lg font-bold text-black">
                      {selected.firstName} {selected.lastName}
                    </h3>
                    <p className="text-sm text-black/70">
                      Phone: {selected.phone || "—"}
                    </p>
                    <p className="text-sm text-black/70">
                      Email: {selected.email || "—"}
                    </p>
                    <p className="text-sm text-black/70">
                      National ID: {selected.nationalId || "—"}
                    </p>
                  </div>

                  {/* Allergies */}
                  <section>
                    <h4 className="font-semibold text-black">Allergies</h4>
                    {selected.allergies?.length ? (
                      <ul className="list-disc ml-5 text-sm text-black">
                        {selected.allergies.map((a) => (
                          <li key={a.id}>
                            {a.substance} — {a.reaction || "unspecified"}{" "}
                            {a.severity ? `(${a.severity})` : ""}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-black/60">
                        No allergies recorded
                      </p>
                    )}
                  </section>

                  {/* Medical History */}
                  <section>
                    <h4 className="font-semibold text-black">
                      Medical History
                    </h4>
                    {selected.medicalHistory?.length ? (
                      <ul className="list-disc ml-5 text-sm text-black">
                        {selected.medicalHistory.map((m) => (
                          <li key={m.id}>
                            {m.condition} — {m.notes || ""}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-black/60">No history found</p>
                    )}
                  </section>

                  {/* Visits */}
                  <section>
                    <h4 className="font-semibold text-black">Recent Visits</h4>
                    {selected.visits?.length ? (
                      <ul className="space-y-3">
                        {selected.visits.map((v) => (
                          <li
                            key={v.id}
                            className="p-3 border rounded bg-gray-50"
                          >
                            <p className="text-sm text-black/70">
                              <strong>Date:</strong>{" "}
                              {new Date(v.date).toLocaleDateString()}
                            </p>
                            {v.symptoms && (
                              <p className="text-sm text-black/70">
                                <strong>Symptoms:</strong> {v.symptoms}
                              </p>
                            )}
                            {v.diagnosis && (
                              <p className="text-sm text-black/70">
                                <strong>Diagnosis:</strong> {v.diagnosis}
                              </p>
                            )}
                            {v.notes && (
                              <p className="text-sm text-black/70">
                                <strong>Notes:</strong> {v.notes}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-black/60">No visits found</p>
                    )}
                  </section>
                </div>
              ) : (
                <div className="p-6 border rounded text-black/70">
                  Select a patient to view details
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
