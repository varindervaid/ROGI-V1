"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useChat } from "@/context/chat-context"
import ChatInterface from "@/components/chat-interface"

export function FloatingChatButton() {
  const { isChatOpen, openChat, closeChat } = useChat()
  const [mounted, setMounted] = useState(false)

  // Only render on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatOpen && (
        <Button
          onClick={openChat}
          className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      <ChatInterface isOpen={isChatOpen} onClose={closeChat} />
    </div>
  )
}
