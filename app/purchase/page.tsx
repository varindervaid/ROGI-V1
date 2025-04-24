import Layout from "@/components/layout"
import MortgageCalculator from "@/components/mortgage-calculator"

export default function PurchasePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Purchase a Home / Mortgage Calculator</h1>
        <p className="mb-8">
          Buying a home is an exciting journey. Use our mortgage calculator below to estimate your monthly payments, see
          how much you can afford, and calculate various scenarios for your mortgage.
        </p>
        <div className="bg-white shadow-md rounded-lg p-6">
          <MortgageCalculator />
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Next Steps in Your Home Buying Journey</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Get pre-approved for a mortgage</li>
            <li>Find a real estate agent</li>
            <li>Start house hunting</li>
            <li>Make an offer and negotiate</li>
            <li>Get a home inspection</li>
            <li>Close the deal and move in!</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
