"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
            Contact Care Hospital
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We are here to assist you. Reach out to us anytime.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Location</h2>
            <p className="text-gray-700">
              123 Health St.
              <br />
              Nairobi, Kenya
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Phone</h2>
            <p className="text-gray-700">+254 700 123 456</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Email</h2>
            <p className="text-gray-700">contact@carehospital.com</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Our Location
          </h2>
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.234987654321!2d36.821946!3d-1.292065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173b1d1e0b1d%3A0x5e3c6c6b7aeb9f34!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Feedback Form */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Send Us Feedback
          </h2>
          <form className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-700">
                Name
              </Label>
              <Input id="name" placeholder="Your Name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-gray-700">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="mt-1"
                rows={5}
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
