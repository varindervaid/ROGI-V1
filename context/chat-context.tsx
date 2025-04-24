"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { Message } from "ai"
import { v4 as uuidv4 } from "uuid"
import { useAuth } from "@/context/auth-context"

// Define types
// type Message = {
//   id: string
//   role: "user" | "assistant"
//   content: string
//   timestamp: string
// }

interface ChatContextType {
  isChatOpen: boolean
  isExpanded: boolean
  messages: Message[]
  input: string
  isLoading: boolean
  sessionId: string
  openChat: () => void
  closeChat: () => void
  toggleExpand: () => void
  setMessages: (messages: Message[]) => void
  setInput: (input: string) => void
  setIsLoading: (isLoading: boolean) => void
  currentPath: string
  saveMessage: (message: Message) => Promise<void>
  sendMessage: (content: string) => Promise<void>
  visitedPages: string[]
  addVisitedPage: (page: string) => void
  addAssistantMessage: (content: string) => void
  generatePageIntroduction: (path: string) => string
  clearMessages: () => void
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Sample responses for demo purposes
const SAMPLE_RESPONSES = [
  "I can help you find the best mortgage rates for your needs.",
  "Based on current market trends, fixed rates are starting at 3.49% for a 5-year term.",
  "To qualify for a mortgage, you'll typically need a good credit score, stable income, and a down payment of at least 5%.",
  "The maximum amortization period in Canada is typically 25 years for high-ratio mortgages and up to 30 years for conventional mortgages.",
  "I'd be happy to help you calculate your potential mortgage payments based on your desired home price.",
  "Refinancing might be a good option if you can secure a rate that's at least 1% lower than your current rate.",
  "First-time homebuyers may be eligible for special programs like the First-Time Home Buyer Incentive.",
]

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [welcomeMessageSent, setWelcomeMessageSent] = useState(false)
  const [visitedPages, setVisitedPages] = useState<string[]>([])
  const [lastVisitedPage, setLastVisitedPage] = useState<string>("")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const userId = user?.id

  // Initialize session ID
  useEffect(() => {
    // Get or create session ID
    let newSessionId = localStorage.getItem("rogi-chat-session-id")
    if (!newSessionId) {
      newSessionId = uuidv4()
      localStorage.setItem("rogi-chat-session-id", newSessionId)
    }

    setSessionId(newSessionId)
  }, [])

  // Send welcome message once
  useEffect(() => {
    if (sessionId && !welcomeMessageSent && messages.length === 0) {
      const welcomeMessageId = `welcome-${uuidv4()}`

      // Add welcome message to local state
      setMessages([
        {
          id: welcomeMessageId,
          role: "assistant",
          content:
            "👋 Hi there! I'm ROGI, your mortgage assistant. I can help you navigate our website, find the best mortgage options, and answer any questions you have. What can I help you with today?",
        },
      ])

      setWelcomeMessageSent(true)
    }
  }, [sessionId, welcomeMessageSent, messages.length])

  // Handle chat=open URL parameter
  useEffect(() => {
    if (searchParams.get("chat") === "open" && !isChatOpen) {
      setIsChatOpen(true)
      // Remove the chat=open parameter from the URL
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.delete("chat")
      router.replace(`${pathname}${newParams.toString() ? `?${newParams.toString()}` : ""}`, { scroll: false })
    }
  }, [searchParams, pathname, router, isChatOpen])

  // Save chat state to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("rogi-chat-messages", JSON.stringify(messages))
    }
  }, [messages])

  // Load chat state from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("rogi-chat-messages")
    if (savedMessages && messages.length === 0) {
      try {
        const parsedMessages = JSON.parse(savedMessages) as Message[]
        setMessages(parsedMessages)
      } catch (e) {
        console.error("Failed to parse saved messages:", e)
      }
    }
  }, [messages.length])

  // Function to add an assistant message directly
  const addAssistantMessage = (content: string) => {
    const messageId = `assistant-${uuidv4()}`
    const message: Message = {
      id: messageId,
      role: "assistant",
      content,
    }

    setMessages((prev) => [...prev, message])
  }

  // Function to save a message (simplified for demo)
  const saveMessage = async (message: Message) => {
    try {
      // Ensure message has a unique ID
      const messageId = message.id || uuidv4()
      const messageToSave = { ...message, id: messageId }

      // Update local state
      setMessages((prev) => {
        // Check if message already exists in the array
        const exists = prev.some((m) => m.id === messageId)
        if (exists) {
          return prev
        }
        return [...prev, messageToSave]
      })
    } catch (error) {
      console.error("Error saving message:", error)
    }
  }

  // Function to send a message
  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    try {
      setIsLoading(true)

      // Create a unique ID for the user message
      const userMessageId = `user-${uuidv4()}`

      // Create user message
      const userMessage: Message = {
        id: userMessageId,
        role: "user",
        content,
      }

      // Add user message to messages array immediately for better UX
      setMessages((prev) => [...prev, userMessage])

      // Save user message to database
      try {
        await fetch("/api/chat/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            sessionId,
            userId: userId || null,
          }),
        })
      } catch (error) {
        console.error("Error saving user message:", error)
        // Continue anyway
      }

      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          sessionId,
          userId: userId || null,
          currentPath: pathname,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Create assistant message
      const assistantMessage: Message = {
        id: data.messageId || `assistant-${uuidv4()}`,
        role: "assistant",
        content: data.response,
      }

      // Add assistant message to messages array
      setMessages((prev) => [...prev, assistantMessage])

      // Clear input after successful message
      setInput("")
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message to chat
      const errorMessageId = `error-${uuidv4()}`
      const errorMessage: Message = {
        id: errorMessageId,
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Function to clear messages
  const clearMessages = useCallback(() => {
    setMessages([])
    localStorage.removeItem("chat-messages")
  }, [])

  const addVisitedPage = (page: string) => {
    setVisitedPages((prev) => (prev.includes(page) ? prev : [...prev, page]))
  }

  // Track current page automatically
  useEffect(() => {
    if (pathname) {
      addVisitedPage(pathname)
    }
  }, [pathname])

  const openChat = () => {
    setIsChatOpen(true)
  }

  const closeChat = () => setIsChatOpen(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)

  const generatePageIntroduction = (path: string) => {
    // Extract the main section from the path
    const section = path.split("/")[1] || "home"
    const subSection = path.split("/")[2] || ""

    const introductions: Record<string, string> = {
      "": "👋 Welcome to our mortgage platform! I see you've arrived at our homepage. Here you can explore mortgage options, calculate payments, and apply for financing. What would you like to know about today?",

      calculators:
        "📊 You're now in our Calculators section. Here you can estimate mortgage payments, affordability, and more. What would you like to calculate today?",

      "calculators/mortgage":
        "🏠 This is our Mortgage Payment Calculator. You can calculate your monthly payments based on your mortgage amount, interest rate, and term. Need help with your calculation?",

      "calculators/refinance":
        "💰 Welcome to our Refinance Calculator. Here you can see if refinancing your current mortgage makes financial sense. Would you like me to explain how to use this calculator?",

      "calculators/penalty":
        "⚠️ This Mortgage Penalty Calculator helps you estimate the cost of breaking your mortgage early. Need help understanding how penalties are calculated?",

      "calculators/affordability":
        "🔍 Our Affordability Calculator helps you determine how much house you can afford based on your income and expenses. Would you like some tips on improving your affordability?",

      rates:
        "📈 Welcome to our Rates page. Here you can find current mortgage rates and compare different options. These rates are updated regularly. Would you like me to explain the difference between fixed and variable rates?",

      apply:
        "📝 You've reached our Application section. Ready to apply for a mortgage? I can guide you through the process step by step. What type of mortgage are you interested in?",

      "apply/purchase":
        "🏡 This page helps you apply for a mortgage to purchase a new home. I can help you understand the requirements and guide you through each step of the application.",

      "apply/refinance":
        "💵 Looking to refinance your existing mortgage? This application will help you explore your options. Would you like to know if refinancing makes sense for your situation?",

      "apply/pre-approval":
        "✅ Getting pre-approved is an important first step in your home buying journey. This application will help you get pre-approved so you know exactly how much you can afford.",

      "apply/renew":
        "🔄 Is your mortgage coming up for renewal? This page will help you renew with potentially better terms. Would you like to know about current renewal rates?",

      refinance:
        "💸 Looking to refinance your mortgage? This page will help you understand your options and potential savings. Common reasons to refinance include getting a lower rate, accessing equity, or consolidating debt. What's your goal?",

      purchase:
        "🔑 Planning to purchase a home? This page has everything you need to know about mortgage options for home buyers. Are you a first-time buyer or have you purchased before?",

      "pre-approval":
        "📋 Getting pre-approved is an important first step in your home buying journey. This page explains the pre-approval process and benefits. Would you like to start a pre-approval application?",

      renew:
        "📅 Mortgage renewal coming up? This page will help you explore your options. Many homeowners simply accept their lender's renewal offer, but shopping around could save you thousands. Would you like to compare renewal rates?",

      blog: "📚 Welcome to our blog! Here you'll find helpful articles about mortgages and home financing. Looking for information on a specific topic?",

      faq: "❓ You're in our FAQ section. Browse common questions or ask me anything about mortgages! I'm here to help with any questions you don't see answered here.",

      about:
        "👥 Welcome to our About page. Learn more about our company and our mission to help Canadians find the best mortgage solutions. Would you like to know more about our team or services?",

      contact:
        "📞 Need to get in touch? This page has all our contact information. You can also ask me questions directly, and I'll do my best to help!",

      dashboard:
        "🔐 Welcome to your personal dashboard. Here you can track your applications, saved calculations, and account settings. What would you like to manage today?",
    }

    // Check for exact path match first
    if (introductions[path.substring(1)]) {
      return introductions[path.substring(1)]
    }

    // Fall back to section match
    return introductions[section] || `Welcome to the ${section} page. How can I help you navigate this section?`
  }

  // Track current path
  useEffect(() => {
    if (pathname) {
      setLastVisitedPage(pathname)
    }
  }, [pathname])

  // Load messages from localStorage on initial render
  useEffect(() => {
    const storedMessages = localStorage.getItem("chat-messages")
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages))
      } catch (e) {
        console.error("Failed to parse stored messages:", e)
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(messages))
  }, [messages])

  // Auto-open chat after navigation from chatbot
  useEffect(() => {
    if (typeof window !== "undefined") {
      const shouldReopen = sessionStorage.getItem("chatbot-should-reopen")

      if (shouldReopen === "true") {
        // Clear the flag immediately to prevent reopening on subsequent renders
        sessionStorage.removeItem("chatbot-should-reopen")

        // Short delay to ensure the page has fully loaded
        const timer = setTimeout(() => {
          // Open the chat
          setIsChatOpen(true)

          // Generate and add a page introduction message
          const pageIntro = generatePageIntroduction(pathname)
          if (pageIntro) {
            addAssistantMessage(pageIntro)
          }
        }, 800)

        return () => clearTimeout(timer)
      }
    }
  }, [pathname]) // Re-run when pathname changes

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        isExpanded,
        messages,
        input,
        isLoading,
        sessionId,
        openChat,
        closeChat,
        toggleExpand,
        setMessages,
        setInput,
        setIsLoading,
        currentPath: pathname,
        saveMessage,
        sendMessage,
        visitedPages,
        addVisitedPage,
        addAssistantMessage,
        generatePageIntroduction,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

// Hook to use the chat context
export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
