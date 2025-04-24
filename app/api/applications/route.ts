import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock applications data
const mockApplications = [
  {
    id: "app1",
    status: "pending",
    createdAt: new Date().toISOString(),
    propertyValue: 500000,
    downPayment: 100000,
    mortgageAmount: 400000,
    interestRate: 4.5,
    amortizationPeriod: 25,
    paymentFrequency: "Monthly",
    monthlyPayment: 2215.32,
    propertyAddress: "123 Main St, Toronto, ON",
    propertyType: "Single Family Home",
    notes: "First-time homebuyer",
  },
  {
    id: "app2",
    status: "approved",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    propertyValue: 750000,
    downPayment: 150000,
    mortgageAmount: 600000,
    interestRate: 4.2,
    amortizationPeriod: 30,
    paymentFrequency: "Bi-weekly",
    monthlyPayment: 2932.45,
    propertyAddress: "456 Oak Ave, Vancouver, BC",
    propertyType: "Condominium",
    notes: "Refinancing existing mortgage",
  },
]

export async function GET() {
  try {
    // Get the token from cookies
    const token = cookies().get("auth-token")?.value

    // For now, we'll return mock data regardless of authentication
    // In a real application, you would verify the token and return user-specific data

    return NextResponse.json({ applications: mockApplications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
