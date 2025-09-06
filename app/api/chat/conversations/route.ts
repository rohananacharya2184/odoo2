import { type NextRequest, NextResponse } from "next/server"
import { chatStore } from "@/lib/chat-store"

// GET /api/chat/conversations - Get all conversations for current user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "current-user" // In real app, get from auth

    const conversations = chatStore.getConversationsForUser(userId)

    return NextResponse.json({ conversations })
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

// POST /api/chat/conversations - Create new conversation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { buyerId, buyerName, sellerId, sellerName, productId, productTitle } = body

    if (!buyerId || !buyerName || !sellerId || !sellerName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const conversation = chatStore.createOrGetConversation(
      buyerId,
      buyerName,
      sellerId,
      sellerName,
      productId,
      productTitle,
    )

    return NextResponse.json({ conversation }, { status: 201 })
  } catch (error) {
    console.error("Error creating conversation:", error)
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 })
  }
}
