import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Plus,
  Leaf,
  Recycle,
  Users,
  Menu,
  Star,
  TrendingUp,
  ArrowRight,
  Heart,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search/search-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b glass-effect">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover-lift">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">EcoFinds</h1>
            </Link>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <SearchBar showSuggestions={true} />
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/browse" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Browse
              </Link>
              <Link
                href="/categories"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Categories
              </Link>
              <Link href="/inbox" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Messages
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="md:hidden hover-lift">
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                asChild
                className="hidden md:flex hover-lift border-primary/20 text-foreground hover:bg-primary/5 bg-transparent"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild className="hover-lift bg-primary hover:bg-primary/90 text-white border-0">
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-card"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in border border-primary/20">
              <Leaf className="h-4 w-4" />
              <span>Sustainable Marketplace</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 text-balance leading-tight">
              Discover Unique Finds, <span className="text-gradient">Sustainably</span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
              Join our community of conscious consumers. Buy and sell pre-owned items, reduce waste, and give products a
              second life while saving money.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="hover-lift gradient-primary text-lg px-8 py-4 h-auto" asChild>
                <Link href="/browse">
                  <Search className="mr-3 h-6 w-6" />
                  Start Shopping
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover-lift text-lg px-8 py-4 h-auto border-2 bg-transparent"
                asChild
              >
                <Link href="/dashboard/sell">
                  <Plus className="mr-3 h-6 w-6" />
                  Sell Your Items
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-3 animate-slide-up">
                <div className="flex items-center gap-2 text-primary">
                  <Star className="h-6 w-6 fill-current" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <span className="text-muted-foreground font-medium">Average Rating</span>
              </div>
              <div className="flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-6 w-6" />
                  <span className="text-2xl font-bold">50K+</span>
                </div>
                <span className="text-muted-foreground font-medium">Happy Users</span>
              </div>
              <div className="flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-2xl font-bold">1M+</span>
                </div>
                <span className="text-muted-foreground font-medium">Items Sold</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Why Choose EcoFinds?</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're more than just a marketplace - we're a movement towards sustainable living and conscious consumption
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift border-0 shadow-xl gradient-card group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Recycle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Sustainable Shopping</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Extend product lifecycles and reduce environmental impact through conscious consumption and circular
                  economy principles.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-xl gradient-card group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Trusted Community</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Connect with verified sellers and buyers in a safe, secure marketplace environment with buyer
                  protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-xl gradient-card group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Lightning Fast</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Simple listing creation, instant messaging, secure payments, and seamless buying experience in
                  minutes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Popular Categories</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular sustainable product categories and find your next treasure
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", color: "bg-blue-500", slug: "electronics" },
              { name: "Clothing", color: "bg-purple-500", slug: "clothing" },
              { name: "Furniture", color: "bg-orange-500", slug: "furniture" },
              { name: "Books", color: "bg-green-500", slug: "books" },
              { name: "Sports", color: "bg-red-500", slug: "sports" },
              { name: "Home & Garden", color: "bg-teal-500", slug: "home-garden" },
              { name: "Toys", color: "bg-pink-500", slug: "toys" },
              { name: "Collectibles", color: "bg-indigo-500", slug: "collectibles" },
            ].map((category, index) => (
              <Link key={category.name} href={`/categories/${category.slug}`}>
                <Card className="hover-lift cursor-pointer border-0 shadow-lg gradient-card group relative overflow-hidden">
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 ${category.color} opacity-10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform`}
                  ></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>

        <div className="container mx-auto text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Sustainable Journey?</h3>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users making a positive impact through conscious consumption and sustainable shopping.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="hover-lift text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/auth/register">
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl text-gradient">EcoFinds</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Empowering sustainable consumption through our trusted second-hand marketplace and conscious community.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Marketplace</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/browse" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/sell" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Sell Items
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Safety Tips
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p className="text-lg">&copy; 2024 EcoFinds. All rights reserved. Built for a sustainable future. 🌱</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
