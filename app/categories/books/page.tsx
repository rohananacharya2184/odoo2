import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Filter, ArrowLeft } from "lucide-react"

const products = [
  {
    id: 13,
    name: "The Great Gatsby",
    price: 8,
    originalPrice: 15,
    condition: "Very Good",
    seller: "BookWorm",
    image: "/great-gatsby-book-cover.png",
    rating: 4.8,
    location: "Cambridge, MA",
  },
  {
    id: 14,
    name: "Programming Textbook",
    price: 45,
    originalPrice: 199,
    condition: "Good",
    seller: "TechStudent",
    image: "/programming-textbook.jpg",
    rating: 4.5,
    location: "Palo Alto, CA",
  },
  {
    id: 15,
    name: "Cookbook Collection",
    price: 25,
    originalPrice: 89,
    condition: "Excellent",
    seller: "ChefLife",
    image: "/cookbook-collection.jpg",
    rating: 4.9,
    location: "New Orleans, LA",
  },
  {
    id: 16,
    name: "Art History Book",
    price: 18,
    originalPrice: 49,
    condition: "Very Good",
    seller: "ArtLover",
    image: "/art-history-book.jpg",
    rating: 4.7,
    location: "Philadelphia, PA",
  },
]

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Books & Media</h1>
            <p className="text-muted-foreground">Discover knowledge and stories through pre-loved books</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search books..." className="pl-10" />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover-lift cursor-pointer border-0 shadow-lg">
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-white">{product.condition}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Sold by {product.seller}</p>
                <p className="text-sm text-muted-foreground mb-4">{product.location}</p>
                <Button asChild className="w-full">
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
