import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import Airtable from "airtable"

const JWT_SECRET = process.env.JWT_SECRET || ""
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || ""
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || ""

export async function POST(request: Request) {
  try {
    // Get the token from cookies
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the token
    let userId: string
    try {
      const decoded = verify(token, JWT_SECRET) as { id: string }
      userId = decoded.id
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get application data from request
    const applicationData = await request.json()

    // Validate required fields
    const requiredFields = [
      "propertyValue",
      "downPayment",
      "mortgageAmount",
      "interestRate",
      "amortizationPeriod",
      "paymentFrequency",
      "monthlyPayment",
    ]

    for (const field of requiredFields) {
      if (!applicationData[field] && applicationData[field] !== 0) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Configure Airtable
    Airtable.configure({ apiKey: AIRTABLE_TOKEN })
    const base = Airtable.base(AIRTABLE_BASE_ID)
    const applicationsTable = base("Applications")

    // Save application to Airtable
    const record = await applicationsTable.create([
      {
        fields: {
          userId,
          status: "pending",
          createdAt: new Date().toISOString(),
          ...applicationData,
        },
      },
    ])

    return NextResponse.json({
      success: true,
      applicationId: record[0].id,
    })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
