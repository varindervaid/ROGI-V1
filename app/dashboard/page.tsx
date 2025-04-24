"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Home,
  Calculator,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  DollarSign,
  PiggyBank,
} from "lucide-react"
import Link from "next/link"

// Mock data for applications
const mockApplications = [
  {
    id: "app1",
    type: "Purchase",
    status: "In Progress",
    date: "2023-04-15",
    propertyValue: 500000,
    mortgageAmount: 400000,
    address: "123 Main St, Toronto, ON",
  },
  {
    id: "app2",
    type: "Refinance",
    status: "Approved",
    date: "2023-03-22",
    propertyValue: 750000,
    mortgageAmount: 600000,
    address: "456 Oak Ave, Vancouver, BC",
  },
  {
    id: "app3",
    type: "Renewal",
    status: "Pending",
    date: "2023-04-01",
    propertyValue: 620000,
    mortgageAmount: 450000,
    address: "789 Pine St, Calgary, AB",
  },
]

// Mock data for saved calculations
const mockCalculations = [
  {
    id: "calc1",
    type: "Mortgage",
    date: "2023-04-10",
    propertyValue: 550000,
    downPayment: 110000,
    mortgageAmount: 440000,
    interestRate: 4.5,
    term: 5,
    amortization: 25,
    payment: 2450.32,
  },
  {
    id: "calc2",
    type: "Refinance",
    date: "2023-03-28",
    propertyValue: 680000,
    currentMortgage: 420000,
    newMortgageAmount: 500000,
    interestRate: 4.2,
    term: 5,
    amortization: 25,
    payment: 2680.15,
  },
]

// Mock data for notifications
const mockNotifications = [
  {
    id: "notif1",
    type: "application",
    message: "Your mortgage application has been approved!",
    date: "2023-04-14",
    read: false,
  },
  {
    id: "notif2",
    type: "rate",
    message: "Mortgage rates have decreased. Consider refinancing.",
    date: "2023-04-10",
    read: true,
  },
  {
    id: "notif3",
    type: "document",
    message: "Please upload your proof of income document.",
    date: "2023-04-05",
    read: false,
  },
]

// Mock user profile data
const mockUserProfile = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(416) 555-1234",
  address: "123 Main Street, Toronto, ON M5V 2K7",
  preferredContact: "Email",
}

function DashboardPageContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {mockUserProfile.name}</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button asChild variant="outline">
            <Link href="/apply">New Application</Link>
          </Button>
          <Button asChild>
            <Link href="/calculators">New Calculation</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="calculations">Calculations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockApplications.length}</div>
                <p className="text-muted-foreground text-sm">Active applications</p>
                <div className="mt-4">
                  <Link
                    href="#"
                    onClick={() => setActiveTab("applications")}
                    className="text-primary text-sm flex items-center"
                  >
                    View all applications
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockCalculations.length}</div>
                <p className="text-muted-foreground text-sm">Saved calculations</p>
                <div className="mt-4">
                  <Link
                    href="#"
                    onClick={() => setActiveTab("calculations")}
                    className="text-primary text-sm flex items-center"
                  >
                    View all calculations
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockNotifications.filter((n) => !n.read).length}</div>
                <p className="text-muted-foreground text-sm">Unread notifications</p>
                <div className="mt-4">
                  <Link
                    href="#"
                    onClick={() => setActiveTab("notifications")}
                    className="text-primary text-sm flex items-center"
                  >
                    View all notifications
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Your most recent mortgage applications</CardDescription>
              </CardHeader>
              <CardContent>
                {mockApplications.length > 0 ? (
                  <div className="space-y-4">
                    {mockApplications.slice(0, 2).map((app) => (
                      <div
                        key={app.id}
                        className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="flex items-center">
                            <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                            <span className="ml-2 text-sm text-muted-foreground">{app.type}</span>
                          </div>
                          <p className="mt-1 text-sm font-medium">{app.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(app.mortgageAmount)} • {formatDate(app.date)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/applications/${app.id}`}>View</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No applications yet</p>
                    <Button className="mt-2" asChild>
                      <Link href="/apply">Apply Now</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Calculations</CardTitle>
                <CardDescription>Your most recent mortgage calculations</CardDescription>
              </CardHeader>
              <CardContent>
                {mockCalculations.length > 0 ? (
                  <div className="space-y-4">
                    {mockCalculations.slice(0, 2).map((calc) => (
                      <div
                        key={calc.id}
                        className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{calc.type} Calculator</span>
                            <span className="ml-2 text-sm text-muted-foreground">{formatDate(calc.date)}</span>
                          </div>
                          <p className="mt-1 text-sm">{formatCurrency(calc.propertyValue)} property value</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(calc.payment)}/month • {calc.interestRate}% • {calc.amortization} years
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No calculations yet</p>
                    <Button className="mt-2" asChild>
                      <Link href="/calculators">Calculate Now</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Applications</CardTitle>
                  <CardDescription>Manage your mortgage applications</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/apply">New Application</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {mockApplications.length > 0 ? (
                <div className="space-y-6">
                  {mockApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                          <span className="ml-2 font-medium">{app.type} Application</span>
                          <span className="ml-2 text-sm text-muted-foreground">{formatDate(app.date)}</span>
                        </div>
                        <p className="text-sm">{app.address}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-muted-foreground">
                            Property Value: {formatCurrency(app.propertyValue)}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="text-sm text-muted-foreground">
                            Mortgage Amount: {formatCurrency(app.mortgageAmount)}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/applications/${app.id}`}>View Details</Link>
                        </Button>
                        {app.status === "In Progress" && (
                          <Button size="sm" asChild>
                            <Link href={`/applications/${app.id}/edit`}>Continue</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No applications yet</h3>
                  <p className="mt-1 text-muted-foreground">Start your mortgage journey today</p>
                  <Button className="mt-4" asChild>
                    <Link href="/apply">Apply Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Saved Calculations</CardTitle>
                  <CardDescription>Your saved mortgage calculations</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/calculators">New Calculation</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {mockCalculations.length > 0 ? (
                <div className="space-y-6">
                  {mockCalculations.map((calc) => (
                    <div key={calc.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="font-medium">{calc.type} Calculation</h3>
                          <p className="text-sm text-muted-foreground">Created on {formatDate(calc.date)}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Recalculate
                          </Button>
                          {calc.type === "Mortgage" && (
                            <Button size="sm" asChild>
                              <Link href="/apply/purchase">Apply Now</Link>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Property Value</p>
                          <p className="font-medium">{formatCurrency(calc.propertyValue)}</p>
                        </div>

                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">
                            {calc.type === "Mortgage" ? "Down Payment" : "Current Mortgage"}
                          </p>
                          <p className="font-medium">
                            {formatCurrency(calc.type === "Mortgage" ? calc.downPayment : calc.currentMortgage)}
                          </p>
                        </div>

                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Mortgage Amount</p>
                          <p className="font-medium">
                            {formatCurrency(calc.type === "Mortgage" ? calc.mortgageAmount : calc.newMortgageAmount)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Interest Rate</p>
                          <p>{calc.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Term</p>
                          <p>{calc.term} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Amortization</p>
                          <p>{calc.amortization} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Payment</p>
                          <p className="font-medium">{formatCurrency(calc.payment)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No saved calculations</h3>
                  <p className="mt-1 text-muted-foreground">Use our calculators to explore your options</p>
                  <Button className="mt-4" asChild>
                    <Link href="/calculators">Calculate Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Stay updated on your mortgage journey</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Mark all as read
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {mockNotifications.length > 0 ? (
                <div className="space-y-4">
                  {mockNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border rounded-lg flex items-start ${!notif.read ? "bg-muted/50" : ""}`}
                    >
                      <div className="mr-4 mt-1">
                        {notif.type === "application" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {notif.type === "rate" && <RefreshCw className="h-5 w-5 text-blue-500" />}
                        {notif.type === "document" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="flex-1">
                        <p className={`${!notif.read ? "font-medium" : ""}`}>{notif.message}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{formatDate(notif.date)}</span>
                        </div>
                      </div>
                      {!notif.read && (
                        <Badge variant="outline" className="ml-2">
                          New
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="mt-1 text-muted-foreground">You're all caught up!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/account/settings">Edit Profile</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-medium">
                    {mockUserProfile.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{mockUserProfile.name}</h3>
                    <p className="text-muted-foreground">{mockUserProfile.email}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{mockUserProfile.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{mockUserProfile.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p>{mockUserProfile.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Preferred Contact Method</p>
                        <p>{mockUserProfile.preferredContact}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/account/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/account/password">
                          <User className="mr-2 h-4 w-4" />
                          Change Password
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/account/notifications">
                          <Bell className="mr-2 h-4 w-4" />
                          Notification Settings
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/account/preferences">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Financial Preferences
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/referrals">
                          <PiggyBank className="mr-2 h-4 w-4" />
                          Referral Program
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <DashboardPageContent />
    </ProtectedRoute>
  )
}
