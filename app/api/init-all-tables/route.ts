import { initDatabase } from "@/lib/db"
import { initAnalyticsTables } from "@/lib/analytics"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Initialize database tables for chat
    await initDatabase()

    // Initialize analytics tables
    await initAnalyticsTables()

    return NextResponse.json({
      success: true,
      message: "All database tables initialized successfully",
    })
  } catch (error) {
    console.error("Error initializing database tables:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to initialize database tables",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
