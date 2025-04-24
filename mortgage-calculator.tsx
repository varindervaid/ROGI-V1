"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(500000)
  const [downPayment, setDownPayment] = useState(100000)
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20)
  const [mortgageAmount, setMortgageAmount] = useState(400000)
  const [interestRate, setInterestRate] = useState(5)
  const [amortizationPeriod, setAmortizationPeriod] = useState(25)
  const [paymentFrequency, setPaymentFrequency] = useState("monthly")
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState<"yes" | "no">("no")
  const [location, setLocation] = useState("")
  const [aiSummary, setAiSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [annualPropertyTax, setAnnualPropertyTax] = useState(5000)

  const updateDownPayment = (value: number) => {
    setDownPayment(value)
    setDownPaymentPercentage((value / purchasePrice) * 100)
    setMortgageAmount(purchasePrice - value)
  }

  const updateDownPaymentPercentage = (value: number) => {
    setDownPaymentPercentage(value)
    const newDownPayment = (purchasePrice * value) / 100
    setDownPayment(newDownPayment)
    setMortgageAmount(purchasePrice - newDownPayment)
  }

  const updatePurchasePrice = (value: number) => {
    setPurchasePrice(value)
    const newDownPayment = (value * downPaymentPercentage) / 100
    setDownPayment(newDownPayment)
    setMortgageAmount(value - newDownPayment)
  }

  const calculateMonthlyPayment = (amount: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12
    const numberOfPayments = years * 12
    return (
      (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    )
  }

  const calculateTotalInterestPaid = (monthlyPayment: number, years: number, amount: number) => {
    return monthlyPayment * years * 12 - amount
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value)
  }

  const mortgageCalculations = useMemo(() => {
    const monthlyPayment = calculateMonthlyPayment(mortgageAmount, interestRate, amortizationPeriod)
    const totalInterestPaid = calculateTotalInterestPaid(monthlyPayment, amortizationPeriod, mortgageAmount)
    const interestPaidPerMonth = totalInterestPaid / (amortizationPeriod * 12)
    const monthlyPropertyTax = annualPropertyTax / 12
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax
    const totalPaymentOverAmortization = totalMonthlyPayment * amortizationPeriod * 12
    const totalTaxPaidOverAmortization = annualPropertyTax * amortizationPeriod

    return {
      monthlyPayment,
      totalInterestPaid,
      payoffPeriod: `${amortizationPeriod} years`,
      interestPaidPerMonth,
      monthlyPropertyTax,
      totalMonthlyPayment,
      totalPaymentOverAmortization,
      totalTaxPaidOverAmortization,
    }
  }, [mortgageAmount, interestRate, amortizationPeriod, annualPropertyTax])

  const gatherFormData = () => {
    return {
      property: {
        location,
        purchasePrice,
        downPayment,
        downPaymentPercentage,
        annualPropertyTax,
      },
      mortgage: {
        mortgageAmount,
        interestRate,
        amortizationPeriod,
        paymentFrequency,
        isFirstTimeBuyer,
      },
    }
  }

  const sendToMakeCom = async () => {
    const formData = gatherFormData()
    setIsLoading(true)
    try {
      const response = await fetch("YOUR_MAKE_COM_WEBHOOK_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        setAiSummary(data.summary)
        console.log("Data sent successfully to make.com and received AI summary")
      } else {
        console.error("Failed to send data to make.com")
        setAiSummary("Failed to generate summary. Please try again.")
      }
    } catch (error) {
      console.error("Error sending data to make.com:", error)
      setAiSummary("An error occurred while generating the summary. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm">About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm">Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Mortgage Calculator</h1>
        <Tabs defaultValue="property" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="amortization">Amortization</TabsTrigger>
          </TabsList>
          <TabsContent value="property">
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>Enter details about the property you're interested in.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label htmlFor="down-payment-percentage">Down Payment Percentage</Label>
                  <Input
                    id="down-payment-percentage"
                    type="number"
                    value={downPaymentPercentage.toFixed(2)}
                    onChange={(e) => updateDownPaymentPercentage(Number(e.target.value))}
                  />
                  <Slider
                    min={0}
                    max={100}
                    step={0.1}
                    value={[downPaymentPercentage]}
                    onValueChange={(value) => updateDownPaymentPercentage(value[0])}
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
                  <Slider
                    min={0}
                    max={20000}
                    step={100}
                    value={[annualPropertyTax]}
                    onValueChange={(value) => setAnnualPropertyTax(value[0])}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mortgage">
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Information</CardTitle>
                <CardDescription>Enter details about your mortgage terms.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mortgage-amount">Mortgage Amount</Label>
                  <Input id="mortgage-amount" type="number" value={mortgageAmount} readOnly />
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
                  <Select
                    value={amortizationPeriod.toString()}
                    onValueChange={(value) => setAmortizationPeriod(Number(value))}
                  >
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
                <div className="space-y-2">
                  <Label htmlFor="payment-frequency">Payment Frequency</Label>
                  <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                    <SelectTrigger id="payment-frequency">
                      <SelectValue placeholder="Select payment frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="accelerated-bi-weekly">Accelerated Bi-Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first-time-buyer">First-Time Home Buyer</Label>
                  <Select value={isFirstTimeBuyer} onValueChange={setIsFirstTimeBuyer}>
                    <SelectTrigger id="first-time-buyer">
                      <SelectValue placeholder="Are you a first-time home buyer?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Your mortgage payment details and AI-generated summary.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={sendToMakeCom} disabled={isLoading} className="mb-4">
                  {isLoading ? "Generating Summary..." : "Generate AI Summary"}
                </Button>
                {aiSummary && (
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <h3 className="text-lg font-semibold mb-2">AI-Generated Summary:</h3>
                    <p className="whitespace-pre-wrap">{aiSummary}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="amortization">
            <Card>
              <CardHeader>
                <CardTitle>Amortization Details</CardTitle>
                <CardDescription>Breakdown of your mortgage payments, interest, and taxes over time.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Monthly Mortgage Payment</h3>
                    <p className="text-2xl font-bold">{formatCurrency(mortgageCalculations.monthlyPayment)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Monthly Property Tax</h3>
                    <p className="text-2xl font-bold">{formatCurrency(mortgageCalculations.monthlyPropertyTax)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Total Monthly Payment</h3>
                    <p className="text-2xl font-bold">{formatCurrency(mortgageCalculations.totalMonthlyPayment)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Total Interest Paid</h3>
                    <p className="text-2xl font-bold">{formatCurrency(mortgageCalculations.totalInterestPaid)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Payoff Period</h3>
                    <p className="text-2xl font-bold">{mortgageCalculations.payoffPeriod}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Interest Paid Per Month</h3>
                    <p className="text-2xl font-bold">{formatCurrency(mortgageCalculations.interestPaidPerMonth)}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Mortgage and Tax Summary</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Loan amount: {formatCurrency(mortgageAmount)}</li>
                    <li>Interest rate: {interestRate}%</li>
                    <li>Amortization period: {amortizationPeriod} years</li>
                    <li>Payment frequency: {paymentFrequency}</li>
                    <li>Annual property tax: {formatCurrency(annualPropertyTax)}</li>
                    <li>
                      Total interest paid over the life of the loan:{" "}
                      {formatCurrency(mortgageCalculations.totalInterestPaid)}
                    </li>
                    <li>
                      Total property tax paid over the amortization period:{" "}
                      {formatCurrency(mortgageCalculations.totalTaxPaidOverAmortization)}
                    </li>
                    <li>
                      Total amount paid (principal + interest + tax):{" "}
                      {formatCurrency(mortgageCalculations.totalPaymentOverAmortization)}
                    </li>
                  </ul>
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
