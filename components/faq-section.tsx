"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FAQSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about mortgages and our services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a mortgage pre-approval?</AccordionTrigger>
              <AccordionContent>
                A mortgage pre-approval is an evaluation by a lender that determines if you qualify for a mortgage and
                how much you can borrow. It involves checking your credit, verifying your income and assets, and
                reviewing your financial situation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How much down payment do I need?</AccordionTrigger>
              <AccordionContent>
                In Canada, the minimum down payment is 5% of the purchase price for homes under $500,000. For homes
                between $500,000 and $999,999, it's 5% of the first $500,000 and 10% of the remainder. For homes $1
                million or more, the minimum down payment is 20%.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What's the difference between fixed and variable rates?</AccordionTrigger>
              <AccordionContent>
                A fixed mortgage rate remains the same throughout the term of your mortgage, providing payment
                stability. A variable mortgage rate can fluctuate based on market conditions, which means your payment
                amount or the portion going toward principal can change.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I know which mortgage term is right for me?</AccordionTrigger>
              <AccordionContent>
                Choosing the right mortgage term depends on your financial situation, risk tolerance, and future plans.
                Shorter terms typically offer lower rates but less stability, while longer terms provide more stability
                but potentially higher rates. Our mortgage advisors can help you determine the best option for your
                specific needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Also export as default for flexibility
export default FAQSection
