import Layout from "@/components/layout"
import { RatesMarketplace } from "@/components/rates-marketplace"
import { LowestRates } from "@/components/lowest-rates"
import PageIntroduction from "@/components/page-introduction"
import { FAQSection } from "@/components/faq-section"

export default function RatesPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <PageIntroduction
          title="Current Mortgage Rates"
          description="Compare the most competitive mortgage rates from Canada's leading lenders. Updated daily to help you find the best rate for your mortgage."
        />

        <div className="mb-12">
          <LowestRates />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compare Personalized Rates</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <RatesMarketplace />
          </div>
        </div>

        <div className="mb-12">
          <FAQSection
            title="Frequently Asked Questions About Mortgage Rates"
            faqs={[
              {
                question: "How often do mortgage rates change?",
                answer:
                  "Mortgage rates can change daily based on market conditions. Fixed rates are influenced by bond yields, while variable rates are affected by the Bank of Canada's overnight rate.",
              },
              {
                question: "What's the difference between fixed and variable rates?",
                answer:
                  "Fixed rates remain constant throughout the term of your mortgage, providing payment stability. Variable rates can fluctuate with the prime rate, potentially offering savings if rates decrease, but with the risk of increases.",
              },
              {
                question: "How do I qualify for the best mortgage rates?",
                answer:
                  "To qualify for the best rates, you typically need a good credit score (680+), stable income, manageable debt levels, and a down payment of at least 20% to avoid CMHC insurance.",
              },
              {
                question: "Should I choose a fixed or variable rate?",
                answer:
                  "This depends on your financial situation and risk tolerance. Fixed rates offer stability and predictable payments, while variable rates may offer lower initial rates but come with the risk of rate increases.",
              },
              {
                question: "What is a rate hold and how does it work?",
                answer:
                  "A rate hold guarantees a specific mortgage rate for a period (typically 60-120 days), protecting you from rate increases while you shop for a home or complete your mortgage application.",
              },
            ]}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Important Rate Information</h3>
          <p className="text-sm text-gray-600">
            Rates shown are subject to change without notice. Rates may vary by province, credit score, and other
            factors. Not all applicants will qualify for the lowest rate. Actual rates will be determined based on
            individual circumstances including credit score, income verification, and property valuation.
          </p>
          <p className="text-sm text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </Layout>
  )
}
