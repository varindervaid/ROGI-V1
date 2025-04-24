import PenaltyCalculator from "@/components/penalty-calculator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PenaltyCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mortgage Penalty Calculator</h1>
      <p className="mb-8">
        Calculate the potential penalty for breaking your mortgage early. This calculator provides an estimate of what
        you might have to pay if you need to break your mortgage before the term ends.
      </p>
      <PenaltyCalculator />

      <div className="mt-8 flex justify-end">
        <Button
          asChild
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          <Link href="/pre-approval">Pre Approval</Link>
        </Button>
      </div>
    </div>
  )
}
