import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-xl text-center mb-12">
          We're here to help with all your mortgage needs. Reach out to us anytime.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="grid gap-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <Phone className="w-6 h-6 mr-4 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>Office: +1 (507) 554 5238</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-6">
                  <Mail className="w-6 h-6 mr-4 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>info@rogi.ca</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-6">
                  <MapPin className="w-6 h-6 mr-4 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>71 Wilson Street East, Unit 1A</p>
                    <p>Ancaster, ON, L9G 2B3</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-6">
                  <Clock className="w-6 h-6 mr-4 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
