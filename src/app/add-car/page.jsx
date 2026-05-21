"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Car, DollarSign, MapPin, Camera,
    Calendar, Tag, Gauge, Users, FileText, X, ShieldCheck,
} from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";

const CAR_TYPES = [
    "SUV", "Sedan", "Hatchback", "Luxury",
    "Sports Coupe", "Electric SUV", "Convertible", "Pickup Truck",
];
const YEARS = Array.from({ length: 25 }, (_, i) => 2024 - i);

export default function AddCarPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    const [form, setForm] = useState({
        carMake: "",
        model: "",
        year: "",
        carType: "",
        dailyRentPrice: "",
        dailyMileageLimit: "",
        pickupLocation: "",
        seatCapacity: "",
        description: "",
        imageUrl: "",
        availability: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setForm((prev) => ({ ...prev, [name]: newValue }));
        if (name === "imageUrl") setImagePreview(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.carMake || !form.model || !form.dailyRentPrice || !form.pickupLocation) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                car_name: `${form.carMake} ${form.model}`.trim(),
                car_make: form.carMake,
                model: form.model,
                year: form.year,
                car_type: form.carType,
                daily_rent_price: Number(form.dailyRentPrice),
                daily_mileage_limit: form.dailyMileageLimit ? Number(form.dailyMileageLimit) : null,
                pickup_location: form.pickupLocation,
                seat_capacity: form.seatCapacity ? Number(form.seatCapacity) : null,
                description: form.description,
                image_url: form.imageUrl,
                availability: form.availability,
                booking_count: 0,
            };
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cars`,
                payload,
                { withCredentials: true }
            );
            toast.success("Car listed successfully!");
            router.push("/my-added-cars");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to add car.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gray-50">

                {/* Header */}
                <div className="bg-white border-b border-gray-100 py-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">List Your Vehicle</h1>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                        Complete the form below to add your car to the DriveFleet marketplace.{" "}
                        <span className="text-blue-600 font-medium">
                            High-quality listings receive 3x more bookings.
                        </span>
                    </p>
                </div>

                <div className="max-w-2xl mx-auto px-4 py-10">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-10">

                        {/* Basic Information */}
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <span className="bg-blue-50 p-1.5 rounded-lg">
                                    <Car size={18} className="text-blue-600" />
                                </span>
                                <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Car Make */}
                                <div className="relative">
                                    <Car size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="carMake"
                                        value={form.carMake}
                                        onChange={handleChange}
                                        placeholder="Car Make (e.g. Tesla)"
                                        required
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Model */}
                                <div className="relative">
                                    <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="model"
                                        value={form.model}
                                        onChange={handleChange}
                                        placeholder="Model (e.g. Model S)"
                                        required
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Year */}
                                <div className="relative">
                                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <select
                                        name="year"
                                        value={form.year}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="">Select Year</option>
                                        {YEARS.map((y) => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</span>
                                </div>

                                {/* Car Type */}
                                <div className="relative">
                                    <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <select
                                        name="carType"
                                        value={form.carType}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="">Category</option>
                                        {CAR_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</span>
                                </div>

                                {/* Seat Capacity */}
                                <div className="relative sm:col-span-2">
                                    <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="seatCapacity"
                                        value={form.seatCapacity}
                                        onChange={handleChange}
                                        type="number"
                                        min="1"
                                        max="20"
                                        placeholder="Seat Capacity"
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Pricing & Rates */}
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <span className="bg-green-50 p-1.5 rounded-lg">
                                    <DollarSign size={18} className="text-green-600" />
                                </span>
                                <h2 className="text-lg font-semibold text-gray-800">Pricing & Rates</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="dailyRentPrice"
                                        value={form.dailyRentPrice}
                                        onChange={handleChange}
                                        type="number"
                                        min="1"
                                        placeholder="Daily Rental Rate"
                                        required
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="relative">
                                    <Gauge size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="dailyMileageLimit"
                                        value={form.dailyMileageLimit}
                                        onChange={handleChange}
                                        type="number"
                                        min="0"
                                        placeholder="Daily Mileage Limit (km)"
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Location */}
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <span className="bg-orange-50 p-1.5 rounded-lg">
                                    <MapPin size={18} className="text-orange-500" />
                                </span>
                                <h2 className="text-lg font-semibold text-gray-800">Location</h2>
                            </div>
                            <div className="relative">
                                <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="pickupLocation"
                                    value={form.pickupLocation}
                                    onChange={handleChange}
                                    placeholder="Full Pickup Address"
                                    required
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Media Upload */}
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <span className="bg-purple-50 p-1.5 rounded-lg">
                                    <Camera size={18} className="text-purple-600" />
                                </span>
                                <h2 className="text-lg font-semibold text-gray-800">Media Upload</h2>
                            </div>

                            <div className="relative">
                                <Camera size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="imageUrl"
                                    value={form.imageUrl}
                                    onChange={handleChange}
                                    placeholder="Image URL (imgbb / postimage)"
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {imagePreview ? (
                                    <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video">
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                            onError={() => setImagePreview("")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview("");
                                                setForm((p) => ({ ...p, imageUrl: "" }));
                                            }}
                                            className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow text-gray-500 hover:text-red-500"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl aspect-video flex flex-col items-center justify-center text-gray-400 text-xs gap-1">
                                        <Camera size={22} className="text-gray-300" />
                                        <span>Paste image URL above</span>
                                        <span className="text-gray-300">Recommended: 1920×1080px</span>
                                    </div>
                                )}
                                <div className="border border-gray-100 bg-gray-50 rounded-xl aspect-video flex items-center justify-center text-gray-300">
                                    <Camera size={22} />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Description */}
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <span className="bg-gray-100 p-1.5 rounded-lg">
                                    <FileText size={18} className="text-gray-600" />
                                </span>
                                <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                            </div>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe your car — features, condition, special highlights..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </section>

                        <hr className="border-gray-100" />

                        {/* Availability */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Available for Booking</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="availability"
                                    checked={form.availability}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                            </label>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <ShieldCheck size={14} className="text-green-500" />
                                All data is encrypted and secure
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.push("/")}
                                    className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Publishing..." : "Publish Car"}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </PrivateRoute>
    );

}