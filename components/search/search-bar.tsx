"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { SearchSuggestions } from "./search-suggestions"

interface SearchBarProps {
  placeholder?: string
  className?: string
  showSuggestions?: boolean
}

export function SearchBar({
  placeholder = "Search for sustainable treasures...",
  className = "",
  showSuggestions = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false)
  const router = useRouter()

  const handleSearch = (searchQuery?: string) => {
    const searchTerm = searchQuery || query
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setShowSuggestionsPanel(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => showSuggestions && setShowSuggestionsPanel(true)}
          onBlur={() => setTimeout(() => setShowSuggestionsPanel(false), 200)}
          className="w-full pl-12 pr-6 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:shadow-md"
        />
        <Button
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg"
          onClick={() => handleSearch()}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {showSuggestions && (
        <SearchSuggestions query={query} onSuggestionClick={handleSuggestionClick} isVisible={showSuggestionsPanel} />
      )}
    </div>
  )
}
