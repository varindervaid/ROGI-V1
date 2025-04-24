import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getChatMessages, verifyToken } from "@/lib/db"

export async function GET() {
  try {
    // Get session ID from cookie
    const chatSessionId = cookies().get("chat_session_id")?.value

    if (!chatSessionId) {
      return NextResponse.json({ messages: [] })
    }

    // Get user ID if authenticated
    let userId: string | undefined
    const authToken = cookies().get("auth_token")?.value
    if (authToken) {
      const decoded = await verifyToken(authToken)
      if (decoded) {
        userId = decoded.userId
      }
    }

    // Get chat messages
    const messages = await getChatMessages(chatSessionId)

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Chat history error:", error)
    return NextResponse.json({ error: "Failed to fetch chat history", details: String(error) }, { status: 500 })
  }
}
