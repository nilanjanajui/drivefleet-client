import { Headphones, BadgeDollarSign, ShieldCheck, Zap } from "lucide-react";

const features = [
    {
        icon: Headphones,
        title: "24/7 Support",
        desc: "Our dedicated team is available around the clock for any assistance you need.",
    },
    {
        icon: BadgeDollarSign,
        title: "Affordable Pricing",
        desc: "Premium experience at competitive rates with zero hidden fees or charges.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Vehicles",
        desc: "Every car in our fleet undergoes rigorous multi-point safety inspections.",
    },
    {
        icon: Zap,
        title: "Instant Booking",
        desc: "Reserve your vehicle in seconds with our streamlined checkout process.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-[#EEF3FF]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-extrabold text-gray-900">Why Choose DriveFleet</h2>
                    <p className="text-gray-500 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                        We provide more than just a car rental; we deliver a premium experience
                        designed for your comfort and security.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="border border-gray-100 rounded-2xl hover:shadow-md transition-shadow bg-white p-7"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                                    <Icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-base mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}