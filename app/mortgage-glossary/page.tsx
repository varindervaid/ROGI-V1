import Layout from "@/components/layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Book, HelpCircle } from "lucide-react"

const glossaryTerms = [
  {
    term: "Amortization",
    definition:
      "The process of paying off a debt (often a mortgage) through regular payments over time. This includes both principal and interest payments.",
  },
  {
    term: "Down Payment",
    definition:
      "The initial upfront portion of the total amount due when purchasing a home, typically expressed as a percentage of the home's purchase price.",
  },
  {
    term: "Fixed-Rate Mortgage",
    definition:
      "A mortgage where the interest rate remains the same for the entire term of the loan, providing predictable payments.",
  },
  {
    term: "Variable-Rate Mortgage",
    definition:
      "A mortgage where the interest rate can fluctuate based on market conditions, often tied to the lender's prime rate.",
  },
  {
    term: "Principal",
    definition: "The original amount of money borrowed in a loan, not including interest.",
  },
  {
    term: "Interest",
    definition: "The cost of borrowing money, typically expressed as a percentage of the loan amount.",
  },
  {
    term: "Term",
    definition:
      "The length of time that the mortgage contract, including the interest rate, is in effect. Common terms are 1, 3, or 5 years.",
  },
  {
    term: "Prepayment Penalty",
    definition:
      "A fee charged by some lenders if you pay off your mortgage before the end of the term or make extra payments beyond your allowed prepayment privileges.",
  },
  {
    term: "Refinancing",
    definition:
      "The process of replacing an existing mortgage with a new one, often to take advantage of lower interest rates or to access home equity.",
  },
  {
    term: "Renewal",
    definition:
      "The process of extending your mortgage for a new term at the end of your current term, often with the opportunity to change your mortgage terms or switch lenders.",
  },
  {
    term: "Loan-to-Value (LTV) Ratio",
    definition: "The ratio of the mortgage amount to the appraised value of the property, expressed as a percentage.",
  },
  {
    term: "Mortgage Insurance",
    definition:
      "Insurance that protects the lender in case the borrower defaults on the loan. It's typically required for high-ratio mortgages (LTV > 80%).",
  },
  {
    term: "Closing Costs",
    definition:
      "Various expenses associated with buying a home, such as legal fees, land transfer taxes, and title insurance.",
  },
  {
    term: "Pre-approval",
    definition:
      "A process where a lender provides a conditional commitment for a specific mortgage amount before you've found a home to purchase.",
  },
  {
    term: "Debt Service Ratio",
    definition:
      "A measure used by lenders to determine your ability to manage monthly payments and repay the money you have borrowed.",
  },
]

const faqItems = [
  {
    question: "What's the difference between a fixed and variable rate mortgage?",
    answer:
      "A fixed-rate mortgage has an interest rate that remains constant throughout the term, while a variable-rate mortgage has an interest rate that can fluctuate based on market conditions.",
  },
  {
    question: "How much down payment do I need to buy a home?",
    answer:
      "In Canada, the minimum down payment is 5% for homes priced up to $500,000. For homes priced between $500,000 and $999,999, it's 5% of the first $500,000 and 10% of the remaining portion. For homes $1 million or more, the minimum down payment is 20%.",
  },
  {
    question: "What is mortgage default insurance?",
    answer:
      "Mortgage default insurance is required for high-ratio mortgages (down payment less than 20%) and protects the lender if the borrower defaults on the loan.",
  },
  {
    question: "How often can I renew my mortgage?",
    answer:
      "You can renew your mortgage at the end of each term. Terms typically range from 1 to 10 years, with 5-year terms being the most common.",
  },
  {
    question: "What's the difference between renewing and refinancing?",
    answer:
      "Renewing is extending your mortgage for a new term at the end of your current term, often with the same lender. Refinancing involves replacing your current mortgage with a new one, potentially with a different lender, different terms, or a different loan amount.",
  },
]

export default function MortgageGlossaryPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Mortgage Glossary</h1>
        <p className="mb-8 text-lg">
          Understanding mortgage terminology is crucial when navigating the home-buying process. Our comprehensive
          glossary and FAQ section will help you make informed decisions about your mortgage.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Book className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-semibold">Key Terms</h2>
              </div>
              <p>Explore common mortgage terms and their definitions.</p>
              <Button asChild className="mt-4">
                <Link href="#glossary">View Glossary</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-semibold">FAQ</h2>
              </div>
              <p>Find answers to frequently asked mortgage questions.</p>
              <Button asChild className="mt-4">
                <Link href="#faq">View FAQ</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div id="glossary" className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Mortgage Glossary</h2>
          <Accordion type="single" collapsible className="w-full">
            {glossaryTerms.map((item, index) => (
              <AccordionItem key={index} value={`glossary-item-${index}`}>
                <AccordionTrigger>{item.term}</AccordionTrigger>
                <AccordionContent>{item.definition}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div id="faq">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  )
}
