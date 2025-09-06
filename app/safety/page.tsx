import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, AlertTriangle, CheckCircle, MessageCircle, CreditCard, Package } from "lucide-react"
import Link from "next/link"

export default function SafetyTipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Safety Tips</h1>
          </div>
          <p className="text-lg text-muted-foreground">Stay safe while buying and selling on EcoFinds marketplace.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Your safety is our priority. Follow these guidelines for secure transactions.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                General Safety Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Trust Your Instincts</h4>
                    <p className="text-sm text-muted-foreground">
                      If something feels wrong, don't proceed with the transaction.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Verify User Profiles</h4>
                    <p className="text-sm text-muted-foreground">
                      Check ratings, reviews, and account verification status.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Keep Records</h4>
                    <p className="text-sm text-muted-foreground">Save all communications and transaction details.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Report Suspicious Activity</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact us immediately if you notice anything unusual.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* For Buyers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Safety Tips for Buyers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Before You Buy
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Read item descriptions carefully</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Ask questions about condition and authenticity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Request additional photos if needed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Check seller's ratings and reviews</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Safety
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Always use EcoFinds' secure payment system</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Never send money outside the platform</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Avoid wire transfers, gift cards, or cryptocurrency</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Red Flags to Watch For</h3>
                <div className="bg-destructive/10 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Prices significantly below market value</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Pressure to complete transaction quickly</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Requests for payment outside the platform</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Poor quality or stock photos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* For Sellers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Safety Tips for Sellers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Creating Safe Listings</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Use clear, authentic photos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Provide honest, detailed descriptions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Set fair, competitive prices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      ✓
                    </Badge>
                    <span className="text-sm">Respond promptly to inquiries</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Protecting Your Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Keep personal information private</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Use EcoFinds messaging system</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Don't share phone numbers or addresses publicly</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Shipping Safely</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use trackable shipping methods</li>
                  <li>• Package items securely to prevent damage</li>
                  <li>• Keep shipping receipts and tracking numbers</li>
                  <li>• Consider insurance for valuable items</li>
                  <li>• Ship promptly after payment confirmation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Scam Prevention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Common Scams to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-destructive/20 p-4 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">Overpayment Scam</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Buyer sends more money than agreed and asks for refund of the difference.
                  </p>
                  <p className="text-xs text-destructive font-medium">
                    Never refund overpayments outside the platform.
                  </p>
                </div>

                <div className="border border-destructive/20 p-4 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">Fake Payment Confirmation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Scammer sends fake payment screenshots or emails.
                  </p>
                  <p className="text-xs text-destructive font-medium">
                    Always verify payments in your EcoFinds account.
                  </p>
                </div>

                <div className="border border-destructive/20 p-4 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">Phishing Attempts</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Fake emails or messages asking for login credentials.
                  </p>
                  <p className="text-xs text-destructive font-medium">
                    EcoFinds will never ask for passwords via email.
                  </p>
                </div>

                <div className="border border-destructive/20 p-4 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">Counterfeit Items</h4>
                  <p className="text-sm text-muted-foreground mb-2">Fake branded items sold as authentic products.</p>
                  <p className="text-xs text-destructive font-medium">Report suspected counterfeits immediately.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">If you encounter problems with a transaction, follow these steps:</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Contact the Other Party</h4>
                    <p className="text-sm text-muted-foreground">
                      Try to resolve the issue directly through our messaging system.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Open a Case</h4>
                    <p className="text-sm text-muted-foreground">
                      If direct communication doesn't work, open a dispute case with EcoFinds.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Provide Evidence</h4>
                    <p className="text-sm text-muted-foreground">
                      Submit photos, messages, and other relevant documentation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">EcoFinds Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team will review the case and make a fair decision.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Report Urgent Safety Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you encounter immediate safety concerns, threats, or illegal activity:
              </p>
              <div className="bg-destructive/10 p-4 rounded-lg space-y-2">
                <p className="font-medium">Emergency Contact:</p>
                <p className="text-sm">Email: safety@ecofinds.com</p>
                <p className="text-sm">Phone: (555) 123-SAFE (7233)</p>
                <p className="text-xs text-muted-foreground">Available 24/7 for urgent safety issues</p>
              </div>
              <p className="text-sm text-muted-foreground">
                For life-threatening emergencies, contact local law enforcement immediately.
              </p>
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
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
            <Link href="/help" className="text-primary hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
