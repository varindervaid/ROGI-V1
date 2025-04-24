import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export type UserInteraction = {
  userId?: string
  sessionId: string
  action: string
  page: string
  details?: Record<string, any>
  timestamp: Date
}

export async function initAnalyticsTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_interactions (
      id SERIAL PRIMARY KEY,
      user_id TEXT,
      session_id TEXT NOT NULL,
      action TEXT NOT NULL,
      page TEXT NOT NULL,
      details JSONB,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `
}

export async function trackUserInteraction(interaction: Omit<UserInteraction, "timestamp">) {
  await sql`
    INSERT INTO user_interactions (user_id, session_id, action, page, details)
    VALUES (${interaction.userId}, ${interaction.sessionId}, ${interaction.action}, ${interaction.page}, ${JSON.stringify(interaction.details || {})})
  `
}
