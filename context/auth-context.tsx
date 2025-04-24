"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signOut: () => void
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user on load
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      // In a real app, you would validate credentials against your backend
      // For demo purposes, we'll accept any email/password
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

      const user = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: credentials.email.split("@")[0],
        email: credentials.email,
      }

      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
      return user
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>{children}</AuthContext.Provider>
}
