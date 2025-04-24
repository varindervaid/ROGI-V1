"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { navigateToApplication } from "@/utils/calculator-to-application"
import CalculatorSummary from "@/components/calculator-summary"

const calculateMonthlyPayment = (amount: number, rate: number, years: number) => {
  const monthlyRate = rate / 100 / 12
  const numberOfPayments = years * 12
  return (
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  )
}

export default function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(500000)
  const [downPayment, setDownPayment] = useState(100000)
  const [interestRate, setInterestRate] = useState(5)
  const [amortizationPeriod, setAmortizationPeriod] = useState(25)

  const router = useRouter()

  const mortgageCalculations = useMemo(() => {
    const mortgageAmount = purchasePrice - downPayment
    const monthlyPayment = calculateMonthlyPayment(mortgageAmount, interestRate, amortizationPeriod)
    return {
      monthlyPayment,
    }
  }, [purchasePrice, downPayment, interestRate, amortizationPeriod])

  const updateDownPayment = (value: number) => {
    setDownPayment(value)
  }

  const updatePurchasePrice = (value: number) => {
    setPurchasePrice(value)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value)
  }

  const handleApplyNow = () => {
    const calculatorData = {
      purchasePrice,
      downPayment,
      interestRate,
      amortizationPeriod,
      monthlyPayment: mortgageCalculations.monthlyPayment,
    }

    navigateToApplication(router, "purchase", calculatorData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Calculator</CardTitle>
        <CardDescription>Calculate your estimated mortgage payment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="purchase-price">Purchase Price</Label>
          <Input
            id="purchase-price"
            type="number"
            value={purchasePrice}
            onChange={(e) => updatePurchasePrice(Number(e.target.value))}
          />
          <Slider
            min={100000}
            max={2000000}
            step={1000}
            value={[purchasePrice]}
            onValueChange={(value) => updatePurchasePrice(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="down-payment">Down Payment</Label>
          <Input
            id="down-payment"
            type="number"
            value={downPayment}
            onChange={(e) => updateDownPayment(Number(e.target.value))}
          />
          <Slider
            min={0}
            max={purchasePrice}
            step={1000}
            value={[downPayment]}
            onValueChange={(value) => updateDownPayment(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest-rate">Interest Rate (%)</Label>
          <Input
            id="interest-rate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
          <Slider
            min={0}
            max={10}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amortization-period">Amortization Period (years)</Label>
          <Select value={amortizationPeriod.toString()} onValueChange={(value) => setAmortizationPeriod(Number(value))}>
            <SelectTrigger id="amortization-period">
              <SelectValue placeholder="Select amortization period" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year} years
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>Monthly Payment: {formatCurrency(mortgageCalculations.monthlyPayment)}</div>

        {/* Add the AI Summary Component */}
        <CalculatorSummary
          calculatorType="mortgage"
          calculatorData={{
            purchasePrice,
            downPayment,
            interestRate,
            amortizationPeriod,
            monthlyPayment: mortgageCalculations.monthlyPayment,
          }}
        />

        <div className="flex justify-end mt-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" onClick={handleApplyNow}>
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
