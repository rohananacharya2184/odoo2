import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Lock, UserCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                At EcoFinds, we are committed to protecting your privacy and ensuring the security of your personal
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our sustainable marketplace platform.
              </p>
              <p className="text-muted-foreground">
                By using EcoFinds, you consent to the data practices described in this policy. If you do not agree with
                the practices described in this policy, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Name, email address, and contact information</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Profile information and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Search queries and interaction patterns</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Transaction Information</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Purchase and sale history</li>
                  <li>Communication between buyers and sellers</li>
                  <li>Reviews and ratings</li>
                  <li>Dispute and resolution records</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Facilitate transactions between buyers and sellers</li>
                <li>• Process payments and prevent fraud</li>
                <li>• Provide customer support and resolve disputes</li>
                <li>• Improve our platform and user experience</li>
                <li>• Send important updates and promotional communications</li>
                <li>• Ensure platform safety and security</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                in the following circumstances:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • <strong>With other users:</strong> Basic profile information for transactions
                </li>
                <li>
                  • <strong>Service providers:</strong> Payment processors, shipping companies, and analytics services
                </li>
                <li>
                  • <strong>Legal compliance:</strong> When required by law or to protect our rights
                </li>
                <li>
                  • <strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets
                </li>
                <li>
                  • <strong>With consent:</strong> When you explicitly agree to share information
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• SSL encryption for data transmission</li>
                <li>• Secure data storage with access controls</li>
                <li>• Regular security audits and updates</li>
                <li>• Employee training on data protection</li>
                <li>• Incident response procedures</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • <strong>Access:</strong> Request a copy of your personal information
                </li>
                <li>
                  • <strong>Correction:</strong> Update or correct inaccurate information
                </li>
                <li>
                  • <strong>Deletion:</strong> Request deletion of your personal information
                </li>
                <li>
                  • <strong>Portability:</strong> Receive your data in a structured format
                </li>
                <li>
                  • <strong>Opt-out:</strong> Unsubscribe from marketing communications
                </li>
                <li>
                  • <strong>Restriction:</strong> Limit how we process your information
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide
                personalized content.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground">Required for basic platform functionality</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">Help us understand how you use our platform</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground">Remember your settings and preferences</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">Deliver relevant advertisements and content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: privacy@ecofinds.com</p>
                <p>Address: 123 Sustainable Street, Green City, CA 94102</p>
                <p>Phone: (555) 123-4567</p>
              </div>
              <p className="text-sm text-muted-foreground">We will respond to your inquiry within 30 days.</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Footer Navigation */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Related policies and information</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
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
