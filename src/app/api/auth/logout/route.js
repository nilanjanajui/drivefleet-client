import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
    );

    response.cookies.set("drivefleet_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0, // immediately expire
        path: "/",
    });

    return response;
}