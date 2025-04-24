"use client"

import { useAuth } from "@/context/auth-context"

// This is a compatibility layer for components that might still be using useSession
export function useSession() {
  const { user, isLoading } = useAuth()

  return {
    data: user ? { user } : null,
    status: isLoading ? "loading" : user ? "authenticated" : "unauthenticated",
  }
}
