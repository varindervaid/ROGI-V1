"use client"

import { createContext, useContext } from "react"

interface AuthContextType {
  user: { name: string; email: string } | null
  isLoading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: { name: "Demo User", email: "demo@example.com" },
  isLoading: false,
  signOut: () => {},
})

export const useAuth = () => useContext(AuthContext)
