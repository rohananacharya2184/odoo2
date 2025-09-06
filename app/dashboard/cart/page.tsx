"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { items: cartItems, updateQuantity, removeItem } = useCart()
  const [savedItems, setSavedItems] = useState([])

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  const handleSaveForLater = (id: string) => {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      handleRemoveItem(id)
      setSavedItems((items) => [...items, item])
    }
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div>
      <DashboardHeader title="Shopping Cart" description="Review your items and proceed to checkout" />

      <div className="p-6">
        {cartItems.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                <Button variant="outline" asChild>
                  <Link href="/browse">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  onSaveForLater={handleSaveForLater}
                />
              ))}

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Saved for Later ({savedItems.length})</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {savedItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.seller}</p>
                              <p className="text-sm font-bold text-primary">${item.price}</p>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                  Move to Cart
                                </Button>
                                <Button size="sm" variant="ghost" className="text-xs">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Summary */}
            <div>
              <CartSummary items={cartItems} onCheckout={handleCheckout} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Discover amazing second-hand items and start shopping sustainably!
            </p>
            <Button asChild>
              <Link href="/browse">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
