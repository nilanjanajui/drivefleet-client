"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, User, Hash } from "lucide-react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const STATUS_CONFIG = {
    confirmed: {
        label: "Confirmed",
        className: "text-green-600 bg-green-50 border-green-200",
    },
    pending: {
        label: "Pending Approval",
        className: "text-orange-500 bg-orange-50 border-orange-200",
    },
    cancelled: {
        label: "Cancelled",
        className: "text-red-500 bg-red-50 border-red-200",
    },
};

const TABS = ["All Bookings", "Active", "Pending", "Cancelled"];

function formatBookingId(id) {
    return `#DF-${String(id).slice(-5).toUpperCase()}`;
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("All Bookings");
    const [cancelTarget, setCancelTarget] = useState(null);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my`,
                    { credentials: "include" }
                );
                const data = await res.json();
                setBookings(Array.isArray(data) ? data : []);
            } catch {
                toast.error("Failed to load bookings");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleCancel = async () => {
        if (!cancelTarget) return;
        setCancelling(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${cancelTarget}`,
                { method: "PATCH", credentials: "include" }
            );
            if (res.ok) {
                toast.success("Booking cancelled");
                setBookings((prev) =>
                    prev.map((b) =>
                        b._id === cancelTarget ? { ...b, status: "cancelled" } : b
                    )
                );
            } else {
                toast.error("Failed to cancel booking");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setCancelling(false);
            setCancelTarget(null);
        }
    };

    const filtered = bookings.filter((b) => {
        if (activeTab === "All Bookings") return true;
        if (activeTab === "Active") return b.status === "confirmed";
        if (activeTab === "Pending") return b.status === "pending";
        if (activeTab === "Cancelled") return b.status === "cancelled";
        return true;
    });

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">My Bookings</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage your current and past car rental reservations.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${activeTab === tab
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Booking Cards */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-400">
                        <p className="text-lg font-semibold mb-2">No bookings found</p>
                        <Link
                            href="/explore-cars"
                            className="text-blue-600 text-sm font-medium underline underline-offset-2"
                        >
                            Explore available cars →
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {filtered.map((booking) => {
                            const status = booking.status || "confirmed";
                            const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.confirmed;

                            return (
                                <div
                                    key={booking._id}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                                >
                                    <div className="flex flex-col sm:flex-row">

                                        {/* Car Image */}
                                        <div className="relative w-full sm:w-48 shrink-0 aspect-video sm:aspect-auto bg-gray-100">
                                            {booking.carImage ? (
                                                <Image
                                                    src={booking.carImage}
                                                    alt={booking.carName}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 p-5 flex flex-col gap-4">

                                            {/* Top row: name + status */}
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                                                        {booking.carName}
                                                    </h2>
                                                    {booking.pickupLocation && (
                                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                            <MapPin className="w-3 h-3" />
                                                            {booking.pickupLocation}
                                                        </p>
                                                    )}
                                                </div>
                                                <span
                                                    className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border ${cfg.className}`}
                                                >
                                                    {cfg.label}
                                                </span>
                                            </div>

                                            {/* Meta grid */}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                <div>
                                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                                        <CalendarDays className="w-3 h-3" /> Booked On
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {formatDate(booking.bookingDate)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                                                        Daily Rate
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        ${booking.dailyRentPrice}/day
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                                        <User className="w-3 h-3" /> Driver
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {booking.driverNeeded
                                                            ? "Assigned Driver"
                                                            : "Self-Drive"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                                        <Hash className="w-3 h-3" /> Booking ID
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {formatBookingId(booking._id)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Bottom row: price + actions */}
                                            <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                                                        {status === "cancelled" ? "Daily Rate" : "Estimated Cost"}
                                                    </p>
                                                    <p className="text-xl font-bold text-blue-600">
                                                        ${booking.totalPrice > 0
                                                            ? booking.totalPrice
                                                            : booking.dailyRentPrice}.00
                                                    </p>
                                                </div>

                                                <div className="flex gap-2 flex-wrap justify-end">
                                                    {status === "confirmed" && (
                                                        <>
                                                            <Link
                                                                href={`/cars/${booking.carId}`}
                                                                className="border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-600 text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150"
                                                            >
                                                                Details
                                                            </Link>
                                                            <button
                                                                onClick={() => setCancelTarget(booking._id)}
                                                                className="border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                    {status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => setCancelTarget(booking._id)}
                                                                className="border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                disabled
                                                                className="bg-gray-100 text-gray-400 text-sm font-medium px-4 py-2 rounded-xl cursor-not-allowed"
                                                            >
                                                                Awaiting Confirmation
                                                            </button>
                                                        </>
                                                    )}
                                                    {status === "cancelled" && (
                                                        <Link
                                                            href={`/cars/${booking.carId}`}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-150"
                                                        >
                                                            Book Again
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            {cancelTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                    onClick={(e) => e.target === e.currentTarget && setCancelTarget(null)}
                >
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Cancel Booking?
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            This action cannot be undone. Are you sure you want to cancel
                            this booking?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCancelTarget(null)}
                                className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:border-gray-400 transition-colors text-sm"
                            >
                                Keep Booking
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={cancelling}
                                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                            >
                                {cancelling ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}