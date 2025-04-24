import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"

export default function ReferralsLoading() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Left sidebar skeleton */}
            <div className="w-64 bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Main content skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg md:col-span-2" />
                <Skeleton className="h-64 w-full rounded-lg md:col-span-2" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
