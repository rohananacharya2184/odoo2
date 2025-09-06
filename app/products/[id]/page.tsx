"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, Flag, MapPin, Calendar, MessageCircle, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { productsStore } from "@/lib/products-store"
import { useCart } from "@/contexts/cart-context"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/layout/header"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = productsStore.getById(params.id)
        if (!productData) {
          notFound()
        }
        setProduct(productData)
      } catch (error) {
        console.error("Error fetching product:", error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] || "/placeholder.svg",
        condition: product.condition,
        seller: product.sellerName,
        sellerId: product.sellerId,
      })

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })
    }
  }

  const handleMessageSeller = () => {
    router.push(`/inbox?seller=${product?.sellerId}&product=${product?.id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const seller = {
    id: product.sellerId,
    name: product.sellerName,
    avatar:
      "/placeholder.svg?height=100&width=100&text=" +
      product.sellerName
        .split(" ")
        .map((n: string) => n[0])
        .join(""),
    rating: product.sellerRating,
    totalSales: Math.floor(Math.random() * 50) + 5,
    joinDate: "2023",
    verified: product.sellerRating >= 4.5,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        showBackButton={true}
        title={product ? `${product.category} / ${product.title}` : "Product"}
        rightContent={
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        }
        className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted shadow-lg">
              <img
                src={product.images?.[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-border"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground text-balance">{product.title}</h1>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="hover-lift">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover-lift">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover-lift">
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <Badge variant="secondary" className="capitalize text-sm px-3 py-1">
                  {product.condition}
                </Badge>
                <Badge variant="outline" className="capitalize text-sm px-3 py-1">
                  {product.category}
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {product.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Listed {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 hover-lift" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 hover-lift bg-transparent"
                size="lg"
                onClick={handleMessageSeller}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Message Seller
              </Button>
            </div>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {seller.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{seller.name}</h3>
                      {seller.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-primary fill-current" />
                        {seller.rating}
                      </span>
                      <span>{seller.totalSales} sales</span>
                      <span>Member since {seller.joinDate}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="hover-lift bg-transparent">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Product Description</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
