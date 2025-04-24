import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function GET(req: Request) {
  try {
    // Get total sessions
    const totalSessions = await sql`SELECT COUNT(*) FROM chat_sessions`

    // Get total messages
    const totalMessages = await sql`SELECT COUNT(*) FROM chat_messages`

    // Get average messages per session
    const avgMessages = await sql`
      SELECT AVG(message_count) FROM (
        SELECT session_id, COUNT(*) as message_count 
        FROM chat_messages 
        GROUP BY session_id
      ) as session_counts
    `

    // Get top questions (user messages)
    const topQuestions = await sql`
      SELECT content as question, COUNT(*) as count
      FROM chat_messages
      WHERE role = 'user'
      GROUP BY content
      ORDER BY count DESC
      LIMIT 10
    `

    return NextResponse.json({
      totalSessions: Number.parseInt(totalSessions[0].count),
      totalMessages: Number.parseInt(totalMessages[0].count),
      averageMessagesPerSession: Number.parseFloat(avgMessages[0].avg) || 0,
      topQuestions: topQuestions.map((q) => ({
        question: q.question,
        count: Number.parseInt(q.count),
      })),
    })
  } catch (error) {
    console.error("Error fetching chat analytics:", error)
    return NextResponse.json({ error: "Failed to fetch chat analytics" }, { status: 500 })
  }
}
