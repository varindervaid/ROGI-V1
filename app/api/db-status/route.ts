import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Try to query the database
    const result = await sql`SELECT NOW() as time`

    // Get environment variables (without exposing values)
    const envVars = Object.keys(process.env).filter((key) => key.includes("NEON") || key.includes("DATABASE"))

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      timestamp: result[0]?.time,
      env: {
        neon_vars: envVars,
      },
    })
  } catch (error) {
    console.error("Database connection error:", error)

    // Get environment variables (without exposing values)
    const envVars = Object.keys(process.env).filter((key) => key.includes("NEON") || key.includes("DATABASE"))

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: String(error),
        env: {
          neon_vars: envVars,
        },
      },
      { status: 500 },
    )
  }
}
