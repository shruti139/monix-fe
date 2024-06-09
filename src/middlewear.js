// import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    console.log('path :>> ', path);
    const isLoginPage = path === '/login';
    const isDashboardPage = path === '/dashboard';
    const isBlank = path === '/';
    const token = request.cookies.get('token')?.value || '';
    console.log('token ---------------------:>> ', token);

    // if (token) {
    // 	const decoded = jwtDecode(token)
    // 	if (Date.now() / 1000 > decoded.exp) {
    // 		const response = NextResponse.redirect(new URL('/login', request.nextUrl));
    // 		response.cookies.delete("token");
    // 		return response;
    // 	}
    // }
    if (!isLoginPage && !isDashboardPage && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (isLoginPage && token || isBlank) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/dashboard", "/user", '/settings', '/products'],
};