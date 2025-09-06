"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, MessageCircle, Star, Download, Filter } from "lucide-react"

export default function PurchasesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [purchases, setPurchases] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPurchases = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/purchases')

        // For now, show empty state
        setPurchases([])
      } catch (error) {
        console.error("Failed to load purchases:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPurchases()
  }, [])

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch = purchase.items?.some((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "shipped":
        return "Shipped"
      case "processing":
        return "Processing"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  return (
    <div>
      <DashboardHeader title="Purchase History" description="Track your orders and manage your purchases" />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-3 bg-muted rounded w-1/3" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="animate-pulse space-y-3">
                    <div className="h-16 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPurchases.length > 0 ? (
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{purchase.id}</CardTitle>
                      <CardDescription>
                        Placed on {new Date(purchase.date).toLocaleDateString()} • Total: ${purchase.total.toFixed(2)}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(purchase.status)}>{getStatusText(purchase.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {purchase.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">Sold by {item.seller}</p>
                          <p className="text-sm font-bold text-primary">${item.price}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Contact Seller
                          </Button>
                          {purchase.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-1" />
                              Leave Review
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      {purchase.status === "delivered" && purchase.deliveryDate && (
                        <span>Delivered on {new Date(purchase.deliveryDate).toLocaleDateString()}</span>
                      )}
                      {purchase.status === "shipped" && purchase.estimatedDelivery && (
                        <span>Estimated delivery: {new Date(purchase.estimatedDelivery).toLocaleDateString()}</span>
                      )}
                      {purchase.tracking && (
                        <span className="ml-4">
                          Tracking: <span className="font-mono">{purchase.tracking}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {purchase.tracking && (
                        <Button variant="outline" size="sm">
                          <Package className="h-4 w-4 mr-1" />
                          Track Package
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "No orders match your search criteria." : "You haven't made any purchases yet."}
            </p>
            <Button asChild>
              <a href="/browse">Start Shopping</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
