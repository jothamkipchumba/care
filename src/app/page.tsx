// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Welcome to <span className="text-blue-600">Care</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your health, simplified. Book appointments, track records, and
              connect with doctors — all in one place.
            </p>
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md">
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="px-6 py-3 rounded-2xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-10 md:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1706267701238-b4d69fc8f640?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Healthcare illustration"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Our <span className="text-blue-600">Services</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Patient Management
                </h3>
                <p className="text-gray-600">
                  Keep track of medical history, allergies, and medications in
                  one secure place.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Appointments</h3>
                <p className="text-gray-600">
                  Schedule visits with doctors and manage your health seamlessly
                  online.
                </p>
                <div>
                  <Link href="/booking" className="mt-4 inline-block">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl shadow-md">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Health Records</h3>
                <p className="text-gray-600">
                  Access your records anytime and get valuable insights from
                  your health data.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md flex items-center gap-2">
                Get Started Today <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
