import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageSquare, MoreVertical } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/header"

export default function InboxPage() {
  // Mock data for messages
  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      avatar: "/woman-profile.png",
      item: "Vintage Leather Jacket",
      lastMessage: "Hi! Is this jacket still available? I'm very interested.",
      timestamp: "2 min ago",
      unread: true,
      itemImage: "/vintage-leather-jacket.png",
    },
    {
      id: 2,
      sender: "Mike Rodriguez",
      avatar: "/man-profile.png",
      item: "iPhone 12 Pro",
      lastMessage: "Thanks for the quick response! When can we meet?",
      timestamp: "1 hour ago",
      unread: true,
      itemImage: "/modern-smartphone.png",
    },
    {
      id: 3,
      sender: "Emma Thompson",
      avatar: "/blonde-woman-profile.png",
      item: "Wooden Coffee Table",
      lastMessage: "Perfect! I'll take it. What's your PayPal?",
      timestamp: "3 hours ago",
      unread: false,
      itemImage: "/wooden-coffee-table.png",
    },
    {
      id: 4,
      sender: "David Park",
      avatar: "/asian-man-profile.png",
      item: "Mountain Bike",
      lastMessage: "Could you send more photos of the bike frame?",
      timestamp: "Yesterday",
      unread: false,
      itemImage: "/mountain-bike-trail.png",
    },
    {
      id: 5,
      sender: "Lisa Johnson",
      avatar: "/brunette-woman-profile.png",
      item: "Designer Handbag",
      lastMessage: "Is the authenticity certificate included?",
      timestamp: "2 days ago",
      unread: false,
      itemImage: "/luxury-quilted-handbag.png",
    },
  ]

  const unreadCount = messages.filter((msg) => msg.unread).length

  return (
    <div className="min-h-screen bg-background">
      <Header
        showBackButton={true}
        title="Messages"
        rightContent={
          <>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </>
        }
      />

      <div className="container mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              Messages
            </h2>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>
          <Button asChild>
            <Link href="/browse">Browse Items</Link>
          </Button>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`hover:shadow-md transition-all cursor-pointer ${message.unread ? "ring-2 ring-primary/20 bg-primary/5" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                    <AvatarFallback>
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground">{message.sender}</h3>
                          {message.unread && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">About: {message.item}</p>
                        <p className="text-sm text-foreground line-clamp-2">{message.lastMessage}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        <img
                          src={message.itemImage || "/placeholder.svg"}
                          alt={message.item}
                          className="w-12 h-12 rounded-md object-cover border"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no messages) */}
        {messages.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No messages yet</h3>
              <p className="text-muted-foreground mb-6">
                Start browsing items to connect with sellers and buyers in our sustainable marketplace.
              </p>
              <Button asChild>
                <Link href="/browse">Browse Items</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
