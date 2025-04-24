"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calculator,
  Home,
  RefreshCw,
  DollarSign,
  Percent,
  BarChart,
  FileText,
  ArrowLeftRightIcon as ArrowsLeftRight,
  PiggyBank,
} from "lucide-react"
import Link from "next/link"

interface CalculatorHubProps {
  showAllCalculators?: boolean
}

export function CalculatorHub({ showAllCalculators = false }: CalculatorHubProps) {
  // Basic calculators that are always shown
  const basicCalculators = [
    {
      title: "Mortgage Calculator",
      description: "Calculate your monthly mortgage payments",
      icon: <Home className="h-6 w-6 text-primary" />,
      text: "Estimate your monthly mortgage payments based on your loan amount, interest rate, and term.",
      link: "/purchase",
    },
    {
      title: "Refinance Calculator",
      description: "See if refinancing makes sense for you",
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
      text: "Compare your current mortgage with refinancing options to see if you can save money.",
      link: "/refinance",
    },
    {
      title: "Affordability Calculator",
      description: "How much house can you afford?",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      text: "Determine how much house you can afford based on your income, expenses, and down payment.",
      link: "/calculators/affordability",
    },
    {
      title: "Land Transfer Tax",
      description: "Estimate your land transfer taxes",
      icon: <Percent className="h-6 w-6 text-primary" />,
      text: "Calculate the land transfer taxes you'll need to pay when purchasing a property.",
      link: "/calculators/land-transfer-tax",
    },
    {
      title: "Penalty Calculator",
      description: "Estimate mortgage break penalties",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      text: "Calculate potential penalties for breaking your mortgage term early.",
      link: "/calculators/penalty",
    },
  ]

  // Additional calculators to show when showAllCalculators is true
  const additionalCalculators = [
    {
      title: "Maximum Mortgage",
      description: "Find your maximum mortgage amount",
      icon: <BarChart className="h-6 w-6 text-primary" />,
      text: "Calculate the maximum mortgage amount you can qualify for based on your income and expenses.",
      link: "/calculators/maximum-mortgage",
    },
    {
      title: "Closing Costs",
      description: "Estimate your closing costs",
      icon: <FileText className="h-6 w-6 text-primary" />,
      text: "Calculate the closing costs associated with buying a home, including legal fees and land transfer taxes.",
      link: "/calculators/closing-costs",
    },
    {
      title: "Compare Mortgages",
      description: "Compare different mortgage options",
      icon: <ArrowsLeftRight className="h-6 w-6 text-primary" />,
      text: "Compare different mortgage options side by side to find the best one for your needs.",
      link: "/calculators/compare",
    },
    {
      title: "Required Income",
      description: "Calculate required income for a mortgage",
      icon: <PiggyBank className="h-6 w-6 text-primary" />,
      text: "Find out how much income you need to qualify for a specific mortgage amount.",
      link: "/calculators/required-income",
    },
    {
      title: "Debt Service Ratios",
      description: "Calculate your debt service ratios",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      text: "Calculate your GDS and TDS ratios to see if you qualify for a mortgage.",
      link: "/calculators/debt-service",
    },
  ]

  // Determine which calculators to display
  const calculatorsToDisplay = showAllCalculators ? [...basicCalculators, ...additionalCalculators] : basicCalculators

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Mortgage Calculators</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our suite of mortgage calculators helps you make informed decisions about your mortgage options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorsToDisplay.map((calculator, index) => (
            <Card
              key={index}
              className="border border-primary/20 hover:shadow-lg transition-shadow hover:bg-primary/10"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {calculator.icon}
                </div>
                <CardTitle className="text-xl">{calculator.title}</CardTitle>
                <CardDescription>{calculator.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{calculator.text}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={calculator.link}>Calculate Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}

          {!showAllCalculators && (
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow bg-primary text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">View All Calculators</CardTitle>
                <CardDescription className="text-white/80">Explore our full suite of tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Access all of our mortgage calculators to help with your mortgage decisions.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/calculators">View All Calculators</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

// Also export as default for flexibility
export default CalculatorHub
