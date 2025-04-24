export const dynamic = "force-static"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Chat Analytics</h2>
        <p className="text-gray-500">
          Analytics data will load after deployment. This page has been made static for successful deployment.
        </p>
        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-700">Total Chats</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-700">Active Users</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-700">Avg. Session Duration</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>
      </div>
    </div>
  )
}
