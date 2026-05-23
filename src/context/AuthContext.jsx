"use client";

import { createContext, useContext } from "react";
import {
    signIn as baSignIn,
    signUp as baSignUp,
    signOut as baSignOut,
    useSession,
} from "@/lib/authClient";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const {
        data: session,
        isPending: loading,
        refetch,
    } = useSession();

    const user = session?.user || null;

    // ── SIGN UP ──────────────────────────────
    const signUp = async (name, email, password, image) => {
        const result = await baSignUp.email({
            name,
            email,
            password,
            image:
                image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name
                )}&background=random&size=128`,
        });

        if (result.error) throw new Error(result.error.message);
        return result;
    };

    // ── SIGN IN ──────────────────────────────
    const signIn = async (email, password) => {
        const result = await baSignIn.email({
            email,
            password,
        });

        if (result.error) throw new Error(result.error.message);


        await refetch();
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth-token/token`, {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.warn("Token fetch failed (non-critical):", err.message);
        }

        return result;

        return result;
    };

    // ── GOOGLE LOGIN ─────────────────────────


    const googleSignIn = async () => {
        const baseURL = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";
        await baSignIn.social({
            provider: "google",
            callbackURL: `${baseURL}?fetchToken=1`,  // handle on return
        });

    };

    // ── LOGOUT ───────────────────────────────
    const logOut = async () => {
        await baSignOut();
        await refetch();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signUp,
                signIn,
                googleSignIn,
                logOut,
                refetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}