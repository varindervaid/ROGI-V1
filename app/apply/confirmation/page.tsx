export const dynamic = "force-static"

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h1>
          <p className="text-lg mb-6">
            Thank you for submitting your mortgage application. Our team will review your information and contact you
            within 1-2 business days.
          </p>
          <p className="mb-8">
            Your application reference number: <span className="font-bold">APP-123456</span>
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h2 className="font-semibold mb-2">Next Steps:</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Our mortgage specialist will review your application</li>
              <li>You'll receive an email confirmation shortly</li>
              <li>We may contact you for additional documentation</li>
              <li>Once approved, we'll guide you through the next steps</li>
            </ol>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Home
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
