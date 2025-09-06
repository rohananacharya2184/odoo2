"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Calendar, Shield, MessageCircle, Flag, Package } from "lucide-react"
import { ProductCard } from "@/components/products/product-card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  const [seller, setSeller] = useState(null)
  const [sellerListings, setSellerListings] = useState([])
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isContactingSeller, setIsContactingSeller] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadSellerData = async () => {
      try {
        // TODO: Replace with actual API calls
        // const sellerResponse = await fetch(`/api/sellers/${params.id}`)
        // const listingsResponse = await fetch(`/api/sellers/${params.id}/listings`)
        // const reviewsResponse = await fetch(`/api/sellers/${params.id}/reviews`)

        // For now, show empty state or 404
        setSeller(null)
        setSellerListings([])
        setReviews([])
      } catch (error) {
        console.error("Failed to load seller data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSellerData()
  }, [params.id])

  const handleContactSeller = async () => {
    if (!seller) return

    try {
      setIsContactingSeller(true)

      // Create or get conversation with seller
      const response = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId: "current-user", // In real app, get from auth
          buyerName: "Current User",
          sellerId: seller.id,
          sellerName: seller.name,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create conversation")
      }

      // Redirect to chat page
      router.push("/chat")
      toast.success(`Started conversation with ${seller.name}`)
    } catch (error) {
      console.error("Error contacting seller:", error)
      toast.error("Failed to start conversation. Please try again.")
    } finally {
      setIsContactingSeller(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="animate-pulse flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-32 h-32 bg-muted rounded-full mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-muted rounded" />
                    <div className="h-6 w-24 bg-muted rounded" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-16 bg-muted rounded w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Seller not found</h2>
              <p className="text-muted-foreground mb-6">
                The seller you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <a href="/browse">Browse Marketplace</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Seller Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                  <AvatarFallback className="text-2xl">
                    {seller.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {seller.badges?.map((badge) => (
                    <Badge key={badge} variant="secondary" className="bg-green-100 text-green-700">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{seller.name}</h1>
                  {seller.verified && <Shield className="w-6 h-6 text-green-600" />}
                </div>
                <p className="text-gray-600 mb-4">@{seller.username}</p>

                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{seller.rating || 0}</span>
                    <span className="text-gray-600">({seller.reviewCount || 0} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">{seller.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Joined {new Date(seller.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{seller.bio}</p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleContactSeller}
                    disabled={isContactingSeller}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isContactingSeller ? "Starting Chat..." : "Contact Seller"}
                  </Button>
                  <Button variant="outline">Follow</Button>
                  <Button variant="outline" size="sm">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:min-w-[200px]">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{seller.stats?.totalSales || 0}</p>
                  <p className="text-sm text-gray-600">Total Sales</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{seller.stats?.activeListings || 0}</p>
                  <p className="text-sm text-gray-600">Active Listings</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{seller.stats?.followers || 0}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className="font-semibold text-orange-600">{seller.responseTime || "N/A"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seller Content Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">Active Listings ({seller.stats?.activeListings || 0})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({seller.reviewCount || 0})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            {sellerListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sellerListings.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No active listings</h3>
                  <p className="text-muted-foreground">This seller doesn't have any items listed currently.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{review.reviewer}</h4>
                          <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">Product: {review.product}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Star className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground">This seller hasn't received any reviews.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {seller.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Seller Story</h4>
                  <p className="text-gray-700">{seller.bio || "This seller hasn't shared their story yet."}</p>
                </div>
                {seller.specialties && seller.specialties.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Specializes In</h4>
                    <div className="flex flex-wrap gap-2">
                      {seller.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {seller.policies && (
                  <div>
                    <h4 className="font-semibold mb-2">Policies</h4>
                    <ul className="text-gray-700 space-y-1">
                      {seller.policies.map((policy, index) => (
                        <li key={index}>• {policy}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
