"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Car, BookOpen, List, LogOut } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Cars", href: "/cars" },
    { label: "Add Car", href: "/cars/add" },
    { label: "My Bookings", href: "/my-bookings" },
];

const dropdownLinks = [
    { label: "Add Car", href: "/cars/add", icon: Car },
    { label: "My Bookings", href: "/my-bookings", icon: BookOpen },
    { label: "My Added Cars", href: "/my-cars", icon: List },
];

export default function AppNavbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-blue-600 shrink-0">
                    DriveFleet
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden sm:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${
                                pathname === link.href
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="hidden sm:flex items-center gap-3">
                    {user ? (
                        // Profile dropdown
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                            >
                                {/* Avatar */}
                                {user.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        alt="avatar"
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                                        {(user.displayName || user.email || "U")[0].toUpperCase()}
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-700 max-w-30 truncate">
                                    {user.displayName || user.email}
                                </span>
                                <ChevronDown
                                    size={14}
                                    className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                                    {dropdownLinks.map(({ label, href, icon: Icon }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            <Icon size={15} className="text-gray-400" />
                                            {label}
                                        </Link>
                                    ))}
                                    <hr className="border-gray-100 my-1" />
                                    <button
                                        onClick={() => { logout(); setIsDropdownOpen(false); }}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                                    >
                                        <LogOut size={15} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="sm:hidden text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-base font-medium py-2.5 block transition-colors ${
                                pathname === link.href
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-blue-600"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <hr className="border-gray-100 my-2" />

                    {user ? (
                        <>
                            <div className="flex items-center gap-3 py-2">
                                {user.photoURL ? (
                                    <Image src={user.photoURL} alt="avatar" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                                        {(user.displayName || user.email || "U")[0].toUpperCase()}
                                    </div>
                                )}
                                <span className="text-sm text-gray-500 truncate">
                                    {user.displayName || user.email}
                                </span>
                            </div>
                            {dropdownLinks.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 py-2.5 text-sm text-gray-700"
                                >
                                    <Icon size={15} className="text-gray-400" />
                                    {label}
                                </Link>
                            ))}
                            <button
                                onClick={() => { logout(); setIsMenuOpen(false); }}
                                className="flex items-center gap-3 py-2.5 text-sm text-red-500 text-left"
                            >
                                <LogOut size={15} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-base font-medium text-gray-700 py-2.5 block"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-base font-semibold text-blue-600 py-2.5 block"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}