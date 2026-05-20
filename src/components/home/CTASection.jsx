import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl py-16 px-8 text-center">
                <h2 className="text-4xl font-extrabold text-white mb-4">
                    Ready to hit the road?
                </h2>
                <p className="text-blue-100 text-base max-w-md mx-auto mb-10 leading-relaxed">
                    Join thousands of satisfied travelers and experience the best in premium car
                    rentals. Your perfect journey starts here.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/cars"
                        className="px-7 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                    >
                        Find Your Car
                    </Link>
                    <Link
                        href="/contact"
                        className="px-7 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
                    >
                        Contact Sales
                    </Link>
                </div>
            </div>
        </section>
    );
}