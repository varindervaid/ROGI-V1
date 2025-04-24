"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ApplicationFormProps {
  calculationData: {
    propertyValue: number
    downPayment: number
    mortgageAmount: number
    interestRate: number
    amortizationPeriod: number
    paymentFrequency: string
    monthlyPayment: number
  }
}

export default function ApplicationForm({ calculationData }: ApplicationFormProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    applicantName: session?.user?.name || "",
    applicantEmail: session?.user?.email || "",
    applicantPhone: "",
    propertyAddress: "",
    propertyType: "Single Family",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      if (status === "unauthenticated") {
        // Store calculation data in session storage to retrieve after auth
        sessionStorage.setItem(
          "pendingApplication",
          JSON.stringify({
            ...calculationData,
            ...formData,
          }),
        )
        router.push("/auth/signin?callbackUrl=/dashboard&pendingApplication=true")
        return
      }

      // Submit application
      const response = await fetch("/api/applications/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...calculationData,
          ...formData,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit application")
      }

      const data = await response.json()
      router.push(`/applications/success?id=${data.application.id}`)
    } catch (error: any) {
      console.error("Error submitting application:", error)
      setError(error.message || "Something went wrong")
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Mortgage Application</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Mortgage Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Property Value</Label>
                <div className="p-2 border rounded-md bg-gray-50">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(
                    calculationData.propertyValue,
                  )}
                </div>
              </div>
              <div>
                <Label>Down Payment</Label>
                <div className="p-2 border rounded-md bg-gray-50">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(
                    calculationData.downPayment,
                  )}
                </div>
              </div>
              <div>
                <Label>Mortgage Amount</Label>
                <div className="p-2 border rounded-md bg-gray-50">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(
                    calculationData.mortgageAmount,
                  )}
                </div>
              </div>
              <div>
                <Label>Interest Rate</Label>
                <div className="p-2 border rounded-md bg-gray-50">{calculationData.interestRate}%</div>
              </div>
              <div>
                <Label>Amortization Period</Label>
                <div className="p-2 border rounded-md bg-gray-50">{calculationData.amortizationPeriod} years</div>
              </div>
              <div>
                <Label>Monthly Payment</Label>
                <div className="p-2 border rounded-md bg-gray-50">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(
                    calculationData.monthlyPayment,
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicantName">Full Name</Label>
                <Input
                  id="applicantName"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicantEmail">Email</Label>
                <Input
                  id="applicantEmail"
                  name="applicantEmail"
                  type="email"
                  value={formData.applicantEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicantPhone">Phone Number</Label>
                <Input
                  id="applicantPhone"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Property Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input
                  id="propertyAddress"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleSelectChange("propertyType", value)}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Family">Single Family</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information you'd like to share..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
