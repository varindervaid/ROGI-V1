import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Log environment variables (without revealing sensitive values)
    console.log("Environment variables check:", {
      hasAirtableToken: !!process.env.AIRTABLE_TOKEN,
      hasAirtableBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasJwtSecret: !!process.env.JWT_SECRET,
    })

    // Parse request body
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, email, and password are required",
        },
        { status: 400 },
      )
    }

    // Return success without doing any actual registration
    return NextResponse.json({
      success: true,
      message: "Registration test successful",
      user: { name, email },
    })
  } catch (error) {
    console.error("Test registration error:", error)
    return NextResponse.json(
      {
        error: "An error occurred during test registration",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
