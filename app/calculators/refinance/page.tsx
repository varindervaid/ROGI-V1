"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock calculation data
const MOCK_CALCULATION = {
  id: "calc-2",
  name: "Refinance Option",
  calculator_type: "refinance",
  created_at: "2023-06-20T14:45:00Z",
  data: {
    currentMortgageBalance: 350000,
    currentInterestRate: 6.5,
    currentMonthlyPayment: 2210.34,
    currentRemainingTerm: 20,
    newInterestRate: 5.25,
    newTerm: 25,
    newMonthlyPayment: 1890.45,
    monthlySavings: 319.89,
    totalSavings: 76773.6,
    breakEvenPoint: 8.5,
  },
}

export default function RefinanceCalculatorPage() {
  const searchParams = useSearchParams()
  const calculationId = searchParams.get("id")
  const [calculation, setCalculation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching calculation data
    const fetchCalculation = async () => {
      setLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (calculationId) {
        setCalculation(MOCK_CALCULATION)
      } else {
        setCalculation(null)
      }

      setLoading(false)
    }

    fetchCalculation()
  }, [calculationId])

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Refinance Calculator</h1>

      {loading ? (
        <div className="text-center py-8">Loading calculation...</div>
      ) : calculation ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Mortgage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Balance:</span>
                  <span>${calculation.data.currentMortgageBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Interest Rate:</span>
                  <span>{calculation.data.currentInterestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Monthly Payment:</span>
                  <span>
                    $
                    {calculation.data.currentMonthlyPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining Term:</span>
                  <span>{calculation.data.currentRemainingTerm} years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refinance Option</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New Interest Rate:</span>
                  <span>{calculation.data.newInterestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New Term:</span>
                  <span>{calculation.data.newTerm} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New Monthly Payment:</span>
                  <span>
                    $
                    {calculation.data.newMonthlyPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Savings:</span>
                  <span className="font-bold text-green-600">
                    $
                    {calculation.data.monthlySavings.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Savings:</span>
                  <span className="font-bold text-green-600">
                    $
                    {calculation.data.totalSavings.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Break-even Point:</span>
                  <span>{calculation.data.breakEvenPoint} months</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-8">
          <p>No calculation found. Please create a new calculation.</p>
        </div>
      )}
    </div>
  )
}
