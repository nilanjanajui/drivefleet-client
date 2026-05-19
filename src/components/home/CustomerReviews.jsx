"use client";

import { Card, CardBody, Avatar, Button } from "@heroui/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const reviews = [
    {
        id: 1,
        stars: 5,
        text: "The Porsche Taycan was in immaculate condition. The delivery was right on time, and the entire process was seamless. Definitely my new go-to for rentals.",
        name: "David Chen",
        role: "Verified Renter",
        avatar: "https://i.pravatar.cc/48?img=11",
    },
    {
        id: 2,
        stars: 5,
        text: "Renting the Defender for our mountain trip was the best decision. Car was spotless and handled the terrain perfectly. Support team was very responsive.",
        name: "Sarah Johnson",
        role: "Verified Renter",
        avatar: "https://i.pravatar.cc/48?img=47",
    },
    {
        id: 3,
        stars: 5,
        text: "Incredible service from start to finish. The BMW M5 was a dream to drive. I've used many rental platforms but DriveFleet is on another level of quality.",
        name: "Michael Roberts",
        role: "Verified Renter",
        avatar: "https://i.pravatar.cc/48?img=12",
    },
    {
        id: 4,
        stars: 5,
        text: "Booked a Tesla Model S last minute and they made it happen effortlessly. The car was pristine and the whole experience was top-notch.",
        name: "Emily Davis",
        role: "Verified Renter",
        avatar: "https://i.pravatar.cc/48?img=23",
    },
    {
        id: 5,
        stars: 5,
        text: "Amazing experience! The Audi Q7 was perfect for our family road trip. Clean, well-maintained, and the booking process was incredibly smooth.",
        name: "James Wilson",
        role: "Verified Renter",
        avatar: "https://i.pravatar.cc/48?img=15",
    },
];

const PER_PAGE = 3;

export default function CustomerReviews() {
    const [page, setPage] = useState(0);
    const maxPage = Math.ceil(reviews.length / PER_PAGE) - 1;
    const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900">Customer Reviews</h2>
                    <div className="flex items-center gap-2">
                        <Button
                            isIconOnly
                            variant="bordered"
                            size="sm"
                            isDisabled={page === 0}
                            onPress={() => setPage((p) => Math.max(0, p - 1))}
                            className="border-gray-200"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            isIconOnly
                            variant="bordered"
                            size="sm"
                            isDisabled={page === maxPage}
                            onPress={() => setPage((p) => Math.min(maxPage, p + 1))}
                            className="border-gray-200"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visible.map((review) => (
                        <Card
                            key={review.id}
                            className="border border-gray-100 shadow-none hover:shadow-md transition-shadow"
                        >
                            <CardBody className="p-6">
                                {/* Stars */}
                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: review.stars }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Review text */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                {/* Reviewer */}
                                <div className="flex items-center gap-3">
                                    <Avatar src={review.avatar} size="sm" />
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                                        <p className="text-gray-400 text-xs">{review.role}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}