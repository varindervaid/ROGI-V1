import Link from "next/link"
import { Button } from "@/components/ui/button"

// Force static generation
export const dynamic = "force-static"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Static Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                Rogi
              </Link>
              <span className="ml-2 text-xs text-accent font-medium bg-secondary px-2 py-1 rounded-full">
                Smart Rates
              </span>
            </div>

            {/* Simplified Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/renew" className="text-sm font-medium hover:text-primary">
                Renew
              </Link>
              <Link href="/purchase" className="text-sm font-medium hover:text-primary">
                Purchase
              </Link>
              <Link href="/refinance" className="text-sm font-medium hover:text-primary">
                Refinance
              </Link>
              <Link href="/rates" className="text-sm font-medium hover:text-primary">
                Rates
              </Link>
              <Link href="/calculators" className="text-sm font-medium hover:text-primary">
                Calculators
              </Link>
              <Link href="/about" className="text-sm font-medium text-primary">
                About
              </Link>
            </nav>

            {/* Simplified Auth Links */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/signin" passHref>
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup" passHref>
                <Button variant="default">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About LendGenius</h1>
          <p className="mb-4">
            LendGenius is a comprehensive tool designed to help you make informed decisions about your mortgage. Whether
            you're a first-time homebuyer or looking to refinance, our calculators provide you with accurate and
            up-to-date information to guide your choices.
          </p>
          <p className="mb-4">
            Our team of financial experts and software developers work tirelessly to ensure that LendGenius remains at
            the forefront of mortgage calculation technology, providing you with the most reliable and user-friendly
            experience possible.
          </p>
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </main>

      {/* Static Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/purchase" className="text-sm hover:underline">
                    Purchase
                  </Link>
                </li>
                <li>
                  <Link href="/refinance" className="text-sm hover:underline">
                    Refinance
                  </Link>
                </li>
                <li>
                  <Link href="/renew" className="text-sm hover:underline">
                    Renew
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/calculators" className="text-sm hover:underline">
                    Calculators
                  </Link>
                </li>
                <li>
                  <Link href="/rates" className="text-sm hover:underline">
                    Rates
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/our-services" className="text-sm hover:underline">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-sm hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-sm hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-center">© {new Date().getFullYear()} LendGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
