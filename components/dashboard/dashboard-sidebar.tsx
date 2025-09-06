"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, ShoppingCart, History, Settings, LogOut, Leaf, Plus, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: User,
  },
  {
    title: "My Listings",
    href: "/dashboard/listings",
    icon: Package,
  },
  {
    title: "Shopping Cart",
    href: "/dashboard/cart",
    icon: ShoppingCart,
  },
  {
    title: "Purchase History",
    href: "/dashboard/purchases",
    icon: History,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Profile Settings",
    href: "/dashboard/profile",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const displayUser = user || {
    name: "Guest User",
    email: "guest@example.com",
    avatar: "",
  }

  const initials = displayUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b">
        <Leaf className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">EcoFinds</span>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={displayUser.avatar || "/placeholder.svg"} alt={displayUser.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{displayUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{displayUser.email}</p>
          </div>
        </div>
        <Button className="w-full mt-4" size="sm" asChild>
          <Link href="/dashboard/sell">
            <Plus className="h-4 w-4 mr-2" />
            Sell Item
          </Link>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
