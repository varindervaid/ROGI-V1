"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import {
  Calculator,
  Home,
  DollarSign,
  Scale,
  Wallet,
  Key,
  RefreshCw,
  PiggyBank,
  BarChart4,
  FileText,
  Percent,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Settings,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"
import FixedScrollToTop from "@/components/fixed-scroll-to-top"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { useAuth } from "@/context/auth-context"

// Navigation menu styles
const navigationMenuNoHoverStyle = () => {
  return cn(
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:text-foreground",
  )
}

const triggerNoHoverClass =
  "data-[state=open]:bg-transparent data-[hover]:bg-transparent hover:bg-transparent hover:text-foreground data-[state=open]:text-foreground data-[hover]:text-foreground focus:bg-transparent focus:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    )
  },
)
ListItem.displayName = "ListItem"

const calculators = [
  {
    icon: <Key className="w-5 h-5" />,
    title: "Maximum Mortgage",
    description: "Calculate the Maximum Mortgage you can afford",
    link: "/calculators/maximum-mortgage",
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: "Compare side by side",
    description: "Compare up to four scenarios side by side",
    link: "/calculators/compare",
  },
  {
    icon: <Calculator className="w-5 h-5" />,
    title: "Mortgage Calculator",
    description: "Calculate your monthly mortgage payments",
    link: "/purchase",
  },
  {
    icon: <Home className="w-5 h-5" />,
    title: "Purchase Calculator",
    description: "Calculate your total monthly cost and minimum down payment",
    link: "/purchase",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Required Income",
    description: "Estimate required income for your mortgage",
    link: "/calculators/required-income",
  },
  {
    icon: <Wallet className="w-5 h-5" />,
    title: "Closing Costs",
    description: "Calculate closing costs including transfer taxes",
    link: "/calculators/closing-costs",
  },
  {
    icon: <BarChart4 className="w-5 h-5" />,
    title: "Debt Service Calculator",
    description: "Calculate debt service ratios",
    link: "/calculators/debt-service",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Renew Mortgage",
    description: "Explore your mortgage renewal options",
    link: "/renew",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Refinance Calculator",
    description: "See if refinancing makes sense for you",
    link: "/refinance",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Penalty Calculator",
    description: "Calculate your mortgage break penalty",
    link: "/calculators/penalty",
  },
  {
    icon: <PiggyBank className="w-5 h-5" />,
    title: "Affordability Calculator",
    description: "Determine how much home you can afford",
    link: "/calculators/affordability",
  },
  {
    icon: <Percent className="w-5 h-5" />,
    title: "Rates Marketplace",
    description: "Compare current mortgage rates from various lenders",
    link: "/rates",
  },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(!!user)
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setIsLoggedIn(true)
      } catch (e) {
        console.error("Error parsing user data", e)
        localStorage.removeItem("user")
      }
    }
  }, [user])

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0)
    // Close mobile menu when navigating
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("profile")
    signOut()
    setIsLoggedIn(false)
    router.push("/")
  }

  // For demo purposes, let's create a mock login function
  const handleDemoLogin = () => {
    const mockUser = {
      name: "John Smith",
      email: "john.smith@example.com",
      id: "user-123",
    }
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoggedIn(true)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar - always at the top */}
      <header className="main-header border-b sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                Rogi
              </Link>
              <span className="ml-2 text-xs text-accent font-medium bg-secondary px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center">
                Smart Rates
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={triggerNoHoverClass}>Renew</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 w-[400px]">
                        <li>
                          <div className="grid gap-1">
                            <h3 className="text-2xl font-semibold">Ready to renew?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Get the best rates and terms for your mortgage renewal.
                            </p>
                            <Button asChild className="w-fit">
                              <Link href="/renew">Apply now</Link>
                            </Button>
                          </div>
                        </li>
                        <li className="grid gap-2">
                          <ListItem href="/faq" title="What do I need to know?">
                            Learn about the renewal process and requirements.
                          </ListItem>
                          <ListItem href="/faq" title="What's my rate?">
                            Check current renewal rates and options.
                          </ListItem>
                          <ListItem href="/faq" title="Calculate savings">
                            See how much you could save by renewing.
                          </ListItem>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={triggerNoHoverClass}>Purchase</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 w-[400px]">
                        <li>
                          <div className="grid gap-1">
                            <h3 className="text-2xl font-semibold">Buying a new home?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Get started with your mortgage pre-approval.
                            </p>
                            <Button asChild className="w-fit">
                              <Link href="/purchase">Apply now</Link>
                            </Button>
                          </div>
                        </li>
                        <li className="grid gap-2">
                          <ListItem href="/faq" title="What do I need to know?">
                            First-time buyer guide and resources.
                          </ListItem>
                          <ListItem href="/faq" title="What's my rate?">
                            View current purchase mortgage rates.
                          </ListItem>
                          <ListItem href="/faq" title="How much can I afford?">
                            Calculate your maximum mortgage amount.
                          </ListItem>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={triggerNoHoverClass}>Refinance</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 w-[400px]">
                        <li>
                          <div className="grid gap-1">
                            <h3 className="text-2xl font-semibold">Looking to refinance?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Explore your refinancing options and rates.
                            </p>
                            <Button asChild className="w-fit">
                              <Link href="/refinance">Get started</Link>
                            </Button>
                          </div>
                        </li>
                        <li className="grid gap-2">
                          <ListItem href="/faq" title="How does it work?">
                            Understanding the refinancing process.
                          </ListItem>
                          <ListItem href="/faq" title="Calculate savings">
                            See how much you could save by refinancing.
                          </ListItem>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={triggerNoHoverClass}>Rates</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 w-[400px]">
                        <li>
                          <div className="grid gap-1">
                            <h3 className="text-2xl font-semibold">Current Rates</h3>
                            <p className="text-sm text-muted-foreground mb-4">View our competitive mortgage rates.</p>
                            <Button asChild className="w-fit">
                              <Link href="/rates">See all rates</Link>
                            </Button>
                          </div>
                        </li>
                        <li className="grid gap-2">
                          <ListItem href="/faq" title="Purchase Rates">
                            New purchase mortgage rates.
                          </ListItem>
                          <ListItem href="/faq" title="Refinance Rates">
                            Current refinancing rates.
                          </ListItem>
                          <ListItem href="/faq" title="Renewal Rates">
                            Special rates for renewals.
                          </ListItem>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={triggerNoHoverClass}>The Calculator Hub</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[900px] p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-medium text-lg">All Calculators</h3>
                          <Button asChild>
                            <Link href="/calculators">View Calculator Hub</Link>
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {calculators.map((calculator, index) => (
                            <Link
                              key={index}
                              href={calculator.link}
                              className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors duration-200"
                            >
                              <div className="mr-3 text-primary">{calculator.icon}</div>
                              <div>
                                <h4 className="font-medium">{calculator.title}</h4>
                                <p className="text-sm text-muted-foreground">{calculator.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/our-services" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuNoHoverStyle()}>Our Services</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuNoHoverStyle()}>About Us</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/blog" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuNoHoverStyle()}>Blog</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <User size={16} />
                      <span className="max-w-[100px] truncate">{user.name}</span>
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                        <Home size={16} />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/settings" className="flex items-center gap-2 cursor-pointer">
                        <Settings size={16} />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer text-red-500"
                    >
                      <LogOut size={16} />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleDemoLogin}>
                    Sign In
                  </Button>
                  <Button variant="default" onClick={handleDemoLogin}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile/Tablet Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden fixed inset-0 top-[61px] bg-background z-50 overflow-y-auto">
                <div className="container mx-auto px-4 py-6 space-y-6">
                  {/* For mobile screens - vertical menu */}
                  <div className="space-y-4">
                    <Link href="/renew" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">Renew</span>
                    </Link>
                    <Link href="/purchase" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">Purchase</span>
                    </Link>
                    <Link href="/refinance" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">Refinance</span>
                    </Link>
                    <Link href="/rates" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">Rates</span>
                    </Link>
                    <Link href="/calculators" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">Calculator Hub</span>
                    </Link>
                    <Link href="/our-services" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">Our Services</span>
                    </Link>
                    <Link href="/about-us" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">About Us</span>
                    </Link>
                    <Link href="/blog" className="block px-4 py-3 hover:bg-accent rounded-md">
                      <span className="font-medium">Blog</span>
                    </Link>
                  </div>

                  <div className="border-t pt-4">
                    {isLoggedIn && user ? (
                      <div className="space-y-4">
                        <div className="flex items-center px-4 py-2">
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Link href="/dashboard" className="block px-4 py-3 hover:bg-accent rounded-md">
                          <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link href="/account/settings" className="block px-4 py-3 hover:bg-accent rounded-md">
                          <span className="font-medium">Profile Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 hover:bg-accent rounded-md text-red-500"
                        >
                          <span className="font-medium">Log out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Button className="w-full" variant="outline" onClick={handleDemoLogin}>
                          Sign In
                        </Button>
                        <Button className="w-full" onClick={handleDemoLogin}>
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer - always at the bottom */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
            {/* Brand, Tagline, and Certification */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2 text-primary">Rogi</h3>
              <p className="text-black mb-4">
                Rates One Gets Intelligently - making your mortgage journey faster, easier, and smarter.
              </p>
              <div className="inline-block bg-secondary px-3 py-1 rounded-sm">
                <p className="text-xs font-semibold text-primary">NOMINEE</p>
                <p className="text-sm font-bold text-primary">2023 Mortgage</p>
                <p className="text-sm font-bold text-primary">Company of the Year</p>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-primary mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about-us" className="text-black hover:text-primary">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-black hover:text-primary">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-black hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-primary mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/purchase" className="text-black hover:text-primary">
                    Buying a home
                  </Link>
                </li>
                <li>
                  <Link href="/renew" className="text-black hover:text-primary">
                    Renewal
                  </Link>
                </li>
                <li>
                  <Link href="/refinance" className="text-black hover:text-primary">
                    Refinance
                  </Link>
                </li>
                <li>
                  <Link href="/rates" className="text-black hover:text-primary">
                    Mortgage rates
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/compare" className="text-black hover:text-primary">
                    Rate Comparison
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-primary mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-black hover:text-primary">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-black hover:text-primary">
                    Terms & conditions
                  </Link>
                </li>
                <li>
                  <Link href="/mortgage-glossary" className="text-black hover:text-primary">
                    Mortgage documents
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-black mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} Rogi Financial Corporation. All rights reserved.</p>
              <p className="mt-1">FSRA Brokerage License ON #13410 | NB #230000436</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-primary/80">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:text-primary/80">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:text-primary/80">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <FixedScrollToTop />
      <FloatingChatButton />
    </div>
  )
}
