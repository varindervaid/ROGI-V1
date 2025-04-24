"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChat } from "@/context/chat-context"

export function WelcomeGuide() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false)
  const { openChat } = useChat()

  useEffect(() => {
    // Check if user has seen the welcome message
    const welcomeSeen = localStorage.getItem("rogi-welcome-seen")
    if (welcomeSeen) {
      setHasSeenWelcome(true)
      return
    }

    // Show welcome after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("rogi-welcome-seen", "true")
    setHasSeenWelcome(true)
  }

  const handleChatWithRogi = () => {
    openChat()
    handleClose()
  }

  const handleStartTour = () => {
    // Close the welcome guide
    setIsVisible(false)
    localStorage.setItem("rogi-welcome-seen", "true")
    setHasSeenWelcome(true)

    // Start the guided tour with a slight delay to ensure welcome guide is closed
    setTimeout(() => {
      if (typeof window !== "undefined" && window && (window as any).startRogiTour) {
        ;(window as any).startRogiTour()
      }
    }, 300)
  }

  if (hasSeenWelcome || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      >
        <motion.div
          className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <Button className="absolute right-4 top-4" variant="ghost" size="sm" onClick={handleClose}>
            Skip
          </Button>

          <div className="mb-6 flex justify-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <motion.div
                className="absolute inset-0 bg-primary/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <h2 className="mb-2 text-center text-2xl font-bold text-primary">Meet ROGI</h2>

          <p className="mb-4 text-center text-sm text-gray-600">
            I'm your personal mortgage assistant. I'll help you navigate our site and find the best mortgage options for
            your needs.
          </p>

          <div className="mb-6 flex justify-center gap-2 flex-wrap">
            <div className="rounded-full bg-primary/5 px-3 py-1 border border-primary/10">
              <p className="text-xs font-medium text-primary">Answer Questions</p>
            </div>
            <div className="rounded-full bg-primary/5 px-3 py-1 border border-primary/10">
              <p className="text-xs font-medium text-primary">Guide You</p>
            </div>
            <div className="rounded-full bg-primary/5 px-3 py-1 border border-primary/10">
              <p className="text-xs font-medium text-primary">Find Rates</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button onClick={handleStartTour} className="px-6 w-full sm:w-auto">
              Take a Tour
              <MapPin className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={handleChatWithRogi} variant="outline" className="px-6 w-full sm:w-auto">
              Chat with ROGI
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
