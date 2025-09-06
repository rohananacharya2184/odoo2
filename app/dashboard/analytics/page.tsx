"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Package, Eye, Users, Calendar, Download, RefreshCw } from "lucide-react"

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30days")

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/analytics?range=${timeRange}`)
        // const data = await response.json()
        // setAnalytics(data)

        // For now, show empty state
        setAnalytics(null)
      } catch (error) {
        console.error("Failed to load analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [timeRange])

  // Mock data for demonstration
  const mockSalesData = [
    { date: "2024-01-01", sales: 120, orders: 5 },
    { date: "2024-01-02", sales: 180, orders: 8 },
    { date: "2024-01-03", sales: 95, orders: 3 },
    { date: "2024-01-04", sales: 220, orders: 12 },
    { date: "2024-01-05", sales: 160, orders: 7 },
    { date: "2024-01-06", sales: 300, orders: 15 },
    { date: "2024-01-07", sales: 250, orders: 10 },
  ]

  const mockCategoryData = [
    { name: "Electronics", value: 35, color: "#8884d8" },
    { name: "Clothing", value: 28, color: "#82ca9d" },
    { name: "Furniture", value: 20, color: "#ffc658" },
    { name: "Books", value: 10, color: "#ff7300" },
    { name: "Other", value: 7, color: "#00ff88" },
  ]

  const mockTopProducts = [
    { name: "Vintage Leather Jacket", sales: 45, revenue: 2250 },
    { name: "iPhone 12 Pro", sales: 32, revenue: 19200 },
    { name: "Wooden Coffee Table", sales: 28, revenue: 3360 },
    { name: "Designer Handbag", sales: 22, revenue: 3300 },
    { name: "Vintage Camera", sales: 18, revenue: 3960 },
  ]

  if (isLoading) {
    return (
      <div>
        <DashboardHeader title="Analytics & Insights" description="Track your performance and grow your business" />
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded" />
              ))}
            </div>
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <DashboardHeader title="Analytics & Insights" description="Track your performance and grow your business" />

      <div className="p-6 space-y-6">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Performance Overview</h2>
            <p className="text-muted-foreground">Monitor your sales and engagement metrics</p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {analytics ? (
          <>
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {analytics.revenueChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={analytics.revenueChange >= 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(analytics.revenueChange)}%
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {analytics.ordersChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={analytics.ordersChange >= 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(analytics.ordersChange)}%
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.profileViews}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {analytics.viewsChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={analytics.viewsChange >= 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(analytics.viewsChange)}%
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {analytics.conversionChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={analytics.conversionChange >= 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(analytics.conversionChange)}%
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="sales" className="space-y-6">
              <TabsList>
                <TabsTrigger value="sales">Sales Trends</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="products">Top Products</TabsTrigger>
              </TabsList>

              <TabsContent value="sales" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={mockSalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={mockCategoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {mockCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Category Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockCategoryData.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{category.name}</span>
                            <span>{category.value}%</span>
                          </div>
                          <Progress value={category.value} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTopProducts.map((product, index) => (
                        <div key={product.name} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {product.sales} sales • ${product.revenue.toFixed(2)} revenue
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(product.revenue / product.sales).toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">avg. price</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No analytics data available</h3>
              <p className="text-muted-foreground mb-6">
                Start selling items to see your performance analytics and insights.
              </p>
              <Button asChild>
                <Link href="/dashboard/sell">Create Your First Listing</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
