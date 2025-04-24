"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type PageGuideContextType = {
  showGuide: boolean
  setShowGuide: (show: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  setTotalSteps: (steps: number) => void
}

const PageGuideContext = createContext<PageGuideContextType | undefined>(undefined)

export function PageGuideProvider({ children }: { children: ReactNode }) {
  const [showGuide, setShowGuide] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)

  return (
    <PageGuideContext.Provider
      value={{
        showGuide,
        setShowGuide,
        currentStep,
        setCurrentStep,
        totalSteps,
        setTotalSteps,
      }}
    >
      {children}
    </PageGuideContext.Provider>
  )
}

export function usePageGuide() {
  const context = useContext(PageGuideContext)
  if (context === undefined) {
    throw new Error("usePageGuide must be used within a PageGuideProvider")
  }
  return context
}
