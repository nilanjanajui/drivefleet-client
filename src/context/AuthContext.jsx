"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const issueJWT = async (user) => {
    try {
        await fetch("http://localhost:5000/api/auth/jwt", { 
            method: "POST",
            credentials: "include",                           
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                name: user.displayName || "",
                photo: user.photoURL || "",
            }),
        });
    } catch (error) {
        console.error("JWT issue error:", error);
    }
};

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await issueJWT(result.user);
        return result;
    };

    const signIn = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await issueJWT(result.user);
        return result;
    };

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        await issueJWT(result.user);
        return result;
    };

    const updateUser = (name, photo) =>
        updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

    const logOut = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
            credentials: "include",
        });
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loading, signUp, signIn, googleSignIn, updateUser, logOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}