"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Send } from "lucide-react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { Input } from "@/components/ui/input"
import { useChat } from "@/context/chat-context"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  const { openChat, setInput, input, sendMessage } = useChat()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample quick questions
  const quickQuestions = [
    "What's the lowest mortgage rate in Canada today?",
    "How much can I afford with a $100K salary?",
    "Should I refinance before my renewal?",
    "Show me first-time buyer programs",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)

      // Store the current input before clearing it
      const currentInput = input

      // Open the chat interface first
      openChat()

      // Then send the message (using the stored input)
      await sendMessage(currentInput)
    } catch (error) {
      console.error("Error submitting message:", error)
      // The error will be handled in the chat context
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    // Set the input field with the question
    setInput(question)

    // Focus the input after setting the question
    const inputElement = document.getElementById("hero-chat-input") as HTMLInputElement
    if (inputElement) {
      inputElement.focus()
    }
  }

  return (
    <section className="relative bg-secondary/20 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">ROGI</h1>
            <Bot className="h-8 w-8 md:h-10 md:w-10 text-primary animate-bounce" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Canada's First AI-Powered <br />
            <span className="text-accent">
              <TypeAnimation
                sequence={["Mortgage Platform", 2000, "Rate Finder", 2000, "Home Loan Assistant", 2000]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
              />
            </span>
          </h2>

          <p className="text-lg md:text-xl mb-8 text-black max-w-2xl mx-auto">
            Ask ROGI anything about mortgages, and let our AI instantly guide you to the best options.
          </p>

          {/* AI Chat Prompt */}
          <div className="max-w-2xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-7 left-0 right-0 text-center"
            >
              <p className="text-primary font-medium">
                <Bot className="inline-block h-5 w-5 mr-2 animate-bounce" />
                Hi there! I'm ROGI, your personal mortgage assistant
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="relative mb-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ROGI anything about mortgages..."
                className="pr-12 py-6 text-lg shadow-lg border-2 focus:border-primary transition-all duration-300"
                id="hero-chat-input"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
                disabled={!input.trim() || isSubmitting}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>

            {/* Quick Questions */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-sm bg-white text-primary px-4 py-2 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors shadow-sm"
                  disabled={isSubmitting}
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/apply">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link href="/calculators">Try Our Calculators</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Logos Section */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-medium mb-6">Trusted by Canadians. Connected to Canada's Top Lenders.</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="relative h-10 w-24">
              <Image src="/images/banks/cibc-logo.png" alt="CIBC" fill style={{ objectFit: "contain" }} />
            </div>
            <div className="relative h-10 w-24">
              <Image src="/images/banks/rbc-logo.png" alt="RBC" fill style={{ objectFit: "contain" }} />
            </div>
            <div className="relative h-10 w-24">
              <Image src="/images/banks/td-logo.png" alt="TD Bank" fill style={{ objectFit: "contain" }} />
            </div>
            <div className="relative h-10 w-24">
              <Image src="/images/banks/bmo-logo.png" alt="BMO" fill style={{ objectFit: "contain" }} />
            </div>
            <div className="relative h-10 w-24">
              <Image src="/images/banks/scotiabank-logo.png" alt="Scotiabank" fill style={{ objectFit: "contain" }} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
            ROGI scans the entire mortgage market—big banks, monoline lenders, and specialty products—so you don't have
            to.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
