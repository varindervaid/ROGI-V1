"use client"

// This file provides compatibility for imports from "next-auth/react"
import { useAuth } from "./context/auth-context"
import { SessionProvider } from "./providers/session-provider"

// Export a compatibility layer for useSession
export function useSession() {
  const { user, isLoading } = useAuth()

  return {
    data: user ? { user } : null,
    status: isLoading ? "loading" : user ? "authenticated" : "unauthenticated",
    update: async () => {
      /* No-op */
    },
  }
}

// Export SessionProvider for compatibility
export { SessionProvider }

// Export a dummy signIn function
export const signIn = async () => {
  console.warn("Using compatibility signIn function. Please update to use AuthContext directly.")
  return { ok: true, error: null }
}

// Export a dummy signOut function
export const signOut = async () => {
  console.warn("Using compatibility signOut function. Please update to use AuthContext directly.")
  return { ok: true, error: null }
}
