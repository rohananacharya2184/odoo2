"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Grid, List, Leaf, Heart, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  "All Categories",
  "Electronics",
  "Clothing",
  "Furniture",
  "Books",
  "Sports",
  "Home & Garden",
  "Toys",
  "Collectibles",
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
]

function SimpleProductCard({ product }: { product: any }) {
  console.log("[v0] Rendering product:", product.title)

  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-square relative bg-muted">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
            onError={(e) => {
              console.log("[v0] Image failed to load:", product.images?.[0])
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=300&width=300&text=Product+Image"
            }}
          />
          <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-background/80 hover:bg-background">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            <Badge variant="secondary" className="text-xs capitalize">
              {product.condition}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{product.location}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="capitalize">{product.category}</span>
            <span>by {product.sellerName}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function BrowsePage() {
  console.log("[v0] Browse page rendering")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, selectedCategory, sortBy])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (searchQuery) params.append("search", searchQuery)
      if (selectedCategory !== "All Categories") params.append("category", selectedCategory.toLowerCase())
      params.append("sort", sortBy)

      const apiUrl = `/api/products?${params.toString()}`
      console.log("[v0] Fetching from API URL:", apiUrl)
      console.log("[v0] Search query being sent:", searchQuery)
      console.log(
        "[v0] Category being sent:",
        selectedCategory !== "All Categories" ? selectedCategory.toLowerCase() : "none",
      )

      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      console.log("[v0] Fetched products:", data.products.length)
      console.log("[v0] API response data:", data)
      console.log(
        "[v0] Received products titles:",
        data.products.map((p: any) => p.title),
      )
      setProducts(data.products)
    } catch (err) {
      console.error("[v0] Error fetching products:", err)
      setError("Failed to load products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const displayProducts = products

  console.log("[v0] Display products:", displayProducts.length)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">EcoFinds</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/browse" className="text-foreground font-medium">
                Browse
              </Link>
              <Link href="/chat" className="text-muted-foreground hover:text-foreground">
                Messages
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Marketplace</h1>
          <p className="text-muted-foreground">Discover unique second-hand items and support sustainable consumption</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for items or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${displayProducts.length} items found`}
            </span>
            {selectedCategory !== "All Categories" && <Badge variant="secondary">{selectedCategory}</Badge>}
            {searchQuery && <Badge variant="outline">"{searchQuery}"</Badge>}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <div className="text-muted-foreground">Loading products...</div>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <div className="text-destructive mb-4 text-lg">{error}</div>
              <Button onClick={fetchProducts}>Try Again</Button>
            </CardContent>
          </Card>
        ) : displayProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {displayProducts.map((product) => (
              <SimpleProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <div className="text-muted-foreground mb-4 text-lg">No items found matching your criteria.</div>
              <p className="text-sm text-muted-foreground mb-6">Try adjusting your search terms to find more items.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
