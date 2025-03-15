import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'



export default async function Middleware(req : NextRequest) {
    const token = await getToken({req, secret : process.env.NEXTAUTH_SECRET});
    const pathname = req.nextUrl.pathname;
    if (!token) {
        return NextResponse.redirect(new URL('/auth/signIn',req.url));
    }
    
    if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL('/users',req.url))
    }

    if (pathname.startsWith("/users") && token.role !== "USER" && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL('/auth/signIn',req.url))
    }

    return NextResponse.next();
}

export const config = {matcher : ["/users/:path*","/admin/:path*"]}