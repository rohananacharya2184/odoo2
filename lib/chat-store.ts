// Simple in-memory storage for chat conversations and messages
export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participants: {
    buyerId: string
    buyerName: string
    sellerId: string
    sellerName: string
  }
  productId?: string
  productTitle?: string
  lastMessage?: Message
  createdAt: string
  updatedAt: string
}

// In-memory storage
const conversations: Conversation[] = []
const messages: Message[] = []

export const chatStore = {
  // Get all conversations for a user
  getConversationsForUser: (userId: string): Conversation[] => {
    return conversations
      .filter((conv) => conv.participants.buyerId === userId || conv.participants.sellerId === userId)
      .map((conv) => ({
        ...conv,
        lastMessage: messages
          .filter((msg) => msg.conversationId === conv.id)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0],
      }))
      .sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || a.createdAt
        const bTime = b.lastMessage?.timestamp || b.createdAt
        return new Date(bTime).getTime() - new Date(aTime).getTime()
      })
  },

  // Get conversation by ID
  getConversationById: (id: string): Conversation | undefined => {
    const conv = conversations.find((c) => c.id === id)
    if (!conv) return undefined

    return {
      ...conv,
      lastMessage: messages
        .filter((msg) => msg.conversationId === conv.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0],
    }
  },

  // Get messages for a conversation
  getMessages: (conversationId: string): Message[] => {
    return messages
      .filter((msg) => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  },

  // Create or get existing conversation
  createOrGetConversation: (
    buyerId: string,
    buyerName: string,
    sellerId: string,
    sellerName: string,
    productId?: string,
    productTitle?: string,
  ): Conversation => {
    // Check if conversation already exists
    const existing = conversations.find(
      (conv) =>
        (conv.participants.buyerId === buyerId && conv.participants.sellerId === sellerId) ||
        (conv.participants.buyerId === sellerId && conv.participants.sellerId === buyerId),
    )

    if (existing) {
      return existing
    }

    // Create new conversation
    const newConversation: Conversation = {
      id: Date.now().toString(),
      participants: {
        buyerId,
        buyerName,
        sellerId,
        sellerName,
      },
      productId,
      productTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    conversations.push(newConversation)
    return newConversation
  },

  // Send a message
  sendMessage: (conversationId: string, senderId: string, senderName: string, content: string): Message => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    }

    messages.push(newMessage)

    // Update conversation timestamp
    const conversation = conversations.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.updatedAt = new Date().toISOString()
    }

    return newMessage
  },

  // Mark messages as read
  markMessagesAsRead: (conversationId: string, userId: string): void => {
    messages
      .filter((msg) => msg.conversationId === conversationId && msg.senderId !== userId && !msg.read)
      .forEach((msg) => {
        msg.read = true
      })
  },

  // Get unread message count for user
  getUnreadCount: (userId: string): number => {
    const userConversations = conversations.filter(
      (conv) => conv.participants.buyerId === userId || conv.participants.sellerId === userId,
    )

    return messages.filter(
      (msg) => userConversations.some((conv) => conv.id === msg.conversationId) && msg.senderId !== userId && !msg.read,
    ).length
  },

  // Delete conversation
  deleteConversation: (conversationId: string): boolean => {
    const convIndex = conversations.findIndex((c) => c.id === conversationId)
    if (convIndex === -1) return false

    // Remove conversation
    conversations.splice(convIndex, 1)

    // Remove all messages in conversation
    const messageIndices = messages
      .map((msg, index) => (msg.conversationId === conversationId ? index : -1))
      .filter((index) => index !== -1)
      .reverse() // Remove from end to avoid index shifting

    messageIndices.forEach((index) => messages.splice(index, 1))

    return true
  },
}
