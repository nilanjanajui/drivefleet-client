"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
    const { signIn, googleSignIn, refetch } = useAuth();
    const router = useRouter();

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoading(true);

        try {
            // 1. login request
            await signIn(email, password);

            // 2. IMPORTANT: refresh session immediately
            if (refetch) {
                await refetch();
            }

            toast.success("Welcome back!");

            // 3. redirect after session update
            router.push("/");
        } catch (err) {
            toast.error(err?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleSignIn();

            // optional: session refresh (depends on Better Auth redirect)
            if (refetch) {
                await refetch();
            }
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
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-blue-950/80" />

                <div className="relative z-10 text-white font-bold text-xl">
                    DriveFleet
                </div>

                <div className="relative z-10">
                    <h2 className="text-white text-2xl font-semibold mb-3">
                        Elevate Your Journey.
                    </h2>
                    <p className="text-blue-200 text-sm max-w-sm">
                        Experience premium car rentals with ease and comfort.
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 bg-white">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">
                        Login to access your account.
                    </p>

                    {/* FORM */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        {/* Password */}
                        <div className="relative">
                            <input
                                name="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                required
                                className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                            >
                                {showPass ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Login"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 text-center text-gray-400 text-sm">
                        OR
                    </div>

                    {/* Google */}
                    <button
                        onClick={handleGoogle}
                        className="w-full flex items-center justify-center gap-2 border rounded-xl py-3 text-sm hover:bg-gray-50"
                    >
                        <Image
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            width={20}
                            height={20}
                            alt="Google"
                        />
                        Continue with Google
                    </button>

                    {/* Register */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        New here?{" "}
                        <Link href="/register" className="text-blue-600 font-medium">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}