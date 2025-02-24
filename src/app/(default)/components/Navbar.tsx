"use client";
import Link from "next/link";

export default function Navbar() {
    return (
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
    );
}