"use client"

import type React from "react"
import { usePathname } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // This component is now just a pass-through to maintain backward compatibility
  // All layout functionality has been moved to main-layout.tsx
  return <>{children}</>
}
