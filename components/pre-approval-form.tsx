"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

export function PreApprovalForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)

  // Initialize form data with URL parameters
  const initialFormData = {
    // Personal Information
    firstName: searchParams.get("fullName")?.split(" ")[0] || "",
    lastName: searchParams.get("fullName")?.split(" ").slice(1).join(" ") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    dateOfBirth: "",
    address: "",
    city: "",
    province: searchParams.get("location") || "",
    postalCode: "",

    // Employment Information
    employmentStatus: searchParams.get("employmentStatus") || "",
    employerName: "",
    jobTitle: "",
    yearsAtJob: "",
    annualIncome: searchParams.get("annualIncome") || "",
    creditScore: searchParams.get("creditScore") || "",

    // Property Information
    propertyType: searchParams.get("propertyType") || "",
    purchasePrice: searchParams.get("purchasePrice") || "",
    downPayment: searchParams.get("downPayment") || "",
    downPaymentPercentage: searchParams.get("downPaymentPercentage") || "",
    mortgageAmount: searchParams.get("mortgageAmount") || "",

    // Pre-Approval Details
    desiredClosingDate: "",
    preApprovalTerm: "120",
    preApprovalType: "purchase",

    // Additional Information
    additionalInfo: "",
    agreeToTerms: false,
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData)
    // Navigate to confirmation page
    router.push("/apply/confirmation")
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
    // Add scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    // Add scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 relative z-0">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`z-10 flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                  currentStep >= step ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step ? <Check className="h-5 w-5" /> : step}
              </div>
              <span className="text-sm text-center">
                {step === 1 && "Property Details"}
                {step === 2 && "Personal Info"}
                {step === 3 && "Employment"}
                {step === 4 && "Review & Submit"}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Property & Pre-Approval Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleChange("propertyType", value)}>
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select type" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Estimated Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={(e) => handleChange("purchasePrice", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => handleChange("downPayment", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="downPaymentPercentage">Down Payment Percentage</Label>
                <Input
                  id="downPaymentPercentage"
                  type="number"
                  value={formData.downPaymentPercentage}
                  onChange={(e) => handleChange("downPaymentPercentage", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mortgageAmount">Mortgage Amount</Label>
              <Input
                id="mortgageAmount"
                type="number"
                value={formData.mortgageAmount}
                onChange={(e) => handleChange("mortgageAmount", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preApprovalType">Pre-Approval Type</Label>
              <Select
                value={formData.preApprovalType}
                onValueChange={(value) => handleChange("preApprovalType", value)}
              >
                <SelectTrigger id="preApprovalType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="renewal">Renewal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preApprovalTerm">Pre-Approval Term (days)</Label>
              <Select
                value={formData.preApprovalTerm}
                onValueChange={(value) => handleChange("preApprovalTerm", value)}
              >
                <SelectTrigger id="preApprovalTerm">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="120">120 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredClosingDate">Desired Closing Date (if known)</Label>
              <Input
                id="desiredClosingDate"
                type="date"
                value={formData.desiredClosingDate}
                onChange={(e) => handleChange("desiredClosingDate", e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90">
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Current Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select value={formData.province} onValueChange={(value) => handleChange("province", value)}>
                  <SelectTrigger id="province">
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
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90">
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Employment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select
                value={formData.employmentStatus}
                onValueChange={(value) => handleChange("employmentStatus", value)}
              >
                <SelectTrigger id="employmentStatus">
                  <SelectValue placeholder="Select status" />
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
              <Label htmlFor="employerName">Employer Name</Label>
              <Input
                id="employerName"
                value={formData.employerName}
                onChange={(e) => handleChange("employerName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearsAtJob">Years at Current Job</Label>
                <Input
                  id="yearsAtJob"
                  type="number"
                  value={formData.yearsAtJob}
                  onChange={(e) => handleChange("yearsAtJob", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => handleChange("annualIncome", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditScore">Credit Score Range</Label>
              <Select value={formData.creditScore} onValueChange={(value) => handleChange("creditScore", value)}>
                <SelectTrigger id="creditScore">
                  <SelectValue placeholder="Select credit score range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (750+)</SelectItem>
                  <SelectItem value="good">Good (700-749)</SelectItem>
                  <SelectItem value="fair">Fair (650-699)</SelectItem>
                  <SelectItem value="poor">Below 650</SelectItem>
                  <SelectItem value="unknown">I don't know</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90">
                Review Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Submit Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="property">
              <TabsList className="flex flex-wrap w-full">
                <TabsTrigger className="flex-1 text-xs sm:text-sm py-2 px-1" value="property">
                  Property
                </TabsTrigger>
                <TabsTrigger className="flex-1 text-xs sm:text-sm py-2 px-1" value="personal">
                  Personal
                </TabsTrigger>
                <TabsTrigger className="flex-1 text-xs sm:text-sm py-2 px-1" value="employment">
                  Employment
                </TabsTrigger>
                <TabsTrigger className="flex-1 text-xs sm:text-sm py-2 px-1" value="preapproval">
                  Pre-Approval
                </TabsTrigger>
              </TabsList>

              <TabsContent value="property" className="p-4 border rounded-md mt-4">
                <h3 className="font-semibold mb-2">Property Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p>{formData.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Purchase Price</p>
                    <p>${formData.purchasePrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Down Payment</p>
                    <p>${formData.downPayment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Down Payment Percentage</p>
                    <p>{formData.downPaymentPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mortgage Amount</p>
                    <p>${formData.mortgageAmount}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="personal" className="p-4 border rounded-md mt-4">
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p>
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p>{formData.dateOfBirth}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Current Address</p>
                    <p>
                      {formData.address}, {formData.city}, {formData.province}, {formData.postalCode}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="employment" className="p-4 border rounded-md mt-4">
                <h3 className="font-semibold mb-2">Employment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Employment Status</p>
                    <p>{formData.employmentStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employer</p>
                    <p>{formData.employerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Title</p>
                    <p>{formData.jobTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Years at Job</p>
                    <p>{formData.yearsAtJob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Income</p>
                    <p>${formData.annualIncome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Credit Score</p>
                    <p>{formData.creditScore}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preapproval" className="p-4 border rounded-md mt-4">
                <h3 className="font-semibold mb-2">Pre-Approval Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Pre-Approval Type</p>
                    <p>{formData.preApprovalType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pre-Approval Term</p>
                    <p>{formData.preApprovalTerm} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Desired Closing Date</p>
                    <p>{formData.desiredClosingDate || "Not specified"}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2 mt-6">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <textarea
                id="additionalInfo"
                className="w-full min-h-[100px] p-2 border rounded-md"
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                placeholder="Any additional information you'd like to share with us..."
              />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms as boolean}
                onCheckedChange={(checked) => handleChange("agreeToTerms", checked as boolean)}
                required
              />
              <label
                htmlFor="agreeToTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions and consent to the collection and use of my personal information.
              </label>
            </div>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Submit Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  )
}
