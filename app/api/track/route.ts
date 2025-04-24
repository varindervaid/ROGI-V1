import { trackUserInteraction } from "@/lib/analytics"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId, sessionId, action, page, details } = await req.json()

    await trackUserInteraction({
      userId,
      sessionId,
      action,
      page,
      details,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking user interaction:", error)
    return NextResponse.json(
      { success: false, message: "Failed to track interaction", error: String(error) },
      { status: 500 },
    )
  }
}
