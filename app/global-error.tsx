"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 max-w-md mb-8">
            We apologize for the inconvenience. A critical error has occurred.
          </p>
          <Button onClick={reset}>Try again</Button>
        </div>
      </body>
    </html>
  )
}
