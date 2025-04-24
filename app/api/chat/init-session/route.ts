import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Mock creating chat session - no actual DB operations
    console.log("Chat session would be created:", { sessionId })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error initializing chat session:", error)
    return NextResponse.json(
      { error: "Failed to initialize chat session", details: error.message },
      { status: 200 }, // Return 200 even for errors to prevent client-side crashes
    )
  }
}
