"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // <-- Lucide icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-black">
            Care<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 shadow">
                    Dashboard
                  </Button>
                </Link>
              </SignedIn>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 shadow">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            href="/about"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <SignedIn>
            <Link href="/dashboard">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 shadow"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Button>
            </Link>
          </SignedIn>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 shadow"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
