import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get("userId")

  try {
    // If we have a userId, we can fetch personalized recommendations
    if (userId) {
      // This would typically query user preferences, history, etc.
      // For now, we'll return mock data
      return NextResponse.json({
        recommendations: [
          {
            id: "1",
            title: "Personalized 5-Year Fixed Rate",
            description: "Based on your profile, this rate offers the best stability",
            rate: "4.65%",
            term: "5 years",
            lender: "Premium Bank",
            url: "/rates",
          },
          {
            id: "2",
            title: "Low Down Payment Option",
            description: "Ideal for your first home purchase with minimal down payment",
            rate: "4.89%",
            term: "5 years",
            lender: "First Home Lender",
            url: "/rates",
          },
          {
            id: "3",
            title: "Quick Closing Special",
            description: "Perfect if you need to close quickly on your new home",
            rate: "4.75%",
            term: "3 years",
            lender: "Fast Approval Bank",
            url: "/rates",
          },
        ],
      })
    }

    // Default recommendations for non-logged in users
    return NextResponse.json({
      recommendations: [
        {
          id: "1",
          title: "5-Year Fixed Rate Special",
          description: "Our most popular mortgage option with rate stability for 5 years",
          rate: "4.79%",
          term: "5 years",
          lender: "Major Bank",
          url: "/rates",
        },
        {
          id: "2",
          title: "Variable Rate Mortgage",
          description: "Take advantage of potential rate decreases with our variable rate option",
          rate: "4.25%",
          term: "5 years",
          lender: "Credit Union",
          url: "/rates",
        },
        {
          id: "3",
          title: "First-Time Home Buyer Special",
          description: "Special rates and terms for first-time home buyers",
          rate: "4.59%",
          term: "5 years",
          lender: "National Lender",
          url: "/rates",
        },
      ],
    })
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
