import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Compare Mortgages Side by Side</h1>
      <p className="mb-8">Mortgage comparison tool content goes here.</p>

      {/* Calculator content would go here */}

      <div className="mt-8 flex justify-end">
        <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-800">
          <Link href="/pre-approval">Get Pre-Approved</Link>
        </Button>
      </div>
    </div>
  )
}
