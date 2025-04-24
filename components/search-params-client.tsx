"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

interface SearchParamsDisplayProps {
  paramName?: string
}

function SearchParamsContent({ paramName }: SearchParamsDisplayProps) {
  const searchParams = useSearchParams()
  const value = paramName ? searchParams.get(paramName) : null

  if (!paramName || !value) return null

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <p>
        <span className="font-medium">{paramName}:</span> {value}
      </p>
    </div>
  )
}

export function SearchParamsDisplay(props: SearchParamsDisplayProps) {
  return (
    <Suspense fallback={<div className="mt-4 p-4 bg-gray-100 rounded-md animate-pulse h-10"></div>}>
      <SearchParamsContent {...props} />
    </Suspense>
  )
}
