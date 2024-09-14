import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const publicPaths = ['/login', '/signup', '/verifyemail'];
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

    const token = request.cookies.get('token')?.value || '';

    if (!isPublicPath &&!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/signup',
        '/verifyemail',
        '/profile',
        '/'
    ]
}