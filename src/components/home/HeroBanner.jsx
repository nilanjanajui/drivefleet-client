"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function HeroBanner() {
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
                        <Button
                            as={Link}
                            href="/cars"
                            color="primary"
                            size="lg"
                            endContent={<ArrowRight className="w-4 h-4" />}
                            className="font-semibold"
                        >
                            Explore Cars
                        </Button>
                        <Button
                            as={Link}
                            href="/register"
                            variant="bordered"
                            size="lg"
                            className="font-semibold border-gray-300 text-gray-700 bg-white"
                        >
                            Become a Host
                        </Button>
                    </div>
                </div>

                {/* Right */}
                <div className="order-1 lg:order-2 relative flex items-center justify-end">
                    <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1544636331-e26879cd4d10?w=900&q=85"
                            alt="Premium sports car"
                            width={900}
                            height={420}
                            className="w-full h-105 object-cover"
                        />
                    </div>
                    <button className="absolute -right-1 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-9 h-9 flex items-center justify-center text-gray-400 hover:text-blue-600 transition z-10">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}