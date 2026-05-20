import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const GlobeIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
);

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

const socialIcons = [
    { Icon: TwitterIcon, label: "Twitter / X" },
    { Icon: LinkedinIcon, label: "LinkedIn" },
    { Icon: GlobeIcon, label: "Website" },
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
                        {socialIcons.map(({ Icon, label }) => (
                            <Link
                                key={label}
                                href="#"
                                aria-label={label}
                                className="text-gray-400 hover:text-white transition"
                            >
                                <Icon />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Brand Links */}
                <div>
                    <h4 className="text-white font-semibold text-sm mb-5">Brand</h4>
                    <ul className="space-y-3">
                        {brandLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition">
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
                                <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition">
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
                            <Mail size={14} className="shrink-0" />
                            hello@drivefleet.com
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="shrink-0" />
                            +1 (800) DRIVE-FLEET
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="shrink-0" />
                            San Francisco, CA
                        </li>
                    </ul>
                </div>
            </div>

            <hr className="border-white/10" />

            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                <p>© {new Date().getFullYear()} DriveFleet. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/cookies" className="hover:text-white transition">Cookie Settings</Link>
                </div>
            </div>
        </footer>
    );
}