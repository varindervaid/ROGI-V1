"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { navigateToApplication } from "@/utils/calculator-to-application"

export default function PreApprovalPage() {
  const router = useRouter()

  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    purchasePrice: "",
    downPayment: "",
    location: "",
    propertyType: "",
    employmentStatus: "",
    annualIncome: "",
    creditScore: "",
  })

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate down payment percentage
    const purchasePrice = Number.parseFloat(formData.purchasePrice) || 0
    const downPayment = Number.parseFloat(formData.downPayment) || 0
    const downPaymentPercentage = purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0

    // Navigate to application with pre-approval data
    navigateToApplication(router, "pre-approval", {
      ...formData,
      downPaymentPercentage: downPaymentPercentage.toFixed(2),
      mortgageAmount: (purchasePrice - downPayment).toString(),
    })
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Get Pre-Approved</h1>
        <p className="text-lg mb-8">
          Getting pre-approved for a mortgage is an important first step in your home buying journey. It gives you a
          clear understanding of what you can afford and shows sellers you're a serious buyer.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Pre-Approval Application</CardTitle>
                <CardDescription>Fill out the form below to start your pre-approval process</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchase-price">Estimated Purchase Price</Label>
                    <Input
                      id="purchase-price"
                      placeholder="Enter amount"
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) => handleChange("purchasePrice", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="down-payment">Down Payment Amount</Label>
                    <Input
                      id="down-payment"
                      placeholder="Enter amount"
                      type="number"
                      value={formData.downPayment}
                      onChange={(e) => handleChange("downPayment", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Property Location</Label>
                    <Select value={formData.location} onValueChange={(value) => handleChange("location", value)}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ontario">Ontario</SelectItem>
                        <SelectItem value="british-columbia">British Columbia</SelectItem>
                        <SelectItem value="quebec">Quebec</SelectItem>
                        <SelectItem value="alberta">Alberta</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleChange("propertyType", value)}
                    >
                      <SelectTrigger id="property-type">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detached">Detached</SelectItem>
                        <SelectItem value="semi-detached">Semi-detached</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employment-status">Employment Status</Label>
                    <Select
                      value={formData.employmentStatus}
                      onValueChange={(value) => handleChange("employmentStatus", value)}
                    >
                      <SelectTrigger id="employment-status">
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="self-employed">Self-employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annual-income">Annual Income</Label>
                    <Input
                      id="annual-income"
                      placeholder="Enter your annual income"
                      type="number"
                      value={formData.annualIncome}
                      onChange={(e) => handleChange("annualIncome", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credit-score">Approximate Credit Score</Label>
                    <Select value={formData.creditScore} onValueChange={(value) => handleChange("creditScore", value)}>
                      <SelectTrigger id="credit-score">
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent (750+)</SelectItem>
                        <SelectItem value="good">Good (700-749)</SelectItem>
                        <SelectItem value="fair">Fair (650-699)</SelectItem>
                        <SelectItem value="poor">Poor (below 650)</SelectItem>
                        <SelectItem value="unknown">I don't know</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Benefits of Pre-Approval</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">Know your budget:</strong> Understand exactly how much house you can
                  afford before you start shopping.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">Stronger offers:</strong> Sellers take pre-approved buyers more
                  seriously, giving you an edge in competitive markets.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">Rate guarantee:</strong> Lock in your interest rate for up to 120
                  days, protecting you from rate increases.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">Faster closing:</strong> Much of the mortgage work is done upfront,
                  allowing for a smoother, quicker closing process.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">Expert guidance:</strong> Get personalized advice from our mortgage
                  specialists throughout your home buying journey.
                </span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Pre-Approval vs. Pre-Qualification</h3>
              <p className="text-purple-700">
                A pre-approval is more thorough than a pre-qualification. While pre-qualification provides a quick
                estimate based on self-reported information, pre-approval involves verifying your financial information
                and is a more formal step in the mortgage process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
