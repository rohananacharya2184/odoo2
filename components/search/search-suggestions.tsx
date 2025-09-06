"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Clock } from "lucide-react"

interface SearchSuggestionsProps {
  query: string
  onSuggestionClick: (suggestion: string) => void
  isVisible: boolean
}

const popularSearches = [
  "macbook",
  "laptop",
  "vintage table",
  "coffee table",
  "winter coat",
  "jacket",
  "harry potter",
  "books",
  "tennis racket",
  "sports equipment",
  "plant pots",
  "ceramic pots",
  "furniture",
  "electronics",
  "clothing",
]

const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("recentSearches")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const addToRecentSearches = (query: string) => {
  if (typeof window === "undefined" || !query.trim()) return

  try {
    const recent = getRecentSearches()
    const updated = [query, ...recent.filter((s) => s !== query)].slice(0, 5)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  } catch {
    // Ignore localStorage errors
  }
}

export function SearchSuggestions({ query, onSuggestionClick, isVisible }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      const queryLower = query.toLowerCase()
      const filtered = popularSearches.filter((search) => {
        const searchLower = search.toLowerCase()
        // Exact match or partial word match
        return (
          searchLower.includes(queryLower) ||
          queryLower.split(" ").some((word) => word.length > 2 && searchLower.includes(word))
        )
      })

      const matchingRecent = recentSearches.filter((search) => search.toLowerCase().includes(queryLower))

      // Combine and deduplicate
      const combined = [...new Set([...filtered, ...matchingRecent])]
      setSuggestions(combined.slice(0, 6))
    } else {
      setSuggestions([])
    }
  }, [query, recentSearches])

  const handleSuggestionClick = (suggestion: string) => {
    addToRecentSearches(suggestion)
    setRecentSearches(getRecentSearches()) // Update state immediately
    onSuggestionClick(suggestion)
  }

  if (!isVisible || (query.length === 0 && suggestions.length === 0)) {
    return null
  }

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg">
      <CardContent className="p-4">
        {query.length > 0 && suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Search className="h-4 w-4" />
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        )}

        {query.length === 0 && (
          <div className="space-y-4">
            {/* Popular Searches */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 8).map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
