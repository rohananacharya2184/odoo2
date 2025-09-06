"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Tag } from "lucide-react"

interface CartSummaryProps {
  items: Array<{
    id: string
    price: number
    quantity: number
  }>
  onCheckout: () => void
}

export function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.0875 // 8.75% tax rate
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code */}
        <div className="space-y-2">
          <Label htmlFor="promo">Promo Code</Label>
          <div className="flex gap-2">
            <Input id="promo" placeholder="Enter code" />
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              Shipping
              {shipping === 0 && (
                <Badge variant="secondary" className="text-xs">
                  FREE
                </Badge>
              )}
            </span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>

        {shipping > 0 && (
          <div className="text-xs text-muted-foreground text-center">
            <Tag className="h-3 w-3 inline mr-1" />
            Add ${(50 - subtotal).toFixed(2)} more for free shipping
          </div>
        )}

        <Button className="w-full" size="lg" onClick={onCheckout}>
          Proceed to Checkout
        </Button>

        <div className="text-xs text-muted-foreground text-center">Secure checkout powered by Stripe</div>
      </CardContent>
    </Card>
  )
}
