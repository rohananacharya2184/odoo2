import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Leaf, Recycle, Globe, Heart, TreePine, Droplets, Wind, Sun } from "lucide-react"
import Link from "next/link"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Sustainability at EcoFinds</h1>
          </div>
          <p className="text-lg text-muted-foreground">Building a more sustainable future through circular commerce</p>
        </div>

        <div className="space-y-8">
          {/* Mission Statement */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-lg">
                EcoFinds is committed to creating a sustainable marketplace that reduces waste, extends product
                lifecycles, and empowers communities to make environmentally conscious choices. Every transaction on our
                platform contributes to a circular economy that benefits both people and the planet.
              </p>
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Our Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TreePine className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-green-600">2.5M kg</p>
                  <p className="text-sm text-muted-foreground">CO2 Emissions Saved</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Droplets className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-blue-600">850K L</p>
                  <p className="text-sm text-muted-foreground">Water Conserved</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Recycle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-2xl font-bold text-purple-600">1.2M</p>
                  <p className="text-sm text-muted-foreground">Items Diverted from Landfills</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Sun className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <p className="text-2xl font-bold text-orange-600">95%</p>
                  <p className="text-sm text-muted-foreground">Renewable Energy Usage</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sustainability Initiatives */}
          <Card>
            <CardHeader>
              <CardTitle>Our Sustainability Initiatives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Recycle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Circular Economy</h4>
                      <p className="text-sm text-muted-foreground">
                        Extending product lifecycles through resale and reuse, reducing the need for new manufacturing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Wind className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Carbon Neutral Shipping</h4>
                      <p className="text-sm text-muted-foreground">
                        Partnering with eco-friendly shipping providers and offsetting carbon emissions from deliveries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TreePine className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Reforestation Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Planting one tree for every 100 transactions to offset our environmental footprint.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Sun className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Renewable Energy</h4>
                      <p className="text-sm text-muted-foreground">
                        Our servers and offices run on 95% renewable energy sources.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sustainable Packaging</h4>
                      <p className="text-sm text-muted-foreground">
                        Encouraging sellers to use recycled and biodegradable packaging materials.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Local Commerce</h4>
                      <p className="text-sm text-muted-foreground">
                        Promoting local transactions to reduce transportation emissions and support communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sustainability Goals */}
          <Card>
            <CardHeader>
              <CardTitle>2025 Sustainability Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Carbon Neutral Operations</span>
                    <span className="text-sm text-muted-foreground">85% Complete</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Zero Waste to Landfill</span>
                    <span className="text-sm text-muted-foreground">72% Complete</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">100% Renewable Energy</span>
                    <span className="text-sm text-muted-foreground">95% Complete</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">1 Million Trees Planted</span>
                    <span className="text-sm text-muted-foreground">68% Complete</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How You Can Help */}
          <Card>
            <CardHeader>
              <CardTitle>How You Can Make a Difference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">As a Seller</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Use recycled or biodegradable packaging</li>
                    <li>• Accurately describe item conditions</li>
                    <li>• Offer local pickup options</li>
                    <li>• Bundle items to reduce shipments</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">As a Buyer</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Choose local sellers when possible</li>
                    <li>• Buy multiple items from the same seller</li>
                    <li>• Reuse or recycle packaging materials</li>
                    <li>• Leave honest reviews to help others</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Our Certifications & Partnerships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge variant="outline" className="p-3">
                  <Leaf className="h-4 w-4 mr-2" />B Corp Certified
                </Badge>
                <Badge variant="outline" className="p-3">
                  <Globe className="h-4 w-4 mr-2" />
                  Climate Neutral Certified
                </Badge>
                <Badge variant="outline" className="p-3">
                  <TreePine className="h-4 w-4 mr-2" />
                  1% for the Planet
                </Badge>
                <Badge variant="outline" className="p-3">
                  <Recycle className="h-4 w-4 mr-2" />
                  Circular Economy Partner
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Footer Navigation */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Learn more about our commitment to sustainability</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="text-primary hover:underline">
              About EcoFinds
            </Link>
            <Link href="/guidelines" className="text-primary hover:underline">
              Community Guidelines
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
