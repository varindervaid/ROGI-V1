import { NextResponse } from "next/server"
import { verifyToken, saveCalculation } from "@/lib/db"
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
    const { name, calculatorType, inputData, resultData } = body

    if (!name || !calculatorType || !inputData || !resultData) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const id = await saveCalculation({
      userId: decoded.userId,
      name,
      calculatorType,
      inputData,
      resultData,
    })

    return NextResponse.json({
      success: true,
      id,
    })
  } catch (error) {
    console.error("Error saving calculation:", error)
    return NextResponse.json(
      { success: false, message: "Failed to save calculation", error: String(error) },
      { status: 500 },
    )
  }
}
