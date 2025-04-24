import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Ensure message has an ID
    const messageId = message.id || `${message.role}-${uuidv4()}`

    // Mock saving message - no actual DB operations
    console.log("Message would be saved:", { id: messageId, sessionId, role: message.role })

    return NextResponse.json({ success: true, messageId })
  } catch (error) {
    console.error("Error saving chat message:", error)
    return NextResponse.json(
      { success: false, error: "Failed to save message", details: error.message },
      { status: 200 }, // Return 200 even for errors to prevent client-side crashes
    )
  }
}
