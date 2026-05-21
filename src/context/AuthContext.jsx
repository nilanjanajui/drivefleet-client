"use client";
import { createContext, useContext } from "react";
import { signIn as baSignIn, signUp as baSignUp, signOut as baSignOut, useSession } from "@/lib/authClient";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const { data: session, isPending: loading, refetch } = useSession();
    const user = session?.user || null;

    // ── Email + Password Register ──────────────────────────────
    const signUp = async (name, email, password) => {
        const result = await baSignUp.email({
            name,
            email,
            password,
        });
        if (result.error) throw new Error(result.error.message);
        return result;
    };

    // ── Email + Password Login ─────────────────────────────────
    const signIn = async (email, password) => {
        const result = await baSignIn.email({
            email,
            password,
        });
        if (result.error) throw new Error(result.error.message);
        return result;
    };

    // ── Google Login ───────────────────────────────────────────
    const googleSignIn = async () => {
        await baSignIn.social({
            provider: "google",
            callbackURL: process.env.NEXT_PUBLIC_CLIENT_URL + "/" || "http://localhost:3000/",
        });
    };

    // ── Logout ─────────────────────────────────────────────────
    const logOut = async () => {
        await baSignOut();
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUp, signIn, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}