import Image from "next/image"
import Link from "next/link"
import { Users2, Building2, Trophy, HeartHandshake } from "lucide-react"

// Force static rendering
export const dynamic = "force-static"

const stats = [
  {
    number: "15K+",
    label: "Mortgages Processed",
  },
  {
    number: "$4B+",
    label: "Total Value Funded",
  },
  {
    number: "98%",
    label: "Client Satisfaction",
  },
  {
    number: "20+",
    label: "Years Experience",
  },
]

const values = [
  {
    icon: <Users2 className="w-8 h-8 text-primary" />,
    title: "Client-First Approach",
    description: "We put our clients' needs first, ensuring personalized solutions for every situation.",
  },
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    title: "Industry Expertise",
    description: "Our team brings decades of combined experience in the mortgage industry.",
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "Excellence in Service",
    description: "Award-winning mortgage solutions and customer service.",
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-primary" />,
    title: "Trust & Transparency",
    description: "We believe in clear communication and building lasting relationships.",
  },
]

export default function AboutUsPage() {
  return (
    <div className="bg-background">
      <main className="flex-grow">
        <div className="bg-white">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Us</h1>
            <p className="text-xl text-black max-w-3xl mx-auto">
              We help Canadians achieve their homeownership dreams through expert guidance, competitive rates, and a
              seamless mortgage experience.
            </p>
          </div>

          {/* Mission Section */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  We're here to make mortgages <span className="text-accent">simple</span> for everyone.
                </h2>
                <p className="text-black mb-6">
                  Not just for those with perfect credit scores, but for all Canadians. We offer a more accessible and
                  transparent approach to mortgages, moving away from the traditional complicated processes.
                </p>
                <p className="text-black mb-6">
                  We don't think getting a mortgage should be stressful. When done right, it's a stepping stone to
                  achieving your financial goals and dreams.
                </p>
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md inline-block font-medium"
                >
                  Get in Touch
                </Link>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vecteezy_mortgage-and-home-buying-generative-ai_27730124-WAfDOi8GGZpdRtdu35oFIGydEFp234.png"
                  alt="Mortgage consultation illustration"
                  width={400}
                  height={267}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-secondary py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-primary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">{value.title}</h3>
                  <p className="text-black">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Whether you're a first-time homebuyer or looking to refinance, we're here to help you every step of the
                way.
              </p>
              <Link
                href="/contact"
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md inline-block font-medium"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
