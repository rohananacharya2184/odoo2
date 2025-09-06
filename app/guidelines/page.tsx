import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Users, Shield, Heart, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Community Guidelines</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Building a safe, respectful, and sustainable marketplace together
          </p>
        </div>

        <div className="space-y-8">
          {/* Core Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Our Core Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <h4 className="font-semibold">Safety First</h4>
                  <p className="text-sm text-muted-foreground">
                    Protecting our community through secure transactions and verified users
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Heart className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <h4 className="font-semibold">Respect & Kindness</h4>
                  <p className="text-sm text-muted-foreground">Treating every member with dignity and understanding</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <h4 className="font-semibold">Sustainability</h4>
                  <p className="text-sm text-muted-foreground">
                    Promoting circular commerce and environmental responsibility
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Behavior */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                What We Encourage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Positive Interactions</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Communicate respectfully and professionally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Provide honest and detailed item descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Respond promptly to messages and inquiries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Leave fair and constructive reviews</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Quality Standards</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Use clear, authentic photos of your items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Package items securely for shipping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Honor your commitments and agreements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Report suspicious or inappropriate behavior</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Behavior */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3 text-destructive">Harmful Behavior</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Harassment, bullying, or threatening language</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Discrimination based on any personal characteristics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Spam, unsolicited messages, or excessive promotion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Impersonation or false identity claims</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-destructive">Fraudulent Activities</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Selling counterfeit or stolen items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Misleading descriptions or fake photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Payment fraud or circumventing platform fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Manipulating reviews or ratings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Items */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Prohibited Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold mb-3">Illegal Items</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Weapons and ammunition</li>
                    <li>• Illegal drugs or substances</li>
                    <li>• Stolen goods</li>
                    <li>• Counterfeit products</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Dangerous Items</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Hazardous chemicals</li>
                    <li>• Recalled products</li>
                    <li>• Damaged electronics</li>
                    <li>• Expired consumables</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Restricted Items</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Live animals</li>
                    <li>• Adult content</li>
                    <li>• Medical devices</li>
                    <li>• Financial instruments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement */}
          <Card>
            <CardHeader>
              <CardTitle>Enforcement & Consequences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We take violations of our community guidelines seriously. Depending on the severity and frequency of
                violations, consequences may include:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-yellow-600">Warning System</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• First offense: Written warning</li>
                    <li>• Educational resources provided</li>
                    <li>• Opportunity to correct behavior</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-orange-600">Account Restrictions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Temporary selling suspension</li>
                    <li>• Limited messaging privileges</li>
                    <li>• Listing review requirements</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-600">Serious Violations</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Immediate account suspension</li>
                    <li>• Permanent platform ban</li>
                    <li>• Legal action if necessary</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-600">Appeal Process</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Right to appeal decisions</li>
                    <li>• Fair review process</li>
                    <li>• Opportunity to provide evidence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting Violations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Help us maintain a safe community by reporting violations when you see them:
              </p>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">How to Report</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use the "Report" button on listings or profiles</li>
                  <li>• Contact our support team directly</li>
                  <li>• Email: safety@ecofinds.com</li>
                  <li>• Include screenshots and detailed descriptions</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                All reports are reviewed promptly and confidentially. We appreciate your help in keeping EcoFinds a safe
                and welcoming place for everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Footer Navigation */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Questions about our community guidelines?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/safety" className="text-primary hover:underline">
              Safety Tips
            </Link>
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
