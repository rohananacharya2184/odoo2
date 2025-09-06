// Simple in-memory storage for products (in production, this would be a database)
export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  images: string[]
  location: string
  sellerId: string
  sellerName: string
  sellerRating: number
  createdAt: string
  updatedAt: string
}

// In-memory storage
const products: Product[] = [
  {
    id: "1",
    title: "Vintage Wooden Coffee Table",
    description:
      "Beautiful solid oak coffee table with natural wood grain. Perfect for living room or study. Shows minimal wear and has been well-maintained.",
    price: 150,
    category: "furniture",
    condition: "good",
    images: ["/placeholder.svg?height=300&width=300&text=Wooden+Coffee+Table"],
    location: "San Francisco, CA",
    sellerId: "seller1",
    sellerName: "Sarah Johnson",
    sellerRating: 4.8,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "MacBook Air M1 (2020)",
    description:
      "Excellent condition MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Includes original charger and box. Perfect for students or professionals.",
    price: 850,
    category: "electronics",
    condition: "excellent",
    images: ["/placeholder.svg?height=300&width=300&text=MacBook+Air"],
    location: "New York, NY",
    sellerId: "seller2",
    sellerName: "Mike Chen",
    sellerRating: 4.9,
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    title: "Designer Winter Coat",
    description:
      "Stylish wool blend winter coat in navy blue. Size Medium. Barely worn, excellent for cold weather. From a smoke-free home.",
    price: 75,
    category: "clothing",
    condition: "like new",
    images: ["/placeholder.svg?height=300&width=300&text=Winter+Coat"],
    location: "Chicago, IL",
    sellerId: "seller3",
    sellerName: "Emma Davis",
    sellerRating: 4.7,
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Complete Book Set - Harry Potter Series",
    description:
      "Complete set of Harry Potter books in hardcover. All 7 books included. Great condition with minimal shelf wear. Perfect for collectors or new readers.",
    price: 45,
    category: "books",
    condition: "good",
    images: ["/placeholder.svg?height=300&width=300&text=Harry+Potter+Books"],
    location: "Austin, TX",
    sellerId: "seller4",
    sellerName: "David Wilson",
    sellerRating: 4.6,
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Professional Tennis Racket",
    description:
      "Wilson Pro Staff tennis racket, lightly used. Great for intermediate to advanced players. Includes protective cover and grip tape.",
    price: 120,
    category: "sports",
    condition: "good",
    images: ["/placeholder.svg?height=300&width=300&text=Tennis+Racket"],
    location: "Miami, FL",
    sellerId: "seller5",
    sellerName: "Lisa Rodriguez",
    sellerRating: 4.8,
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z",
  },
  {
    id: "6",
    title: "Ceramic Plant Pots Set",
    description:
      "Set of 3 beautiful ceramic plant pots in different sizes. Perfect for indoor plants. Includes drainage holes and saucers.",
    price: 35,
    category: "home & garden",
    condition: "excellent",
    images: ["/placeholder.svg?height=300&width=300&text=Plant+Pots"],
    location: "Portland, OR",
    sellerId: "seller6",
    sellerName: "Alex Thompson",
    sellerRating: 4.9,
    createdAt: "2024-01-10T13:20:00Z",
    updatedAt: "2024-01-10T13:20:00Z",
  },
]

export const productsStore = {
  // Get all products
  getAll: (): Product[] => {
    return [...products]
  },

  // Get product by ID
  getById: (id: string): Product | undefined => {
    return products.find((p) => p.id === id)
  },

  // Add new product
  create: (productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)
    return newProduct
  },

  // Update product
  update: (id: string, updates: Partial<Product>): Product | null => {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return null

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return products[index]
  },

  // Delete product
  delete: (id: string): boolean => {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return false

    products.splice(index, 1)
    return true
  },

  // Search products
  search: (query: string): Product[] => {
    console.log("[v0] ProductsStore - Search called with query:", query)
    if (!query || query.trim() === "") return products

    const lowercaseQuery = query.toLowerCase().trim()
    console.log("[v0] ProductsStore - Lowercase query:", lowercaseQuery)
    console.log("[v0] ProductsStore - Total products to search:", products.length)

    // Define synonyms and related terms for better matching
    const synonyms: Record<string, string[]> = {
      phone: ["iphone", "android", "mobile", "smartphone", "cell"],
      laptop: ["macbook", "computer", "notebook", "pc"],
      book: ["novel", "reading", "literature", "textbook"],
      jacket: ["coat", "outerwear", "clothing", "apparel"],
      vintage: ["antique", "retro", "classic", "old"],
      table: ["furniture", "desk", "surface"],
      pot: ["planter", "container", "garden", "plant"],
      racket: ["tennis", "sports", "equipment"],
    }

    // Expand query with synonyms
    const expandedTerms = [lowercaseQuery]
    Object.entries(synonyms).forEach(([key, values]) => {
      if (lowercaseQuery.includes(key)) {
        expandedTerms.push(...values)
      }
      if (values.some((v) => lowercaseQuery.includes(v))) {
        expandedTerms.push(key, ...values)
      }
    })

    const results = products.filter((p) => {
      const searchableText = `${p.title} ${p.description} ${p.category}`.toLowerCase()

      // Check for exact matches first
      const exactMatch = expandedTerms.some((term) => searchableText.includes(term))

      // Check for partial word matches
      const words = lowercaseQuery.split(" ")
      const partialMatch = words.some((word) => word.length > 2 && searchableText.includes(word))

      const matches = exactMatch || partialMatch

      if (matches) {
        console.log("[v0] ProductsStore - Match found:", p.title, { exactMatch, partialMatch })
      }

      return matches
    })

    console.log("[v0] ProductsStore - Search results count:", results.length)
    console.log(
      "[v0] ProductsStore - Search results:",
      results.map((p) => p.title),
    )
    return results
  },

  // Filter products
  filter: (
    filters: {
      category?: string
      condition?: string
      minPrice?: number
      maxPrice?: number
      location?: string
    },
    productsToFilter?: Product[],
  ): Product[] => {
    // Use provided products array or default to all products
    const sourceProducts = productsToFilter || products

    return sourceProducts.filter((p) => {
      if (filters.category && p.category !== filters.category) return false
      if (filters.condition && p.condition !== filters.condition) return false
      if (filters.minPrice && p.price < filters.minPrice) return false
      if (filters.maxPrice && p.price > filters.maxPrice) return false
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      return true
    })
  },
}
