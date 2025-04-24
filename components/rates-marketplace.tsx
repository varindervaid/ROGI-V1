"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Home, Info, SlidersHorizontal } from "lucide-react"
import CalculatorSummary from "./calculator-summary"

interface RateDetails {
  rate: number
  lender: string
  prime?: number
  details: string[]
}

interface Rate {
  term: string
  fixed: RateDetails
  variable?: RateDetails
}

// This data structure will be replaced with data from the spreadsheet
const marketRates: Rate[] = [
  {
    term: "2-yr",
    fixed: {
      rate: 4.24,
      lender: "Canadian Lender",
      details: ["No prepayment penalties", "120-day rate hold", "Available nationwide"],
    },
  },
  {
    term: "3-yr",
    fixed: {
      rate: 3.87,
      lender: "Canadian Lender",
      details: ["Up to 20% prepayment per year", "90-day rate hold", "First-time buyer bonus"],
    },
    variable: {
      rate: 4.3,
      lender: "Canadian Lender",
      prime: 0.9,
      details: ["Convert to fixed rate anytime", "Flexible prepayment options"],
    },
  },
  {
    term: "5-yr",
    fixed: {
      rate: 3.84,
      lender: "Canadian Lender",
      details: ["Up to 20% prepayment per year", "120-day rate hold", "Available nationwide"],
    },
    variable: {
      rate: 4.2,
      lender: "Canadian Lender",
      prime: 1.0,
      details: ["Convert to fixed rate anytime", "Up to 20% prepayment per year"],
    },
  },
]

// This data structure will be replaced with data from the spreadsheet
const bankRates: Rate[] = [
  {
    term: "2-yr",
    fixed: {
      rate: 5.29,
      lender: "CIBC",
      details: ["Up to 20% prepayment per year", "90-day rate hold"],
    },
  },
  {
    term: "3-yr",
    fixed: {
      rate: 4.46,
      lender: "Bank of Montreal",
      details: ["Up to 15% prepayment per year", "120-day rate hold"],
    },
    variable: {
      rate: 4.75,
      lender: "CIBC",
      prime: 0.45,
      details: ["Convert to fixed rate anytime", "Up to 20% prepayment per year"],
    },
  },
  {
    term: "5-yr",
    fixed: {
      rate: 4.24,
      lender: "CIBC",
      details: ["Up to 20% prepayment per year", "120-day rate hold", "Available nationwide"],
    },
    variable: {
      rate: 4.45,
      lender: "CIBC",
      prime: 0.75,
      details: ["Convert to fixed rate anytime", "Flexible prepayment options"],
    },
  },
]

export function RatesMarketplace() {
  const [transactionType, setTransactionType] = useState("buying")
  const [purchasePrice, setPurchasePrice] = useState("400000")
  const [downPayment, setDownPayment] = useState("20000")
  const [downPaymentPercent, setDownPaymentPercent] = useState("5")
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({})
  const [showAllRates, setShowAllRates] = useState(false)
  const [selectedRate, setSelectedRate] = useState<{ rate: number; term: string; type: string } | null>(null)

  const toggleDetails = (term: string) => {
    setShowDetails((prev) => ({ ...prev, [term]: !prev[term] }))
  }

  const handleRateSelect = (rate: number, term: string, type: string) => {
    setSelectedRate({ rate, term, type })
  }

  const renderRatesList = (rates: Rate[], rateType: "fixed" | "variable") => {
    return (
      <div className="space-y-4">
        {rates.map((rate) => {
          const rateData = rateType === "fixed" ? rate.fixed : rate.variable

          // Skip if this rate doesn't have the requested type
          if (!rateData && rateType === "variable") return null

          return (
            <Card key={`${rate.term}-${rateType}`}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-500">{rate.term}</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{rateData?.rate}%</div>
                    {rateType === "variable" && rateData?.prime && (
                      <div className="text-sm text-gray-600">Prime - {rateData.prime}%</div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Home className="h-4 w-4" />
                      <span className="text-sm">{rateData?.lender}</span>
                    </div>
                    <button
                      className="text-blue-600 text-sm hover:underline mt-2"
                      onClick={() => toggleDetails(`${rate.term}-${rateType}`)}
                    >
                      {showDetails[`${rate.term}-${rateType}`] ? "Less details" : "More details"} +
                    </button>
                    {showDetails[`${rate.term}-${rateType}`] && rateData?.details && (
                      <ul className="mt-2 text-sm space-y-1">
                        {rateData.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Button
                    className="mt-2 sm:mt-0"
                    onClick={() => handleRateSelect(rateData?.rate || 0, rate.term, rateType)}
                  >
                    inquire
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  const visibleRates = showAllRates ? marketRates : marketRates.slice(0, 3)
  const visibleBankRates = showAllRates ? bankRates : bankRates.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buying">Buying a home</SelectItem>
                <SelectItem value="refinancing">Refinancing</SelectItem>
                <SelectItem value="renewal">Renewal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              type="text"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="Purchase price"
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="text"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="Down payment $"
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
              placeholder="%"
              className="w-full"
            />
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Best market rates</h2>
        <Tabs defaultValue="fixed" className="w-full">
          <TabsList className="w-full flex mb-4">
            <TabsTrigger value="fixed" className="flex-1 text-xs sm:text-sm py-2 px-1">
              Fixed Rates
            </TabsTrigger>
            <TabsTrigger value="variable" className="flex-1 text-xs sm:text-sm py-2 px-1">
              Variable Rates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fixed">{renderRatesList(visibleRates, "fixed")}</TabsContent>

          <TabsContent value="variable">{renderRatesList(visibleRates, "variable")}</TabsContent>
        </Tabs>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Best bank rates</h2>
        <Tabs defaultValue="fixed" className="w-full">
          <TabsList className="w-full flex mb-4">
            <TabsTrigger value="fixed" className="flex-1 text-xs sm:text-sm py-2 px-1">
              Fixed Rates
            </TabsTrigger>
            <TabsTrigger value="variable" className="flex-1 text-xs sm:text-sm py-2 px-1">
              Variable Rates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fixed">{renderRatesList(visibleBankRates, "fixed")}</TabsContent>

          <TabsContent value="variable">{renderRatesList(visibleBankRates, "variable")}</TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="gap-2" onClick={() => setShowAllRates(!showAllRates)}>
          <Info className="h-4 w-4" />
          {showAllRates ? "Show less" : "Show more"}
        </Button>
      </div>

      <div className="text-right text-sm text-gray-500">
        As of: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
      </div>

      {selectedRate && (
        <div className="mt-8">
          <CalculatorSummary
            calculatorType="mortgage"
            calculatorData={{
              purchasePrice: Number(purchasePrice),
              downPayment: Number(downPayment),
              interestRate: selectedRate.rate,
              amortizationPeriod: selectedRate.term === "5-yr" ? 25 : 20,
              monthlyPayment: calculateMonthlyPayment(
                Number(purchasePrice) - Number(downPayment),
                selectedRate.rate,
                selectedRate.term === "5-yr" ? 25 : 20,
              ),
            }}
          />
        </div>
      )}
    </div>
  )
}

// Helper function to calculate monthly payment
function calculateMonthlyPayment(principal: number, rate: number, years: number) {
  const monthlyRate = rate / 100 / 12
  const numberOfPayments = years * 12
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  )
}
