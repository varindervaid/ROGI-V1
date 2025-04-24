import { NextResponse } from "next/server"
import { verifyToken, getUserById, getUserByEmail, verifyPassword, updatePassword } from "@/lib/db"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Current password and new password are required" },
        { status: 400 },
      )
    }

    // Get user
    const user = await getUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Get user with password
    const userWithPassword = await getUserByEmail(user.email)
    if (!userWithPassword) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isValid = await verifyPassword(userWithPassword, currentPassword)
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Current password is incorrect" }, { status: 400 })
    }

    // Update password
    await updatePassword(decoded.userId, newPassword)

    return NextResponse.json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    console.error("Password change error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to change password", error: String(error) },
      { status: 500 },
    )
  }
}
