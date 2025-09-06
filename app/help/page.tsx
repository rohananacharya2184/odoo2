import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, Mail, Phone, Shield, CreditCard, Package, Users } from "lucide-react"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Users,
    questions: [
      {
        q: "How do I create an account?",
        a: 'Click "Sign Up" in the top right corner, enter your email and create a password. You\'ll receive a verification email to activate your account.',
      },
      {
        q: "Is EcoFinds free to use?",
        a: "Yes! Creating an account and browsing items is completely free. We only charge a small fee when you successfully sell an item.",
      },
      {
        q: "How do I verify my account?",
        a: "Upload a government-issued ID and proof of address. Verification typically takes 24-48 hours and gives you a verified seller badge.",
      },
    ],
  },
  {
    id: "buying",
    title: "Buying Items",
    icon: Package,
    questions: [
      {
        q: "How do I purchase an item?",
        a: 'Click "Add to Cart" on any item page, then proceed to checkout. You can pay with credit card, PayPal, or other supported payment methods.',
      },
      {
        q: "What if the item isn't as described?",
        a: "We offer buyer protection. Contact the seller first, and if unresolved, open a dispute within 7 days of delivery for a full refund.",
      },
      {
        q: "How long does shipping take?",
        a: "Shipping times vary by seller location and method. Most items ship within 1-3 business days and arrive within 3-7 days.",
      },
    ],
  },
  {
    id: "selling",
    title: "Selling Items",
    icon: CreditCard,
    questions: [
      {
        q: "How do I list an item for sale?",
        a: 'Go to your dashboard and click "Sell Item". Upload photos, write a description, set your price, and publish your listing.',
      },
      {
        q: "What fees do you charge sellers?",
        a: "We charge a 5% fee on successful sales plus payment processing fees (typically 2.9% + $0.30). No listing fees or monthly charges.",
      },
      {
        q: "How do I get paid?",
        a: "Payments are released to your account 24 hours after the buyer confirms receipt or 7 days after delivery confirmation, whichever comes first.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Trust",
    icon: Shield,
    questions: [
      {
        q: "How do you ensure seller authenticity?",
        a: "We verify seller identities, monitor reviews and ratings, and use AI to detect suspicious activity. Always check seller ratings before purchasing.",
      },
      {
        q: "What if I encounter a scam?",
        a: "Report suspicious activity immediately. We investigate all reports and take action against fraudulent accounts. Never send money outside our platform.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use bank-level encryption and never store your full payment details. All transactions are processed through secure, PCI-compliant payment processors.",
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search for help articles..." className="pl-10 h-12 text-lg" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <Button className="bg-green-600 hover:bg-green-700">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <Button variant="outline">Send Email</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us during business hours</p>
              <Button variant="outline">Call Now</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-gray-900">Frequently Asked Questions</h2>

          {faqCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-green-600" />
                    </div>
                    {category.title}
                    <Badge variant="secondary">{category.questions.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">Our support team is available Monday-Friday, 9 AM - 6 PM PST</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-gray-600">support@ecofinds.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Phone</h4>
                <p className="text-gray-600">1-800-ECO-FIND</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
