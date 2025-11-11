"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  scheduledDate: string;
  timeSlot: string;
  reason?: string;
  notes?: string;
  status: string;
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string;
    address?: string;
    emergencyPhone?: string;
  };
};

export default function DoctorBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  async function loadBookings(date?: string) {
    setLoading(true);

    const url = date
      ? `/api/bookings/doctor?date=${date}`
      : "/api/bookings/doctor";

    const res = await fetch(url);
    const data = await res.json();

    setBookings(data);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  // ✅ When date changes, reload
  useEffect(() => {
    loadBookings(selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Patient Bookings</h1>

      {/* ✅ Date Filter */}
      <div className="mb-6 flex gap-4 items-center">
        <input
          type="date"
          className="border p-2 rounded-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {selectedDate && (
          <Button
            className="bg-black text-white"
            onClick={() => setSelectedDate("")}
          >
            Clear Filter
          </Button>
        )}
      </div>

      {loading && <p className="text-gray-600">Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-600">No bookings for this date.</p>
      )}

      {!loading && (
        <div className="grid gap-4">
          {bookings.map((b) => {
            const isOpen = expanded === b.id;

            return (
              <div
                key={b.id}
                className="border rounded-xl p-5 shadow-sm bg-blue-50"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {b.user.firstName} {b.user.lastName}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      b.status === "CONFIRMED"
                        ? "bg-green-600 text-white"
                        : b.status === "PENDING"
                        ? "bg-yellow-400 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <p className="mt-2 text-gray-800">
                  <strong>Date:</strong>{" "}
                  {new Date(b.scheduledDate).toLocaleDateString()}
                </p>

                <p className="text-gray-800">
                  <strong>Time Slot:</strong> {b.timeSlot.replace(/_/g, " ")}
                </p>

                {b.reason && (
                  <p className="text-gray-700 mt-2">
                    <strong>Reason:</strong> {b.reason}
                  </p>
                )}

                {/* ✅ TOGGLE BUTTON */}
                <Button
                  className="mt-4 bg-blue-600 text-white"
                  onClick={() => setExpanded(isOpen ? null : b.id)}
                >
                  {isOpen ? "Hide Info" : "View More"}
                </Button>

                {/* ✅ EXTRA INFO WHEN OPEN */}
                {isOpen && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-gray-700">
                      <strong>Phone:</strong> {b.user.phone || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {b.user.email || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Gender:</strong> {b.user.gender || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Date of Birth:</strong>{" "}
                      {b.user.dateOfBirth
                        ? new Date(b.user.dateOfBirth).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> {b.user.address || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Emergency Contact:</strong>{" "}
                      {b.user.emergencyPhone || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
