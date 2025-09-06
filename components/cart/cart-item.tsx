"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, Heart } from "lucide-react"

interface CartItemProps {
  item: {
    id: string
    title: string
    price: number
    image: string
    condition: string
    seller: string
    quantity: number
  }
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onSaveForLater: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove, onSaveForLater }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-foreground line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">Sold by {item.seller}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {item.condition}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">${item.price}</p>
                <p className="text-sm text-muted-foreground">each</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                  className="w-16 h-8 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSaveForLater(item.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save for Later
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
