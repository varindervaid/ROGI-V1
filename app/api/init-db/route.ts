import { NextResponse } from "next/server"
import { initDatabase } from "@/lib/db"

export async function GET() {
  try {
    const result = await initDatabase()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json(
      { success: false, message: "Failed to initialize database", error: String(error) },
      { status: 500 },
    )
  }
}
