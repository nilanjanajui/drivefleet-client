"use client";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Must include an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must include a lowercase letter";
    return null;
};

export default function RegisterPage() {
    const { signUp, googleSignIn } = useAuth();
    const router = useRouter();
    const [passError, setPassError] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!agreed) return toast.error("Please agree to Terms & Conditions");

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        const confirm = e.target.confirm.value;

        if (password !== confirm) return setPassError("Passwords do not match");
        const error = validatePassword(password);
        if (error) return setPassError(error);
        setPassError("");

        setLoading(true);
        try {
            await signUp(name, email, password, photoURL);
            toast.success("Account created! Please log in.");
            router.push("/login");
        } catch (err) {
            toast.error(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleSignIn();
            // Better Auth redirects automatically
        } catch (err) {
            toast.error("Google sign-in failed");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div
                className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-10"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-[#0d1b2a]/75" />
                <div className="relative z-10">
                    <span className="text-white font-bold text-xl tracking-tight">DriveFleet</span>
                </div>
                <div className="relative z-10">
                    <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                        Start your premium <br /> journey today.
                    </h1>
                    <p className="text-gray-300 text-base max-w-sm">
                        Join thousands of discerning travelers who choose efficiency and elegance.
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 bg-white">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Create Account</h2>
                    <p className="text-gray-500 text-sm mb-8">Enter your details to register.</p>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input name="name" type="text" placeholder="John Doe" required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input name="email" type="email" placeholder="john@example.com" required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input name="photoURL" type="url" placeholder="https://example.com/photo.jpg"
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input name="password" type="password" placeholder="••••••••" required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <input name="confirm" type="password" placeholder="••••••••" required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                            {passError && <p className="text-red-500 text-xs mt-1">{passError}</p>}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">
                            <input type="checkbox" id="terms" checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer" />
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                I agree to the{" "}
                                <span className="text-blue-600 hover:underline">Terms & Conditions</span>{" "}
                                and{" "}
                                <span className="text-blue-600 hover:underline">Privacy Policy</span>.
                            </label>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm">
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <hr className="flex-1 border-gray-200" />
                        <span className="text-gray-400 text-xs font-medium tracking-widest uppercase">Or Register With</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    <button onClick={handleGoogle}
                        className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                        <Image src="https://www.svgrepo.com/show/355037/google.svg" width={20} height={20} alt="Google" />
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}