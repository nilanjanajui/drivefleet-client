// src/app/explore-cars/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { Search, SlidersHorizontal, Star, Users, MapPin } from "lucide-react";

const CAR_TYPES = [
    "All Types", "SUV", "Sedan", "Hatchback",
    "Luxury", "Sports Coupe", "Electric SUV", "Convertible", "Pickup Truck",
];

const SORT_OPTIONS = [
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Newest First", value: "newest" },
    { label: "Most Booked", value: "popular" },
];

const PAGE_SIZE = 6;

// ─── Car Card ─────────────────────────────────────────────────
function CarCard({ car }) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col">

            {/* Image */}
            <div className="relative w-full h-52">
                {car.image_url ? (
                    <Image
                        src={car.image_url}
                        alt={car.car_name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                        No Image
                    </div>
                )}

                {/* Availability badge */}
                <span
                    className={`absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${car.availability ? "bg-green-500" : "bg-red-400"
                        }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    {car.availability ? "Available" : "Unavailable"}
                </span>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">

                {/* Name + Rating */}
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                        {car.car_name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <Star size={13} className="text-blue-500 fill-blue-500" />
                        <span className="text-sm font-semibold text-gray-700">
                            {car.rating ?? "4.9"}
                        </span>
                    </div>
                </div>

                {/* Type tags */}
                <p className="text-xs text-gray-400 mb-3">
                    {[car.car_type, car.model].filter(Boolean).join(" • ")}
                </p>

                {/* Seats + Location */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    {car.seat_capacity && (
                        <span className="flex items-center gap-1">
                            <Users size={13} className="text-gray-400" />
                            {car.seat_capacity} Seats
                        </span>
                    )}
                    {car.pickup_location && (
                        <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-gray-400" />
                            {car.pickup_location}
                        </span>
                    )}
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-auto">
                    <p className="text-gray-900">
                        <span className="text-2xl font-bold">${car.daily_rent_price}</span>
                        <span className="text-sm text-gray-400 ml-1">/ day</span>
                    </p>
                    <button
                        onClick={() => router.push(`/cars/${car._id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Skeleton Card ────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
            <div className="w-full h-52 bg-gray-200" />
            <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-7 bg-gray-200 rounded w-20" />
                    <div className="h-8 bg-gray-200 rounded-xl w-24" />
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────
export default function ExploreCarsPage() {
    const [cars, setCars] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Types");
    const [sortBy, setSortBy] = useState("price_asc");

    // pending filter state (applied only on button click)
    const [pendingSearch, setPendingSearch] = useState("");
    const [pendingCategory, setPendingCategory] = useState("All Types");
    const [pendingSortBy, setPendingSortBy] = useState("price_asc");

    // ── Fetch all cars ──────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`, {
                params: {
                    search: search || undefined,
                    type: category !== "All Types" ? category : undefined,
                    sort: sortBy,
                },
            })
            .then(({ data }) => {
                if (!cancelled) {
                    setCars(data);
                    setDisplayed(data.slice(0, PAGE_SIZE));
                    setPage(1);
                }
            })
            .catch(() => {
                if (!cancelled) toast.error("Failed to load cars.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [search, category, sortBy]);

    // ── Apply filters ───────────────────────────────────────────
    const handleApplyFilters = () => {
        setLoading(true);
        setSearch(pendingSearch);
        setCategory(pendingCategory);
        setSortBy(pendingSortBy);
    };

    // ── Load more ───────────────────────────────────────────────
    const handleLoadMore = () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        const next = cars.slice(0, nextPage * PAGE_SIZE);
        setTimeout(() => {
            setDisplayed(next);
            setPage(nextPage);
            setLoadingMore(false);
        }, 500);
    };

    const hasMore = displayed.length < cars.length;

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Hero Header ── */}
            <div className="bg-gray-50 px-4 pt-12 pb-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                        Find your perfect drive
                    </h1>
                    <p className="text-gray-500 text-base">
                        Premium vehicles for every journey, curated for quality and comfort.
                    </p>
                </div>
            </div>

            {/* ── Filter Bar ── */}
            <div className="px-4 pb-10">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row gap-3 items-end">

                        {/* Search */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                Car Name
                            </label>
                            <div className="relative">
                                <Search
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    value={pendingSearch}
                                    onChange={(e) => setPendingSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                                    placeholder="e.g. Porsche 911"
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="w-full sm:w-44">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                Category
                            </label>
                            <select
                                value={pendingCategory}
                                onChange={(e) => setPendingCategory(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {CAR_TYPES.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="w-full sm:w-48">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                Sort By
                            </label>
                            <select
                                value={pendingSortBy}
                                onChange={(e) => setPendingSortBy(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Apply button */}
                        <button
                            onClick={handleApplyFilters}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                        >
                            <SlidersHorizontal size={15} />
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Cars Grid ── */}
            <div className="px-4 pb-16">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : cars.length === 0 ? (
                        <div className="text-center py-24">
                            <p className="text-gray-400 text-lg font-medium">No cars found</p>
                            <p className="text-gray-300 text-sm mt-1">
                                Try adjusting your search or filters
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayed.map((car) => (
                                    <CarCard key={car._id} car={car} />
                                ))}
                            </div>

                            {/* Load More */}
                            {hasMore && (
                                <div className="flex justify-center mt-12">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="px-8 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors disabled:opacity-60"
                                    >
                                        {loadingMore ? "Loading..." : "Load More Vehicles"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}