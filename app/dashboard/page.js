"use client"
import { Checkbox } from "@/components/ui/checkbox"

import { Separator } from "@/components/ui/separator"

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Package,
  MessageCircle,
  Heart,
  Settings,
  LogOut,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  RefreshCw,
  DollarSign,
  Leaf,
  BarChart,
  ShoppingBag,
  Clock,
  CheckCircle
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=100&width=100&text=SJ",
    memberSince: "March 2022",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 24,
    stats: {
      itemsSold: 18,
      itemsBought: 12,
      itemsBartered: 5,
      itemsRecycled: 3,
      totalEarnings: 2450,
      carbonSaved: 320
    }
  }

  // Mock listings data
  const listings = [
    {
      id: "1",
      name: "MacBook Pro 2021",
      price: 1299,
      status: "active",
      condition: "Excellent",
      views: 87,
      likes: 12,
      messages: 5,
      image: "/placeholder.svg?height=200&width=200&text=MacBook+Pro",
      listedDate: "2 weeks ago"
    },
    {
      id: "2",
      name: "iPhone 13 Pro",
      price: 699,
      status: "active",
      condition: "Like New",
      views: 142,
      likes: 24,
      messages: 8,
      image: "/placeholder.svg?height=200&width=200&text=iPhone+13+Pro",
      listedDate: "3 days ago"
    },
    {
      id: "3",
      name: "Sony WH-1000XM4",
      price: 220,
      status: "sold",
      condition: "Good",
      views: 56,
      likes: 7,
      messages: 3,
      image: "/placeholder.svg?height=200&width=200&text=Sony+Headphones",
      listedDate: "1 month ago",
      soldDate: "2 weeks ago"
    }
  ]

  // Mock orders data
  const orders = [
    {
      id: "ORD-1234",
      product: "Dell XPS 15",
      price: 1100,
      seller: "David Wilson",
      status: "delivered",
      date: "April 15, 2023",
      image: "/placeholder.svg?height=100&width=100&text=Dell+XPS"
    },
    {
      id: "ORD-5678",
      product: "iPad Air",
      price: 450,
      seller: "Emily Davis",
      status: "in transit",
      date: "May 2, 2023",
      image: "/placeholder.svg?height=100&width=100&text=iPad+Air"
    }
  ]

  // Mock barter data
  const barters = [
    {
      id: "BTR-1234",
      offered: "Nintendo Switch",
      received: "PlayStation 4",
      with: "Michael Brown",
      status: "completed",
      date: "March 10, 2023",
      offeredImage: "/placeholder.svg?height=100&width=100&text=Switch",
      receivedImage: "/placeholder.svg?height=100&width=100&text=PS4"
    },
    {
      id: "BTR-5678",
      offered: "Kindle Paperwhite",
      received: "Bluetooth Speaker",
      with: "Jessica Miller",
      status: "pending",
      date: "May 5, 2023",
      offeredImage: "/placeholder.svg?height=100&width=100&text=Kindle",
      receivedImage: "/placeholder.svg?height=100&width=100&text=Speaker"
    }
  ]

  // Mock messages data
  const messages = [
    {
      id: "1",
      from: "Alex Thompson",
      avatar: "/placeholder.svg?height=50&width=50&text=AT",
      product: "MacBook Pro 2021",
      preview: "Is this still available? I'm interested in buying it.",
      time: "2 hours ago",
      unread: true
    },
    {
      id: "2",
      from: "Maria Garcia",
      avatar: "/placeholder.svg?height=50&width=50&text=MG",
      product: "iPhone 13 Pro",
      preview: "Would you consider $650 for the iPhone?",
      time: "Yesterday",
      unread: false
    },
    {
      id: "3",
      from: "John Smith",
      avatar: "/placeholder.svg?height=50&width=50&text=JS",
      product: "Sony WH-1000XM4",
      preview: "Thanks for the quick delivery! The headphones work great.",
      time: "3 days ago",
      unread: false
    }
  ]

  // Mock saved items data
  const savedItems = [
    {
      id: "1",
      name: "Samsung Galaxy S21",
      price: 450,
      seller: "Michael Brown",
      condition: "Good",
      image: "/placeholder.svg?height=100&width=100&text=Galaxy+S21"
    },
    {
      id: "2",
      name: "Apple Watch Series 7",
      price: 320,
      seller: "Emily Davis",
      condition: "Like New",
      image: "/placeholder.svg?height=100&width=100&text=Apple+Watch"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{user.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({user.reviews} reviews)
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Member since {user.memberSince}
                    </div>
                    <div className="text-sm text-gray-500">{user.location}</div>
                    <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-white rounded-lg shadow">
                <nav className="flex flex-col">
                  <button
                    className={`flex items-center space-x-3 px-4 py-3 text-left ${
                      activeTab === "overview"
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Overview</span>
                  </button>

                  <button
                    className={`flex items-center space-x-3 px-4 py-3 text-left ${
                      activeTab === "listings"
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("listings")}
                  >
                    <Package className="h-5 w-5" />
                    <span>My Listings</span>
                  </button>

                  <button
                    className={`flex items-center space-x-3 px-4 py-3 text-left ${
                      activeTab === "orders"
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Orders</span>
                  </button>

                  <button
                    className={`flex items-center space-x-3 px-4 py-3 text-left ${
                      activeTab === "barters"
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("barters")}
                  >
                    <RefreshCw className="h-5 w-5" />
                    <span>Barters</span>
                  </button>

                  <button
                    className={`flex items-center space-x-3 px-4 py-3 text-left ${
                      activeTab === "messages"
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Messages</span>
                    <Badge className="ml-auto bg-green-600">3</Badge>
                  </button>

                  <button
                    className={`flex items-center space-x-3 px-4 py-3 text-left ${
                      activeTab === "saved"
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("saved")}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Saved Items</span>
                  </button>

                  <button
                    className={`flex items-center space-x-3 px-4 py-3 text-left ${
                      activeTab === "settings"
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>

                  <button className="flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-gray-50">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Total Earnings
                          </p>
                          <p className="text-2xl font-bold">
                            ${user.stats.totalEarnings}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Carbon Saved
                          </p>
                          <p className="text-2xl font-bold">
                            {user.stats.carbonSaved} kg
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Active Listings
                          </p>
                          <p className="text-2xl font-bold">
                            {listings.filter(l => l.status === "active").length}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Summary</CardTitle>
                    <CardDescription>
                      Your marketplace activity at a glance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-gray-900">
                          {user.stats.itemsSold}
                        </p>
                        <p className="text-sm text-gray-500">Items Sold</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-gray-900">
                          {user.stats.itemsBought}
                        </p>
                        <p className="text-sm text-gray-500">Items Bought</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-gray-900">
                          {user.stats.itemsBartered}
                        </p>
                        <p className="text-sm text-gray-500">Items Bartered</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-gray-900">
                          {user.stats.itemsRecycled}
                        </p>
                        <p className="text-sm text-gray-500">Items Recycled</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {messages.slice(0, 2).map(message => (
                          <div
                            key={message.id}
                            className="flex items-start space-x-3"
                          >
                            <Avatar>
                              <AvatarImage
                                src={message.avatar}
                                alt={message.from}
                              />
                              <AvatarFallback>
                                {message.from
                                  .split(" ")
                                  .map(n => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{message.from}</p>
                                <span className="text-xs text-gray-500">
                                  {message.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {message.preview}
                              </p>
                              <p className="text-xs text-gray-500">
                                Re: {message.product}
                              </p>
                            </div>
                            {message.unread && (
                              <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => setActiveTab("messages")}
                      >
                        View All Messages
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {listings.slice(0, 2).map(listing => (
                          <div
                            key={listing.id}
                            className="flex items-center space-x-3"
                          >
                            <div className="h-12 w-12 rounded-md overflow-hidden">
                              <img
                                src={listing.image || "/placeholder.svg"}
                                alt={listing.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium truncate">
                                {listing.name}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-green-600 font-medium">
                                  ${listing.price}
                                </p>
                                <Badge
                                  variant={
                                    listing.status === "active"
                                      ? "outline"
                                      : "secondary"
                                  }
                                  className={
                                    listing.status === "active"
                                      ? "text-green-600 border-green-600"
                                      : ""
                                  }
                                >
                                  {listing.status === "active"
                                    ? "Active"
                                    : "Sold"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => setActiveTab("listings")}
                      >
                        View All Listings
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                    <CardDescription>
                      Your contribution to sustainability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
                      <div className="text-center">
                        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Leaf className="h-12 w-12 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold">
                          {user.stats.carbonSaved} kg
                        </p>
                        <p className="text-gray-500">CO2 Emissions Saved</p>
                      </div>

                      <div className="text-center">
                        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <RefreshCw className="h-12 w-12 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold">
                          {user.stats.itemsSold +
                            user.stats.itemsBought +
                            user.stats.itemsBartered}
                        </p>
                        <p className="text-gray-500">Items Reused</p>
                      </div>

                      <div className="text-center">
                        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Package className="h-12 w-12 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold">
                          {user.stats.itemsRecycled}
                        </p>
                        <p className="text-gray-500">Items Recycled</p>
                      </div>
                    </div>

                    <p className="text-center text-gray-600 mt-4">
                      By reusing and recycling electronics, you've helped reduce
                      e-waste and conserve natural resources. Keep up the great
                      work!
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "listings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">My Listings</h1>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Listing
                  </Button>
                </div>

                <Tabs defaultValue="active">
                  <TabsList>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="sold">Sold</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="mt-4">
                    <div className="space-y-4">
                      {listings
                        .filter(l => l.status === "active")
                        .map(listing => (
                          <Card key={listing.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                                  <img
                                    src={listing.image || "/placeholder.svg"}
                                    alt={listing.name}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <h3 className="font-medium text-lg">
                                      {listing.name}
                                    </h3>
                                    <Badge
                                      variant="outline"
                                      className="text-green-600 border-green-600"
                                    >
                                      {listing.condition}
                                    </Badge>
                                  </div>
                                  <p className="text-green-600 font-bold">
                                    ${listing.price}
                                  </p>
                                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Listed {listing.listedDate}
                                    </div>
                                    <div className="flex items-center">
                                      <Eye className="h-4 w-4 mr-1" />
                                      {listing.views} views
                                    </div>
                                    <div className="flex items-center">
                                      <Heart className="h-4 w-4 mr-1" />
                                      {listing.likes} likes
                                    </div>
                                    <div className="flex items-center">
                                      <MessageCircle className="h-4 w-4 mr-1" />
                                      {listing.messages} messages
                                    </div>
                                  </div>
                                </div>
                                <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Listing
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Package className="h-4 w-4 mr-2" />
                                        Mark as Sold
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        <Trash className="h-4 w-4 mr-2" />
                                        Delete Listing
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="sold" className="mt-4">
                    <div className="space-y-4">
                      {listings
                        .filter(l => l.status === "sold")
                        .map(listing => (
                          <Card key={listing.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                                  <img
                                    src={listing.image || "/placeholder.svg"}
                                    alt={listing.name}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <h3 className="font-medium text-lg">
                                      {listing.name}
                                    </h3>
                                    <Badge variant="secondary">Sold</Badge>
                                  </div>
                                  <p className="text-green-600 font-bold">
                                    ${listing.price}
                                  </p>
                                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Sold {listing.soldDate}
                                    </div>
                                    <div className="flex items-center">
                                      <Eye className="h-4 w-4 mr-1" />
                                      {listing.views} views
                                    </div>
                                  </div>
                                </div>
                                <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                                  <Button variant="outline" size="sm">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Relist
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="draft" className="mt-4">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">No draft listings</h3>
                      <p className="text-gray-500 mt-1 mb-4">
                        You don't have any draft listings yet
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Listing
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">My Orders</h1>

                <Tabs defaultValue="purchases">
                  <TabsList>
                    <TabsTrigger value="purchases">Purchases</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                  </TabsList>

                  <TabsContent value="purchases" className="mt-4">
                    <div className="space-y-4">
                      {orders.map(order => (
                        <Card key={order.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                              <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={order.image || "/placeholder.svg"}
                                  alt={order.product}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <h3 className="font-medium text-lg">
                                    {order.product}
                                  </h3>
                                  <Badge
                                    variant={
                                      order.status === "delivered"
                                        ? "outline"
                                        : "secondary"
                                    }
                                    className={
                                      order.status === "delivered"
                                        ? "text-green-600 border-green-600"
                                        : ""
                                    }
                                  >
                                    {order.status === "delivered"
                                      ? "Delivered"
                                      : "In Transit"}
                                  </Badge>
                                </div>
                                <p className="text-green-600 font-bold">
                                  ${order.price}
                                </p>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    Seller: {order.seller}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Order date: {order.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Package className="h-4 w-4 mr-1" />
                                    Order ID: {order.id}
                                  </div>
                                </div>
                              </div>
                              <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                                <Button variant="outline" size="sm">
                                  Track Order
                                </Button>
                                {order.status === "delivered" && (
                                  <Button variant="outline" size="sm">
                                    Leave Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="sales" className="mt-4">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">No sales yet</h3>
                      <p className="text-gray-500 mt-1 mb-4">
                        When someone buys your items, they'll appear here
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Listing
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "barters" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">My Barters</h1>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Barter Offer
                  </Button>
                </div>

                <Tabs defaultValue="active">
                  <TabsList>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="mt-4">
                    <div className="space-y-4">
                      {barters
                        .filter(b => b.status === "pending")
                        .map(barter => (
                          <Card key={barter.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium">
                                    Barter with {barter.with}
                                  </h3>
                                  <Badge>Pending</Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                      <img
                                        src={
                                          barter.offeredImage ||
                                          "/placeholder.svg"
                                        }
                                        alt={barter.offered}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        You're offering:
                                      </p>
                                      <p className="font-medium">
                                        {barter.offered}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                      <img
                                        src={
                                          barter.receivedImage ||
                                          "/placeholder.svg"
                                        }
                                        alt={barter.received}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        You'll receive:
                                      </p>
                                      <p className="font-medium">
                                        {barter.received}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 inline mr-1" />
                                    Proposed on {barter.date}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Message
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="completed" className="mt-4">
                    <div className="space-y-4">
                      {barters
                        .filter(b => b.status === "completed")
                        .map(barter => (
                          <Card key={barter.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium">
                                    Barter with {barter.with}
                                  </h3>
                                  <Badge
                                    variant="outline"
                                    className="text-green-600 border-green-600"
                                  >
                                    Completed
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                      <img
                                        src={
                                          barter.offeredImage ||
                                          "/placeholder.svg"
                                        }
                                        alt={barter.offered}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        You offered:
                                      </p>
                                      <p className="font-medium">
                                        {barter.offered}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                      <img
                                        src={
                                          barter.receivedImage ||
                                          "/placeholder.svg"
                                        }
                                        alt={barter.received}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        You received:
                                      </p>
                                      <p className="font-medium">
                                        {barter.received}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-gray-500">
                                    <CheckCircle className="h-4 w-4 inline mr-1 text-green-600" />
                                    Completed on {barter.date}
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Leave Review
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Messages</h1>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Message List */}
                    <div className="border-r border-gray-200">
                      <div className="p-4 border-b border-gray-200">
                        <Input placeholder="Search messages..." />
                      </div>
                      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                        {messages.map((message, index) => (
                          <div
                            key={message.id}
                            className={`p-4 hover:bg-gray-50 cursor-pointer ${
                              index === 0 ? "bg-gray-50" : ""
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <Avatar>
                                <AvatarImage
                                  src={message.avatar}
                                  alt={message.from}
                                />
                                <AvatarFallback>
                                  {message.from
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium truncate">
                                    {message.from}
                                  </p>
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {message.time}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">
                                  {message.preview}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  Re: {message.product}
                                </p>
                              </div>
                              {message.unread && (
                                <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="md:col-span-2 flex flex-col h-[500px]">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={messages[0].avatar}
                              alt={messages[0].from}
                            />
                            <AvatarFallback>
                              {messages[0].from
                                .split(" ")
                                .map(n => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{messages[0].from}</p>
                            <p className="text-xs text-gray-500">
                              Re: {messages[0].product}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </div>

                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                          <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">
                                Hi there! I'm interested in your MacBook Pro. Is
                                it still available?
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                2 hours ago
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <div className="bg-green-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">
                                Yes, it's still available! Are you interested in
                                buying or bartering?
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                2 hours ago
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">
                                I'd like to buy it. Is the price negotiable? I'm
                                thinking around $1200.
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                2 hours ago
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <div className="bg-green-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">
                                I can do $1250, and I'll include a laptop
                                sleeve. How does that sound?
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                1 hour ago
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">
                                That sounds great! When and where can we meet
                                for the exchange?
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                1 hour ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <Input placeholder="Type your message..." />
                          <Button className="bg-green-600 hover:bg-green-700">
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Saved Items</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedItems.map(item => (
                    <Card
                      key={item.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-square relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                        >
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-green-600 font-bold">
                          ${item.price}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                          <span>{item.condition}</span>
                          <span>Seller: {item.seller}</span>
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Account Settings</h1>

                <Tabs defaultValue="profile">
                  <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Update your account profile information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map(n => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button variant="outline">Change Avatar</Button>
                            <Button variant="outline" className="text-red-600">
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue={user.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={user.email} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              placeholder="Enter your phone number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={user.location} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell others about yourself"
                            className="min-h-[100px]"
                          />
                        </div>

                        <Button className="bg-green-600 hover:bg-green-700">
                          Save Changes
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                          Manage your account security
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <Input id="confirmPassword" type="password" />
                        </div>

                        <Button className="bg-green-600 hover:bg-green-700">
                          Update Password
                        </Button>

                        <Separator className="my-6" />

                        <div>
                          <h3 className="font-medium mb-2">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Add an extra layer of security to your account
                          </p>
                          <Button variant="outline">Enable 2FA</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Manage how you receive notifications
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          {[
                            {
                              title: "New messages",
                              description: "When someone sends you a message"
                            },
                            {
                              title: "New offers",
                              description:
                                "When someone makes an offer on your listing"
                            },
                            {
                              title: "Order updates",
                              description: "Updates on your purchases and sales"
                            },
                            {
                              title: "Barter proposals",
                              description: "When someone proposes a barter"
                            },
                            {
                              title: "Listing activity",
                              description:
                                "Views, likes, and comments on your listings"
                            },
                            {
                              title: "Marketing emails",
                              description: "Deals, promotions, and newsletter"
                            }
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <Checkbox
                                id={`notification-${index}`}
                                defaultChecked={index < 4}
                              />
                              <div className="grid gap-1.5">
                                <Label
                                  htmlFor={`notification-${index}`}
                                  className="font-medium"
                                >
                                  {item.title}
                                </Label>
                                <p className="text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button className="bg-green-600 hover:bg-green-700">
                          Save Preferences
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payment" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>
                          Manage your payment methods and preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                                <CreditCard className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Visa ending in 4242
                                </p>
                                <p className="text-sm text-gray-500">
                                  Expires 04/2025
                                </p>
                              </div>
                            </div>
                            <Badge>Default</Badge>
                          </div>

                          <Button variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Payment Method
                          </Button>
                        </div>

                        <Separator className="my-6" />

                        <div>
                          <h3 className="font-medium mb-2">Payout Method</h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Choose how you want to receive payments from sales
                          </p>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroup defaultValue="bank">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="bank" id="bank" />
                                  <Label htmlFor="bank">Bank Account</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="paypal" id="paypal" />
                                  <Label htmlFor="paypal">PayPal</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <Button className="bg-green-600 hover:bg-green-700">
                              Update Payout Method
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Eye(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Calendar(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function CreditCard(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function Textarea({ id, className, ...props }) {
  return (
    <textarea
      id={id}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

function RadioGroup({ defaultValue, children }) {
  return <div className="space-y-2">{children}</div>
}

function RadioGroupItem({ value, id }) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      name="radio-group"
      className="h-4 w-4 text-green-600 focus:ring-green-500"
    />
  )
}

  