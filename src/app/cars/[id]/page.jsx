"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Users, Fuel, Settings2, CalendarCheck, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function CarDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [car, setCar] = useState(null);
    const [relatedCars, setRelatedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
                    { credentials: "include" }
                );
                const data = await res.json();
                if (data?.user) setUser(data.user);
            } catch { }
        };

        const fetchCar = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`,
                    { credentials: "include" }
                );
                const data = await res.json();
                setCar(data);

                if (data?.car_type) {
                    const relRes = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/cars?type=${encodeURIComponent(data.car_type)}`,
                        { credentials: "include" }
                    );
                    const relData = await relRes.json();
                    setRelatedCars(
                        (Array.isArray(relData) ? relData : relData.cars || [])
                            .filter((c) => c._id !== id)
                            .slice(0, 3)
                    );
                }
            } catch {
                toast.error("Failed to load car details");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        fetchCar();
    }, [id]);

    useEffect(() => {
        fetchUser();
        fetchCar();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-gray-600">Car not found.</p>
                <Link
                    href="/explore-cars"
                    className="text-blue-600 font-medium underline underline-offset-2"
                >
                    Back to Explore Cars
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* ── Main two-column grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* LEFT – images */}
                    <div className="flex flex-col gap-4">
                        {/* Hero image */}
                        <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-4/3">
                            <span className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
                                Premium Selection
                            </span>
                            <Image
                                src={car.image_url}
                                alt={car.car_name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-3 gap-3">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="relative rounded-xl overflow-hidden bg-gray-100 aspect-4/3 cursor-pointer"
                                >
                                    <Image
                                        src={car.image_url}
                                        alt={`${car.car_name} view ${i + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                    />
                                    {i === 2 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                +12 Photos
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT – details card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 flex flex-col gap-5">

                        {/* Name + availability */}
                        <div className="flex items-start justify-between gap-3">
                            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                {car.car_name}
                            </h1>
                            <span
                                className={`shrink-0 mt-1 text-xs font-semibold px-3 py-1 rounded-full border ${car.availability
                                    ? "text-green-600 border-green-200 bg-green-50"
                                    : "text-red-500 border-red-200 bg-red-50"
                                    }`}
                            >
                                {car.availability ? "Available" : "Unavailable"}
                            </span>
                        </div>

                        {/* Subtitle */}
                        <p className="text-gray-400 text-sm -mt-3">
                            {car.car_type} &bull; {car.pickup_location}
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-4xl font-bold text-blue-600">
                                ${car.daily_rent_price}
                            </span>
                            <span className="text-gray-400 text-sm">/ day</span>
                        </div>

                        {/* Spec boxes */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl py-4 px-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                <span className="text-xs font-medium text-gray-600 text-center">
                                    {car.seat_capacity} Seats
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl py-4 px-2">
                                <Fuel className="w-5 h-5 text-blue-600" />
                                <span className="text-xs font-medium text-gray-600">Petrol</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl py-4 px-2">
                                <Settings2 className="w-5 h-5 text-blue-600" />
                                <span className="text-xs font-medium text-gray-600">Auto</span>
                            </div>
                        </div>

                        {/* Stats rows */}
                        <div className="flex flex-col gap-3.5 border-t border-gray-100 pt-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <CalendarCheck className="w-4 h-4" />
                                    Total Bookings
                                </div>
                                <span className="text-sm font-semibold text-gray-800">
                                    {car.booking_count}+ Success
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <MapPin className="w-4 h-4" />
                                    Fuel Efficiency
                                </div>
                                <span className="text-sm font-semibold text-gray-800">
                                    12.5 km/l
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-sm font-semibold text-gray-800 mb-2">Description</p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {car.description}
                            </p>
                        </div>

                        {/* Book Now button */}
                        <button
                            onClick={() => {
                                if (!user) {
                                    toast.error("Please login to book this car");
                                    router.push("/login");
                                    return;
                                }
                                if (!car.availability) {
                                    toast.error("This car is currently unavailable");
                                    return;
                                }
                                setShowModal(true);
                            }}
                            disabled={!car.availability}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors duration-200 text-base"
                        >
                            Book Now
                        </button>

                        <p className="text-center text-xs text-gray-400 -mt-2">
                            Free cancellation up to 48 hours before pickup.
                        </p>
                    </div>
                </div>

                {/* ── Related Cars ── */}
                {relatedCars.length > 0 && (
                    <section className="mt-20">
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Related Premium Cars
                                </h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    Hand-picked alternatives for your refined journey.
                                </p>
                            </div>
                            <Link
                                href="/explore-cars"
                                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
                            >
                                View all →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedCars.map((rc) => (
                                <div
                                    key={rc._id}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                        <Image
                                            src={rc.image_url}
                                            alt={rc.car_name}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-semibold text-gray-900 text-sm">
                                                {rc.car_name}
                                            </span>
                                            <span className="text-blue-600 font-bold text-sm">
                                                ${rc.daily_rent_price}/day
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                                                {rc.car_type}
                                            </span>
                                            {!rc.availability && (
                                                <span className="text-xs bg-red-50 text-red-400 px-2.5 py-1 rounded-full">
                                                    Unavailable
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            href={`/cars/${rc._id}`}
                                            className="block text-center border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-600 text-sm font-medium py-2.5 rounded-xl transition-colors duration-200"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Book Now Modal */}
            {showModal && (
                <BookNowModal
                    car={car}
                    user={user}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}

/* ─────────────────────────────── Modal ─────────────────────────────── */
function BookNowModal({ car, user, onClose }) {
    const router = useRouter();
    const [driverNeeded, setDriverNeeded] = useState("no");
    const [specialNote, setSpecialNote] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBook = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        car_id: car._id,
                        car_name: car.car_name,
                        image_url: car.image_url,
                        daily_rent_price: car.daily_rent_price,
                        driver_needed: driverNeeded === "yes",
                        special_note: specialNote,
                        booking_date: new Date().toISOString(),
                        user_email: user.email,
                        user_name: user.name,
                    }),
                }
            );

            if (res.ok) {
                toast.success("Booking confirmed!");
                onClose();
                router.push("/my-bookings");
            } else {
                const err = await res.json();
                toast.error(err.message || "Booking failed. Please try again.");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Book This Car</h3>
                        <p className="text-sm text-gray-400 mt-0.5">{car.car_name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-gray-500 text-3xl leading-none transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Price summary */}
                <div className="flex justify-between items-center bg-blue-50 rounded-xl px-4 py-3 mb-5">
                    <span className="text-sm text-gray-500">Daily Rate</span>
                    <span className="text-xl font-bold text-blue-600">
                        ${car.daily_rent_price}
                        <span className="text-sm font-normal text-gray-400">/day</span>
                    </span>
                </div>

                {/* Driver needed */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Needed?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {["yes", "no"].map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setDriverNeeded(opt)}
                                className={`py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 ${driverNeeded === opt
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-400"
                                    }`}
                            >
                                {opt === "yes" ? "Yes, need driver" : "No, self drive"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Special note */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Note
                    </label>
                    <textarea
                        value={specialNote}
                        onChange={(e) => setSpecialNote(e.target.value)}
                        placeholder="Any special requests or notes..."
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                    />
                </div>

                {/* Confirm button */}
                <button
                    onClick={handleBook}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
                >
                    {loading ? "Confirming..." : "Confirm Booking"}
                </button>
            </div>
        </div>
    );
}