"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Leaf, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  showBackButton?: boolean
  title?: string
  rightContent?: React.ReactNode
  className?: string
}

export function Header({ showBackButton = false, title, rightContent, className = "" }: HeaderProps) {
  const router = useRouter()

  return (
    <header className={`border-b bg-card sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}

            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">EcoFinds</h1>
            </Link>

            {title && (
              <div className="hidden md:block">
                <span className="text-muted-foreground mx-2">/</span>
                <span className="text-foreground font-medium">{title}</span>
              </div>
            )}
          </div>

          {rightContent && <div className="flex items-center space-x-2">{rightContent}</div>}
        </div>
      </div>
    </header>
  )
}
