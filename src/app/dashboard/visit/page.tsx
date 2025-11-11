"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  nationalId: string | null;
  dateOfBirth: string | null;
};

export default function VisitsPage() {
  const [search, setSearch] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    dateOfBirth: "",
    email: "",
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selected, setSelected] = useState<Patient | null>(null);

  const [visitData, setVisitData] = useState({
    staffEmail: "",
    symptoms: "",
    diagnosis: "",
    notes: "",
    vitals: {
      temperature: "",
      weight: "",
      height: "",
      bloodPressure: "",
      heartRate: "",
      respirationRate: "",
      oxygenSaturation: "",
    },
    medications: [
      {
        name: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
        prescribedBy: "",
      },
    ],
  });

  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    alert("Searching patients...");
    try {
      const params = new URLSearchParams(
        Object.entries(search).filter(([_, v]) => v.trim() !== "")
      );

      const res = await fetch(`/api/patients?${params.toString()}`);
      if (!res.ok) {
        alert("Failed to search patients");
        return;
      }

      const data = await res.json();
      setPatients(data);
      if (data.length === 0) alert("No patients found");
      else alert(`Found ${data.length} patients`);
    } catch {
      alert("Something went wrong during search");
    } finally {
      setIsSearching(false);
    }
  };

  const handleVisitSubmit = async () => {
    if (!selected) {
      alert("No patient selected");
      return;
    }
    if (!visitData.staffEmail) {
      alert("Staff email is required");
      return;
    }

    setIsSaving(true);
    alert("Saving visit...");

    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selected.id, ...visitData }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to save visit");
        return;
      }

      alert("✅ Visit saved successfully");
      setSelected(null);
      setVisitData({
        staffEmail: "",
        symptoms: "",
        diagnosis: "",
        notes: "",
        vitals: {
          temperature: "",
          weight: "",
          height: "",
          bloodPressure: "",
          heartRate: "",
          respirationRate: "",
          oxygenSaturation: "",
        },
        medications: [
          {
            name: "",
            dosage: "",
            frequency: "",
            startDate: "",
            endDate: "",
            prescribedBy: "",
          },
        ],
      });
    } catch {
      alert("Something went wrong while saving visit");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMedicationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...visitData.medications];
    updated[index][field as keyof (typeof updated)[number]] = value;
    setVisitData({ ...visitData, medications: updated });
  };

  const addMedication = () => {
    setVisitData({
      ...visitData,
      medications: [
        ...visitData.medications,
        {
          name: "",
          dosage: "",
          frequency: "",
          startDate: "",
          endDate: "",
          prescribedBy: "",
        },
      ],
    });
  };

  const removeMedication = (index: number) => {
    const updated = visitData.medications.filter((_, i) => i !== index);
    setVisitData({ ...visitData, medications: updated });
  };

  return (
    <div className="space-y-8">
      {/* 🔍 Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Patient</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>First Name</Label>
            <Input
              value={search.firstName}
              onChange={(e) =>
                setSearch({ ...search, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input
              value={search.lastName}
              onChange={(e) =>
                setSearch({ ...search, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <Label>National ID</Label>
            <Input
              value={search.nationalId}
              onChange={(e) =>
                setSearch({ ...search, nationalId: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={search.dateOfBirth}
              onChange={(e) =>
                setSearch({ ...search, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div className="col-span-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={search.email}
              onChange={(e) => setSearch({ ...search, email: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 📋 Results */}
      {patients.length > 0 && !selected && (
        <Card>
          <CardHeader>
            <CardTitle>Select Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Name</th>
                  <th>Email</th>
                  <th>National ID</th>
                  <th>DOB</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td>
                      {p.firstName} {p.lastName}
                    </td>
                    <td>{p.email || "-"}</td>
                    <td>{p.nationalId || "-"}</td>
                    <td>
                      {p.dateOfBirth
                        ? new Date(p.dateOfBirth).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <Button size="sm" onClick={() => setSelected(p)}>
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* 🩺 Visit Form */}
      {selected && (
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>
              New Visit for {selected.firstName} {selected.lastName}
            </CardTitle>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Unselect
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Staff Email</Label>
              <Input
                type="email"
                value={visitData.staffEmail}
                onChange={(e) =>
                  setVisitData({ ...visitData, staffEmail: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Symptoms</Label>
              <Textarea
                value={visitData.symptoms}
                onChange={(e) =>
                  setVisitData({ ...visitData, symptoms: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Diagnosis</Label>
              <Textarea
                value={visitData.diagnosis}
                onChange={(e) =>
                  setVisitData({ ...visitData, diagnosis: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                value={visitData.notes}
                onChange={(e) =>
                  setVisitData({ ...visitData, notes: e.target.value })
                }
              />
            </div>

            {/* Vitals */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(visitData.vitals).map(([key, val]) => (
                <div key={key}>
                  <Label className="capitalize">{key}</Label>
                  <Input
                    value={val}
                    onChange={(e) =>
                      setVisitData({
                        ...visitData,
                        vitals: { ...visitData.vitals, [key]: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </div>

            {/* Medications */}
            <div className="space-y-2">
              <Label>Medications</Label>
              {visitData.medications.map((med, idx) => (
                <div key={idx} className="grid grid-cols-6 gap-2 items-end">
                  <Input
                    placeholder="Name"
                    value={med.name}
                    onChange={(e) =>
                      handleMedicationChange(idx, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) =>
                      handleMedicationChange(idx, "dosage", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Frequency"
                    value={med.frequency}
                    onChange={(e) =>
                      handleMedicationChange(idx, "frequency", e.target.value)
                    }
                  />
                  <Input
                    type="date"
                    placeholder="Start Date"
                    value={med.startDate}
                    onChange={(e) =>
                      handleMedicationChange(idx, "startDate", e.target.value)
                    }
                  />
                  <Input
                    type="date"
                    placeholder="End Date"
                    value={med.endDate}
                    onChange={(e) =>
                      handleMedicationChange(idx, "endDate", e.target.value)
                    }
                  />
                  <div className="flex gap-1">
                    <Input
                      placeholder="Prescribed By"
                      value={med.prescribedBy}
                      onChange={(e) =>
                        handleMedicationChange(
                          idx,
                          "prescribedBy",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMedication(idx)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={addMedication}>+ Add Medication</Button>
            </div>

            <Button onClick={handleVisitSubmit} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Visit"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
