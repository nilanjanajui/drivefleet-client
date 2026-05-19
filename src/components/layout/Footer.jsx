import { Divider } from "@heroui/react";
import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Linkedin, Globe } from "lucide-react";

const brandLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
];

const quickLinks = [
    { label: "Explore Cars", href: "/cars" },
    { label: "Become a Host", href: "/register" },
    { label: "Booking Guide", href: "/guide" },
    { label: "Safety", href: "/safety" },
];

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <Link href="/" className="text-xl font-bold text-white block mb-3">
                        DriveFleet
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400 mb-6">
                        Redefining the rental experience through premium technology and
                        world-class service.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Twitter, Linkedin, Globe].map((Icon, i) => (
                            <a key={i} href="#" className="hover:text-white transition">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Brand Links */}
                <div>
                    <h4 className="text-white font-semibold text-sm mb-5">Brand</h4>
                    <ul className="space-y-3">
                        {brandLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-gray-400 hover:text-white transition"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold text-sm mb-5">Quick Links</h4>
                    <ul className="space-y-3">
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-gray-400 hover:text-white transition"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold text-sm mb-5">Contact</h4>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 shrink-0" /> hello@drivefleet.com
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 shrink-0" /> +1 (800) DRIVE-FLEET
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 shrink-0" /> San Francisco, CA
                        </li>
                    </ul>
                </div>
            </div>

            <Divider className="bg-gray-800" />

            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                <p>© 2024 DriveFleet. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/cookies" className="hover:text-white transition">Cookie Settings</Link>
                </div>
            </div>
        </footer>
    );
}