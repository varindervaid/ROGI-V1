import { NextResponse } from "next/server"

// Mock applications data (same as in the main applications route)
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const application = mockApplications.find((app) => app.id === id)

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ application })
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 })
  }
}
