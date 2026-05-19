"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Cars", href: "/cars" },
    { label: "Add Car", href: "/cars/add" },
    { label: "My Bookings", href: "/my-bookings" },
];

export default function AppNavbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className="bg-white border-b border-gray-100 shadow-none"
            maxWidth="xl"
        >
            {/* Logo */}
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        DriveFleet
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Center Links */}
            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                {navLinks.map((link) => (
                    <NavbarItem key={link.href} isActive={pathname === link.href}>
                        <Link
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${pathname === link.href
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-blue-600"
                                }`}
                        >
                            {link.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Auth Buttons */}
            <NavbarContent justify="end">
                {user ? (
                    <>
                        <NavbarItem className="hidden md:flex">
                            <span className="text-sm text-gray-500 truncate max-w-35">
                                {user.displayName || user.email}
                            </span>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                onPress={logout}
                                variant="light"
                                color="danger"
                                size="sm"
                            >
                                Logout
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem className="hidden sm:flex">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                            >
                                Login
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                href="/register"
                                color="primary"
                                size="sm"
                                className="font-semibold"
                            >
                                Register
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarMenu className="pt-6">
                {navLinks.map((link) => (
                    <NavbarMenuItem key={link.href}>
                        <Link
                            href={link.href}
                            className={`text-base font-medium w-full block py-2 ${pathname === link.href ? "text-blue-600" : "text-gray-700"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {!user && (
                    <NavbarMenuItem>
                        <Link
                            href="/login"
                            className="text-base font-medium text-gray-700 block py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    </NavbarMenuItem>
                )}
            </NavbarMenu>
        </Navbar>
    );
}