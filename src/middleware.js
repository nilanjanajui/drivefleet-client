import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

// Add any private API routes here
const PROTECTED_ROUTES = [
    "/api/cars/add",
    "/api/bookings",
    "/api/my-cars",
];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const isProtected = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    if (!isProtected) return NextResponse.next();

    const token = request.cookies.get("drivefleet_token")?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized — no token" },
            { status: 401 }
        );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return NextResponse.json(
            { message: "Unauthorized — invalid token" },
            { status: 401 }
        );
    }

    // Pass user email in header so API routes can use it
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-email", decoded.email);

    return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
    matcher: ["/api/cars/add", "/api/bookings/:path*", "/api/my-cars/:path*"],
};