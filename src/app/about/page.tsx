"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
            Welcome to Care Hospital
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Providing compassionate healthcare services with excellence and
            integrity.
          </p>
        </div>

        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">
              Care Hospital has been at the forefront of delivering top-quality
              medical services. Our dedicated team of healthcare professionals
              ensures every patient receives personalized care.
            </p>
            <p className="text-gray-700">
              We combine advanced technology with compassionate care, making us
              a trusted healthcare provider in the community.
            </p>
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
              Learn More
            </Button>
          </div>
          <div className="relative w-full h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032"
              alt="Care Hospital"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Background Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Background</h2>
          <p className="text-gray-700 mb-4">
            Established in 2005, Care Hospital has grown into a full-service
            medical facility, serving thousands of patients annually. We focus
            on quality, patient satisfaction, and community wellness.
          </p>
          <p className="text-gray-700">
            Our hospital combines modern medical technology with experienced
            professionals to ensure the best care for every patient.
          </p>
        </div>

        {/* Management Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-600">Dr. Jane Smith</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Chief Medical Officer</CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-600">Mr. John Doe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Hospital Administrator</CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-600">
                  Mrs. Mary Johnson
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Head of Nursing</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hospital Departments Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            Hospital Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Emergency</CardTitle>
                <CardDescription>
                  24/7 emergency care for urgent medical needs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Cardiology</CardTitle>
                <CardDescription>
                  Specialized care for heart-related conditions.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Pediatrics</CardTitle>
                <CardDescription>
                  Comprehensive care for children and adolescents.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Radiology</CardTitle>
                <CardDescription>
                  Advanced imaging and diagnostic services.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Surgery</CardTitle>
                <CardDescription>
                  Expert surgical services with modern facilities.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Pharmacy</CardTitle>
                <CardDescription>
                  Well-stocked pharmacy for all prescription needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-600">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                To provide exceptional and accessible healthcare services while
                maintaining a patient-first approach and promoting well-being in
                the community.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-600">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                To be recognized as a leading hospital delivering innovative,
                compassionate, and high-quality healthcare services to all.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Compassion</CardTitle>
                <CardDescription>
                  We treat every patient with care and empathy.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Integrity</CardTitle>
                <CardDescription>
                  We uphold honesty and ethical standards in all our services.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent>
                <CardTitle className="text-blue-600">Excellence</CardTitle>
                <CardDescription>
                  We strive for the highest quality in medical care and patient
                  experience.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
