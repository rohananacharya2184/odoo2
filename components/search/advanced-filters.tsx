"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Filter, Star, Shield, Clock } from "lucide-react"

interface AdvancedFiltersProps {
  filters: {
    priceRange: [number, number]
    conditions: string[]
    locations: string[]
    categories: string[]
    sellerRating: [number, number]
    verifiedSellers: boolean
    responseTime: string[]
    sellerLocation: string[]
    datePosted: string
    distance: number
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

const conditionOptions = [
  { id: "excellent", label: "Excellent" },
  { id: "good", label: "Good" },
  { id: "fair", label: "Fair" },
  { id: "poor", label: "Poor" },
]

const locationOptions = [
  "San Francisco, CA",
  "Oakland, CA",
  "Berkeley, CA",
  "San Jose, CA",
  "Palo Alto, CA",
  "Mountain View, CA",
  "Fremont, CA",
  "Hayward, CA",
]

const responseTimeOptions = [
  { id: "1hour", label: "Within 1 hour" },
  { id: "2hours", label: "Within 2 hours" },
  { id: "1day", label: "Within 1 day" },
  { id: "3days", label: "Within 3 days" },
]

const categoryOptions = [
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing & Fashion" },
  { id: "furniture", label: "Furniture" },
  { id: "books", label: "Books & Media" },
  { id: "sports", label: "Sports & Fitness" },
  { id: "home", label: "Home & Garden" },
  { id: "toys", label: "Toys & Games" },
  { id: "collectibles", label: "Collectibles" },
]

const datePostedOptions = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "3months", label: "Last 3 Months" },
  { id: "all", label: "All Time" },
]

export function AdvancedFilters({ filters, onFiltersChange, onClearFilters }: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const toggleCondition = (condition: string) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter((c) => c !== condition)
      : [...filters.conditions, condition]
    updateFilters("conditions", newConditions)
  }

  const toggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location]
    updateFilters("locations", newLocations)
  }

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    updateFilters("categories", newCategories)
  }

  const toggleResponseTime = (time: string) => {
    const newResponseTimes = filters.responseTime.includes(time)
      ? filters.responseTime.filter((t) => t !== time)
      : [...filters.responseTime, time]
    updateFilters("responseTime", newResponseTimes)
  }

  const toggleSellerLocation = (location: string) => {
    const newSellerLocations = filters.sellerLocation.includes(location)
      ? filters.sellerLocation.filter((l) => l !== location)
      : [...filters.sellerLocation, location]
    updateFilters("sellerLocation", newSellerLocations)
  }

  const activeFiltersCount =
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0) +
    filters.conditions.length +
    filters.locations.length +
    filters.categories.length +
    (filters.sellerRating[0] > 0 || filters.sellerRating[1] < 5 ? 1 : 0) +
    (filters.verifiedSellers ? 1 : 0) +
    filters.responseTime.length +
    filters.sellerLocation.length +
    (filters.datePosted !== "all" ? 1 : 0) +
    (filters.distance < 50 ? 1 : 0)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters("priceRange", value)}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Categories</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {categoryOptions.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label htmlFor={category.id} className="text-sm">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Condition</Label>
            <div className="grid grid-cols-2 gap-3">
              {conditionOptions.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition.id}
                    checked={filters.conditions.includes(condition.id)}
                    onCheckedChange={() => toggleCondition(condition.id)}
                  />
                  <Label htmlFor={condition.id} className="text-sm">
                    {condition.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              Seller Rating
            </Label>
            <div className="px-2">
              <Slider
                value={filters.sellerRating}
                onValueChange={(value) => updateFilters("sellerRating", value)}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.sellerRating[0]}★</span>
                <span>{filters.sellerRating[1]}★</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Seller Verification
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified-sellers"
                checked={filters.verifiedSellers}
                onCheckedChange={(checked) => updateFilters("verifiedSellers", checked)}
              />
              <Label htmlFor="verified-sellers" className="text-sm">
                Verified sellers only
              </Label>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Seller Response Time
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {responseTimeOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={filters.responseTime.includes(option.id)}
                    onCheckedChange={() => toggleResponseTime(option.id)}
                  />
                  <Label htmlFor={option.id} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Distance from You</Label>
            <div className="px-2">
              <Slider
                value={[filters.distance]}
                onValueChange={(value) => updateFilters("distance", value[0])}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>1 mile</span>
                <span>{filters.distance} miles</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Posted</Label>
            <div className="grid grid-cols-2 gap-2">
              {datePostedOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={filters.datePosted === option.id}
                    onCheckedChange={() => updateFilters("datePosted", option.id)}
                  />
                  <Label htmlFor={option.id} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Item Location</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {locationOptions.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={() => toggleLocation(location)}
                  />
                  <Label htmlFor={location} className="text-sm">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Seller Location</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {locationOptions.map((location) => (
                <div key={`seller-${location}`} className="flex items-center space-x-2">
                  <Checkbox
                    id={`seller-${location}`}
                    checked={filters.sellerLocation.includes(location)}
                    onCheckedChange={() => toggleSellerLocation(location)}
                  />
                  <Label htmlFor={`seller-${location}`} className="text-sm">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("priceRange", [0, 1000])} />
                  </Badge>
                )}
                {filters.conditions.map((condition) => (
                  <Badge key={condition} variant="outline" className="flex items-center gap-1">
                    {condition}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCondition(condition)} />
                  </Badge>
                ))}
                {filters.categories.map((category) => (
                  <Badge key={category} variant="outline" className="flex items-center gap-1">
                    {categoryOptions.find((c) => c.id === category)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(category)} />
                  </Badge>
                ))}
                {filters.locations.map((location) => (
                  <Badge key={location} variant="outline" className="flex items-center gap-1">
                    {location}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleLocation(location)} />
                  </Badge>
                ))}
                {(filters.sellerRating[0] > 0 || filters.sellerRating[1] < 5) && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {filters.sellerRating[0]}★ - {filters.sellerRating[1]}★
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("sellerRating", [0, 5])} />
                  </Badge>
                )}
                {filters.verifiedSellers && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Verified Only
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("verifiedSellers", false)} />
                  </Badge>
                )}
                {filters.responseTime.map((time) => (
                  <Badge key={time} variant="outline" className="flex items-center gap-1">
                    {responseTimeOptions.find((t) => t.id === time)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleResponseTime(time)} />
                  </Badge>
                ))}
                {filters.distance < 50 && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Within {filters.distance} miles
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("distance", 50)} />
                  </Badge>
                )}
                {filters.datePosted !== "all" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {datePostedOptions.find((d) => d.id === filters.datePosted)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("datePosted", "all")} />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
