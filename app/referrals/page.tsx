"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, CheckCircle2 } from "lucide-react"

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")

  const referralLink = "https://lendgenius.ca/ref/user123"
  const referralCode = "USER123"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending email
    setEmailSent(true)
    setEmail("")
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Referrals</h1>
                <p className="text-gray-600">Invite friends and earn rewards</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Left sidebar - reusing the same sidebar from dashboard */}
            <div className="w-64 bg-white rounded-lg shadow">
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/dashboard"
                      className="flex items-center w-full px-4 py-3 rounded-md text-left hover:bg-gray-100"
                    >
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/referrals"
                      className="flex items-center w-full px-4 py-3 rounded-md text-left bg-blue-50 text-blue-600"
                    >
                      <span>Referrals</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/account/settings"
                      className="flex items-center w-full px-4 py-3 rounded-md text-left hover:bg-gray-100"
                    >
                      <span>Profile Settings</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Referral Link</CardTitle>
                    <CardDescription>Share this link with friends and family</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Input value={referralLink} readOnly className="bg-gray-50" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(referralLink)}
                        className="flex-shrink-0"
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Referral Code</CardTitle>
                    <CardDescription>Share this code with friends and family</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Input value={referralCode} readOnly className="bg-gray-50 font-medium text-center" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(referralCode)}
                        className="flex-shrink-0"
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Invite by Email</CardTitle>
                    <CardDescription>Send an invitation email to your friends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {emailSent && (
                      <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                        <AlertDescription>Invitation email sent successfully!</AlertDescription>
                      </Alert>
                    )}
                    <form onSubmit={handleSendEmail} className="flex items-end gap-4">
                      <div className="flex-1">
                        <Input
                          type="email"
                          placeholder="friend@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit">Send Invitation</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Referral Stats</CardTitle>
                    <CardDescription>Track your referral performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Total Referrals</p>
                        <p className="text-3xl font-bold">0</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Successful Referrals</p>
                        <p className="text-3xl font-bold">0</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Rewards Earned</p>
                        <p className="text-3xl font-bold">$0</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <p className="text-sm text-gray-500">
                      Earn $50 for each successful referral who completes a mortgage application.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
