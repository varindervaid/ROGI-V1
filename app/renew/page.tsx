import Layout from "@/components/layout"
import RenewCalculator from "@/components/renew-calculator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RenewPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Renew Your Mortgage</h1>
        <p className="mb-8">
          Is your mortgage term coming to an end? Explore your renewal options and find the best rates for your
          situation. Use our renewal calculator below to see how much you could potentially save.
        </p>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <RenewCalculator />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Benefits of Renewing with Us</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Competitive rates tailored to your financial situation</li>
              <li>Flexible terms to suit your needs</li>
              <li>Expert advice from our mortgage specialists</li>
              <li>Streamlined renewal process</li>
              <li>Potential for better terms than your current mortgage</li>
            </ul>
            <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-800">
              <Link href="/contact">Speak to a Mortgage Specialist</Link>
            </Button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Renewal Process</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Review your current mortgage terms and financial goals</li>
              <li>Explore new mortgage options and rates</li>
              <li>Use our calculator to compare potential savings</li>
              <li>Consult with our mortgage specialists for personalized advice</li>
              <li>Choose the best renewal option for your situation</li>
              <li>Complete the renewal process with our streamlined approach</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  )
}
