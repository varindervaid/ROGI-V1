// Remove all DB operations and replace with mock functions

// Mock user operations
export async function verifyToken(token: string) {
  return { userId: "demo-user-id" }
}

export async function getUserById(id: string) {
  return { id, email: "demo@example.com" }
}

export async function getUserByEmail(email: string) {
  return { id: "demo-user-id", email, password: "mock-hashed-password" }
}

export async function verifyPassword(user: any, password: string) {
  return true
}

export async function updatePassword(userId: string, newPassword: string) {
  return { success: true }
}

// Mock chat operations
export async function createChatSession(sessionId: string, userId: string | null) {
  return { success: true }
}

export async function saveChatMessage(message: any) {
  return { success: true }
}

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

async function initDatabase() {
  try {
    await sql`SELECT 1`
    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("Database connection error:", error)
    return { success: false, message: "Failed to connect to database", error: String(error) }
  }
}

async function getSavedCalculations(userId: string) {
  // Mock implementation - replace with actual database query
  return []
}

async function saveCalculation(calculation: {
  userId: string
  name: string
  calculatorType: string
  inputData: any
  resultData: any
}) {
  // Mock implementation - replace with actual database operation
  console.log(`Saving calculation ${calculation.name}`)
  return "calculation-id"
}

async function getChatMessages(sessionId: string) {
  // Mock implementation - replace with actual database query
  return []
}

export { getSavedCalculations, sql, initDatabase, saveCalculation, getChatMessages }
