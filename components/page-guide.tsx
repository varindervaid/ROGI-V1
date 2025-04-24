"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePageGuide } from "@/context/page-guide-context"
import { useChat } from "@/context/chat-context"

// Define page-specific guidance content
const pageGuidance: Record<string, { title: string; content: string }> = {
  "/calculators": {
    title: "Find the Right Calculator",
    content: "Not sure which calculator to use? Ask me to help you choose the best one for your situation.",
  },
  "/rates": {
    title: "Today's Top Rates",
    content: "Need help understanding these rates? Ask me what they mean for your situation.",
  },
  "/apply": {
    title: "Start Your Application",
    content: "Not sure where to begin? I can guide you through the application process step by step.",
  },
  "/faq": {
    title: "Have More Questions?",
    content: "If you don't see your question here, just ask me directly and I'll help you out.",
  },
}

export function PageGuide() {
  const { isNewVisit, markPageVisited, recommendedPages } = usePageGuide()
  const { openChat } = useChat()
  const [isVisible, setIsVisible] = useState(false)
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    // Get current path from window location
    const path = window.location.pathname
    setCurrentPath(path)

    // Only show for certain pages and on first visit
    const shouldShow =
      Object.keys(pageGuidance).some(
        (guidePath) => path === guidePath || (guidePath !== "/" && path.startsWith(guidePath)),
      ) && isNewVisit

    if (shouldShow) {
      // Delay appearance for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isNewVisit])

  const handleClose = () => {
    setIsVisible(false)
    markPageVisited()
  }

  const handleAskRogi = () => {
    openChat()
    handleClose()
  }

  // Find the guidance content for the current path
  const guidanceKey = Object.keys(pageGuidance).find(
    (path) => currentPath === path || (path !== "/" && currentPath.startsWith(path)),
  )

  const guidance = guidanceKey ? pageGuidance[guidanceKey] : null

  if (!isVisible || !guidance) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-primary/10 border-b border-primary/20"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>

              <div>
                <h3 className="font-medium text-primary">{guidance.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{guidance.content}</p>

                <div className="mt-2 space-x-2">
                  <Button size="sm" variant="default" onClick={handleAskRogi} className="h-8">
                    Ask ROGI
                  </Button>

                  {recommendedPages.length > 0 && (
                    <Button size="sm" variant="outline" asChild className="h-8">
                      <Link href={recommendedPages[0]}>
                        Explore {recommendedPages[0].split("/").pop()}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={handleClose} className="mt-1 h-7 w-7 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
