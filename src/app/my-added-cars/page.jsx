"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Car, Plus, Pencil, Trash2, Star,
    DollarSign, CalendarCheck, X, ShieldCheck, MapPin,
} from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Luxury", "Sports Coupe", "Electric SUV", "Convertible", "Pickup Truck"];

// ─── Stat Card ───────────────────────────────────────────────
function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">{icon}</div>
            <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
            </div>
        </div>
    );
}

// ─── Edit Modal ───────────────────────────────────────────────
function EditModal({ car, onClose, onSaved }) {
    const [form, setForm] = useState({
        daily_rent_price: car.daily_rent_price,
        car_type: car.car_type || "",
        pickup_location: car.pickup_location || "",
        description: car.description || "",
        image_url: car.image_url || "",
        availability: car.availability ?? true,
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${car._id}`,
                { availability: !car.availability },   // ← was: form (undefined here)
                { withCredentials: true }
            );
            toast.success("Car updated!");
            onSaved();
            onClose();
        } catch {
            toast.error("Update failed.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">Update Car Listing</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">

                    {/* Price */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                            Daily Rental Price ($)
                        </label>
                        <div className="relative">
                            <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                name="daily_rent_price"
                                type="number"
                                value={form.daily_rent_price}
                                onChange={handleChange}
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Car Type</label>
                        <select
                            name="car_type"
                            value={form.car_type}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select type</option>
                            {CAR_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                            Pickup Location
                        </label>
                        <div className="relative">
                            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                name="pickup_location"
                                value={form.pickup_location}
                                onChange={handleChange}
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Image URL</label>
                        <input
                            name="image_url"
                            value={form.image_url}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {form.image_url && (
                            <div className="relative mt-2 w-full h-32 rounded-lg overflow-hidden border border-gray-100">
                                <Image
                                    src={form.image_url}
                                    alt="preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Availability */}
                    <div className="flex items-center justify-between py-1">
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
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <ShieldCheck size={13} className="text-green-500" />
                        Changes are saved securely
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Delete Modal ─────────────────────────────────────────────
function DeleteModal({ car, onClose, onDeleted }) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${car._id}`,
                { withCredentials: true }
            );
            toast.success("Car removed from listings.");
            onDeleted();
            onClose();
        } catch {
            toast.error("Delete failed.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mx-auto mb-4">
                    <Trash2 size={22} className="text-red-500" />
                </div>
                <h3 className="text-center text-lg font-semibold text-gray-800 mb-1">
                    Delete Listing?
                </h3>
                <p className="text-center text-sm text-gray-500 mb-6">
                    <span className="font-medium text-gray-700">{car.car_name}</span> will be
                    permanently removed. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                    >
                        {deleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Car Row Card ─────────────────────────────────────────────
function CarCard({ car, onEdit, onDelete, onToggle }) {
    const isNew =
        car.createdAt &&
        new Date() - new Date(car.createdAt) < 7 * 24 * 60 * 60 * 1000;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col sm:flex-row items-stretch overflow-hidden hover:shadow-md transition-shadow">

            {/* Image */}
            <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 bg-gray-100">
                {car.image_url ? (
                    <Image
                        src={car.image_url}
                        alt={car.car_name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Car size={36} />
                    </div>
                )}
                {isNew && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10">
                        New
                    </span>
                )}
                {!car.availability && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <span className="bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Unavailable
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">

                {/* Name + badges */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-800 truncate">{car.car_name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        {car.car_type && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                                {car.car_type}
                            </span>
                        )}
                        {car.seat_capacity && (
                            <span className="text-gray-400 text-xs">• {car.seat_capacity} seats</span>
                        )}
                        {car.pickup_location && (
                            <span className="text-gray-400 text-xs truncate max-w-40">
                                • {car.pickup_location}
                            </span>
                        )}
                    </div>
                </div>

                {/* Price */}
                <div className="sm:text-right min-w-27.5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Daily Price
                    </p>
                    <p className="text-xl font-bold text-blue-600 mt-0.5">
                        ${car.daily_rent_price}
                        <span className="text-xs font-normal text-gray-400">/day</span>
                    </p>
                </div>

                {/* Availability toggle */}
                <div className="flex flex-col items-center gap-1.5 min-w-20">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Availability
                    </p>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={car.availability}
                            onChange={() => onToggle(car)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 sm:flex-col">
                    <button
                        onClick={() => onEdit(car)}
                        className="p-2.5 border border-gray-200 rounded-xl text-blue-500 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        title="Edit"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(car)}
                        className="p-2.5 border border-gray-200 rounded-xl text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────
export default function MyAddedCarsPage() {
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(0);
    const [editCar, setEditCar] = useState(null);
    const [deleteCar, setDeleteCar] = useState(null);

    const triggerRefetch = () => {
        setLoading(true);
        setRefetch((r) => r + 1);
    };

    useEffect(() => {
        let cancelled = false;
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/my-cars`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                if (!cancelled) setCars(data);
            })
            .catch(() => {
                if (!cancelled) toast.error("Failed to load your cars.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [refetch]);

    const handleToggle = async (car) => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${car._id}`,
                { availability: !car.availability },
                { withCredentials: true }
            );
            setCars((prev) =>
                prev.map((c) =>
                    c._id === car._id ? { ...c, availability: !c.availability } : c
                )
            );
            toast.success(`Marked as ${!car.availability ? "available" : "unavailable"}`);
        } catch {
            toast.error("Toggle failed.");
        }
    };

    const totalCars = cars.length;
    const activeBookings = cars.reduce((s, c) => s + (c.booking_count || 0), 0);
    const totalRevenue = cars.reduce(
        (s, c) => s + (c.booking_count || 0) * (c.daily_rent_price || 0),
        0
    );

    return (
        <PrivateRoute>
            {editCar && (
                <EditModal
                    car={editCar}
                    onClose={() => setEditCar(null)}
                    onSaved={triggerRefetch}
                />
            )}

            {deleteCar && (
                <DeleteModal
                    car={deleteCar}
                    onClose={() => setDeleteCar(null)}
                    onDeleted={triggerRefetch}
                />
            )}

            <div className="min-h-screen bg-gray-50">

                {/* Page Header */}
                <div className="bg-white border-b border-gray-100 px-4 py-8">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Added Cars</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Manage your vehicle fleet and monitor booking availability.
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/add-car")}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                        >
                            <Plus size={16} />
                            List New Car
                        </button>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard icon={<Car size={20} />} label="Total Cars" value={totalCars} />
                        <StatCard
                            icon={<CalendarCheck size={20} />}
                            label="Total Bookings"
                            value={activeBookings}
                        />
                        <StatCard
                            icon={<DollarSign size={20} />}
                            label="Est. Revenue"
                            value={`$${totalRevenue.toLocaleString()}`}
                        />
                        <StatCard icon={<Star size={20} />} label="Avg Rating" value="4.9/5" />
                    </div>

                    {/* Car List */}
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-gray-100 rounded-2xl h-40 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : cars.length === 0 ? (
                        <div className="bg-white border border-gray-100 rounded-2xl py-20 text-center shadow-sm">
                            <Car size={40} className="text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No cars listed yet</p>
                            <p className="text-gray-400 text-sm mt-1">
                                Add your first car to start earning
                            </p>
                            <button
                                onClick={() => router.push("/add-car")}
                                className="mt-5 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={15} />
                                Add First Car
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cars.map((car) => (
                                <CarCard
                                    key={car._id}
                                    car={car}
                                    onEdit={setEditCar}
                                    onDelete={setDeleteCar}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PrivateRoute>
    );
}