"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

const cars = [
    {
        _id: "1",
        name: "Porsche Taycan Turbo",
        price: 299,
        location: "San Francisco, CA",
        rating: 4.9,
        reviews: 928,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=80",
    },
    {
        _id: "2",
        name: "Land Rover Defender",
        price: 185,
        location: "Denver, CO",
        rating: 4.8,
        reviews: 84,
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80",
    },
    {
        _id: "3",
        name: "BMW M5 Competition",
        price: 240,
        location: "Miami, FL",
        rating: 4.9,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",
    },
    {
        _id: "4",
        name: "Mercedes-Benz G63 AMG",
        price: 320,
        location: "Los Angeles, CA",
        rating: 4.9,
        reviews: 176,
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&q=80",
    },
    {
        _id: "5",
        name: "Audi RS7 Sportback",
        price: 265,
        location: "Chicago, IL",
        rating: 4.8,
        reviews: 142,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80",
    },
    {
        _id: "6",
        name: "Tesla Model X Plaid",
        price: 280,
        location: "Seattle, WA",
        rating: 4.9,
        reviews: 351,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=700&q=80",
    },
];

function CarCard({ car }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setLiked(!liked);
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow"
                >
                    <Heart
                        className={`w-4 h-4 transition ${liked ? "fill-red-500 text-red-500" : "text-gray-400"
                            }`}
                    />
                </button>
            </div>

            {/* Info */}
            <div className="px-4 pt-4 pb-2">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-base">{car.name}</h3>
                    <div className="text-right shrink-0">
                        <span className="text-blue-600 font-bold text-base">${car.price}</span>
                        <p className="text-gray-400 text-xs">per day</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{car.location}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-800">{car.rating}</span>
                    <span className="text-gray-400">({car.reviews} reviews)</span>
                </div>
            </div>
        </div>
    );
}

export default function AvailableCars() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Available Cars</h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Curated selection of high-end vehicles ready for your next adventure.
                        </p>
                    </div>
                    <Link
                        href="/cars"
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                    >
                        View all cars
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <Link key={car._id} href={`/cars/${car._id}`}>
                            <CarCard car={car} />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}