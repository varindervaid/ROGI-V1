export const dynamic = "force-static"

export default function PasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Update Password</h2>
            <p className="text-sm text-gray-500">Change your account password</p>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="block text-sm font-medium">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90">
                Update Password
              </button>
            </form>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a href="/account/settings" className="text-primary hover:underline">
            Back to Settings
          </a>
        </div>
      </div>
    </div>
  )
}
