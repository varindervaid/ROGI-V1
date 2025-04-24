import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import Airtable from "airtable"

export async function POST(request: Request) {
  console.log("Simple registration API route called")

  // Check environment variables first
  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

  console.log("AIRTABLE_TOKEN exists:", !!AIRTABLE_TOKEN)
  console.log("AIRTABLE_BASE_ID exists:", !!AIRTABLE_BASE_ID)

  if (!AIRTABLE_TOKEN) {
    console.error("Missing AIRTABLE_TOKEN environment variable")
    return NextResponse.json({ error: "Server configuration error: Missing AIRTABLE_TOKEN" }, { status: 500 })
  }

  if (!AIRTABLE_BASE_ID) {
    console.error("Missing AIRTABLE_BASE_ID environment variable")
    return NextResponse.json({ error: "Server configuration error: Missing AIRTABLE_BASE_ID" }, { status: 500 })
  }

  // Parse request body
  let body
  try {
    body = await request.json()
    console.log("Request body parsed successfully")
  } catch (e) {
    console.error("Failed to parse request body:", e)
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { name, email, password } = body

  if (!name || !email || !password) {
    console.error("Missing required fields:", { name: !!name, email: !!email, password: !!password })
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
  }

  try {
    // Configure Airtable with explicit error handling
    console.log("Configuring Airtable with token:", AIRTABLE_TOKEN.substring(0, 3) + "...")

    try {
      Airtable.configure({
        apiKey: AIRTABLE_TOKEN,
        endpointUrl: "https://api.airtable.com",
      })
      console.log("Airtable configured successfully")
    } catch (configError) {
      console.error("Error configuring Airtable:", configError)
      return NextResponse.json(
        {
          error: "Failed to configure Airtable",
          details: configError instanceof Error ? configError.message : "Unknown error",
        },
        { status: 500 },
      )
    }

    // Test Airtable connection
    let base
    try {
      base = Airtable.base(AIRTABLE_BASE_ID)
      console.log("Airtable base accessed successfully")
    } catch (baseError) {
      console.error("Error accessing Airtable base:", baseError)
      return NextResponse.json(
        {
          error: "Failed to access Airtable base",
          details: baseError instanceof Error ? baseError.message : "Unknown error",
        },
        { status: 500 },
      )
    }

    // Verify the Users table exists
    let usersTable
    try {
      usersTable = base("Users")
      console.log("Users table accessed successfully")
    } catch (tableError) {
      console.error("Error accessing Users table:", tableError)
      return NextResponse.json(
        {
          error: "Failed to access Users table",
          details: tableError instanceof Error ? tableError.message : "Unknown error",
        },
        { status: 500 },
      )
    }

    // Hash password
    console.log("Hashing password")
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Password hashed successfully")

    // Create user
    console.log("Creating user in Airtable")
    try {
      const records = await usersTable.create([
        {
          fields: {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
          },
        },
      ])
      console.log("User created successfully")

      const user = records[0]

      console.log("Registration completed successfully")
      return NextResponse.json({
        success: true,
        message: "User registered successfully",
        userId: user.id,
      })
    } catch (createError) {
      console.error("Error creating user in Airtable:", createError)
      return NextResponse.json(
        {
          error: "Failed to create user in Airtable",
          details: createError instanceof Error ? createError.message : "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Unexpected registration error:", error)
    return NextResponse.json(
      {
        error: "An unexpected error occurred during registration",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
