import { type NextRequest, NextResponse } from "next/server"
import { chatStore } from "@/lib/chat-store"

// GET /api/chat/messages - Get messages for a conversation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")

    if (!conversationId) {
      return NextResponse.json({ error: "Missing conversationId" }, { status: 400 })
    }

    const messages = chatStore.getMessages(conversationId)

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// POST /api/chat/messages - Send a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversationId, senderId, senderName, content } = body

    if (!conversationId || !senderId || !senderName || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const message = chatStore.sendMessage(conversationId, senderId, senderName, content)

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
