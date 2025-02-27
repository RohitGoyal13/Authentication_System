import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/signup" || path === "/login";
    const isProfilePath = path.startsWith("/profile/"); // Match dynamic profile paths
    const token = request.cookies.get('token')?.value || '';

    // Redirect logged-in users away from public pages
    if ((isPublicPath || isProfilePath) && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // Redirect non-logged-in users trying to access private pages
    if ((!isPublicPath && !token) || (isProfilePath && !token)) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

// Configure the matcher to apply the middleware correctly
export const config = {
    matcher: [
        '/',
        '/signup',
        '/login',
        '/profile/:path*', // Ensure all profile paths are matched
    ]
};
