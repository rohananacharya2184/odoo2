import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Users, Recycle, Heart, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About EcoFinds</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building a sustainable future, one second-hand treasure at a time. EcoFinds connects conscious
            consumers with quality pre-loved items, reducing waste and promoting circular economy.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-green-100">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Reduce Waste</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Every item sold on EcoFinds prevents waste from ending up in landfills, giving products a second life
                and reducing environmental impact.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-100">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Build Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We connect like-minded individuals who value sustainability, creating a community of conscious consumers
                and sellers.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-100">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Promote Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We believe in quality over quantity, mindful consumption, and making sustainable choices accessible to
                everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  EcoFinds was born from a simple observation: too many quality items end up in landfills while people
                  continue buying new products. We saw an opportunity to create a platform that makes second-hand
                  shopping convenient, trustworthy, and rewarding.
                </p>
                <p className="text-gray-700 mb-4">
                  Founded in 2024 by a team of environmental advocates and tech enthusiasts, EcoFinds has grown into a
                  thriving marketplace that has prevented thousands of items from becoming waste.
                </p>
                <p className="text-gray-700">
                  Our platform emphasizes seller verification, detailed item descriptions, and community reviews to
                  ensure every transaction is safe and satisfactory.
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Impact So Far</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Items Saved from Waste</span>
                    <Badge variant="secondary">12,847</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Community Members</span>
                    <Badge variant="secondary">3,456</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>CO₂ Emissions Prevented</span>
                    <Badge variant="secondary">89 tons</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Money Saved by Buyers</span>
                    <Badge variant="secondary">$2.1M</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Meet Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold">Sarah Chen</h4>
                <p className="text-sm text-gray-600 mb-2">Co-Founder & CEO</p>
                <p className="text-sm text-gray-700">
                  Environmental scientist turned entrepreneur, passionate about sustainable technology solutions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold">Marcus Rodriguez</h4>
                <p className="text-sm text-gray-600 mb-2">Co-Founder & CTO</p>
                <p className="text-sm text-gray-700">
                  Full-stack developer with 10+ years building scalable platforms for social impact.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold">Emma Thompson</h4>
                <p className="text-sm text-gray-600 mb-2">Head of Community</p>
                <p className="text-sm text-gray-700">
                  Community builder focused on creating safe, inclusive spaces for sustainable commerce.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold">David Kim</h4>
                <p className="text-sm text-gray-600 mb-2">Head of Operations</p>
                <p className="text-sm text-gray-700">
                  Operations expert specializing in logistics and marketplace efficiency for sustainable commerce.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Award className="w-6 h-6" />
              Recognition & Awards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <Globe className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-semibold">Green Tech Innovation Award 2024</h4>
                  <p className="text-sm text-gray-600">Sustainable Technology Council</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold">Best Community Platform 2024</h4>
                  <p className="text-sm text-gray-600">Social Impact Awards</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-green-50 border-green-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Ready to make a positive impact? Start buying and selling sustainably today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/auth/register">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <Link href="/browse">Browse Items</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
