import { type NextRequest, NextResponse } from "next/server"
import { ordersStore } from "@/lib/orders-store"

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["items", "shippingAddress", "paymentMethod", "total"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const shipping = body.shippingMethod === "express" ? 12.99 : 5.99
    const tax = subtotal * 0.0875
    const total = subtotal + shipping + tax

    // Verify total matches
    if (Math.abs(total - body.total) > 0.01) {
      return NextResponse.json({ error: "Total amount mismatch" }, { status: 400 })
    }

    const order = ordersStore.create({
      buyerName: body.buyerName || "Anonymous Buyer",
      buyerEmail: body.buyerEmail || "buyer@example.com",
      items: body.items.map((item: any) => ({
        productId: item.id,
        productTitle: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      status: "processing",
      shippingAddress: body.shippingAddress,
      paymentId: body.paymentId || `pi_${Date.now()}`,
    })

    console.log("[v0] Created order:", order.id)

    return NextResponse.json(
      {
        success: true,
        order,
        message: "Order placed successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

// GET /api/orders - Get user orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const timeFilter = searchParams.get("timeFilter")

    let orders = ordersStore.getAll()

    // Apply search filter
    if (search) {
      orders = ordersStore.search(search)
    }

    // Apply status filter
    if (status && status !== "all") {
      orders = orders.filter((order) => order.status === status)
    }

    // Apply time filter
    if (timeFilter && timeFilter !== "all") {
      const now = new Date()
      orders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))

        switch (timeFilter) {
          case "7days":
            return daysDiff <= 7
          case "30days":
            return daysDiff <= 30
          case "90days":
            return daysDiff <= 90
          default:
            return true
        }
      })
    }

    // Sort by creation date (newest first)
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
