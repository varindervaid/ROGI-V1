"use client"

import type React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

interface ScrollToTopButtonProps extends ButtonProps {
  href?: string
  showAfter?: number // Show button after scrolling this many pixels
  behavior?: ScrollBehavior
}

// Modified to not display the floating button
export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  href,
  children,
  showAfter = 300,
  behavior = "smooth",
  ...props
}) => {
  // If this is being used as a fixed corner button, don't render it
  if (!children && !href && props.className?.includes("fixed")) {
    return null
  }

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial check
    toggleVisibility()

    // Add event listener
    window.addEventListener("scroll", toggleVisibility, { passive: true })

    // Clean up
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [showAfter])

  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: behavior,
      })
    }
  }

  const renderButton = () => {
    return (
      <Button
        onClick={handleClick}
        className={`${!isVisible && !children ? "opacity-0 pointer-events-none" : ""} transition-opacity duration-300 ${props.className || ""}`}
        {...props}
      >
        {children || <ArrowUp className="h-4 w-4" />}
      </Button>
    )
  }

  const renderLinkButton = () => {
    return (
      <Button
        asChild
        className={`${!isVisible && !children ? "opacity-0 pointer-events-none" : ""} transition-opacity duration-300 ${props.className || ""}`}
        {...props}
      >
        <Link
          href={href}
          onClick={() => {
            // Use setTimeout to ensure the navigation happens first
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                behavior: behavior,
              })
            }, 100)
          }}
        >
          {children || <ArrowUp className="h-4 w-4" />}
        </Link>
      </Button>
    )
  }

  if (href) {
    return renderLinkButton()
  }

  return renderButton()
}
