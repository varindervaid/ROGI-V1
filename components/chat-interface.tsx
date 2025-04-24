"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useChat } from "@/context/chat-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Send, X, Maximize2, Minimize2, Bot, User, ArrowRight, Sparkles, Smile, ChevronDown } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePageSpecificQuestions } from "@/utils/chat-utils"

// Add a style tag to the document head to ensure crisp rendering
const injectGlobalStyles = () => {
  if (typeof document !== "undefined" && !document.getElementById("chatbot-crisp-styles")) {
    const style = document.createElement("style")
    style.id = "chatbot-crisp-styles"
    style.innerHTML = `
      .chatbot-container {
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
        transform: translateZ(0) !important;
        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;
        perspective: 1000px !important;
        -webkit-perspective: 1000px !important;
        filter: blur(0) !important;
        -webkit-filter: blur(0) !important;
      }
      
      .chatbot-text {
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
        letter-spacing: -0.01em !important;
      }
      
      .chatbot-card {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
        border-radius: 1rem !important;
        transform: translateZ(0) !important;
        will-change: transform, opacity !important;
      }
      
      .chatbot-message {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
        transform: translateZ(0) !important;
      }

      .chat-scroll-area {
        height: 560px;
        overflow-y: auto;
        scroll-behavior: smooth;
        position: relative;
      }

      @media (min-height: 768px) {
        .expanded-height {
          height: calc(100vh - 12rem) !important;
        }
      }

      @keyframes pulse-scroll-indicator {
        0% { transform: translateY(0); }
        50% { transform: translateY(4px); }
        100% { transform: translateY(0); }
      }
      
      .scroll-indicator {
        animation: pulse-scroll-indicator 1.5s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
  }
}

// Function to extract navigation commands from message content
const extractNavigationCommands = (content: string) => {
  const navigationMatches = content.match(/\[navigate:([^\]]+)\]/g)
  if (!navigationMatches) return []

  return navigationMatches.map((match) => {
    const [path, label] = match.replace("[navigate:", "").replace("]", "").split("|")
    return { path, label: label || path }
  })
}

// Function to remove navigation commands from message content
const removeNavigationCommands = (content: string) => {
  return content.replace(/\[navigate:[^\]]+\]/g, "").trim()
}

export function ChatInterface({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [inputValue, setInputValue] = useState("")
  const {
    messages,
    isLoading,
    sendMessage,
    isExpanded,
    toggleExpand,
    setInput,
    input,
    openChat,
    addAssistantMessage,
    generatePageIntroduction,
  } = useChat()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()
  const router = useRouter()
  const suggestedQuestions = usePageSpecificQuestions()
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [renderKey, setRenderKey] = useState(0) // Force re-render key
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const isNewMessageRef = useRef<boolean>(false)

  // Inject global styles for crisp rendering
  useEffect(() => {
    injectGlobalStyles()
  }, [])

  // Function to force scroll to bottom - THE simplest, most direct approach
  const forceScrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current

      // Check if user is already near the bottom (within 100px)
      const isNearBottom = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight < 100

      // Only auto-scroll if user is already near the bottom or if it's a new message
      if (isNearBottom || isNewMessageRef.current) {
        // Reset the new message flag
        isNewMessageRef.current = false

        // Scroll to bottom
        scrollElement.scrollTop = scrollElement.scrollHeight

        // Also try with a tiny delay to ensure DOM is updated
        setTimeout(() => {
          if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight
          }
        }, 10)
      }
    }
  }

  // Scroll to bottom on mount and when chat opens
  useEffect(() => {
    if (!isOpen) return

    // Force scroll on open
    forceScrollToBottom()

    // Schedule regular scroll checks
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current)
    }

    // Set up a timer to continuously force scroll to bottom (every 500ms)
    scrollTimerRef.current = setInterval(() => {
      forceScrollToBottom()
    }, 500)

    return () => {
      if (scrollTimerRef.current) {
        clearInterval(scrollTimerRef.current)
      }
    }
  }, [isOpen])

  // Scroll when messages change
  useEffect(() => {
    if (!isOpen) return

    // Set flag that a new message has arrived
    isNewMessageRef.current = true

    // Force scroll immediately
    forceScrollToBottom()

    // Also scroll after a short delay to ensure new content is rendered
    setTimeout(forceScrollToBottom, 50)
    setTimeout(forceScrollToBottom, 200)
  }, [messages, isOpen])

  // Scroll when loading state changes (after a message is sent or received)
  useEffect(() => {
    if (!isOpen) return
    forceScrollToBottom()
  }, [isLoading, isOpen])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Update local input value when context input changes
  useEffect(() => {
    if (input) {
      setInputValue(input)
    }
  }, [input])

  // Handle scroll to detect when user scrolls up
  const handleScroll = () => {
    if (!scrollAreaRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current
    const scrollBottom = scrollHeight - scrollTop - clientHeight

    // Show scroll button if not at bottom and there are messages
    setShowScrollButton(scrollBottom > 50 && messages.length > 0)
  }

  // Set up scroll event listener
  useEffect(() => {
    if (!isOpen || !scrollAreaRef.current) return

    const scrollElement = scrollAreaRef.current
    scrollElement.addEventListener("scroll", handleScroll)

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Force scroll before sending
    forceScrollToBottom()

    // Send message and clear input
    await sendMessage(inputValue)
    setInputValue("")
    setShowSuggestions(false)

    // Force scroll after sending
    forceScrollToBottom()
    setTimeout(forceScrollToBottom, 100)
  }

  const handleSuggestionClick = async (question: string) => {
    // Force scroll before sending
    forceScrollToBottom()

    setInputValue(question)
    await sendMessage(question)
    setShowSuggestions(false)

    // Force scroll after sending
    forceScrollToBottom()
    setTimeout(forceScrollToBottom, 100)
  }

  const handleNavigationClick = (path: string) => {
    // Store the destination path and a flag to reopen chat in sessionStorage
    sessionStorage.setItem("chatbot-navigation-destination", path)
    sessionStorage.setItem("chatbot-should-reopen", "true")

    // Close the chat first
    if (onClose) {
      onClose()
    }

    // Then navigate to the page
    router.push(path)
  }

  // Function to preprocess message content for better formatting
  const formatMessageProfessionally = (content: string): string => {
    if (!content) return ""

    // Clean up any existing markdown symbols
    let formatted = content

    // Remove markdown headers (# and ##)
    formatted = formatted.replace(/^#+\s+/gm, "")

    // Remove markdown bold (**text**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "$1")

    // Remove markdown italic (*text*)
    formatted = formatted.replace(/\*(.*?)\*/g, "$1")

    // Clean up bullet points
    formatted = formatted.replace(/^[•\-*]\s*/gm, "• ")

    return formatted
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={`chat-container-${renderKey}`}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className={cn(
            "fixed z-50 overflow-hidden chatbot-container",
            isExpanded ? "inset-4 md:inset-6 lg:inset-8" : "bottom-4 right-4 w-full max-w-md md:max-w-lg h-[740px]",
          )}
          onAnimationComplete={() => {
            // Force scroll after animation completes
            forceScrollToBottom()
          }}
        >
          <Card className="flex h-full w-full flex-col overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-2xl chatbot-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 py-5 px-4 bg-primary/10 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-md">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white chatbot-text">ROGI Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 chatbot-text">Your mortgage guide</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                  onClick={toggleExpand}
                  aria-label={isExpanded ? "Minimize" : "Maximize"}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* IMPORTANT: Replaced ScrollArea with a simple div for direct scroll control */}
            <div
              className={cn("chat-scroll-area", isExpanded && "expanded-height")}
              ref={scrollAreaRef}
              onScroll={handleScroll}
            >
              <div className="flex flex-col gap-4 p-4 pb-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white chatbot-text">
                        Welcome to ROGI Assistant
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 chatbot-text">
                        I can help you navigate our website and answer your mortgage questions.
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => {
                    // For assistant messages, extract navigation commands and clean the content
                    const navigationCommands =
                      message.role === "assistant" ? extractNavigationCommands(message.content) : []

                    // Clean the message content by removing navigation commands and improving formatting
                    const cleanedContent =
                      message.role === "assistant"
                        ? formatMessageProfessionally(removeNavigationCommands(message.content))
                        : message.content

                    return (
                      <motion.div
                        key={`message-${message.id || index}-${renderKey}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * Math.min(index, 5) }}
                        className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        onAnimationComplete={() => {
                          // Scroll to bottom after message animation completes
                          if (index === messages.length - 1) {
                            forceScrollToBottom()
                          }
                        }}
                      >
                        <div
                          className={cn(
                            "flex max-w-[85%] items-start gap-2 rounded-2xl p-3 chatbot-message",
                            message.role === "user"
                              ? "bg-primary text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-900 rounded-tl-none dark:bg-gray-800 dark:text-white",
                          )}
                        >
                          {message.role === "assistant" && (
                            <Avatar className="mt-0.5 h-8 w-8 rounded-full">
                              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                                <Bot className="h-4 w-4" />
                              </div>
                            </Avatar>
                          )}
                          <div className="text-sm leading-relaxed chatbot-text">
                            {message.role === "assistant"
                              ? // Professional formatting for assistant messages
                                cleanedContent
                                  .split("\n")
                                  .map((line, i) => {
                                    // Check if line looks like a header (ends with : or is all caps)
                                    if (line.trim().endsWith(":") || /^[A-Z\s]+$/.test(line.trim())) {
                                      return (
                                        <h2 key={i} className="text-lg font-bold mt-3 mb-2 chatbot-text">
                                          {line}
                                        </h2>
                                      )
                                    }
                                    // Check if line starts with a bullet point
                                    else if (line.trim().startsWith("•")) {
                                      return (
                                        <p key={i} className="mt-1 ml-2 flex chatbot-text">
                                          <span className="mr-2">•</span>
                                          <span>{line.replace(/^•\s*/, "")}</span>
                                        </p>
                                      )
                                    }
                                    // Regular paragraph with proper spacing
                                    else {
                                      return (
                                        <p key={i} className={i > 0 ? "mt-2 chatbot-text" : "chatbot-text"}>
                                          {line}
                                        </p>
                                      )
                                    }
                                  })
                              : // User messages - simple paragraphs
                                cleanedContent
                                  .split("\n")
                                  .map((line, i) => (
                                    <p key={i} className={i > 0 ? "mt-2 chatbot-text" : "chatbot-text"}>
                                      {line}
                                    </p>
                                  ))}

                            {/* Render navigation buttons if present */}
                            {navigationCommands.length > 0 && (
                              <div className="mt-3">
                                {navigationCommands.map((cmd, i) => (
                                  <Button
                                    key={i}
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 mr-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 chatbot-text"
                                    onClick={() => handleNavigationClick(cmd.path)}
                                  >
                                    {cmd.label} <ArrowRight className="ml-2 h-3 w-3" />
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.role === "user" && (
                            <Avatar className="mt-0.5 h-8 w-8 rounded-full">
                              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xs font-medium text-primary">
                                <User className="h-4 w-4" />
                              </div>
                            </Avatar>
                          )}
                        </div>
                      </motion.div>
                    )
                  })
                )}

                {/* Empty div for scrolling reference with minimal padding */}
                <div ref={messagesEndRef} id="chat-end" className="h-2" />

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                    onAnimationComplete={() => {
                      // Scroll to bottom after loading animation completes
                      forceScrollToBottom()
                    }}
                  >
                    <div className="flex max-w-[85%] items-start gap-2 rounded-2xl bg-gray-100 p-3 text-gray-900 rounded-tl-none dark:bg-gray-800 dark:text-white chatbot-message">
                      <Avatar className="mt-0.5 h-8 w-8 rounded-full">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                          R
                        </div>
                      </Avatar>
                      <div className="flex items-center space-x-2 self-center">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary/40"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary/80 [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Scroll to bottom button with animation */}
            {showScrollButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 right-4 z-10"
              >
                <Button
                  size="sm"
                  className="h-10 w-10 rounded-full bg-primary/90 hover:bg-primary shadow-md scroll-indicator"
                  onClick={forceScrollToBottom}
                  aria-label="Scroll to bottom"
                >
                  <ChevronDown className="h-5 w-5 text-white" />
                </Button>
              </motion.div>
            )}

            <CardFooter className="flex flex-col p-6 pt-4 pb-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 relative z-10 sticky bottom-0">
              {showSuggestions && messages.length <= 2 && (
                <div className="mb-4 w-full">
                  <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 chatbot-text">
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-300 chatbot-text"
                        onClick={() => handleSuggestionClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex w-full gap-2 mt-2 mb-1">
                <div className="relative flex-1">
                  <Input
                    ref={inputRef}
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    className="rounded-full border border-gray-200 bg-gray-50 focus-visible:ring-primary pr-10 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white h-12 chatbot-text"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-white"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Make sure the component is properly exported as default as well
export default ChatInterface
