"use client"

import { usePathname } from "next/navigation"

// Generate page-specific quick questions based on the current path
export function usePageSpecificQuestions() {
  const pathname = usePathname()

  // Default questions
  const defaultQuestions = [
    "What's the lowest mortgage rate in Canada today?",
    "How much can I afford with a $100K salary?",
    "Should I refinance before my renewal?",
    "Show me first-time buyer programs",
  ]

  // Page-specific questions
  if (pathname.includes("/purchase")) {
    return [
      "How much down payment do I need?",
      "What's the best mortgage term for me?",
      "How do I qualify for a mortgage?",
      "What documents do I need for pre-approval?",
    ]
  } else if (pathname.includes("/refinance")) {
    return [
      "When is the best time to refinance?",
      "How much equity do I need to refinance?",
      "Can I refinance to pay off debt?",
      "What are the costs of refinancing?",
    ]
  } else if (pathname.includes("/renew")) {
    return [
      "Should I switch lenders at renewal?",
      "Can I negotiate my renewal rate?",
      "What happens if I miss my renewal date?",
      "How early can I start the renewal process?",
    ]
  } else if (pathname.includes("/calculators")) {
    return [
      "Which calculator should I use?",
      "How do I calculate my maximum mortgage?",
      "What's the land transfer tax in my province?",
      "How do I calculate my debt service ratio?",
    ]
  } else if (pathname.includes("/rates")) {
    return [
      "What's the difference between fixed and variable?",
      "Are today's rates good or should I wait?",
      "How often do rates change?",
      "What affects mortgage rates?",
    ]
  } else if (pathname.includes("/dashboard")) {
    return [
      "How do I update my profile?",
      "Where can I see my saved calculations?",
      "How do I track my application status?",
      "Can I change my password?",
    ]
  } else if (pathname.includes("/apply")) {
    return [
      "What documents do I need to apply?",
      "How long does the application process take?",
      "Can I save my application and finish later?",
      "What happens after I submit my application?",
    ]
  } else if (pathname.includes("/blog")) {
    return [
      "What are the latest mortgage trends?",
      "How do I prepare for a mortgage renewal?",
      "What's the difference between pre-approval and approval?",
      "How can I improve my credit score?",
    ]
  } else if (pathname.includes("/faq")) {
    return [
      "What's the minimum down payment in Canada?",
      "How do I avoid CMHC insurance?",
      "What's the difference between fixed and variable rates?",
      "How do I get the best mortgage rate?",
    ]
  }

  return defaultQuestions
}

// Extract navigation commands from AI responses
export function extractNavigationCommands(content: string) {
  const navigationMatches = content.match(/\[navigate:([^\]]+)\]/g)
  if (!navigationMatches) return []

  return navigationMatches.map((match) => {
    const [path, label] = match.replace("[navigate:", "").replace("]", "").split("|")
    return { path, label: label || path }
  })
}

// Format AI response for display (remove navigation commands from visible text)
export function formatAIResponse(content: string) {
  return content.replace(/\[navigate:[^\]]+\]/g, "")
}

// Format message content for better display
export function formatChatMessage(content: string): string {
  if (!content) return ""

  // Clean up any existing markdown
  let formatted = content

  // Remove any existing markdown formatting
  formatted = formatted.replace(/[#*_]/g, "")

  // Format lists better without markdown
  formatted = formatted.replace(/^(-|\*)\s*/gm, "• ")

  return formatted
}
