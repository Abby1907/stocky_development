"use client";

import Link from "next/link";
import Footer from "../Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Navbar */}
      <header className="bg-gray-800 text-white py-4 px-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/">Stock Five</Link>
          </h1>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="text-center py-20">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Simplify Your Stock Management
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Keep track of your inventory, manage stock levels, and streamline your business operations with ease.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/register">
            <button className="px-6 py-3 text-lg bg-green-600 text-white rounded hover:bg-green-700">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded hover:bg-blue-700">
              Login
            </button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Why Choose Stocky Five?
        </h2>
        <div className="mt-12 grid gap-8 px-6 md:grid-cols-3">
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700">
              Real-Time Inventory Tracking
            </h3>
            <p className="mt-2 text-gray-600">
              Monitor stock levels and get instant updates on your inventory.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700">
              Easy Stock Updates
            </h3>
            <p className="mt-2 text-gray-600">
              Add or remove stock with just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700">
              Detailed Analytics
            </h3>
            <p className="mt-2 text-gray-600">
              Gain insights into your sales and stock trends.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
