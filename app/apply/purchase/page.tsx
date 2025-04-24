"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function PurchaseApplicationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)

  // Initialize form data with URL parameters
  const initialFormData = {
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    province: searchParams.get("location") || "",
    postalCode: "",

    // Employment Information
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    yearsAtJob: "",
    annualIncome: "",

    // Property Information
    propertyAddress: "",
    propertyCity: "",
    propertyProvince: searchParams.get("location") || "",
    propertyType: "",
    purchasePrice: searchParams.get("purchasePrice") || "",
    downPayment: searchParams.get("downPayment") || "",
    mortgageAmount: searchParams.get("mortgageAmount") || "",

    // Mortgage Details
    interestRate: searchParams.get("interestRate") || "",
    amortizationPeriod: searchParams.get("amortizationPeriod") || "",
    paymentFrequency: "",
    closingDate: "",

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

  // Calculate mortgage amount if purchasePrice and downPayment are available
  useEffect(() => {
    if (formData.purchasePrice && formData.downPayment) {
      const purchasePrice = Number.parseFloat(formData.purchasePrice as string)
      const downPayment = Number.parseFloat(formData.downPayment as string)
      if (!isNaN(purchasePrice) && !isNaN(downPayment)) {
        setFormData((prev) => ({
          ...prev,
          mortgageAmount: (purchasePrice - downPayment).toString(),
        }))
      }
    }
  }, [formData.purchasePrice, formData.downPayment])

  // Set initial step based on calculator type - no longer needed as Property Details is now step 1
  // useEffect(() => {
  //   const calculatorType = searchParams.get("calculatorType")
  //   if (calculatorType && currentStep === 1) {
  //     setCurrentStep(3)
  //   }
  // }, [searchParams, currentStep])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/apply" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Application Options
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Home Purchase Application</h1>

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

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Property & Mortgage Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={(e) => handleChange("propertyAddress", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyCity">City</Label>
                    <Input
                      id="propertyCity"
                      value={formData.propertyCity}
                      onChange={(e) => handleChange("propertyCity", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyProvince">Province</Label>
                    <Select
                      value={formData.propertyProvince}
                      onValueChange={(value) => handleChange("propertyProvince", value)}
                    >
                      <SelectTrigger id="propertyProvince">
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
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleChange("propertyType", value)}
                    >
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Purchase Price</Label>
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
                    <Label htmlFor="mortgageAmount">Mortgage Amount</Label>
                    <Input id="mortgageAmount" type="number" value={formData.mortgageAmount} readOnly />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={formData.interestRate}
                      onChange={(e) => handleChange("interestRate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amortizationPeriod">Amortization Period (years)</Label>
                    <Select
                      value={formData.amortizationPeriod}
                      onValueChange={(value) => handleChange("amortizationPeriod", value)}
                    >
                      <SelectTrigger id="amortizationPeriod">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 10, 15, 20, 25, 30].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year} years
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                    <Select
                      value={formData.paymentFrequency}
                      onValueChange={(value) => handleChange("paymentFrequency", value)}
                    >
                      <SelectTrigger id="paymentFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="semi-monthly">Semi-Monthly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                        <SelectItem value="accelerated-bi-weekly">Accelerated Bi-Weekly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="accelerated-weekly">Accelerated Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="closingDate">Expected Closing Date</Label>
                  <Input
                    id="closingDate"
                    type="date"
                    value={formData.closingDate}
                    onChange={(e) => handleChange("closingDate", e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                  <div></div> {/* Empty div to maintain the space */}
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 text-sm sm:text-base"
                  >
                    <span className="sm:hidden">Next</span>
                    <span className="hidden sm:inline">Next Step</span>
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

                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={prevStep} className="text-sm sm:text-base">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="sm:hidden">Back</span>
                    <span className="hidden sm:inline">Previous Step</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 text-sm sm:text-base"
                  >
                    <span className="sm:hidden">Next</span>
                    <span className="hidden sm:inline">Next Step</span>
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

                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={prevStep} className="text-sm sm:text-base">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="sm:hidden">Back</span>
                    <span className="hidden sm:inline">Previous Step</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 text-sm sm:text-base"
                  >
                    <span className="sm:hidden">Review</span>
                    <span className="hidden sm:inline">Review Application</span>
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
                    <TabsTrigger className="flex-1 text-xs sm:text-sm py-2 px-1" value="mortgage">
                      Mortgage
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="property" className="p-4 border rounded-md mt-4">
                    <h3 className="font-semibold mb-2">Property Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Property Address</p>
                        <p>
                          {formData.propertyAddress}, {formData.propertyCity}, {formData.propertyProvince}
                        </p>
                      </div>
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
                    </div>
                  </TabsContent>

                  <TabsContent value="mortgage" className="p-4 border rounded-md mt-4">
                    <h3 className="font-semibold mb-2">Mortgage Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Interest Rate</p>
                        <p>{formData.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amortization Period</p>
                        <p>{formData.amortizationPeriod} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Frequency</p>
                        <p>{formData.paymentFrequency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Closing Date</p>
                        <p>{formData.closingDate}</p>
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
                    I agree to the terms and conditions and consent to the collection and use of my personal
                    information.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-6">
                  <Button type="button" variant="outline" onClick={prevStep} className="text-sm sm:text-base">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="sm:hidden">Back</span>
                    <span className="hidden sm:inline">Previous Step</span>
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-sm sm:text-base">
                    <span>Submit Application</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </Layout>
  )
}
