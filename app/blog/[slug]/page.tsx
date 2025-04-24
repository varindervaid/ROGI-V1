"use client"
import Layout from "@/components/layout"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from "next/navigation"

// This is a mock function to fetch blog post data
// In a real application, you would fetch this data from an API or database
const getBlogPost = (slug: string) => {
  return {
    title: "Understanding Mortgage Rates: Fixed vs Variable",
    author: "Daniel Edgar",
    date: "February 6, 2025",
    content: `
      <p>Choosing between a fixed or variable mortgage rate is one of the most important decisions you'll make when securing a mortgage. Both options have their advantages and potential drawbacks, and the right choice depends on your financial situation, risk tolerance, and market conditions.</p>

      <h2>Fixed Mortgage Rates</h2>
      <p>A fixed mortgage rate remains constant for the entire term of your mortgage. This means your mortgage payments will stay the same, providing stability and predictability in your budget.</p>

      <h3>Pros of Fixed Rates:</h3>
      <ul>
        <li>Predictable payments</li>
        <li>Protection against interest rate increases</li>
        <li>Easier to budget long-term</li>
      </ul>

      <h3>Cons of Fixed Rates:</h3>
      <ul>
        <li>Generally higher initial rates compared to variable rates</li>
        <li>No benefit if market rates decrease</li>
        <li>Potentially higher penalties for breaking the mortgage term</li>
      </ul>

      <h2>Variable Mortgage Rates</h2>
      <p>A variable mortgage rate fluctuates with the lender's prime rate, which is influenced by the Bank of Canada's overnight lending rate. Your mortgage payments may change as interest rates change.</p>

      <h3>Pros of Variable Rates:</h3>
      <ul>
        <li>Often start lower than fixed rates</li>
        <li>Potential for lower overall interest if rates decrease</li>
        <li>Usually lower penalties for breaking the mortgage term</li>
      </ul>

      <h3>Cons of Variable Rates:</h3>
      <ul>
        <li>Less predictable payments</li>
        <li>Risk of higher payments if interest rates rise</li>
        <li>Can be stressful for those who prefer stability</li>
      </ul>

      <h2>Making Your Decision</h2>
      <p>When deciding between fixed and variable rates, consider factors such as your financial stability, risk tolerance, and the current economic outlook. If you value predictability and are on a tight budget, a fixed rate might be more suitable. If you're comfortable with some uncertainty and believe rates will remain stable or decrease, a variable rate could save you money.</p>

      <p>Remember, it's always a good idea to consult with a mortgage professional who can provide personalized advice based on your specific situation and the current market conditions.</p>
    `,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  const searchParams = useSearchParams()
  const imageUrl = searchParams.get("image") || "/placeholder.svg"
  const router = useRouter()

  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="mb-4" onClick={() => router.push("/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-sm mb-8 text-gray-600">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
        </div>
        <div className="mb-8 relative h-[400px]">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="flex space-x-4 mb-8">
          <Button variant="outline" size="icon">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </article>
    </Layout>
  )
}
