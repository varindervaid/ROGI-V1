"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { redirect } from "next/navigation"

interface ChatStats {
  totalSessions: number
  totalMessages: number
  averageMessagesPerSession: number
  topQuestions: { question: string; count: number }[]
}

export function ChatAnalytics() {
  const { user } = useAuth()
  const [stats, setStats] = useState<ChatStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is admin
    if (!user || !user.email?.endsWith("@rogi.ca")) {
      redirect("/")
    }

    // Fetch chat analytics
    fetch("/api/admin/chat-analytics")
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching chat analytics:", err)
        setLoading(false)
      })
  }, [user])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) {
    return <div>Failed to load analytics data</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chat Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Chat Sessions</CardTitle>
            <CardDescription>Number of unique chat conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalSessions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Messages</CardTitle>
            <CardDescription>Total messages exchanged</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalMessages}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg. Messages Per Session</CardTitle>
            <CardDescription>Engagement metric</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.averageMessagesPerSession.toFixed(1)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Questions</CardTitle>
          <CardDescription>Most frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {stats.topQuestions.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.question}</span>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
