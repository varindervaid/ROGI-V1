"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"

interface Application {
  id: string
  status: string
  createdAt: string
  propertyValue: number
  downPayment: number
  mortgageAmount: number
  interestRate: number
  amortizationPeriod: number
  paymentFrequency: string
  monthlyPayment: number
  propertyAddress?: string
  propertyType?: string
  notes?: string
}

export default function ApplicationDetails({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoadingApplication, setIsLoadingApplication] = useState(true)

  useEffect(() => {
    fetchApplication()
  }, [params.id])

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/${params.id}`)

      if (!response.ok) {
        if (response.status === 404) {
          router.push("/dashboard")
          return
        }
        throw new Error("Failed to fetch application")
      }

      const data = await response.json()
      setApplication(data.application)
      setIsLoadingApplication(false)
    } catch (error) {
      console.error("Error fetching application:", error)
      setIsLoadingApplication(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (isLoadingApplication) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Application not found</h1>
        <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/dashboard")} className="mr-4">
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle>Mortgage Application</CardTitle>
            <Badge className={getStatusColor(application.status)}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Submitted on {new Date(application.createdAt).toLocaleDateString()}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-lg mb-4">Mortgage Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Property Value</p>
                  <p className="font-medium">{formatCurrency(application.propertyValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Down Payment</p>
                  <p className="font-medium">{formatCurrency(application.downPayment)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mortgage Amount</p>
                  <p className="font-medium">{formatCurrency(application.mortgageAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Rate</p>
                  <p className="font-medium">{application.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amortization Period</p>
                  <p className="font-medium">{application.amortizationPeriod} years</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Payment Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Frequency</p>
                  <p className="font-medium">{application.paymentFrequency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Payment</p>
                  <p className="font-medium">{formatCurrency(application.monthlyPayment)}</p>
                </div>
                {application.propertyAddress && (
                  <div>
                    <p className="text-sm text-gray-500">Property Address</p>
                    <p className="font-medium">{application.propertyAddress}</p>
                  </div>
                )}
                {application.propertyType && (
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">{application.propertyType}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {application.notes && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="font-medium text-lg mb-4">Notes</h3>
                <p className="text-gray-700">{application.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
