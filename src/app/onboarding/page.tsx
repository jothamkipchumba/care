"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    // include gender state in the body
    body.gender = gender;

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      alert("Info saved! Welcome to Care");
      router.push("/"); // redirect after onboarding
    } else if (res.status === 400) {
      alert("User already exists");
    } else {
      alert("Failed to save info");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-50 p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Complete Your Onboarding
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" placeholder="Doe" required />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" placeholder="+1234567890" />
          </div>

          {/* Date of Birth */}
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input type="date" id="dateOfBirth" name="dateOfBirth" />
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <div className="flex gap-6 mt-2">
              {["Male", "Female", "Other"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={() => setGender(option)}
                    required
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="123 Main St" />
          </div>

          {/* Emergency Phone */}
          <div>
            <Label htmlFor="emergencyPhone">Emergency Phone</Label>
            <Input
              id="emergencyPhone"
              name="emergencyPhone"
              placeholder="+1234567890"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
            disabled={loading}
          >
            {loading ? "Saving..." : "Complete Onboarding"}
          </Button>
        </form>
      </div>
    </div>
  );
}
