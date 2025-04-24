"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function BankLogos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
      {/* CIBC Logo */}
      <Card className="border-0 shadow-sm bg-transparent">
        <CardContent className="flex items-center justify-center p-4 h-24">
          <div className="relative w-full h-full">
            <Image src="/images/banks/cibc-logo.png" alt="CIBC" fill style={{ objectFit: "contain" }} />
          </div>
        </CardContent>
      </Card>

      {/* RBC Logo */}
      <Card className="border-0 shadow-sm bg-transparent">
        <CardContent className="flex items-center justify-center p-4 h-24">
          <div className="relative w-full h-full">
            <Image src="/images/banks/rbc-logo.png" alt="RBC" fill style={{ objectFit: "contain" }} />
          </div>
        </CardContent>
      </Card>

      {/* TD Logo */}
      <Card className="border-0 shadow-sm bg-transparent">
        <CardContent className="flex items-center justify-center p-4 h-24">
          <div className="relative w-full h-full">
            <Image src="/images/banks/td-logo.png" alt="TD Bank" fill style={{ objectFit: "contain" }} />
          </div>
        </CardContent>
      </Card>

      {/* BMO Logo */}
      <Card className="border-0 shadow-sm bg-transparent">
        <CardContent className="flex items-center justify-center p-4 h-24">
          <div className="relative w-full h-full">
            <Image src="/images/banks/bmo-logo.png" alt="BMO" fill style={{ objectFit: "contain" }} />
          </div>
        </CardContent>
      </Card>

      {/* Scotiabank Logo */}
      <Card className="border-0 shadow-sm bg-transparent">
        <CardContent className="flex items-center justify-center p-4 h-24">
          <div className="relative w-full h-full">
            <Image src="/images/banks/scotiabank-logo.png" alt="Scotiabank" fill style={{ objectFit: "contain" }} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
