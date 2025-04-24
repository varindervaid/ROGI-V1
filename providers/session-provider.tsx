"use client"

import type React from "react"
import { AuthProvider } from "@/context/auth-context"

// This is a compatibility wrapper to replace Next-Auth's SessionProvider
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
