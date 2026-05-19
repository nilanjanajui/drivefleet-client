"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    Drive<span className="text-gray-800">Fleet</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link href="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link href="/cars" className="hover:text-blue-600 transition">Cars</Link>
                    {user && (
                        <>
                            <Link href="/my-bookings" className="hover:text-blue-600 transition">My Bookings</Link>
                            <Link href="/my-cars" className="hover:text-blue-600 transition">My Cars</Link>
                        </>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-500 hidden md:block">
                                {user.displayName || user.email}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}