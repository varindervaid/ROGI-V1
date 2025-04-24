"use client"

import { useEffect } from "react"

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: behavior,
    })
  }
}

export function scrollToElement(elementId: string, behavior: ScrollBehavior = "smooth") {
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId)
    if (element) {
      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect()

      // Get the scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      // Calculate the absolute position
      const absoluteTop = rect.top + scrollTop

      // Use a larger offset on mobile for better visibility
      const isMobile = window.innerWidth < 768
      const offset = isMobile ? 100 : 80

      // Scroll to the element
      window.scrollTo({
        top: absoluteTop - offset, // Subtract header height to prevent element being hidden behind header
        behavior: behavior,
      })
    }
  }
}

interface ScrollToTopProps {
  behavior?: ScrollBehavior
}

export default function ScrollToTop({ behavior = "smooth" }: ScrollToTopProps) {
  useEffect(() => {
    // This effect will run after the component is mounted
    scrollToTop(behavior)
  }, [behavior])

  return null
}
