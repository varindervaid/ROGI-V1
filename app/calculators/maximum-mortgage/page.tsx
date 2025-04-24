"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { navigateToApplication } from "@/utils/calculator-to-application"
import Link from "next/link"

export default function MaximumMortgagePage() {
  const router = useRouter()

  const handleApplyNow = () => {
    // Sample data - in a real implementation, this would be the actual calculator data
    const calculatorData = {
      estimatedIncome: "100000",
      downPayment: "50000",
      interestRate: "4.5",
      amortizationPeriod: "25",
    }

    navigateToApplication(router, "purchase", calculatorData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Maximum Mortgage Calculator</h1>
      <p className="mb-8">Maximum Mortgage Calculator content goes here.</p>

      {/* Calculator content would go here */}

      <div className="mt-8 flex justify-end">
        <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-800">
          <Link href="/pre-approval">Get Pre-Approved</Link>
        </Button>
      </div>
    </div>
  )
}
