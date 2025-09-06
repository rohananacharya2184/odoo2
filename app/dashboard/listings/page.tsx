"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      if (!response.ok) {
        throw new Error("Failed to fetch listings")
      }
      const data = await response.json()
      // In a real app, this would filter by current user's products
      // For now, we'll show all products as if they belong to the current user
      const userListings = data.products.map((product: any) => ({
        ...product,
        status: Math.random() > 0.7 ? "sold" : Math.random() > 0.5 ? "active" : "draft",
        views: Math.floor(Math.random() * 200) + 1,
        likes: Math.floor(Math.random() * 50) + 1,
      }))
      setListings(userListings)
    } catch (error) {
      console.error("Error fetching listings:", error)
      toast.error("Failed to load listings")
    } finally {
      setLoading(false)
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeListings = filteredListings.filter((l) => l.status === "active")
  const soldListings = filteredListings.filter((l) => l.status === "sold")
  const draftListings = filteredListings.filter((l) => l.status === "draft")

  const handleEdit = (id: string) => {
    console.log("Edit listing:", id)
    // TODO: Navigate to edit page
    toast.info("Edit functionality coming soon!")
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete listing")
      }

      // Remove from local state
      setListings(listings.filter((l) => l.id !== id))
      toast.success("Listing deleted successfully")
    } catch (error) {
      console.error("Error deleting listing:", error)
      toast.error("Failed to delete listing")
    }
  }

  if (loading) {
    return (
      <div>
        <DashboardHeader title="My Listings" description="Manage your product listings and track their performance" />
        <div className="p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading your listings...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <DashboardHeader title="My Listings" description="Manage your product listings and track their performance" />

      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search your listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button asChild>
            <Link href="/dashboard/sell">
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Link>
          </Button>
        </div>

        {/* Listings Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({filteredListings.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
            <TabsTrigger value="sold">Sold ({soldListings.length})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({draftListings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  product={listing}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeListings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  product={listing}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sold">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {soldListings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  product={listing}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {draftListings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  product={listing}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {searchQuery ? "No listings match your search." : "You haven't created any listings yet."}
            </div>
            <Button asChild>
              <Link href="/dashboard/sell">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Listing
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
