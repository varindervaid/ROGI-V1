"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Review = {
  id: number
  name: string
  location: string
  rating: number
  text: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Toronto, ON",
    rating: 5,
    text: "Working with this mortgage broker was the best decision we made. They found us an incredible rate and made the entire process stress-free. Highly recommend!",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Vancouver, BC",
    rating: 5,
    text: "As first-time homebuyers, we were nervous about the mortgage process. Our broker walked us through every step and secured a rate better than we expected. Couldn't be happier!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Calgary, AB",
    rating: 5,
    text: "I was struggling to get approved with my bank, but this team found me a lender and got my mortgage approved in days. Their expertise made all the difference.",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Ottawa, ON",
    rating: 5,
    text: "When it came time to renew my mortgage, they saved me thousands by negotiating a much better rate than my bank offered. Professional service from start to finish.",
  },
  {
    id: 5,
    name: "Olivia Wilson",
    location: "Montreal, QC",
    rating: 5,
    text: "The refinancing process was seamless thanks to their knowledge and attention to detail. They found the perfect solution for my financial needs.",
  },
]

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setVisibleReviews([reviews[currentIndex]])
    } else {
      const endIndex = Math.min(currentIndex + 3, reviews.length)
      setVisibleReviews(reviews.slice(currentIndex, endIndex))
    }
  }, [currentIndex, isMobile])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - (isMobile ? 1 : 3), 0))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + (isMobile ? 1 : 3), reviews.length - (isMobile ? 1 : 3)))
  }

  return (
    <section className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">What Our Customers Say</h2>

        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= reviews.length - (isMobile ? 1 : 3)}
              className="rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 flex-grow">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
