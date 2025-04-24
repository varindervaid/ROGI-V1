export const dynamic = "force-static"

export default function ApplyPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Apply for a Mortgage</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a
            href="/apply/purchase"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Purchase</h2>
            <p className="text-gray-600 mb-4">Apply for a mortgage to purchase a new home</p>
            <div className="text-primary font-medium">Get started →</div>
          </a>

          <a
            href="/apply/refinance"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Refinance</h2>
            <p className="text-gray-600 mb-4">Refinance your existing mortgage for better terms</p>
            <div className="text-primary font-medium">Get started →</div>
          </a>

          <a
            href="/apply/pre-approval"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Pre-Approval</h2>
            <p className="text-gray-600 mb-4">Get pre-approved before you start house hunting</p>
            <div className="text-primary font-medium">Get started →</div>
          </a>

          <a href="/apply/renew" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Renewal</h2>
            <p className="text-gray-600 mb-4">Renew your existing mortgage with better rates</p>
            <div className="text-primary font-medium">Get started →</div>
          </a>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Not sure where to start?</h2>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Use our calculators to help determine which mortgage option is right for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/calculators/mortgage"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Mortgage Calculator</h3>
            <p className="text-gray-600">Calculate your monthly mortgage payments</p>
          </a>

          <a
            href="/calculators/affordability"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Affordability Calculator</h3>
            <p className="text-gray-600">Find out how much home you can afford</p>
          </a>

          <a
            href="/calculators/refinance"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Refinance Calculator</h3>
            <p className="text-gray-600">See if refinancing makes sense for you</p>
          </a>

          <a
            href="/calculators/land-transfer-tax"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Land Transfer Tax</h3>
            <p className="text-gray-600">Calculate land transfer taxes in your province</p>
          </a>

          <a
            href="/calculators/closing-costs"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Closing Costs</h3>
            <p className="text-gray-600">Estimate all the costs associated with closing</p>
          </a>

          <a href="/calculators" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">More Calculators</h3>
            <p className="text-gray-600">Explore our full suite of mortgage calculators</p>
          </a>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>© 2023 Rogi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
