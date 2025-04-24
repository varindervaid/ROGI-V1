"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { navigateToApplication } from "@/utils/calculator-to-application"
import CalculatorSummary from "./calculator-summary"

const calculateMonthlyPayment = (amount: number, rate: number, years: number) => {
  const monthlyRate = rate / 100 / 12
  const numberOfPayments = years * 12
  return (
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  )
}

export default function RefinanceCalculator() {
  // Add the router inside the component
  const router = useRouter()

  // Current Mortgage Information
  const [currentLoanAmount, setCurrentLoanAmount] = useState(300000)
  const [currentInterestRate, setCurrentInterestRate] = useState(4.5)
  const [currentAmortizationPeriod, setCurrentAmortizationPeriod] = useState(20)
  const [currentPaymentFrequency, setCurrentPaymentFrequency] = useState("monthly")

  // New Mortgage Information
  const [newLoanAmount, setNewLoanAmount] = useState(320000)
  const [newInterestRate, setNewInterestRate] = useState(3.75)
  const [newAmortizationPeriod, setNewAmortizationPeriod] = useState(25)
  const [newPaymentFrequency, setNewPaymentFrequency] = useState("monthly")

  // Property Information
  const [purchasePrice, setPurchasePrice] = useState(500000)
  const [downPayment, setDownPayment] = useState(100000)
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20)
  const [annualPropertyTax, setAnnualPropertyTax] = useState(5000)
  const [location, setLocation] = useState("")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value)
  }

  const refinanceCalculations = useMemo(() => {
    const currentMonthlyPayment = calculateMonthlyPayment(
      currentLoanAmount,
      currentInterestRate,
      currentAmortizationPeriod,
    )
    const newMonthlyPayment = calculateMonthlyPayment(newLoanAmount, newInterestRate, newAmortizationPeriod)
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment
    const breakEvenMonths = Math.ceil(3000 / monthlySavings) // Assuming $3000 refinance cost

    return {
      currentMonthlyPayment,
      newMonthlyPayment,
      monthlySavings,
      breakEvenMonths,
    }
  }, [
    currentLoanAmount,
    currentInterestRate,
    currentAmortizationPeriod,
    newLoanAmount,
    newInterestRate,
    newAmortizationPeriod,
  ])

  const updatePurchasePrice = (value: number) => {
    setPurchasePrice(value)
    const newDownPayment = (value * downPaymentPercentage) / 100
    setDownPayment(newDownPayment)
    setNewLoanAmount(value - newDownPayment)
  }

  const updateDownPayment = (value: number) => {
    setDownPayment(value)
    setDownPaymentPercentage((value / purchasePrice) * 100)
    setNewLoanAmount(purchasePrice - value)
  }

  const updateDownPaymentPercentage = (value: number) => {
    setDownPaymentPercentage(value)
    const newDownPayment = (purchasePrice * value) / 100
    setDownPayment(newDownPayment)
    setNewLoanAmount(purchasePrice - newDownPayment)
  }

  // Add this function inside the component
  const handleApplyNow = () => {
    const calculatorData = {
      currentLoanAmount,
      currentInterestRate,
      currentAmortizationPeriod,
      currentPaymentFrequency,
      newLoanAmount,
      newInterestRate,
      newAmortizationPeriod,
      newPaymentFrequency,
      purchasePrice,
      downPayment,
      downPaymentPercentage,
      annualPropertyTax,
      location,
      currentMonthlyPayment: refinanceCalculations.currentMonthlyPayment,
      newMonthlyPayment: refinanceCalculations.newMonthlyPayment,
      monthlySavings: refinanceCalculations.monthlySavings,
      breakEvenMonths: refinanceCalculations.breakEvenMonths,
    }

    navigateToApplication(router, "refinance", calculatorData)
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Refinance Calculator</h2>
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="w-full flex flex-wrap mb-4">
          <TabsTrigger value="current" className="flex-1 text-xs sm:text-sm py-2 px-1">
            <span className="hidden sm:inline">Current Mortgage</span>
            <span className="sm:hidden">Current</span>
          </TabsTrigger>
          <TabsTrigger value="new" className="flex-1 text-xs sm:text-sm py-2 px-1">
            <span className="hidden sm:inline">New Mortgage</span>
            <span className="sm:hidden">New</span>
          </TabsTrigger>
          <TabsTrigger value="property" className="flex-1 text-xs sm:text-sm py-2 px-1">
            Property
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex-1 text-xs sm:text-sm py-2 px-1">
            Summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Mortgage Information</CardTitle>
              <CardDescription>Enter details about your current mortgage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-loan-amount">Current Loan Amount</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="current-loan-amount"
                    type="number"
                    value={currentLoanAmount}
                    onChange={(e) => setCurrentLoanAmount(Number(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">{formatCurrency(currentLoanAmount)}</span>
                </div>
                <Slider
                  min={0}
                  max={1000000}
                  step={1000}
                  value={[currentLoanAmount]}
                  onValueChange={(value) => setCurrentLoanAmount(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-interest-rate">Current Interest Rate (%)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="current-interest-rate"
                    type="number"
                    value={currentInterestRate}
                    onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                    step="0.01"
                  />
                  <span className="text-sm text-muted-foreground">{currentInterestRate}%</span>
                </div>
                <Slider
                  min={0}
                  max={10}
                  step={0.05}
                  value={[currentInterestRate]}
                  onValueChange={(value) => setCurrentInterestRate(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-amortization">Current Amortization Period (years)</Label>
                <Select
                  value={currentAmortizationPeriod.toString()}
                  onValueChange={(value) => setCurrentAmortizationPeriod(Number(value))}
                >
                  <SelectTrigger id="current-amortization">
                    <SelectValue placeholder="Select amortization period" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25, 30].map((years) => (
                      <SelectItem key={years} value={years.toString()}>
                        {years} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-payment-frequency">Current Payment Frequency</Label>
                <Select value={currentPaymentFrequency} onValueChange={setCurrentPaymentFrequency}>
                  <SelectTrigger id="current-payment-frequency">
                    <SelectValue placeholder="Select payment frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="accelerated-bi-weekly">Accelerated Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="accelerated-weekly">Accelerated Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Mortgage Information</CardTitle>
              <CardDescription>Enter details about your new mortgage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-loan-amount">New Loan Amount</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="new-loan-amount"
                    type="number"
                    value={newLoanAmount}
                    onChange={(e) => setNewLoanAmount(Number(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">{formatCurrency(newLoanAmount)}</span>
                </div>
                <Slider
                  min={0}
                  max={1000000}
                  step={1000}
                  value={[newLoanAmount]}
                  onValueChange={(value) => setNewLoanAmount(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-interest-rate">New Interest Rate (%)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="new-interest-rate"
                    type="number"
                    value={newInterestRate}
                    onChange={(e) => setNewInterestRate(Number(e.target.value))}
                    step="0.01"
                  />
                  <span className="text-sm text-muted-foreground">{newInterestRate}%</span>
                </div>
                <Slider
                  min={0}
                  max={10}
                  step={0.05}
                  value={[newInterestRate]}
                  onValueChange={(value) => setNewInterestRate(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-amortization">New Amortization Period (years)</Label>
                <Select
                  value={newAmortizationPeriod.toString()}
                  onValueChange={(value) => setNewAmortizationPeriod(Number(value))}
                >
                  <SelectTrigger id="new-amortization">
                    <SelectValue placeholder="Select amortization period" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25, 30].map((years) => (
                      <SelectItem key={years} value={years.toString()}>
                        {years} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-payment-frequency">New Payment Frequency</Label>
                <Select value={newPaymentFrequency} onValueChange={setNewPaymentFrequency}>
                  <SelectTrigger id="new-payment-frequency">
                    <SelectValue placeholder="Select payment frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="accelerated-bi-weekly">Accelerated Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="accelerated-weekly">Accelerated Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="property">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>Enter details about your property.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchase-price">Property Value</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="purchase-price"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => updatePurchasePrice(Number(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">{formatCurrency(purchasePrice)}</span>
                </div>
                <Slider
                  min={0}
                  max={2000000}
                  step={5000}
                  value={[purchasePrice]}
                  onValueChange={(value) => updatePurchasePrice(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="down-payment">Home Equity</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => updateDownPayment(Number(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">{formatCurrency(downPayment)}</span>
                </div>
                <Slider
                  min={0}
                  max={purchasePrice}
                  step={5000}
                  value={[downPayment]}
                  onValueChange={(value) => updateDownPayment(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="down-payment-percentage">Home Equity Percentage</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="down-payment-percentage"
                    type="number"
                    value={downPaymentPercentage}
                    onChange={(e) => updateDownPaymentPercentage(Number(e.target.value))}
                    step="0.1"
                  />
                  <span className="text-sm text-muted-foreground">{downPaymentPercentage.toFixed(1)}%</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={0.5}
                  value={[downPaymentPercentage]}
                  onValueChange={(value) => updateDownPaymentPercentage(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-property-tax">Annual Property Tax</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="annual-property-tax"
                    type="number"
                    value={annualPropertyTax}
                    onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">{formatCurrency(annualPropertyTax)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Property Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AB">Alberta</SelectItem>
                    <SelectItem value="BC">British Columbia</SelectItem>
                    <SelectItem value="MB">Manitoba</SelectItem>
                    <SelectItem value="NB">New Brunswick</SelectItem>
                    <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                    <SelectItem value="NS">Nova Scotia</SelectItem>
                    <SelectItem value="ON">Ontario</SelectItem>
                    <SelectItem value="PE">Prince Edward Island</SelectItem>
                    <SelectItem value="QC">Quebec</SelectItem>
                    <SelectItem value="SK">Saskatchewan</SelectItem>
                    <SelectItem value="NT">Northwest Territories</SelectItem>
                    <SelectItem value="NU">Nunavut</SelectItem>
                    <SelectItem value="YT">Yukon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Refinance Summary</CardTitle>
              <CardDescription>Review your refinance details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Current Mortgage</h3>
                  <p>Loan Amount: {formatCurrency(currentLoanAmount)}</p>
                  <p>Interest Rate: {currentInterestRate}%</p>
                  <p>Amortization: {currentAmortizationPeriod} years</p>
                  <p>Monthly Payment: {formatCurrency(refinanceCalculations.currentMonthlyPayment)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">New Mortgage</h3>
                  <p>Loan Amount: {formatCurrency(newLoanAmount)}</p>
                  <p>Interest Rate: {newInterestRate}%</p>
                  <p>Amortization: {newAmortizationPeriod} years</p>
                  <p>Monthly Payment: {formatCurrency(refinanceCalculations.newMonthlyPayment)}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Savings Analysis</h3>
                <div className="space-y-2">
                  <p>Monthly Savings: {formatCurrency(refinanceCalculations.monthlySavings)}</p>
                  <p>
                    Break-even Point:{" "}
                    {refinanceCalculations.monthlySavings > 0
                      ? `${refinanceCalculations.breakEvenMonths} months`
                      : "N/A - No monthly savings"}
                  </p>
                  <p>5-Year Savings: {formatCurrency(refinanceCalculations.monthlySavings * 12 * 5)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <CalculatorSummary
            calculatorType="refinance"
            calculatorData={{
              currentLoanAmount,
              currentInterestRate,
              newLoanAmount,
              newInterestRate,
              monthlySavings: refinanceCalculations.monthlySavings,
              breakEvenMonths: refinanceCalculations.breakEvenMonths,
            }}
          />
          <div className="mt-6 flex justify-end">
            <Button onClick={handleApplyNow} className="px-6">
              Apply for Refinancing
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
