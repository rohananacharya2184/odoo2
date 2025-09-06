"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Search, Filter, ThumbsUp, MessageCircle, Flag } from "lucide-react"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/reviews')
        // const data = await response.json()
        // setReviews(data.reviews || [])

        // For now, show empty state
        setReviews([])
      } catch (error) {
        console.error("Failed to load reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
    ))
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = ratingFilter === "all" || review.rating === Number.parseInt(ratingFilter)
    return matchesSearch && matchesRating
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
            <Star className="h-8 w-8 text-primary" />
            Reviews & Ratings
          </h1>
          <p className="text-lg text-muted-foreground">See what the EcoFinds community is saying</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recent">Most Recent</TabsTrigger>
            <TabsTrigger value="helpful">Most Helpful</TabsTrigger>
            <TabsTrigger value="highest">Highest Rated</TabsTrigger>
            <TabsTrigger value="lowest">Lowest Rated</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-full" />
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-32" />
                            <div className="h-3 bg-muted rounded w-24" />
                          </div>
                        </div>
                        <div className="h-16 bg-muted rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredReviews.length > 0 ? (
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Review Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage
                                src={review.reviewerAvatar || "/placeholder.svg"}
                                alt={review.reviewerName}
                              />
                              <AvatarFallback>
                                {review.reviewerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{review.reviewerName}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">{renderStars(review.rating)}</div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button variant="ghost" size="sm">
                            <Flag className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Product Info */}
                        {review.product && (
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <img
                              src={review.product.image || "/placeholder.svg"}
                              alt={review.product.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <h5 className="font-medium text-sm">{review.product.title}</h5>
                              <p className="text-xs text-muted-foreground">Sold by {review.product.seller}</p>
                            </div>
                          </div>
                        )}

                        {/* Review Content */}
                        <div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>

                        {/* Review Actions */}
                        <div className="flex items-center gap-4 pt-2 border-t">
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpfulCount || 0})
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Star className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || ratingFilter !== "all"
                      ? "No reviews match your current filters."
                      : "Be the first to leave a review!"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
