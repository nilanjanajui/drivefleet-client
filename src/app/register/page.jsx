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
    const { signUp, googleSignIn, updateUser } = useAuth();
    const router = useRouter();
    const [passError, setPassError] = useState("");
    const [agreed, setAgreed] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!agreed) return toast.error("Please agree to Terms & Conditions");

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm = e.target.confirm.value;

        if (password !== confirm) return setPassError("Passwords do not match");
        const error = validatePassword(password);
        if (error) return setPassError(error);
        setPassError("");

        try {
            const result = await signUp(email, password);
            await updateUser(name, "");
            toast.success("Account created successfully!");
            router.push("/login");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleSignIn();
            toast.success("Logged in with Google!");
            router.push("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div
                className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-10"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0d1b2a]/75" />

                {/* Logo */}
                <div className="relative z-10">
                    <span className="text-white font-bold text-xl tracking-tight">
                        DriveFleet
                    </span>
                </div>

                {/* Bottom Text */}
                <div className="relative z-10">
                    <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                        Start your premium <br /> journey today.
                    </h1>
                    <p className="text-gray-300 text-base max-w-sm">
                        Join thousands of discerning travelers who choose efficiency and
                        elegance for their every mile.
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 bg-white">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">
                        Create Account
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">
                        Enter your details to register for a premium account.
                    </p>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <input
                                    name="confirm"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            {passError && (
                                <p className="text-red-500 text-xs mt-1">{passError}</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                I agree to the{" "}
                                <span className="text-blue-600 hover:underline">Terms & Conditions</span>{" "}
                                and{" "}
                                <span className="text-blue-600 hover:underline">Privacy Policy</span>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition text-sm"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <hr className="flex-1 border-gray-200" />
                        <span className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                            Or Register With
                        </span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleGoogle}
                            className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <Image
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                width={20}
                                height={20}
                                alt="Google"
                            />
                            Google
                        </button>
                        <button
                            disabled
                            className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-400 cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            Apple
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}