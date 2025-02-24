import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} StockyFive. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    )
}