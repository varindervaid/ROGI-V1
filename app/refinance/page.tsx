import Layout from "@/components/layout"
import RefinanceCalculator from "@/components/refinance-calculator"

export default function RefinancePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Refinance Your Mortgage</h1>
        <p className="mb-8">
          Refinancing your mortgage can help you lower your monthly payments, reduce your interest rate, or access your
          home's equity. Use our refinance calculator below to see how much you could potentially save.
        </p>
        <div className="bg-white shadow-md rounded-lg p-6">
          <RefinanceCalculator />
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Refinancing</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Lower your monthly payments</li>
            <li>Reduce your interest rate</li>
            <li>Shorten your loan term</li>
            <li>Switch from an adjustable-rate to a fixed-rate mortgage</li>
            <li>Access your home's equity for renovations or other expenses</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
