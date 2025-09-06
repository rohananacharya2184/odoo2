import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shirt,
  Smartphone,
  Home,
  Book,
  Gamepad2,
  Car,
  Dumbbell,
  Palette,
  Baby,
  Wrench,
  Music,
  Camera,
} from "lucide-react"

const categories = [
  {
    id: "clothing",
    name: "Clothing & Fashion",
    description: "Pre-loved fashion items, shoes, and accessories",
    icon: Shirt,
    itemCount: 2847,
    trending: true,
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Phones, laptops, gaming gear, and tech accessories",
    icon: Smartphone,
    itemCount: 1923,
    trending: true,
  },
  {
    id: "home",
    name: "Home & Garden",
    description: "Furniture, decor, appliances, and garden items",
    icon: Home,
    itemCount: 3156,
    trending: false,
  },
  {
    id: "books",
    name: "Books & Media",
    description: "Books, movies, music, and educational materials",
    icon: Book,
    itemCount: 1567,
    trending: false,
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Board games, video games, and children's toys",
    icon: Gamepad2,
    itemCount: 892,
    trending: true,
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Car parts, accessories, and automotive tools",
    icon: Car,
    itemCount: 634,
    trending: false,
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    description: "Exercise equipment, outdoor gear, and sports items",
    icon: Dumbbell,
    itemCount: 1245,
    trending: false,
  },
  {
    id: "art",
    name: "Art & Crafts",
    description: "Art supplies, handmade items, and craft materials",
    icon: Palette,
    itemCount: 567,
    trending: false,
  },
  {
    id: "baby",
    name: "Baby & Kids",
    description: "Baby gear, children's clothing, and parenting items",
    icon: Baby,
    itemCount: 789,
    trending: false,
  },
  {
    id: "tools",
    name: "Tools & Hardware",
    description: "Power tools, hand tools, and hardware supplies",
    icon: Wrench,
    itemCount: 445,
    trending: false,
  },
  {
    id: "music",
    name: "Musical Instruments",
    description: "Guitars, keyboards, drums, and audio equipment",
    icon: Music,
    itemCount: 334,
    trending: false,
  },
  {
    id: "photography",
    name: "Photography",
    description: "Cameras, lenses, lighting, and photo accessories",
    icon: Camera,
    itemCount: 223,
    trending: false,
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover sustainable treasures across all categories. Every purchase helps reduce waste and supports
            circular economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-200"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                    {category.trending && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                        Trending
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm text-gray-600">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href={`/browse?category=${category.id}`}>Browse {category.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-green-50 border-green-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
              <p className="text-gray-600 mb-6">
                Use our advanced search to find specific items, or set up alerts to be notified when new items in your
                categories are listed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <Link href="/search">Advanced Search</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/dashboard/alerts">Set Up Alerts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
