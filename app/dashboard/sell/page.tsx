"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProductForm } from "@/components/products/product-form"
import { toast } from "sonner"

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)

    try {
      console.log("[v0] Creating product:", data)

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create product")
      }

      const result = await response.json()
      console.log("[v0] Product created:", result.product)

      toast.success("Item listed successfully! Your item is now live on the marketplace.")
      router.push("/dashboard/listings")
    } catch (error) {
      console.error("[v0] Error creating product:", error)
      toast.error("Failed to create listing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <DashboardHeader title="Sell Your Item" description="Create a new listing and give your item a second life" />

      <div className="p-6">
        <ProductForm mode="create" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}
