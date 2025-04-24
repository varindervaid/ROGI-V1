"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, ArrowRight, Sparkles } from "lucide-react"
import { useChat } from "@/context/chat-context"
import { usePathname } from "next/navigation"

interface CalculatorSummaryProps {
  calculatorType: "mortgage" | "refinance" | "renew" | "penalty"
  calculatorData: any
}

export default function CalculatorSummary({ calculatorType, calculatorData }: CalculatorSummaryProps) {
  const [summary, setSummary] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { openChat, addAssistantMessage } = useChat()
  const pathname = usePathname()

  // Check if we're on the rates page
  const isRatesPage = pathname?.includes("/rates")

  // Generate summary based on calculator type and data
  const generateSummary = () => {
    setIsGenerating(true)

    // Format data based on calculator type
    let formattedData = ""

    if (calculatorType === "mortgage") {
      const { purchasePrice, downPayment, interestRate, amortizationPeriod, monthlyPayment } = calculatorData

      formattedData = `
        Purchase Price: $${purchasePrice.toLocaleString()}
        Down Payment: $${downPayment.toLocaleString()} (${((downPayment / purchasePrice) * 100).toFixed(2)}%)
        Mortgage Amount: $${(purchasePrice - downPayment).toLocaleString()}
        Interest Rate: ${interestRate}%
        Amortization Period: ${amortizationPeriod} years
        Monthly Payment: $${monthlyPayment.toFixed(2)}
      `
    } else if (calculatorType === "refinance") {
      const { currentLoanAmount, currentInterestRate, newLoanAmount, newInterestRate, monthlySavings } = calculatorData

      formattedData = `
        Current Mortgage: $${currentLoanAmount.toLocaleString()} at ${currentInterestRate}%
        New Mortgage: $${newLoanAmount.toLocaleString()} at ${newInterestRate}%
        Monthly Savings: $${monthlySavings.toFixed(2)}
      `
    } else if (calculatorType === "renew") {
      const { currentBalance, currentRate, newRate, term, monthlySavings, totalSavings } = calculatorData

      formattedData = `
        Current Balance: $${Number.parseFloat(currentBalance).toLocaleString()} at ${currentRate}%
        New Rate: ${newRate}%
        Term: ${term} years
        Monthly Savings: $${monthlySavings?.toFixed(2) || "0.00"}
        Total Savings: $${totalSavings?.toFixed(2) || "0.00"}
      `
    } else if (calculatorType === "penalty") {
      const { balance, rate, rateType, term, penalty } = calculatorData

      formattedData = `
        Mortgage Balance: $${Number.parseFloat(balance).toLocaleString()}
        Current Rate: ${rate}%
        Rate Type: ${rateType}
        Term: ${term} years
        Estimated Penalty: $${penalty?.toFixed(2) || "0.00"}
      `
    }

    // Generate summary based on calculator type
    let summaryText = ""

    if (calculatorType === "mortgage") {
      const { purchasePrice, downPayment, interestRate, amortizationPeriod, monthlyPayment } = calculatorData
      const mortgageAmount = purchasePrice - downPayment
      const downPaymentPercentage = ((downPayment / purchasePrice) * 100).toFixed(1)
      const totalInterest = monthlyPayment * 12 * amortizationPeriod - mortgageAmount

      summaryText = `
        Based on your inputs, I've analyzed your mortgage calculation:
        
        You're looking at a property worth $${purchasePrice.toLocaleString()} with a down payment of $${downPayment.toLocaleString()} (${downPaymentPercentage}%).
        
        Your mortgage amount would be $${mortgageAmount.toLocaleString()} at ${interestRate}% interest over ${amortizationPeriod} years.
        
        This results in a monthly payment of $${monthlyPayment.toFixed(2)}.
        
        Over the full amortization period, you'll pay approximately $${totalInterest.toLocaleString()} in interest.
        
        ${
          downPaymentPercentage < 20
            ? "Since your down payment is less than 20%, you'll need mortgage insurance which may increase your costs."
            : "Your down payment is 20% or more, so you won't need mortgage insurance."
        }
        
        ${
          monthlyPayment > 2000
            ? "Your monthly payment is relatively high. Would you like to explore options to reduce it?"
            : "Your monthly payment appears manageable based on typical income levels."
        }
        
        Would you like me to help you understand how changes to your down payment or amortization period might affect your monthly payments?
      `
    } else if (calculatorType === "refinance") {
      const {
        currentLoanAmount,
        currentInterestRate,
        newLoanAmount,
        newInterestRate,
        monthlySavings,
        breakEvenMonths,
      } = calculatorData

      summaryText = `
        I've analyzed your refinance calculation:
        
        You're considering refinancing your current mortgage of $${currentLoanAmount.toLocaleString()} at ${currentInterestRate}% to a new mortgage of $${newLoanAmount.toLocaleString()} at ${newInterestRate}%.
        
        This refinance would save you $${monthlySavings.toFixed(2)} per month.
        
        Assuming typical refinancing costs of around $3,000, you would break even in approximately ${breakEvenMonths} months.
        
        ${
          newLoanAmount > currentLoanAmount
            ? `You're increasing your mortgage by $${(newLoanAmount - currentLoanAmount).toLocaleString()}. Make sure you have a good plan for using these additional funds.`
            : `You're reducing your mortgage by $${(currentLoanAmount - newLoanAmount).toLocaleString()}, which is a positive step toward building equity.`
        }
        
        ${
          monthlySavings > 200
            ? "Your monthly savings are significant. This refinance looks financially beneficial."
            : "Your monthly savings are modest. Consider if the refinancing costs are worth it in your situation."
        }
        
        Would you like to explore how different interest rates might affect your savings?
      `
    } else if (calculatorType === "renew") {
      const { currentBalance, currentRate, newRate, term, monthlySavings, totalSavings } = calculatorData

      summaryText = `
        I've analyzed your mortgage renewal calculation:
        
        You're considering renewing your mortgage with a current balance of $${Number.parseFloat(currentBalance).toLocaleString()} from a rate of ${currentRate}% to a new rate of ${newRate}% for a ${term}-year term.
        
        This renewal would save you $${monthlySavings?.toFixed(2) || "0.00"} per month, or $${totalSavings?.toFixed(2) || "0.00"} over the entire term.
        
        ${
          Number.parseFloat(newRate) < Number.parseFloat(currentRate)
            ? `The ${(Number.parseFloat(currentRate) - Number.parseFloat(newRate)).toFixed(2)}% rate reduction represents a significant opportunity to save on interest.`
            : `The ${(Number.parseFloat(newRate) - Number.parseFloat(currentRate)).toFixed(2)}% rate increase will impact your monthly budget.`
        }
        
        ${
          term === "5"
            ? "A 5-year term is the most common choice and offers a good balance between rate security and flexibility."
            : term < 5
              ? "Your shorter term gives you more flexibility to renegotiate sooner, but typically comes with slightly higher rates."
              : "Your longer term provides excellent rate security, which is valuable in a rising rate environment."
        }
        
        Would you like to explore how different terms might affect your overall savings?
      `
    } else if (calculatorType === "penalty") {
      const { balance, rate, rateType, term, penalty } = calculatorData

      summaryText = `
        I've analyzed your mortgage penalty calculation:
        
        Based on your current mortgage balance of $${Number.parseFloat(balance).toLocaleString()} at ${rate}% with a ${rateType} rate, your estimated penalty for breaking your mortgage would be approximately $${penalty?.toFixed(2) || "0.00"}.
        
        ${
          rateType === "fixed"
            ? "With a fixed-rate mortgage, your penalty is typically the greater of three months' interest or the Interest Rate Differential (IRD)."
            : "With a variable-rate mortgage, your penalty is typically three months' interest."
        }
        
        ${
          penalty > 5000
            ? "Your penalty is substantial. It's important to weigh this cost against the potential benefits of breaking your mortgage."
            : "Your penalty is relatively modest. This might make breaking your mortgage more financially viable."
        }
        
        Would you like me to help you understand if breaking your mortgage makes financial sense in your situation?
      `
    }

    // Simulate AI generation with a delay
    setTimeout(() => {
      setSummary(summaryText.trim())
      setIsGenerating(false)
      setIsVisible(true)
    }, 1500)
  }

  // Send summary to chatbot
  const sendToChatbot = () => {
    openChat()
    addAssistantMessage(summary)
  }

  return (
    <div className="mt-8 mb-4">
      {!isRatesPage && !isVisible ? (
        <Button
          onClick={generateSummary}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Analyzing your calculation...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Analysis of Your Calculation
            </>
          )}
        </Button>
      ) : isVisible && !isRatesPage ? (
        <Card className="border border-purple-200 shadow-md overflow-hidden transition-all duration-500 ease-in-out">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3 mb-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
                <p className="text-sm text-gray-500">Personalized insights based on your calculation</p>
              </div>
            </div>

            <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed mb-4">{summary}</div>

            <Button
              onClick={sendToChatbot}
              variant="outline"
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Continue this conversation with ROGI
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
