"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock calculation data
const MOCK_CALCULATION = {
  id: "calc-1",
  name: "First Home Purchase",
  calculator_type: "mortgage",
  created_at: "2023-05-15T10:30:00Z",
  data: {
    propertyValue: 500000,
    downPayment: 100000,
    interestRate: 5.99,
    amortizationPeriod: 25,
    paymentFrequency: "monthly",
    term: 5,
    monthlyPayment: 2584.59,
    totalInterest: 375377,
    totalCost: 775377,
  },
}

export default function MortgageCalculatorPage() {
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
      <h1 className="text-3xl font-bold mb-6">Mortgage Calculator</h1>

      {loading ? (
        <div className="text-center py-8">Loading calculation...</div>
      ) : calculation ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{calculation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property Value:</span>
                  <span>${calculation.data.propertyValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Down Payment:</span>
                  <span>
                    ${calculation.data.downPayment.toLocaleString()} (
                    {Math.round((calculation.data.downPayment / calculation.data.propertyValue) * 100)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mortgage Amount:</span>
                  <span>${(calculation.data.propertyValue - calculation.data.downPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span>{calculation.data.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amortization Period:</span>
                  <span>{calculation.data.amortizationPeriod} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Frequency:</span>
                  <span>{calculation.data.paymentFrequency}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment:</span>
                  <span className="font-bold">
                    $
                    {calculation.data.monthlyPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Interest:</span>
                  <span>${calculation.data.totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span>${calculation.data.totalCost.toLocaleString()}</span>
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
