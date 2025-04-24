"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export function LowestRates() {
  const [activeTab, setActiveTab] = useState("5-year")

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-primary">Today's Lowest Mortgage Rates</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          Compare the most competitive mortgage rates from Canada's leading lenders. Updated daily.
        </p>
      </div>

      <Tabs defaultValue="5-year" className="w-full max-w-5xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="1-year">1-Year Fixed</TabsTrigger>
          <TabsTrigger value="2-year">2-Year Fixed</TabsTrigger>
          <TabsTrigger value="3-year">3-Year Fixed</TabsTrigger>
          <TabsTrigger value="5-year">5-Year Fixed</TabsTrigger>
          <TabsTrigger value="variable">Variable</TabsTrigger>
        </TabsList>

        {["1-year", "2-year", "3-year", "5-year", "variable"].map((term) => (
          <TabsContent key={term} value={term} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getRatesByTerm(term).map((rate, index) => (
                <Card key={index} className={`overflow-hidden ${rate.isBest ? "border-primary border-2" : ""}`}>
                  {rate.isBest && (
                    <div className="bg-primary text-white text-center py-1 text-sm font-medium">Best Rate</div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{rate.lender}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-primary">{rate.rate}%</span>
                        <p className="text-sm text-gray-500">{term === "variable" ? "Variable" : `${term} Fixed`}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {rate.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="bg-gray-50 px-6 py-4">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link
                        href={`/apply/${term === "variable" ? "variable" : "fixed"}?lender=${rate.lender}&rate=${rate.rate}&term=${term}`}
                      >
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 mb-4">*Rates are subject to change. Last updated: April 17, 2025</p>
              <Button variant="outline" asChild>
                <Link href="/rates">
                  View All Rates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

function getRatesByTerm(term: string) {
  const rateData = {
    "1-year": [
      {
        lender: "First National",
        rate: 5.24,
        isBest: true,
        features: ["20% annual prepayment privilege", "Portable mortgage option", "Skip-a-payment feature"],
      },
      {
        lender: "TD Bank",
        rate: 5.39,
        isBest: false,
        features: ["Up to 15% annual prepayment", "Payment vacation option", "Home equity line of credit option"],
      },
      {
        lender: "CIBC",
        rate: 5.44,
        isBest: false,
        features: ["Flexible payment options", "No fee for switching lenders", "Cash back option available"],
      },
    ],
    "2-year": [
      {
        lender: "Scotiabank",
        rate: 4.99,
        isBest: true,
        features: ["20% annual prepayment privilege", "Portable mortgage option", "Skip-a-payment feature"],
      },
      {
        lender: "RBC",
        rate: 5.14,
        isBest: false,
        features: ["Up to 15% annual prepayment", "Payment vacation option", "Home equity line of credit option"],
      },
      {
        lender: "BMO",
        rate: 5.19,
        isBest: false,
        features: ["Flexible payment options", "No fee for switching lenders", "Cash back option available"],
      },
    ],
    "3-year": [
      {
        lender: "HSBC",
        rate: 4.79,
        isBest: true,
        features: ["20% annual prepayment privilege", "Portable mortgage option", "Skip-a-payment feature"],
      },
      {
        lender: "Tangerine",
        rate: 4.89,
        isBest: false,
        features: ["Up to 25% annual prepayment", "Payment vacation option", "No fee for switching lenders"],
      },
      {
        lender: "National Bank",
        rate: 4.94,
        isBest: false,
        features: ["Flexible payment options", "Cash back option available", "Home equity line of credit option"],
      },
    ],
    "5-year": [
      {
        lender: "MCAP",
        rate: 4.49,
        isBest: true,
        features: ["20% annual prepayment privilege", "Portable mortgage option", "Skip-a-payment feature"],
      },
      {
        lender: "Equitable Bank",
        rate: 4.59,
        isBest: false,
        features: ["Up to 20% annual prepayment", "Payment vacation option", "No fee for switching lenders"],
      },
      {
        lender: "Desjardins",
        rate: 4.64,
        isBest: false,
        features: ["Flexible payment options", "Cash back option available", "Home equity line of credit option"],
      },
    ],
    variable: [
      {
        lender: "Simplii Financial",
        rate: 5.45,
        isBest: true,
        features: ["Prime - 0.75% variable rate", "Convert to fixed rate anytime", "20% annual prepayment privilege"],
      },
      {
        lender: "Manulife Bank",
        rate: 5.55,
        isBest: false,
        features: ["Prime - 0.65% variable rate", "Flexible payment options", "All-in-one banking solution"],
      },
      {
        lender: "Meridian",
        rate: 5.6,
        isBest: false,
        features: ["Prime - 0.60% variable rate", "No fee for switching lenders", "Skip-a-payment feature"],
      },
    ],
  }

  return rateData[term as keyof typeof rateData] || []
}
