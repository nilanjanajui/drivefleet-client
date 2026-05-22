"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const heroImages = [
    {
        src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=85",
        alt: "Luxury sports car",
    },
    {
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85",
        alt: "Premium Porsche",
    },
    {
        src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85",
        alt: "BMW M5",
    },
    {
        src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85",
        alt: "Land Rover Defender",
    },
    {
        src: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&q=85",
        alt: "Porsche Taycan",
    },
];

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setCurrent((p) => (p - 1 + heroImages.length) % heroImages.length);
    const next = () => setCurrent((p) => (p + 1) % heroImages.length);

    return (
        <section className="bg-[#EEF3FF] min-h-[88vh] flex items-center relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

                {/* Left — text content */}
                <motion.div
                    className="order-2 lg:order-1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                        Drive Your Journey{" "}
                        <br />
                        with{" "}
                        <span className="text-blue-600">
                            Premium
                            <br />
                            Rentals
                        </span>
                    </h1>

                    <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                        Discover a fleet of premium vehicles available at your fingertips.
                        Book instantly, drive confidently, and enjoy every mile.
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                        <Link
                            href="/explore-cars"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition"
                        >
                            Explore Cars
                        </Link>
                        <Link
                            href="/register"
                            className="border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold px-7 py-3 rounded-xl transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </motion.div>

                {/* Right — image slider */}
                <motion.div
                    className="order-1 lg:order-2 flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="relative w-full max-w-xl h-96 lg:h-105 rounded-2xl overflow-hidden shadow-2xl">

                        {heroImages.map((img, i) => (
                            <Image
                                key={i}
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className={`object-cover transition-opacity duration-700 ${
                                    i === current ? "opacity-100" : "opacity-0"
                                }`}
                                priority={i === 0}
                            />
                        ))}

                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition shadow z-10"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition shadow z-10"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                            {heroImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`rounded-full transition-all duration-300 ${
                                        i === current
                                            ? "w-5 h-2 bg-white"
                                            : "w-2 h-2 bg-white/50 hover:bg-white/80"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}