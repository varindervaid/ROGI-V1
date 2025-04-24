"use client"

import type React from "react"

// This component is now just a pass-through to maintain backward compatibility
// All layout functionality has been moved to main-layout.tsx
export default function SafeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
