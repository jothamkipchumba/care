"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PromoteStaffForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("DOCTOR");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const promoteStaff = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/staff/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        staffRole: role,
        title,
        department,
        salary: parseFloat(salary),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage(`✅ ${email} promoted to ${role}`);
      setEmail("");
      setTitle("");
      setDepartment("");
      setSalary("");
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6">
      <div>
        <Label>User Email</Label>
        <Input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <Label>Staff Role</Label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded-xl p-2 w-full"
        >
          <option value="DOCTOR">Doctor</option>
          <option value="NURSE">Nurse</option>
          <option value="RECEPTIONIST">Receptionist</option>
          <option value="ACCOUNTANT">Accountant</option>
          <option value="LAB_TECH">Lab Technician</option>
          <option value="PHARMACIST">Pharmacist</option>
        </select>
      </div>

      <div>
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="e.g. Dr."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <Label>Department</Label>
        <Input
          type="text"
          placeholder="e.g. Cardiology"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <div>
        <Label>Salary</Label>
        <Input
          type="number"
          placeholder="e.g. 50000"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      <Button onClick={promoteStaff} disabled={loading} className="w-full">
        {loading ? "Promoting..." : "Promote"}
      </Button>

      {message && (
        <div
          className={`p-3 rounded-xl text-center ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
