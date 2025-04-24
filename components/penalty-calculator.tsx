"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
]

const lenders = [
  "RBC Royal Bank",
  "TD Canada Trust",
  "CIBC",
  "Scotiabank",
  "BMO Bank of Montreal",
  "National Bank",
  "HSBC Bank",
  "Other",
]

export default function PenaltyCalculator() {
  const [province, setProvince] = useState("")
  const [balance, setBalance] = useState("")
  const [rate, setRate] = useState("")
  const [lender, setLender] = useState("")
  const [rateType, setRateType] = useState<"fixed" | "variable" | "">("")
  const [term, setTerm] = useState("")
  const [startDate, setStartDate] = useState({
    month: "",
    day: "",
    year: "",
  })
  const [penalty, setPenalty] = useState<number | null>(null)

  const calculatePenalty = () => {
    // This is a simplified penalty calculation
    // In reality, each lender has their own formula
    const monthsRemaining = 60 - Number.parseInt(startDate.month) // Assuming 5-year term
    const principalAmount = Number.parseFloat(balance)
    const interestRate = Number.parseFloat(rate) / 100

    let estimatedPenalty = 0
    if (rateType === "fixed") {
      // Simple Interest Rate Differential (IRD) calculation
      estimatedPenalty = (principalAmount * interestRate * monthsRemaining) / 12
    } else {
      // Variable rate typically has 3 months interest penalty
      estimatedPenalty = (principalAmount * interestRate * 3) / 12
    }

    setPenalty(estimatedPenalty)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Penalty Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="province">Which province are you located in?</Label>
          <Select value={province} onValueChange={setProvince}>
            <SelectTrigger id="province">
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((p) => (
                <SelectItem key={p} value={p.toLowerCase()}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="balance">What is your current mortgage balance?</Label>
          <div className="relative">
            <Input
              id="balance"
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter amount"
              className="pl-6 w-full"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2">$</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">What is your current mortgage rate?</Label>
          <div className="relative">
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter percentage"
              className="pl-6 w-full"
              step="0.01"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lender">Who is your mortgage provider?</Label>
          <Select value={lender} onValueChange={setLender}>
            <SelectTrigger id="lender">
              <SelectValue placeholder="Select lender" />
            </SelectTrigger>
            <SelectContent>
              {lenders.map((l) => (
                <SelectItem key={l} value={l.toLowerCase()}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>What type of rate is it?</Label>
          <div className="flex gap-4">
            <Button
              variant={rateType === "fixed" ? "default" : "outline"}
              onClick={() => setRateType("fixed")}
              className="flex-1"
            >
              Fixed
            </Button>
            <Button
              variant={rateType === "variable" ? "default" : "outline"}
              onClick={() => setRateType("variable")}
              className="flex-1"
            >
              Variable
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">What is the current term of your mortgage?</Label>
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

        <div className="space-y-2">
          <Label>When did your mortgage start? (MM/DD/YYYY)</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="MM"
              value={startDate.month}
              onChange={(e) => setStartDate({ ...startDate, month: e.target.value })}
              maxLength={2}
              className="w-full"
            />
            <Input
              placeholder="DD"
              value={startDate.day}
              onChange={(e) => setStartDate({ ...startDate, day: e.target.value })}
              maxLength={2}
              className="w-full"
            />
            <Input
              placeholder="YYYY"
              value={startDate.year}
              onChange={(e) => setStartDate({ ...startDate, year: e.target.value })}
              maxLength={4}
              className="w-full"
            />
          </div>
        </div>

        <Button onClick={calculatePenalty} className="w-full">
          Calculate my penalty
        </Button>

        {penalty !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg overflow-x-auto">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Estimated Penalty</h3>
                <p className="text-sm">
                  Based on the information provided, your estimated mortgage penalty would be:{" "}
                  <span className="font-bold">${penalty.toFixed(2)}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Note: This is an estimate only. Contact your lender for the exact penalty amount.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
