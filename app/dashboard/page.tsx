"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Eye, Edit, Trash2 } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeSales: 0,
    totalEarnings: 0,
    cartItems: 0,
  })

  const [recentListings, setRecentListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // TODO: Replace with actual API calls
        // const statsResponse = await fetch('/api/dashboard/stats')
        // const listingsResponse = await fetch('/api/dashboard/recent-listings')

        // For now, show empty state
        setStats({
          totalListings: 0,
          activeSales: 0,
          totalEarnings: 0,
          cartItems: 0,
        })
        setRecentListings([])
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div>
      <DashboardHeader title="Dashboard" description="Welcome back! Here's an overview of your EcoFinds activity." />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalListings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalListings === 0 ? "No listings yet" : "+2 from last month"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSales}</div>
              <p className="text-xs text-muted-foreground">Items currently listed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalEarnings === 0 ? "Start selling to earn" : "+$120 from last month"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cartItems}</div>
              <p className="text-xs text-muted-foreground">Ready to purchase</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Listings</CardTitle>
                <CardDescription>Your latest items on the marketplace</CardDescription>
              </div>
              <Button asChild>
                <a href="/dashboard/sell">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Listing
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg animate-pulse">
                    <div className="w-16 h-16 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentListings.length > 0 ? (
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{listing.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${listing.price} • {listing.views} views
                      </p>
                    </div>
                    <Badge variant={listing.status === "active" ? "default" : "secondary"}>{listing.status}</Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
                <p className="text-muted-foreground mb-6">Start selling your items to see them here</p>
                <Button asChild>
                  <a href="/dashboard/sell">Create Your First Listing</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your marketplace presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <a href="/dashboard/sell">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Listing
                </a>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <a href="/dashboard/cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Shopping Cart
                </a>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <a href="/dashboard/profile">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sustainability Impact</CardTitle>
              <CardDescription>Your contribution to sustainable consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Items Sold</span>
                  <span className="font-medium">0 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">CO2 Saved</span>
                  <span className="font-medium text-primary">~0 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Waste Diverted</span>
                  <span className="font-medium text-primary">~0 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
