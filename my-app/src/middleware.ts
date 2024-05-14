import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";
import { string } from "zod";

export async function middleware(request: NextRequest) {
  const token = cookies().get("access_token");
  // console.log("🚀 ~ middleware ~ token:", token);
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/register")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    if (!token) {
      return NextResponse.json({ message: "You must login first" }, { status: 401 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = token.value;

    const { payload } = await jose.jwtVerify<{
      _id: string;
      email: string;
      username: string;
    }>(jwt, secret);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", payload._id);
    requestHeaders.set("email", payload.email);
    requestHeaders.set("username", payload.username);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }
}
