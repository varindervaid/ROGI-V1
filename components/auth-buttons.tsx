"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

export function AuthButtons() {
  const { user, signOut } = useAuth()

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/auth/signin">
        <Button variant="ghost">Sign In</Button>
      </Link>
      <Link href="/auth/signup">
        <Button variant="default">Sign Up</Button>
      </Link>
    </div>
  )
}
