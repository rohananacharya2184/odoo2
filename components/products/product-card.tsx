"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
    images: string[]
    condition: string
    location?: string
    views?: number
    likes?: number
    category: string
  }
  showActions?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ProductCard({ product, showActions = false, onEdit, onDelete }: ProductCardProps) {
  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.svg?height=300&width=400&text=Product+Image"

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={displayImage || "/placeholder.svg?height=300&width=400&text=Product+Image"}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=300&width=400&text=Product+Image"
          }}
        />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/80 hover:bg-background">
          <Heart className="h-4 w-4" />
        </Button>
        <Badge variant="secondary" className="absolute top-2 left-2 bg-background/90">
          {product.condition}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>

          {product.location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {product.location}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {product.views && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {product.views}
                </span>
              )}
              {product.likes && (
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {product.likes}
                </span>
              )}
            </div>

            {showActions ? (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit?.(product.id)}>
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onDelete?.(product.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Button size="sm" asChild>
                <Link href={`/products/${product.id}`}>View Details</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
