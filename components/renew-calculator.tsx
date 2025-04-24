"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { navigateToApplication } from "@/utils/calculator-to-application"
import CalculatorSummary from "./calculator-summary"

interface CalculationResult {
  currentMonthlyPayment: number
  newMonthlyPayment: number
  monthlySavings: number
  totalSavings: number
}

export default function RenewCalculator() {
  const [currentBalance, setCurrentBalance] = useState("")
  const [currentRate, setCurrentRate] = useState("")
  const [newRate, setNewRate] = useState("")
  const [term, setTerm] = useState("")
  const router = useRouter()

  const handleApplyNow = () => {
    const calculatorData = {
      currentBalance,
      currentRate,
      newRate,
      term,
    }

    navigateToApplication(router, "renewal", calculatorData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Renewal Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-balance">Current Mortgage Balance</Label>
          <Input
            id="current-balance"
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            placeholder="Enter current balance"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="current-rate">Current Interest Rate (%)</Label>
          <Input
            id="current-rate"
            type="number"
            value={currentRate}
            onChange={(e) => setCurrentRate(e.target.value)}
            placeholder="Enter current rate"
            step="0.01"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-rate">New Interest Rate (%)</Label>
          <Input
            id="new-rate"
            type="number"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            placeholder="Enter new rate"
            step="0.01"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="term">New Term</Label>
          <Select value={term} onValueChange={setTerm}>
            <SelectTrigger id="term">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 7, 10].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year} year{year > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <CalculatorSummary
          calculatorType="renew"
          calculatorData={{
            currentBalance,
            currentRate,
            newRate,
            term,
            // We'll let the CalculatorSummary component handle the calculations
          }}
        />

        <div className="flex justify-end mt-8 pt-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" onClick={handleApplyNow}>
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
