"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, MapPin, MessageCircle, Download, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/orders/${params.id}`)
        // const data = await response.json()
        // setOrder(data)

        // For now, show empty state
        setOrder(null)
      } catch (error) {
        console.error("Failed to load order details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrderDetails()
  }, [params.id])

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "processing":
        return 25
      case "shipped":
        return 50
      case "in_transit":
        return 75
      case "delivered":
        return 100
      default:
        return 0
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
      case "in_transit":
        return "secondary"
      case "processing":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-64 bg-muted rounded" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/purchases">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
              <p className="text-muted-foreground mb-6">
                The order you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button asChild>
                <Link href="/dashboard/purchases">View All Orders</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/purchases">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {/* Order Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                  <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge variant={getStatusColor(order.status)} className="text-sm">
                  {order.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Order Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Order Progress</span>
                  <span>{getStatusProgress(order.status)}% Complete</span>
                </div>
                <Progress value={getStatusProgress(order.status)} className="h-2" />

                <div className="grid grid-cols-4 gap-4 text-center text-xs">
                  <div
                    className={`flex flex-col items-center gap-1 ${getStatusProgress(order.status) >= 25 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <Package className="h-4 w-4" />
                    <span>Processing</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-1 ${getStatusProgress(order.status) >= 50 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <Truck className="h-4 w-4" />
                    <span>Shipped</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-1 ${getStatusProgress(order.status) >= 75 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <MapPin className="h-4 w-4" />
                    <span>In Transit</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-1 ${getStatusProgress(order.status) >= 100 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Information */}
          {order.trackingNumber && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Tracking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tracking Number</p>
                    <p className="text-sm text-muted-foreground font-mono">{order.trackingNumber}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Track Package
                  </Button>
                </div>

                {order.estimatedDelivery && (
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">Sold by {item.seller}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-lg font-bold text-primary">${item.price}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contact Seller
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping & Billing */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                {order.status !== "delivered" && order.status !== "cancelled" && (
                  <Button variant="outline">Cancel Order</Button>
                )}
                {order.status === "delivered" && <Button variant="outline">Return Items</Button>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
