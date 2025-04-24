"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const blogPosts = [
  {
    id: 1,
    title: "Understanding Mortgage Rates: Fixed vs Variable",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    author: "Daniel Edgar",
    date: "February 6, 2025",
    excerpt:
      "Dive into the pros and cons of fixed and variable mortgage rates to make an informed decision for your home purchase.",
    slug: "fixed-vs-variable-rates",
  },
  {
    id: 2,
    title: "First-Time Homebuyer's Guide: Navigating the Mortgage Process",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1296&q=80",
    author: "Sarah Johnson",
    date: "February 9, 2025",
    excerpt:
      "Essential tips and steps for first-time homebuyers to successfully navigate the mortgage application process.",
    slug: "first-time-homebuyer-guide",
  },
  {
    id: 3,
    title: "Refinancing Your Mortgage: When and Why It Makes Sense",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    author: "Jane Edgar",
    date: "February 8, 2025",
    excerpt:
      "Explore the benefits of refinancing your mortgage and learn when it's the right time to consider this financial move.",
    slug: "refinancing-your-mortgage",
  },
]

export default function BlogPage() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % blogPosts.length)
    }, 5000) // Change post every 5 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Scroll to top when the component mounts or updates
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [router.asPath]) // This will trigger when the route changes

  const currentPost = blogPosts[currentPostIndex]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>

        <div className="mb-12">
          <Link href={`/blog/${currentPost.slug}?image=${encodeURIComponent(currentPost.image)}`}>
            <Card className="group overflow-hidden h-[600px] relative">
              <div className="absolute inset-0">
                <Image
                  src={currentPost.image || "/placeholder.svg"}
                  alt={currentPost.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              </div>

              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <h2 className="text-4xl font-bold mb-4 leading-tight">{currentPost.title}</h2>
                <div className="flex items-center text-lg mb-4 text-gray-200">
                  <span>{currentPost.author}</span>
                  <span className="mx-2">•</span>
                  <span>{currentPost.date}</span>
                </div>
                <p className="text-xl text-gray-200 line-clamp-3">{currentPost.excerpt}</p>
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}?image=${encodeURIComponent(post.image)}`}>
              <Card className="group overflow-hidden h-[400px] relative">
                <div className="absolute inset-0">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                </div>

                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2 leading-tight">{post.title}</h2>
                  <div className="flex items-center text-sm mb-4 text-gray-200">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-gray-200 line-clamp-3">{post.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
