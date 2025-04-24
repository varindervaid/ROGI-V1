import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Calculator,
  Home,
  RefreshCw,
  DollarSign,
  Percent,
  BarChart,
  FileText,
  ArrowLeftRightIcon as ArrowsLeftRight,
  PiggyBank,
  Clock,
  Building,
  Landmark,
  Scale,
  Briefcase,
  FileCheck,
  ChevronRight,
} from "lucide-react"

export default function CalculatorsPage() {
  // Calculator categories
  const mortgageCalculators = [
    {
      title: "Mortgage Calculator",
      description: "Calculate your monthly mortgage payments",
      icon: <Home className="h-6 w-6 text-primary" />,
      link: "/purchase",
      popular: true,
    },
    {
      title: "Refinance Calculator",
      description: "See if refinancing makes sense for you",
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
      link: "/refinance",
      popular: true,
    },
    {
      title: "Affordability Calculator",
      description: "How much house can you afford?",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      link: "/calculators/affordability",
      popular: true,
    },
    {
      title: "Maximum Mortgage",
      description: "Find your maximum mortgage amount",
      icon: <BarChart className="h-6 w-6 text-primary" />,
      link: "/calculators/maximum-mortgage",
    },
    {
      title: "Mortgage Renewal",
      description: "Calculate your mortgage renewal options",
      icon: <Clock className="h-6 w-6 text-primary" />,
      link: "/renew",
    },
  ]

  const taxAndFeesCalculators = [
    {
      title: "Land Transfer Tax",
      description: "Estimate your land transfer taxes",
      icon: <Percent className="h-6 w-6 text-primary" />,
      link: "/calculators/land-transfer-tax",
      popular: true,
    },
    {
      title: "Closing Costs",
      description: "Estimate your closing costs",
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: "/calculators/closing-costs",
    },
    {
      title: "Penalty Calculator",
      description: "Estimate mortgage break penalties",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      link: "/calculators/penalty",
      popular: true,
    },
  ]

  const comparisonCalculators = [
    {
      title: "Compare Mortgages",
      description: "Compare different mortgage options",
      icon: <ArrowsLeftRight className="h-6 w-6 text-primary" />,
      link: "/calculators/compare",
    },
    {
      title: "Required Income",
      description: "Calculate required income for a mortgage",
      icon: <PiggyBank className="h-6 w-6 text-primary" />,
      link: "/calculators/required-income",
    },
    {
      title: "Debt Service Ratios",
      description: "Calculate your debt service ratios",
      icon: <Scale className="h-6 w-6 text-primary" />,
      link: "/calculators/debt-service",
    },
  ]

  // Application types
  const applicationTypes = [
    {
      title: "Purchase Application",
      description: "Apply for a mortgage to buy a home",
      icon: <Home className="h-6 w-6 text-white" />,
      link: "/apply/purchase",
      color: "bg-primary",
    },
    {
      title: "Refinance Application",
      description: "Apply to refinance your current mortgage",
      icon: <RefreshCw className="h-6 w-6 text-white" />,
      link: "/apply/refinance",
      color: "bg-primary",
    },
    {
      title: "Pre-Approval Application",
      description: "Get pre-approved before house hunting",
      icon: <FileCheck className="h-6 w-6 text-white" />,
      link: "/apply/pre-approval",
      color: "bg-primary",
    },
    {
      title: "Renewal Application",
      description: "Renew your existing mortgage",
      icon: <Clock className="h-6 w-6 text-white" />,
      link: "/apply/renew",
      color: "bg-primary",
    },
  ]

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Mortgage Calculator Hub
        </h1>
        <p className="text-xl text-gray-600">
          Our comprehensive suite of mortgage calculators and application tools to help you make informed decisions
          about your mortgage options.
        </p>
      </div>

      {/* Featured Applications Section */}
      <section className="mb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl -z-10"></div>
        <div className="px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <Briefcase className="mr-3 h-7 w-7 text-primary" />
              <span>Mortgage Applications</span>
            </h2>
            <Link href="/apply" className="text-primary font-medium flex items-center hover:underline">
              View all applications
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationTypes.map((app, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className={`${app.color} h-2 w-full`}></div>
                <CardHeader className="pb-2 pt-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {app.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{app.title}</CardTitle>
                  <CardDescription className="text-gray-600">{app.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 pb-6">
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={app.link}>Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 inline-flex items-center">
            <span className="bg-primary/10 text-primary rounded-full p-2 mr-3">
              <Calculator className="h-6 w-6" />
            </span>
            Popular Calculators
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most frequently used calculators to help you plan your mortgage journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...mortgageCalculators, ...taxAndFeesCalculators, ...comparisonCalculators]
            .filter((calc) => calc.popular)
            .map((calculator, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col bg-white">
                  <CardHeader className="pb-2 pt-6 flex-grow">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                      {calculator.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{calculator.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-base">{calculator.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 pb-6">
                    <Button
                      asChild
                      className="w-full bg-white text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Link href={calculator.link}>Calculate Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </section>

      {/* All Calculators By Category */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">All Calculators</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of mortgage calculators organized by category
          </p>
        </div>

        {/* Mortgage Calculators */}
        <div className="mb-16 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 -z-10"></div>
          <div className="px-8 py-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                <Building className="h-6 w-6" />
              </div>
              Mortgage Calculators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mortgageCalculators.map((calculator, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        {calculator.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{calculator.title}</CardTitle>
                        <CardDescription className="text-sm">{calculator.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full text-sm group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      <Link href={calculator.link}>Calculate</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Tax and Fees Calculators */}
        <div className="mb-16 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 -z-10"></div>
          <div className="px-8 py-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <div className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                <Landmark className="h-6 w-6" />
              </div>
              Tax & Fees Calculators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {taxAndFeesCalculators.map((calculator, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        {calculator.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{calculator.title}</CardTitle>
                        <CardDescription className="text-sm">{calculator.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full text-sm group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      <Link href={calculator.link}>Calculate</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Calculators */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 -z-10"></div>
          <div className="px-8 py-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <div className="bg-purple-100 text-purple-600 p-2 rounded-full mr-3">
                <ArrowsLeftRight className="h-6 w-6" />
              </div>
              Comparison Calculators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonCalculators.map((calculator, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                        {calculator.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{calculator.title}</CardTitle>
                        <CardDescription className="text-sm">{calculator.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full text-sm group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      <Link href={calculator.link}>Calculate</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-br from-primary/20 to-primary/5 p-12 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg">
          Our mortgage experts can help you navigate your options and find the best mortgage solution for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8">
            <Link href="/contact">Contact an Expert</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white border-primary text-primary hover:bg-primary hover:text-white px-8"
          >
            <Link href="/rates">View Current Rates</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
