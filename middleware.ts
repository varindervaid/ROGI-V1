import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For simplicity, we'll just pass through all requests
  // In a real app, you would check for auth cookies or tokens
  return NextResponse.next()
}

// Keep a minimal matcher configuration
export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/applications/:path*", "/admin/:path*"],
}
