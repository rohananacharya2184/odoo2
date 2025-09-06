import { type NextRequest, NextResponse } from "next/server"
import { productsStore } from "@/lib/products-store"

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get("q") || searchParams.get("search")
    const category = searchParams.get("category")
    const condition = searchParams.get("condition")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const location = searchParams.get("location")
    const sort = searchParams.get("sort") || "newest"

    console.log("[v0] API - Search query:", search)
    console.log("[v0] API - All parameters:", { search, category, condition, minPrice, maxPrice, location, sort })

    let products = productsStore.getAll()
    console.log("[v0] API - Total products available:", products.length)

    if (search) {
      console.log("[v0] API - Performing search for:", search)
      products = productsStore.search(search)
      console.log("[v0] API - Search results count:", products.length)
      console.log(
        "[v0] API - Search results:",
        products.map((p) => ({ id: p.id, title: p.title })),
      )
    }

    // Apply filters to the current products (either all products or search results)
    if (category || condition || minPrice || maxPrice || location) {
      console.log("[v0] API - Applying filters:", { category, condition, minPrice, maxPrice, location })
      const beforeFilterCount = products.length
      products = productsStore.filter(
        {
          category: category || undefined,
          condition: condition || undefined,
          minPrice: minPrice ? Number.parseFloat(minPrice) : undefined,
          maxPrice: maxPrice ? Number.parseFloat(maxPrice) : undefined,
          location: location || undefined,
        },
        products,
      ) // Pass the current products array to filter
      console.log("[v0] API - After filters:", beforeFilterCount, "->", products.length)
    }

    // Apply sorting
    switch (sort) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "oldest":
        products.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "newest":
      default:
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    console.log("[v0] API - Final results count:", products.length)
    return NextResponse.json({ products, total: products.length })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "description", "price", "category", "condition", "location"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create product data
    const productData = {
      title: body.title,
      description: body.description,
      price: Number.parseFloat(body.price),
      category: body.category,
      condition: body.condition,
      images: body.images || ["/placeholder.svg?height=300&width=300&text=" + encodeURIComponent(body.title)],
      location: body.location,
      sellerId: body.sellerId || "current-user", // In real app, get from auth
      sellerName: body.sellerName || "Current User",
      sellerRating: body.sellerRating || 5.0,
    }

    const newProduct = productsStore.create(productData)

    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
