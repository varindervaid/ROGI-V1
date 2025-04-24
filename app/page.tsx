import { Hero } from "@/components/hero"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { LowestRates } from "@/components/lowest-rates"
import { FAQSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// Import the PersonalizedRecommendations component
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
// Import the BankLogos component
import { BankLogos } from "@/components/bank-logos"

export default function Home() {
  return (
    <>
      <Hero />
      {/* Add the PersonalizedRecommendations component to the page */}
      {/* Add this after the Hero component */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <PersonalizedRecommendations />
        </div>
      </section>
      <ReviewsCarousel />
      <LowestRates />

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">How ROGI Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-secondary/30 p-8 rounded-lg text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">You Ask</h3>
              <p>Just type your mortgage question into the ROGI prompt—our AI will handle the rest.</p>
            </div>

            <div className="bg-secondary/30 p-8 rounded-lg text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">ROGI Scans the Market</h3>
              <p>In seconds, ROGI searches rates, products, and lender rules to give you tailored answers.</p>
            </div>

            <div className="bg-secondary/30 p-8 rounded-lg text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">You Save Time and Money</h3>
              <p>Whether you're buying, renewing, or refinancing, we show you your best options.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="#hero">
                Try it now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why ROGI Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            ROGI Isn't Just Another Mortgage Site.
            <br />
            It's the Future of Mortgages in Canada.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">AI-Powered</h3>
                  <p className="text-gray-700">ROGI updates your pre-approval instantly when rates change.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Lowest Rate Focused</h3>
                  <p className="text-gray-700">We operate on razor-thin margins to save you more.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Smarter Pre-Approvals</h3>
                  <p className="text-gray-700">ROGI learns about your needs and matches you to top lenders.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Built for Everyone</h3>
                  <p className="text-gray-700">
                    Whether you're a first-time buyer or investor, ROGI's got you covered.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Human Support</h3>
                  <p className="text-gray-700">Real Mortgage Specialists are always a click away.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">24/7 Availability</h3>
                  <p className="text-gray-700">Get answers to your mortgage questions any time, day or night.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who ROGI Is For Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Who's ROGI For?</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">First-Time Buyers</h3>
              <p className="text-sm">Navigate the process with confidence</p>
            </div>

            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Renewals</h3>
              <p className="text-sm">2026–2027 mortgage holders</p>
            </div>

            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Refinancing</h3>
              <p className="text-sm">Tap into your home equity</p>
            </div>

            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Investors</h3>
              <p className="text-sm">Rental property financing</p>
            </div>

            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Seniors</h3>
              <p className="text-sm">Reverse mortgage options</p>
            </div>

            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">New to Canada</h3>
              <p className="text-sm">Special programs available</p>
            </div>

            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Luxury Homes</h3>
              <p className="text-sm">Jumbo mortgage solutions</p>
            </div>

            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Rate Shoppers</h3>
              <p className="text-sm">Find the lowest rate in Canada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Store Promotion Section */}
      <section className="mt-16 bg-white rounded-2xl p-8 md:p-12 border container mx-auto mb-16 md:px-16 lg:px-28">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Find Your Best Rate</h2>
            <p className="text-lg mb-6 text-black">
              Ready to take the next step? Visit our Rate Store to compare and find the most competitive mortgage rates
              from Canada's leading lenders. Our rate comparison tool helps you:
            </p>
            <ul className="space-y-3 mb-8 text-black">
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-primary" />
                Compare rates from multiple lenders
              </li>
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-primary" />
                Access exclusive rate offers
              </li>
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-primary" />
                Get personalized rate recommendations
              </li>
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-primary" />
                Save thousands on your mortgage
              </li>
            </ul>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="https://ratestore.ca" target="_blank">
                Visit The Rate Store
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Statistics-%281%29.jpg-uKC2d2onIIap0AKVg1tMO4Dvndvkc7.jpeg"
              alt="Rate comparison illustration"
              width={500}
              height={400}
              className="rounded-lg"
            />
            <div className="absolute bottom-4 left-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-primary">5-Year Fixed</p>
              <p className="text-4xl font-bold text-accent">4.99%*</p>
              <p className="text-sm text-black">*Rates subject to change</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Canadians Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Trusted By Canadians</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            We work with all major Canadian financial institutions to find you the best mortgage rates.
          </p>
          <BankLogos />
        </div>
      </section>

      <FAQSection />
    </>
  )
}
