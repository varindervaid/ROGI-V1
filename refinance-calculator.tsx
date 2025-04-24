"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

const calculateMonthlyPayment = (amount: number, rate: number, years: number) => {
  const monthlyRate = rate / 100 / 12
  const numberOfPayments = years * 12
  return (
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  )
}

export default function RefinanceCalculator() {
  // Current Mortgage Information
  const [currentLoanAmount, setCurrentLoanAmount] = useState(300000)
  const [currentInterestRate, setCurrentInterestRate] = useState(4.5)
  const [currentAmortizationPeriod, setCurrentAmortizationPeriod] = useState(20)
  const [currentPaymentFrequency, setCurrentPaymentFrequency] = useState("bi-weekly")

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

  // Additional Inputs
  const [reasonForRefinancing, setReasonForRefinancing] = useState("lower-interest-rate")
  const [currentCreditScore, setCurrentCreditScore] = useState(750)
  const [currentDebtToIncomeRatio, setCurrentDebtToIncomeRatio] = useState(35)

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <NavigationMenu className="py-2">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-lg font-semibold" href="/">
                  MortgageCalc
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Mortgage Calculator</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Calculate your mortgage payments and more.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/refinance-calculator"
                        >
                          <div className="text-sm font-medium leading-none">Refinance Calculator</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            See if refinancing makes sense for you.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-sm" href="/">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-sm" href="/">
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Refinance Calculator</h1>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Mortgage</TabsTrigger>
            <TabsTrigger value="new">New Mortgage</TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
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
                  <Input
                    id="current-loan-amount"
                    type="number"
                    value={currentLoanAmount}
                    onChange={(e) => setCurrentLoanAmount(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-interest-rate">Current Interest Rate (%)</Label>
                  <Input
                    id="current-interest-rate"
                    type="number"
                    value={currentInterestRate}
                    onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-amortization-period">Current Amortization Period (years)</Label>
                  <Select
                    value={currentAmortizationPeriod.toString()}
                    onValueChange={(value) => setCurrentAmortizationPeriod(Number(value))}
                  >
                    <SelectTrigger id="current-amortization-period">
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
                <div className="space-y-2">
                  <Label htmlFor="current-payment-frequency">Current Payment Frequency</Label>
                  <Select value={currentPaymentFrequency} onValueChange={setCurrentPaymentFrequency}>
                    <SelectTrigger id="current-payment-frequency">
                      <SelectValue placeholder="Select payment frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="accelerated-bi-weekly">Accelerated Bi-Weekly</SelectItem>
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
                <CardDescription>Enter details about your potential new mortgage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-loan-amount">New Loan Amount</Label>
                  <Input
                    id="new-loan-amount"
                    type="number"
                    value={newLoanAmount}
                    onChange={(e) => setNewLoanAmount(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-interest-rate">New Interest Rate (%)</Label>
                  <Input
                    id="new-interest-rate"
                    type="number"
                    value={newInterestRate}
                    onChange={(e) => setNewInterestRate(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-amortization-period">New Amortization Period (years)</Label>
                  <Select
                    value={newAmortizationPeriod.toString()}
                    onValueChange={(value) => setNewAmortizationPeriod(Number(value))}
                  >
                    <SelectTrigger id="new-amortization-period">
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
                <div className="space-y-2">
                  <Label htmlFor="new-payment-frequency">New Payment Frequency</Label>
                  <Select value={newPaymentFrequency} onValueChange={setNewPaymentFrequency}>
                    <SelectTrigger id="new-payment-frequency">
                      <SelectValue placeholder="Select payment frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="accelerated-bi-weekly">Accelerated Bi-Weekly</SelectItem>
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
                <CardDescription>Enter details about the property.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase-price">Purchase Price</Label>
                  <Input
                    id="purchase-price"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="down-payment">Down Payment</Label>
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="down-payment-percentage">Down Payment Percentage</Label>
                  <Input
                    id="down-payment-percentage"
                    type="number"
                    value={downPaymentPercentage}
                    onChange={(e) => setDownPaymentPercentage(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annual-property-tax">Annual Property Tax</Label>
                  <Input
                    id="annual-property-tax"
                    type="number"
                    value={annualPropertyTax}
                    onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ontario">Ontario</SelectItem>
                      <SelectItem value="british-columbia">British Columbia</SelectItem>
                      <SelectItem value="quebec">Quebec</SelectItem>
                      <SelectItem value="alberta">Alberta</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
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
                <CardDescription>Review your refinance details and potential savings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Current Monthly Payment</h3>
                    <p className="text-2xl font-bold">{formatCurrency(refinanceCalculations.currentMonthlyPayment)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">New Monthly Payment</h3>
                    <p className="text-2xl font-bold">{formatCurrency(refinanceCalculations.newMonthlyPayment)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Monthly Savings</h3>
                    <p className="text-2xl font-bold">{formatCurrency(refinanceCalculations.monthlySavings)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Break-even Period</h3>
                    <p className="text-2xl font-bold">{refinanceCalculations.breakEvenMonths} months</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Refinance Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Detail</TableHead>
                        <TableHead>Current Mortgage</TableHead>
                        <TableHead>New Mortgage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Loan Amount</TableCell>
                        <TableCell>{formatCurrency(currentLoanAmount)}</TableCell>
                        <TableCell>{formatCurrency(newLoanAmount)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Interest Rate</TableCell>
                        <TableCell>{currentInterestRate}%</TableCell>
                        <TableCell>{newInterestRate}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Amortization Period</TableCell>
                        <TableCell>{currentAmortizationPeriod} years</TableCell>
                        <TableCell>{newAmortizationPeriod} years</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Payment Frequency</TableCell>
                        <TableCell>{currentPaymentFrequency}</TableCell>
                        <TableCell>{newPaymentFrequency}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2023 MortgageCalc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
