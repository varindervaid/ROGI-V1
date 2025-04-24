"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, InfoIcon, Calculator, FileText, MessageSquare, Home, Bot } from "lucide-react"
import { useChat } from "@/context/chat-context"

// Define the comprehensive tour steps
const tourSteps = [
  {
    path: "/",
    element: "#hero-section",
    title: "Welcome to Rogi",
    content: "I'm your intelligent mortgage assistant that helps you find the best rates and options for your needs.",
    position: "bottom",
    icon: <Home className="h-5 w-5 text-primary mr-2" />,
  },
  {
    path: "/calculators",
    element: ".calculator-hub",
    title: "Calculator Hub",
    content:
      "Here you can explore our comprehensive suite of mortgage calculators to plan your finances with precision.",
    position: "top",
    icon: <Calculator className="h-5 w-5 text-primary mr-2" />,
  },
  {
    path: "/calculators/affordability",
    element: ".affordability-calculator",
    title: "Affordability Calculator",
    content: "Find out how much home you can afford based on your income, expenses, and down payment.",
    position: "top",
    icon: <Calculator className="h-5 w-5 text-primary mr-2" />,
  },
  {
    path: "/our-services",
    element: ".services-grid",
    title: "Our Services",
    content: "Explore the range of mortgage services we offer, from home purchases to refinancing and renewals.",
    position: "top",
    icon: <FileText className="h-5 w-5 text-primary mr-2" />,
  },
  {
    path: "/",
    element: ".floating-chat-button",
    title: "ROGI is Always Here",
    content:
      "I'm available throughout the site to answer questions and guide you. Just click this button anytime you need help!",
    position: "top",
    icon: <MessageSquare className="h-5 w-5 text-primary mr-2" />,
    isLast: true,
  },
]

export function GuidedTour() {
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [hasSeenTour, setHasSeenTour] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showMergeAnimation, setShowMergeAnimation] = useState(false)
  const [guidePosition, setGuidePosition] = useState({ x: 0, y: 0 })
  const [targetElement, setTargetElement] = useState<Element | null>(null)
  const { openChat } = useChat()
  const tourEventListener = useRef<(() => void) | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize tour when requested
  useEffect(() => {
    const handleStartTour = () => {
      setIsVisible(true)
      setCurrentStepIndex(0)
      // Navigate to the first step's path if needed
      if (pathname !== tourSteps[0].path) {
        setIsNavigating(true)
        router.push(tourSteps[0].path)
      }
    }

    // Listen for the custom event to start the tour
    window.addEventListener("startRogiTour", handleStartTour)
    tourEventListener.current = handleStartTour

    // Check if tour has been seen before
    const tourSeen = localStorage.getItem("rogi-tour-seen")
    if (tourSeen) {
      setHasSeenTour(true)
    }

    return () => {
      window.removeEventListener("startRogiTour", handleStartTour)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current)
      }
    }
  }, [pathname, router])

  // Handle navigation between steps
  useEffect(() => {
    if (isNavigating && pathname === tourSteps[currentStepIndex].path) {
      setIsNavigating(false)
      // After navigation, find the target element
      setTimeout(() => {
        updateTargetElement()
      }, 500)
    }
  }, [pathname, currentStepIndex, isNavigating])

  // Update target element when step changes or after navigation
  useEffect(() => {
    if (!isNavigating && isVisible) {
      updateTargetElement()
    }
  }, [currentStepIndex, isNavigating, isVisible, pathname])

  // Update guide position based on target element
  useEffect(() => {
    if (targetElement && isVisible && !isNavigating) {
      positionGuideNearElement()

      // Auto-advance to the next step after a delay
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current)
      }

      autoAdvanceTimerRef.current = setTimeout(() => {
        if (!showMergeAnimation) {
          nextStep()
        }
      }, 6000) // Auto-advance after 6 seconds
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current)
      }
    }
  }, [targetElement, isVisible, isNavigating, showMergeAnimation])

  // Find the target element for the current step
  const updateTargetElement = () => {
    const currentStep = tourSteps[currentStepIndex]
    if (!currentStep) return

    // Wait a bit for the DOM to be ready after navigation
    setTimeout(() => {
      let element: Element | null = null

      try {
        element = document.querySelector(currentStep.element)
      } catch (e) {
        console.error("Invalid selector:", currentStep.element)
      }

      if (element) {
        setTargetElement(element)
      } else {
        console.warn(`Element not found: ${currentStep.element}`)
        // If element not found, position guide in the center of the screen
        setGuidePosition({
          x: window.innerWidth / 2 - 150,
          y: window.innerHeight / 2 - 100,
        })
      }
    }, 300)
  }

  // Position the guide near the target element
  const positionGuideNearElement = () => {
    if (!targetElement) return

    const rect = targetElement.getBoundingClientRect()
    const currentStep = tourSteps[currentStepIndex]

    let x = 0
    let y = 0

    // Position based on the specified position in the step
    switch (currentStep.position) {
      case "top":
        x = rect.left + rect.width / 2 - 150
        y = rect.top - 220
        break
      case "bottom":
        x = rect.left + rect.width / 2 - 150
        y = rect.bottom + 20
        break
      case "left":
        x = rect.left - 320
        y = rect.top + rect.height / 2 - 100
        break
      case "right":
        x = rect.right + 20
        y = rect.top + rect.height / 2 - 100
        break
      default:
        x = rect.left + rect.width / 2 - 150
        y = rect.bottom + 20
    }

    // Keep the guide within viewport bounds
    x = Math.max(20, Math.min(x, window.innerWidth - 320))
    y = Math.max(20, Math.min(y, window.innerHeight - 220))

    setGuidePosition({ x, y })

    // Highlight the target element
    targetElement.classList.add("tour-highlight")

    return () => {
      targetElement.classList.remove("tour-highlight")
    }
  }

  // Handle tour completion with merge animation
  const completeTour = () => {
    // Start merge animation
    setShowMergeAnimation(true)

    // Find the floating chat button for the merge animation
    const chatButton = document.querySelector(".floating-chat-button")
    if (chatButton) {
      const rect = chatButton.getBoundingClientRect()
      // Animate guide to the chat button position
      setGuidePosition({
        x: rect.left + rect.width / 2 - 150,
        y: rect.top + rect.height / 2 - 100,
      })
    }

    // After animation completes
    setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem("rogi-tour-seen", "true")
      setHasSeenTour(true)

      // Open the chat when the tour is complete
      setTimeout(() => {
        openChat()
        // Send a message from ROGI after opening the chat
        setTimeout(() => {
          const event = new CustomEvent("rogiTourComplete", {
            detail: {
              message:
                "I hope you enjoyed the tour! Now you know all the key features of our website. Is there anything specific you'd like to know about mortgages or our services? I'm here to help with any questions you might have.",
            },
          })
          window.dispatchEvent(event)
        }, 500)
      }, 300)
    }, 1500) // Duration of merge animation
  }

  // Move to next step
  const nextStep = () => {
    // Remove highlight from current element
    if (targetElement) {
      targetElement.classList.remove("tour-highlight")
    }

    if (currentStepIndex < tourSteps.length - 1) {
      const nextIndex = currentStepIndex + 1
      setCurrentStepIndex(nextIndex)

      // If the next step is on a different page, navigate there
      if (tourSteps[nextIndex].path !== pathname) {
        setIsNavigating(true)
        router.push(tourSteps[nextIndex].path)
      } else {
        // If on the same page, just update the target element
        updateTargetElement()
      }
    } else {
      completeTour()
    }
  }

  // Skip tour
  const skipTour = () => {
    // Remove highlight from current element
    if (targetElement) {
      targetElement.classList.remove("tour-highlight")
    }

    setIsVisible(false)
    localStorage.setItem("rogi-tour-seen", "true")
    setHasSeenTour(true)
  }

  // Reset tour (for testing)
  const resetTour = () => {
    localStorage.removeItem("rogi-tour-seen")
    setHasSeenTour(false)
    setCurrentStepIndex(0)
    setIsVisible(true)
  }

  if (!isVisible || hasSeenTour) return null

  const currentStep = tourSteps[currentStepIndex]

  // Don't show content during navigation, but keep the guide visible
  const showContent = !isNavigating && pathname === currentStep.path

  return (
    <>
      {/* Add global styles for the tour highlight */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 40;
          box-shadow: 0 0 0 4px rgba(var(--color-primary), 0.3), 0 0 0 8px rgba(var(--color-primary), 0.2);
          border-radius: 4px;
          transition: all 0.3s ease;
        }
      `}</style>

      <AnimatePresence>
        {/* The guide character that follows you around */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: guidePosition.x,
            y: guidePosition.y,
            transition: {
              type: "spring",
              damping: 20,
              stiffness: showMergeAnimation ? 400 : 200,
            },
          }}
          exit={
            showMergeAnimation
              ? {
                  scale: 0.2,
                  opacity: 0,
                  transition: { duration: 0.7 },
                }
              : {
                  opacity: 0,
                  y: 50,
                  transition: { duration: 0.3 },
                }
          }
          className="fixed z-50 w-300 pointer-events-auto"
          style={{
            width: "300px",
            maxWidth: "90vw",
          }}
        >
          <div className="bg-white rounded-lg shadow-lg border border-primary/20 p-4">
            {/* Guide character avatar */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Bot className="h-12 w-12 text-white" />
              {showMergeAnimation && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.5, 0.8, 1.2, 0],
                    opacity: [1, 0.8, 0.6, 0.4, 0],
                  }}
                  transition={{ duration: 1.2, times: [0, 0.2, 0.5, 0.8, 1] }}
                  className="absolute inset-0 bg-primary rounded-full"
                />
              )}
            </div>

            {/* Tour content - only show when not navigating */}
            {showContent && (
              <>
                <div className="flex items-start justify-between mb-2 ml-10">
                  <div className="flex items-center">
                    {currentStep.icon || <InfoIcon className="h-5 w-5 text-primary mr-2" />}
                    <h3 className="font-semibold text-primary">{currentStep.title}</h3>
                  </div>
                  <Button variant="ghost" size="sm" onClick={skipTour} className="h-6 w-6 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="w-full bg-gray-200 h-1 rounded-full mb-3">
                  <div
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / tourSteps.length) * 100}%` }}
                  />
                </div>

                <p className="text-sm mb-4">{currentStep.content}</p>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Step {currentStepIndex + 1} of {tourSteps.length}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={nextStep}>
                      {currentStep.isLast ? "Finish Tour" : "Next"}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Show loading message during navigation */}
            {isNavigating && (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="animate-pulse flex space-x-2 mb-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                </div>
                <p className="text-sm text-gray-600">Taking you to the next feature...</p>
              </div>
            )}
          </div>

          {/* Directional arrow pointing to the target element */}
          {showContent && targetElement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-8 h-8"
              style={{
                top: currentStep.position === "top" ? "100%" : currentStep.position === "bottom" ? "-8%" : "50%",
                left: currentStep.position === "left" ? "100%" : currentStep.position === "right" ? "-8%" : "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-0 h-0 border-solid"
                style={{
                  borderWidth: "8px",
                  borderTopColor: currentStep.position === "bottom" ? "white" : "transparent",
                  borderBottomColor: currentStep.position === "top" ? "white" : "transparent",
                  borderLeftColor: currentStep.position === "right" ? "white" : "transparent",
                  borderRightColor: currentStep.position === "left" ? "white" : "transparent",
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay during merge animation */}
      {showMergeAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
        />
      )}
    </>
  )
}

// Export the startTour method
let startTour

if (typeof window !== "undefined" && window) {
  startTour = () => {
    const event = new Event("startRogiTour")
    window.dispatchEvent(event)
  }
  // @ts-ignore - Add to window for external access
  window.startRogiTour = startTour
}
