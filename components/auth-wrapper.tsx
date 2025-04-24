"use client"

import type React from "react"
import { useEffect } from "react"

interface AuthWrapperProps {
  children: React.ReactNode
  loginButton: HTMLElement | null
  signupButton: HTMLElement | null
}

export function AuthWrapper({ children, loginButton, signupButton }: AuthWrapperProps) {
  // No authentication logic - just setup the buttons
  useEffect(() => {
    if (loginButton && signupButton) {
      // Simple button setup without auth checks
      loginButton.innerHTML = "Sign in"
      loginButton.onclick = () => (window.location.href = "/auth/signin")

      signupButton.innerHTML = "Sign up"
      signupButton.onclick = () => (window.location.href = "/auth/signup")
    }
  }, [loginButton, signupButton])

  return <>{children}</>
}
