export const dynamic = "force-static"

export default function ApplicationSuccess() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md text-center bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Application Submitted Successfully!</h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">Your mortgage application has been received and is being processed.</p>
          <p className="text-sm text-gray-500">
            <script
              dangerouslySetInnerHTML={{
                __html: `
                document.write('Application ID: ' + (new URLSearchParams(window.location.search).get('id') || 'Unknown'));
              `,
              }}
            />
          </p>
        </div>
        <div className="flex justify-center">
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
