"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, Star, MapPin, ChevronRight, Car } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

// ─── Skeleton Card ────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white animate-pulse">
            <div className="h-52 bg-gray-100" />
            <div className="px-4 pt-4 pb-4 space-y-3">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                    <div className="h-4 bg-gray-100 rounded w-1/5" />
                </div>
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
        </div>
    );
}

// ─── Car Card ─────────────────────────────────────────────────
function CarCard({ car }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col h-full">
            {/* Image */}
            <div className="relative h-52 overflow-hidden shrink-0">
                {car.image_url ? (
                    <Image
                        src={car.image_url}
                        alt={car.car_name}
                        fill
                        unoptimized
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                        <Car className="w-10 h-10" />
                    </div>
                )}

                {/* Wishlist button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setLiked((p) => !p);
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow"
                >
                    <Heart
                        className={`w-4 h-4 transition ${liked ? "fill-red-500 text-red-500" : "text-gray-400"
                            }`}
                    />
                </button>

                {/* Availability badge */}
                <span
                    className={`absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${car.availability ? "bg-green-500" : "bg-red-400"
                        }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    {car.availability ? "Available" : "Unavailable"}
                </span>
            </div>

            {/* Info */}
            <div className="px-4 pt-4 pb-2 flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-base leading-tight">
                        {car.car_name}
                    </h3>
                    <div className="text-right shrink-0">
                        <span className="text-blue-600 font-bold text-base">
                            ${car.daily_rent_price}
                        </span>
                        <p className="text-gray-400 text-xs">per day</p>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-2">{car.car_type}</p>

                <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{car.pickup_location}</span>
                </div>
            </div>

            {/* Footer */}
            {/* Footer */}
            <div className="px-4 pb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-800">4.9</span>
                    <span className="text-gray-400">
                        ({car.booking_count ?? 0} bookings)
                    </span>
                </div>

                <button
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

// ─── Empty State ──────────────────────────────────────────────
function EmptyState() {
    return (
            <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                    <Car className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-gray-500 font-medium">No cars listed yet</p>
                <p className="text-gray-400 text-sm mt-1">
                    Be the first to{" "}
                    <Link href="/add-car" className="text-blue-600 hover:underline">
                        add a car
                    </Link>
                    .
                </p>
            </div>
            );
}

            // ─── Main Component ───────────────────────────────────────────
            export default function AvailableCars() {
    const {user} = useAuth();
            const router = useRouter();
            const [cars, setCars] = useState([]);
            const [loading, setLoading] = useState(true);

    useEffect(() => {
                axios
                    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars?sort=popular`)
                    .then((res) => setCars(res.data.slice(0, 6)))  // show max 6
                    .catch(() => setCars([]))
                    .finally(() => setLoading(false));
    }, []);

            return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Available Cars
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Curated selection of high-end vehicles ready for your next adventure.
                            </p>
                        </div>
                        <Link
                            href="/explore-cars"
                            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                        >
                            View all cars
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))
                        ) : cars.length === 0 ? (
                            <EmptyState />
                        ) : (
                            cars.map((car) => (
                                <div
                                    key={car._id}
                                    className="flex flex-col cursor-pointer"
                                    onClick={() => {
                                        if (!user) {
                                            toast.error("Please login to view car details");
                                            router.push("/login");
                                            return;
                                        }
                                        router.push(`/cars/${car._id}`);
                                    }}
                                >
                                    <CarCard car={car} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
            );
}