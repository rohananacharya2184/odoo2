import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Scale, AlertTriangle, Users } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using EcoFinds marketplace.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using EcoFinds ("the Platform"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-muted-foreground">
                These Terms of Service constitute a legally binding agreement between you and EcoFinds regarding your
                use of our sustainable marketplace platform.
              </p>
            </CardContent>
          </Card>

          {/* Platform Description */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                EcoFinds is an online marketplace that connects buyers and sellers of second-hand, sustainable, and
                eco-friendly products. We facilitate transactions but are not a party to the actual sale agreements
                between users.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Our Role</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Provide a platform for listing and discovering items</li>
                  <li>• Facilitate communication between buyers and sellers</li>
                  <li>• Process payments securely</li>
                  <li>• Offer dispute resolution services</li>
                  <li>• Maintain platform safety and security</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Accounts and Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Account Registration</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Seller Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Accurately describe items and their condition</li>
                  <li>Use authentic photos of the actual items</li>
                  <li>Honor sale agreements and ship items promptly</li>
                  <li>Respond to buyer inquiries in a timely manner</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Buyer Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Pay for items promptly after purchase</li>
                  <li>Communicate respectfully with sellers</li>
                  <li>Report any issues or disputes promptly</li>
                  <li>Leave honest and fair reviews</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The following activities are strictly prohibited on EcoFinds:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2 text-destructive">Listing Violations</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Counterfeit or stolen items</li>
                    <li>• Hazardous or illegal products</li>
                    <li>• Misleading descriptions or photos</li>
                    <li>• Items that violate intellectual property</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-destructive">Conduct Violations</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Harassment or abusive behavior</li>
                    <li>• Fraud or deceptive practices</li>
                    <li>• Spam or unsolicited communications</li>
                    <li>• Circumventing platform fees</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments and Fees */}
          <Card>
            <CardHeader>
              <CardTitle>Payments and Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Transaction Fees</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Sellers pay a 3% transaction fee on successful sales</li>
                  <li>• Payment processing fees apply as charged by payment providers</li>
                  <li>• No listing fees for standard accounts</li>
                  <li>• Premium features may have additional costs</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Payment Processing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Payments are processed securely through third-party providers</li>
                  <li>• Funds are held until successful delivery confirmation</li>
                  <li>• Refunds are processed according to our refund policy</li>
                  <li>• Disputes may result in payment holds</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                EcoFinds respects intellectual property rights and expects users to do the same.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You retain ownership of content you post</li>
                <li>• You grant EcoFinds a license to use your content for platform operations</li>
                <li>• Do not infringe on others' intellectual property rights</li>
                <li>• Report suspected intellectual property violations</li>
                <li>• We may remove infringing content without notice</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                EcoFinds provides the platform "as is" and makes no warranties about the quality, safety, or legality of
                items listed by users.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Important Disclaimers</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• We are not responsible for disputes between users</li>
                  <li>• Users transact at their own risk</li>
                  <li>• We do not guarantee item authenticity or condition</li>
                  <li>• Our liability is limited to the extent permitted by law</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You may close your account at any time</li>
                <li>• We may suspend or terminate accounts for violations</li>
                <li>• Termination does not affect existing transaction obligations</li>
                <li>• We may retain certain information as required by law</li>
                <li>• Repeated violations may result in permanent bans</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to These Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting to the platform.
              </p>
              <p className="text-muted-foreground">
                Continued use of EcoFinds after changes constitutes acceptance of the new terms. We recommend reviewing
                these terms periodically.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Questions about these Terms of Service? Contact us:</p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: legal@ecofinds.com</p>
                <p>Address: 123 Sustainable Street, Green City, CA 94102</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Footer Navigation */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Related policies and information</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="/safety" className="text-primary hover:underline">
              Safety Tips
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
