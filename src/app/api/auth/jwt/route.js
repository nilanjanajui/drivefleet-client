import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        const { email, name, photo } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const token = signToken({ email, name, photo });

        const response = NextResponse.json(
            { message: "Token issued successfully" },
            { status: 200 }
        );

        response.cookies.set("drivefleet_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("JWT generation error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}