"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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

    // Auto-slide every 4 seconds
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

                {/* Left */}
                <div className="order-2 lg:order-1">
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
                    <p className="text-gray-500 text-base max-w-md mb-8 leading-relaxed">
                        Experience the ultimate in automotive luxury. From sleek executive
                        sedans to rugged premium SUVs, find the perfect vehicle for every occasion.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/cars"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            Explore Cars
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-3 font-semibold border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition"
                        >
                            Become a Host
                        </Link>
                    </div>
                </div>

                {/* Right — Carousel */}
                <div className="order-1 lg:order-2 relative flex items-center justify-end">
                    <div className="relative w-full max-w-xl h-105 rounded-2xl overflow-hidden shadow-2xl">

                        {/* Images */}
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

                        {/* Prev button */}
                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition shadow z-10"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Next button */}
                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition shadow z-10"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Dot indicators */}
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
                </div>
            </div>
        </section>
    );
}