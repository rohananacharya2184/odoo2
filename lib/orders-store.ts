export interface Order {
  id: string
  buyerName: string
  buyerEmail: string
  items: Array<{
    productId: string
    productTitle: string
    quantity: number
    price: number
  }>
  total: number
  status: "processing" | "shipped" | "in_transit" | "delivered" | "cancelled"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentId: string
  createdAt: string
  updatedAt: string
}

// In-memory storage for orders
const orders: Order[] = [
  {
    id: "ORD-2024-001",
    buyerName: "John Smith",
    buyerEmail: "john.smith@example.com",
    items: [
      {
        productId: "2",
        productTitle: "MacBook Air M1 (2020)",
        quantity: 1,
        price: 850,
      },
    ],
    total: 850,
    status: "delivered",
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02101",
      country: "USA",
    },
    paymentId: "pi_1234567890",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "ORD-2024-002",
    buyerName: "Sarah Johnson",
    buyerEmail: "sarah.j@example.com",
    items: [
      {
        productId: "1",
        productTitle: "Vintage Wooden Coffee Table",
        quantity: 1,
        price: 150,
      },
      {
        productId: "6",
        productTitle: "Ceramic Plant Pots Set",
        quantity: 1,
        price: 35,
      },
    ],
    total: 185,
    status: "shipped",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Portland",
      state: "OR",
      zipCode: "97201",
      country: "USA",
    },
    paymentId: "pi_0987654321",
    createdAt: "2024-01-12T15:30:00Z",
    updatedAt: "2024-01-14T09:15:00Z",
  },
  {
    id: "ORD-2024-003",
    buyerName: "Mike Chen",
    buyerEmail: "mike.chen@example.com",
    items: [
      {
        productId: "3",
        productTitle: "Designer Winter Coat",
        quantity: 1,
        price: 75,
      },
    ],
    total: 75,
    status: "processing",
    shippingAddress: {
      street: "789 Pine St",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA",
    },
    paymentId: "pi_1122334455",
    createdAt: "2024-01-14T11:20:00Z",
    updatedAt: "2024-01-14T11:20:00Z",
  },
]

export const ordersStore = {
  // Get all orders
  getAll: (): Order[] => {
    return [...orders]
  },

  // Get order by ID
  getById: (id: string): Order | undefined => {
    return orders.find((o) => o.id === id)
  },

  // Create new order
  create: (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(newOrder)
    return newOrder
  },

  // Update order
  update: (id: string, updates: Partial<Order>): Order | null => {
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return null

    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return orders[index]
  },

  // Search orders
  search: (query: string): Order[] => {
    if (!query || query.trim() === "") return orders

    const lowercaseQuery = query.toLowerCase().trim()

    return orders.filter((order) => {
      const searchableText =
        `${order.id} ${order.buyerName} ${order.buyerEmail} ${order.items.map((item) => item.productTitle).join(" ")}`.toLowerCase()
      return searchableText.includes(lowercaseQuery)
    })
  },
}
