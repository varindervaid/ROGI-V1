"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Recommendation {
  id: string
  title: string
  description: string
  rate: string
  term: string
  lender: string
  url: string
}

export function PersonalizedRecommendations() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Fetch personalized recommendations
      fetch(`/api/recommendations?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data.recommendations)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching recommendations:", err)
          setLoading(false)
        })
    } else {
      // Show default recommendations for non-logged in users
      setRecommendations([
        {
          id: "1",
          title: "5-Year Fixed Rate Special",
          description: "Our most popular mortgage option with rate stability for 5 years",
          rate: "4.79%",
          term: "5 years",
          lender: "Major Bank",
          url: "/rates",
        },
        {
          id: "2",
          title: "Variable Rate Mortgage",
          description: "Take advantage of potential rate decreases with our variable rate option",
          rate: "4.25%",
          term: "5 years",
          lender: "Credit Union",
          url: "/rates",
        },
        {
          id: "3",
          title: "First-Time Home Buyer Special",
          description: "Special rates and terms for first-time home buyers",
          rate: "4.59%",
          term: "5 years",
          lender: "National Lender",
          url: "/rates",
        },
      ])
      setLoading(false)
    }
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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{user ? "Your Personalized Recommendations" : "Popular Mortgage Options"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.id}>
            <CardHeader>
              <CardTitle>{rec.title}</CardTitle>
              <CardDescription>{rec.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rate:</span>
                  <span className="font-semibold">{rec.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Term:</span>
                  <span>{rec.term}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lender:</span>
                  <span>{rec.lender}</span>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link href={rec.url}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
