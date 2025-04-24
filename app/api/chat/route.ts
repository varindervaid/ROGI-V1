import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { createChatSession, saveChatMessage } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

// Define the system prompt for the ROGI assistant
const SYSTEM_PROMPT = `You are ROGI, an AI mortgage assistant for a mortgage website. Your goal is to help users navigate the website, understand mortgage options, and find the information they need.

WEBSITE STRUCTURE:
- Home page (/): Overview of services and featured mortgage rates
- Purchase (/purchase): Information for home buyers and mortgage calculator
- Refinance (/refinance): Information about refinancing options and calculator
- Renew (/renew): Information about mortgage renewals
- Rates (/rates): Current mortgage rates and comparison tools
- Calculators (/calculators): Various mortgage calculators
- About Us (/about-us): Company information
- Blog (/blog): Mortgage advice and articles
- FAQ (/faq): Frequently asked questions
- Contact (/contact): Contact information
- Apply (/apply): Application forms for different mortgage types
- Dashboard (/dashboard): User account dashboard (requires login)

CONTACT INFORMATION:
- Phone: +1 (507) 554 5238
- Email: info@rogi.ca

CAPABILITIES:
1. Answer questions about mortgages, rates, and the home buying process
2. Guide users to the appropriate page based on their needs
3. Explain mortgage terminology and concepts
4. Help users understand which calculator to use
5. Assist with the application process

NAVIGATION:
When you want to direct a user to a specific page, use the format [navigate:/path|Button Text].
For example: "You can check our current rates here: [navigate:/rates|View Current Rates]"

IMPORTANT GUIDELINES:
- Be friendly, helpful, and concise
- If you don't know something, admit it and offer to connect them with a human
- Personalize responses based on the user's current page when possible
- Avoid making up information about specific rates or products
- For complex questions, guide users to the appropriate resources or suggest contacting a mortgage specialist
- Always provide accurate information about mortgage processes and terminology

Remember that you are representing a professional mortgage company, so maintain a helpful but professional tone.`

// Add formatting instructions to the AI prompt
const formattingInstructions = `
Format your response with proper markdown:
- Use # and ## for headers
- Use **bold** for important information like dollar amounts and percentages
- Use bullet points (•) for lists
- Organize information in clear sections
`

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, userId, currentPath } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Generate message IDs
    const userMessageId = `user-${uuidv4()}`
    const assistantMessageId = `assistant-${uuidv4()}`

    // Get database URL from environment variables
    const databaseUrl =
      process.env.DATABASE_URL ||
      process.env.NEON_DATABASE_URL ||
      process.env.NEON_NEON_DATABASE_URL ||
      process.env.NEON_NEON_NEON_NEON_DATABASE_URL ||
      process.env.NEON_NEON_NEON_NEON_NEON_DATABASE_URL ||
      process.env.NEON_NEON_NEON_NEON_NEON_NEON_DATABASE_URL

    // Create SQL client if we have a database URL
    const sql = databaseUrl ? neon(databaseUrl) : null

    // Ensure chat session exists (but don't block if it fails)
    try {
      await createChatSession(sessionId, userId)
    } catch (error) {
      console.error("Error creating/updating chat session:", error)
      // Continue anyway - we'll still try to generate a response
    }

    // Get chat history if database is available
    let chatHistory = []
    if (sql) {
      try {
        const result = await sql`
          SELECT role, content FROM chat_messages 
          WHERE session_id = ${sessionId} 
          ORDER BY created_at ASC 
          LIMIT 10
        `
        chatHistory = result.map((row) => ({
          role: row.role,
          content: row.content,
        }))
      } catch (error) {
        console.error("Error fetching chat history:", error)
        // Continue with empty history
      }
    }

    // Save user message to database (but don't block if it fails)
    try {
      await saveChatMessage({
        id: userMessageId,
        sessionId,
        role: "user",
        content: message,
        userId: userId || null,
      })
    } catch (error) {
      console.error("Error saving user message:", error)
      // Continue anyway
    }

    // Prepare messages for Groq
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory,
      { role: "user", content: `Current page: ${currentPath || "/"}\n\nUser message: ${message}` },
      { role: "system", content: formattingInstructions },
    ]

    // Call Groq API with proper error handling
    let aiResponse = ""
    try {
      // Check if we have the API key
      if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not defined")
      }

      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!groqResponse.ok) {
        const errorData = await groqResponse.json().catch(() => ({}))
        console.error("Groq API error:", errorData)
        throw new Error(`Groq API error: ${groqResponse.status}`)
      }

      const groqData = await groqResponse.json()
      aiResponse = groqData.choices[0].message.content
    } catch (error) {
      console.error("Error calling Groq API:", error)
      // Provide a fallback response
      aiResponse =
        "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment or contact our support team for immediate assistance."
    }

    // Format the response with better structure
    let formattedResponse = aiResponse
    if (formattedResponse && typeof formattedResponse === "string") {
      // Add section headers if not present
      if (!formattedResponse.includes("#")) {
        const sections = formattedResponse.split("\n\n")
        if (sections.length > 1) {
          formattedResponse = sections
            .map((section, i) => {
              if (i === 0) return section
              // Add headers to sections that don't have them
              if (!section.startsWith("#")) {
                const firstLine = section.split("\n")[0]
                if (firstLine && firstLine.length < 60 && firstLine.endsWith(":")) {
                  return section // Already has a header-like first line
                }
                return `## Additional Information\n${section}`
              }
              return section
            })
            .join("\n\n")
        }
      }

      // Ensure dollar amounts and percentages are bold
      formattedResponse = formattedResponse.replace(/(\$[\d,.]+)/g, "**$1**")
      formattedResponse = formattedResponse.replace(/([\d,.]+%)/g, "**$1**")
    }

    // Save assistant message to database (but don't block if it fails)
    try {
      await saveChatMessage({
        id: assistantMessageId,
        sessionId,
        role: "assistant",
        content: formattedResponse,
        userId: userId || null,
      })
    } catch (error) {
      console.error("Error saving assistant message:", error)
      // Continue anyway
    }

    return NextResponse.json({ response: formattedResponse, messageId: assistantMessageId })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: error.message,
        response: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        messageId: `error-${uuidv4()}`,
      },
      { status: 200 }, // Return 200 even for errors to allow client to display the error message
    )
  }
}
