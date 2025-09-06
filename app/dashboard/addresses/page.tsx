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
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/addresses')
        // const data = await response.json()
        // setAddresses(data.addresses || [])

        // For now, show empty state
        setAddresses([])
      } catch (error) {
        console.error("Failed to load addresses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAddresses()
  }, [])

  const handleAddAddress = async (addressData) => {
    try {
      setIsAddingAddress(true)
      // TODO: Implement add address API call
      console.log("Adding address:", addressData)
    } catch (error) {
      console.error("Failed to add address:", error)
    } finally {
      setIsAddingAddress(false)
    }
  }

  const handleRemoveAddress = async (addressId) => {
    try {
      // TODO: Implement remove address API call
      setAddresses((addresses) => addresses.filter((a) => a.id !== addressId))
    } catch (error) {
      console.error("Failed to remove address:", error)
    }
  }

  const handleSetDefault = async (addressId, type) => {
    try {
      // TODO: Implement set default API call
      setAddresses((addresses) =>
        addresses.map((a) => ({
          ...a,
          isDefaultShipping: type === "shipping" ? a.id === addressId : a.isDefaultShipping,
          isDefaultBilling: type === "billing" ? a.id === addressId : a.isDefaultBilling,
        })),
      )
    } catch (error) {
      console.error("Failed to set default address:", error)
    }
  }

  const getAddressIcon = (type) => {
    return type === "business" ? <Building className="h-5 w-5" /> : <Home className="h-5 w-5" />
  }

  return (
    <div>
      <DashboardHeader title="Shipping Addresses" description="Manage your shipping and billing addresses" />

      <div className="p-6 space-y-6">
        {/* Add Address */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Your Addresses</h2>
            <p className="text-muted-foreground">Add and manage your shipping addresses</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <AddAddressForm onSubmit={handleAddAddress} isLoading={isAddingAddress} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Addresses List */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : addresses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <Card
                key={address.id}
                className={address.isDefaultShipping || address.isDefaultBilling ? "border-primary" : ""}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getAddressIcon(address.type)}
                        <h4 className="font-medium">{address.name}</h4>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAddress(address.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <p>{address.country}</p>
                      {address.phone && <p>Phone: {address.phone}</p>}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {address.isDefaultShipping && (
                        <Badge variant="default" className="text-xs">
                          Default Shipping
                        </Badge>
                      )}
                      {address.isDefaultBilling && (
                        <Badge variant="secondary" className="text-xs">
                          Default Billing
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {!address.isDefaultShipping && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id, "shipping")}>
                          Set as Shipping
                        </Button>
                      )}
                      {!address.isDefaultBilling && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id, "billing")}>
                          Set as Billing
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
              <p className="text-muted-foreground mb-6">Add shipping addresses to make checkout faster and easier</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                  </DialogHeader>
                  <AddAddressForm onSubmit={handleAddAddress} isLoading={isAddingAddress} />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function AddAddressForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    phone: "",
    type: "home",
    isDefaultShipping: false,
    isDefaultBilling: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          placeholder="123 Main Street"
          value={formData.street}
          onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="San Francisco"
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP Code</Label>
          <Input
            id="zip"
            placeholder="94102"
            value={formData.zip}
            onChange={(e) => setFormData((prev) => ({ ...prev, zip: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="MX">Mexico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Address Type</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isDefaultShipping"
            checked={formData.isDefaultShipping}
            onChange={(e) => setFormData((prev) => ({ ...prev, isDefaultShipping: e.target.checked }))}
          />
          <Label htmlFor="isDefaultShipping" className="text-sm">
            Set as default shipping address
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isDefaultBilling"
            checked={formData.isDefaultBilling}
            onChange={(e) => setFormData((prev) => ({ ...prev, isDefaultBilling: e.target.checked }))}
          />
          <Label htmlFor="isDefaultBilling" className="text-sm">
            Set as default billing address
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Address"}
      </Button>
    </form>
  )
}
