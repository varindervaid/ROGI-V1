import Layout from "@/components/layout"
import Image from "next/image"
import { LowestRates } from "@/components/lowest-rates"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calculator, Home, RefreshCw, ArrowLeftRight, PiggyBank } from "lucide-react"

const services = [
  {
    icon: <Home className="w-12 h-12 text-primary" />,
    title: "Buying a Home",
    description: "Get expert guidance and competitive rates for your home purchase.",
    link: "/purchase",
  },
  {
    icon: <RefreshCw className="w-12 h-12 text-primary" />,
    title: "Mortgage Renewal",
    description: "Renew your mortgage with potentially better terms and rates.",
    link: "/renew",
  },
  {
    icon: <ArrowLeftRight className="w-12 h-12 text-primary" />,
    title: "Refinancing",
    description: "Explore options to refinance your mortgage and potentially save money.",
    link: "/refinance",
  },
  {
    icon: <PiggyBank className="w-12 h-12 text-primary" />,
    title: "Debt Consolidation",
    description: "Consolidate your debts into your mortgage for potential savings.",
    link: "/refinance",
  },
]

export default function OurServicesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-12 px-4 bg-white">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Mortgage Services</h1>
          <p className="text-lg text-primary/80 mb-6">
            Expert guidance and competitive rates for all your mortgage needs. Whether you're buying, renewing, or
            refinancing, we're here to help you make informed decisions.
          </p>
          <Link href="/apply">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vecteezy_a-house-with-money-flying-around-it_51683969.png-n3mEFt71v2iyTRhA5feWTPjs8D8M6b.jpeg"
            alt="House with money illustration"
            width={400}
            height={267}
            className="rounded-lg"
            priority
          />
        </div>
      </div>

      {/* Today's Lowest Rates */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Today's Lowest Rates</h2>
          <LowestRates />
        </div>
      </section>

      {/* Our Services */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How We Can Help You</h2>
          <div className="grid md:grid-cols-2 gap-8 services-grid">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-4">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={service.link}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Hub Link */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Our Calculator Hub</h2>
          <p className="text-xl text-gray-600 mb-8">
            Use our comprehensive set of mortgage calculators to make informed decisions.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="#calculator-hub">
              <Calculator className="w-5 h-5 mr-2" />
              Open Calculator Hub
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  )
}
