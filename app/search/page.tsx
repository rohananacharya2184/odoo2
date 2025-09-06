"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/products/product-card"
import { AdvancedFilters } from "@/components/search/advanced-filters"
import { SearchSuggestions } from "@/components/search/search-suggestions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Grid, List, Leaf } from "lucide-react"
import Link from "next/link"

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "distance", label: "Distance" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    conditions: [] as string[],
    locations: [] as string[],
    categories: [] as string[],
    sellerRating: [0, 5] as [number, number],
    verifiedSellers: false,
    responseTime: [] as string[],
    sellerLocation: [] as string[],
    datePosted: "all",
    distance: 50,
  })

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        params.append("q", searchQuery)
        if (sortBy !== "relevance") params.append("sort", sortBy)

        const response = await fetch(`/api/products?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Search failed")
        }

        const data = await response.json()
        setSearchResults(data.products || [])
      } catch (error) {
        console.error("Search failed:", error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(performSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, sortBy])

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  const filteredResults = searchResults.filter((product: any) => {
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    const matchesCondition = filters.conditions.length === 0 || filters.conditions.includes(product.condition)
    const matchesLocation = filters.locations.length === 0 || filters.locations.includes(product.location)
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)
    const matchesSellerRating =
      product.sellerRating >= filters.sellerRating[0] && product.sellerRating <= filters.sellerRating[1]
    const matchesVerifiedSellers = !filters.verifiedSellers || product.verifiedSeller
    const matchesResponseTime = filters.responseTime.length === 0 || filters.responseTime.includes(product.responseTime)
    const matchesSellerLocation =
      filters.sellerLocation.length === 0 || filters.sellerLocation.includes(product.sellerLocation)
    const matchesDatePosted = filters.datePosted === "all" || product.postedDate === filters.datePosted
    const matchesDistance = product.distance <= filters.distance

    return (
      matchesPrice &&
      matchesCondition &&
      matchesLocation &&
      matchesCategory &&
      matchesSellerRating &&
      matchesVerifiedSellers &&
      matchesResponseTime &&
      matchesSellerLocation &&
      matchesDatePosted &&
      matchesDistance
    )
  })

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "relevance":
        return (b.relevanceScore || 0) - (a.relevanceScore || 0)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "popular":
        return (b.views || 0) - (a.views || 0)
      case "distance":
        return Number.parseFloat(a.distance || "0") - Number.parseFloat(b.distance || "0")
      case "newest":
      default:
        return new Date(b.postedDate || 0).getTime() - new Date(a.postedDate || 0).getTime()
    }
  })

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      conditions: [],
      locations: [],
      categories: [],
      sellerRating: [0, 5],
      verifiedSellers: false,
      responseTime: [],
      sellerLocation: [],
      datePosted: "all",
      distance: 50,
    })
  }

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
              <Link href="/browse" className="text-muted-foreground hover:text-foreground">
                Browse
              </Link>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                Categories
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
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search Results
            {searchQuery && <span className="text-primary"> for "{searchQuery}"</span>}
          </h1>
          <p className="text-muted-foreground">{isLoading ? "Searching..." : `${sortedResults.length} items found`}</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-9"
                />
                <SearchSuggestions
                  query={searchQuery}
                  onSuggestionClick={handleSuggestionClick}
                  isVisible={showSuggestions}
                />
              </div>

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

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <AdvancedFilters filters={filters} onFiltersChange={setFilters} onClearFilters={clearAllFilters} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted rounded-lg h-48 mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedResults.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {sortedResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : searchQuery ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No items found</h3>
                  <div className="text-muted-foreground mb-4">
                    No items match your search for "{searchQuery}". Try different keywords or clear your filters.
                  </div>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Start your search</h3>
                  <div className="text-muted-foreground mb-4">
                    Enter keywords above to find sustainable second-hand items
                  </div>
                  <Button asChild>
                    <Link href="/browse">Browse All Items</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
