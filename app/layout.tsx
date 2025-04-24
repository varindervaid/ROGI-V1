import type React from "react"
import "./globals.css"
import "./typing-animation.css"
import "./tour-highlight.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { PageGuideProvider } from "@/context/page-guide-context"
import { ChatProvider } from "@/context/chat-context"
import MainLayout from "@/components/main-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ROGI - Smart Mortgage Rates",
  description: "Find the best mortgage rates in Canada with ROGI's AI-powered mortgage platform.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <ChatProvider>
              <PageGuideProvider>
                <MainLayout>{children}</MainLayout>
              </PageGuideProvider>
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
