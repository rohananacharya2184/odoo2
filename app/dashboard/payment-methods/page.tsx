"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreditCard, Plus, Trash2, Shield } from "lucide-react"

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingCard, setIsAddingCard] = useState(false)

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/payment-methods')
        // const data = await response.json()
        // setPaymentMethods(data.methods || [])

        // For now, show empty state
        setPaymentMethods([])
      } catch (error) {
        console.error("Failed to load payment methods:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPaymentMethods()
  }, [])

  const handleAddCard = async (cardData) => {
    try {
      setIsAddingCard(true)
      // TODO: Implement add card API call
      // const response = await fetch('/api/payment-methods', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(cardData)
      // })

      console.log("Adding card:", cardData)
    } catch (error) {
      console.error("Failed to add payment method:", error)
    } finally {
      setIsAddingCard(false)
    }
  }

  const handleRemoveCard = async (cardId) => {
    try {
      // TODO: Implement remove card API call
      // await fetch(`/api/payment-methods/${cardId}`, { method: 'DELETE' })

      setPaymentMethods((methods) => methods.filter((m) => m.id !== cardId))
    } catch (error) {
      console.error("Failed to remove payment method:", error)
    }
  }

  const handleSetDefault = async (cardId) => {
    try {
      // TODO: Implement set default API call
      // await fetch(`/api/payment-methods/${cardId}/default`, { method: 'POST' })

      setPaymentMethods((methods) => methods.map((m) => ({ ...m, isDefault: m.id === cardId })))
    } catch (error) {
      console.error("Failed to set default payment method:", error)
    }
  }

  const getCardIcon = (brand) => {
    // Return appropriate card brand icon
    return <CreditCard className="h-6 w-6" />
  }

  return (
    <div>
      <DashboardHeader title="Payment Methods" description="Manage your payment methods for secure transactions" />

      <div className="p-6 space-y-6">
        {/* Add Payment Method */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Your Payment Methods</h2>
            <p className="text-muted-foreground">Add and manage your payment options</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Payment Method</DialogTitle>
              </DialogHeader>
              <AddCardForm onSubmit={handleAddCard} isLoading={isAddingCard} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Payment Methods List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse flex items-center gap-4">
                    <div className="w-12 h-8 bg-muted rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getCardIcon(method.brand)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">•••• •••• •••• {method.last4}</span>
                          {method.isDefault && (
                            <Badge variant="default" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {method.brand.toUpperCase()} • Expires {method.expMonth}/{method.expYear}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCard(method.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No payment methods</h3>
              <p className="text-muted-foreground mb-6">Add a payment method to make purchases on EcoFinds</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Payment Method</DialogTitle>
                  </DialogHeader>
                  <AddCardForm onSubmit={handleAddCard} isLoading={isAddingCard} />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="border-muted">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Your payment information is secure</h4>
                <p className="text-sm text-muted-foreground">
                  We use industry-standard encryption to protect your payment details. Your card information is never
                  stored on our servers and is processed securely by our payment partners.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AddCardForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    name: "",
    isDefault: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) => setFormData((prev) => ({ ...prev, cardNumber: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryMonth">Month</Label>
          <Select
            value={formData.expiryMonth}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, expiryMonth: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryYear">Year</Label>
          <Select
            value={formData.expiryYear}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, expiryYear: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="YY" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() + i
                return (
                  <SelectItem key={year} value={String(year).slice(-2)}>
                    {String(year).slice(-2)}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={formData.cvv}
            onChange={(e) => setFormData((prev) => ({ ...prev, cvv: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name on Card</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
        />
        <Label htmlFor="isDefault" className="text-sm">
          Set as default payment method
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Payment Method"}
      </Button>
    </form>
  )
}
