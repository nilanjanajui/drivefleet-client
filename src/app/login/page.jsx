"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
    const { signIn, googleSignIn } = useAuth();
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLoading(true);
        try {
            await signIn(email, password);
            toast.success("Welcome back!");
            router.push("/");
        } catch (err) {
            toast.error(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleSignIn();
            // Better Auth redirects automatically after Google OAuth
        } catch (err) {
            toast.error("Google login failed");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div
                className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-10"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-blue-950/80" />
                <div className="relative z-10 flex items-center gap-2">
                    <span className="text-white font-bold text-xl tracking-tight">DriveFleet</span>
                </div>
                <div className="relative z-10">
                    <h2 className="text-white text-2xl font-semibold mb-3">Elevate Your Journey.</h2>
                    <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
                        Experience the pinnacle of automotive luxury with our curated fleet of
                        high-performance vehicles.
                    </p>
                </div>
                <div className="relative z-10 flex gap-12">
                    <div>
                        <p className="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-1">Global Reach</p>
                        <p className="text-white text-2xl font-bold">45+ Countries</p>
                    </div>
                    <div>
                        <p className="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-1">Premium Fleet</p>
                        <p className="text-white text-2xl font-bold">12,000+ Cars</p>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-between px-8 sm:px-16 py-12 bg-white">
                <div />
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mb-8">
                        Enter your credentials to access your account.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
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
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPass ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm"
                        >
                            {loading ? "Signing in..." : "Login to DriveFleet"}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <hr className="flex-1 border-gray-200" />
                        <span className="text-gray-400 text-xs font-medium">Or continue with</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    <button
                        onClick={handleGoogle}
                        className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <Image src="https://www.svgrepo.com/show/355037/google.svg" width={20} height={20} alt="Google" />
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        New to DriveFleet?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline font-medium">
                            Create an account
                        </Link>
                    </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 max-w-md w-full mx-auto mt-8">
                    <span>© 2025 DriveFleet. All rights reserved.</span>
                </div>
            </div>
        </div>
    );
}