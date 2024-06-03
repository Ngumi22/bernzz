import { RequestAsyncStorage } from "next/dist/client/components/request-async-storage.external";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: RequestAsyncStorage) {
  const res = NextResponse.next();
  res.headers.append(
    "Access-Control-Allow-Origin",
    "http://localhost:3000/api"
  ),
    res.headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    ),
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

  return res;
}

export const constructor = {
  matcher: ["/api/:path*"],
};
