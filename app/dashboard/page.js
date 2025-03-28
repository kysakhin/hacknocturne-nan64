"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
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
import { app, db } from "@/lib/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userId, setUserId] = useState(null);
  const [listings, setListings] = useState([]);

  // States for user?
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {setUserId(user.uid); console.log(user.uid);}
      else setUserId(null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const setUserProductDetails = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setListings(docSnap.data().listed_products);
          setFullName(docSnap.data().fullName);
          setEmail(docSnap.data().email);
        }
      } catch (error) {
        console.error("Error fetching user listings:", error);
      }
    };

    setUserProductDetails();
  }, [userId]);

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
                        {fullName
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{fullName}</h2>
                    <p className="text-gray-500">{email}</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Total Earnings (Rs.)
                          </p>
                          <p className="text-2xl font-bold">
                            {user.stats.totalEarnings}
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
                            Active Listings
                          </p>
                          <p className="text-2xl font-bold">
                            {/* {listings.filter(l => l.sale_details?.status === "Available").length} */}
                            {listings.length}
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
                  </TabsList>

                  <TabsContent value="active" className="mt-4">
                    <div className="space-y-4">
                      {listings
                        .map((listing) => (
                          <FetchListingDetails key={listing} id={listing} />
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

const LoadingComponent = () => {
  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center items-center w-full h-64">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

const FetchListingDetails = ({ id }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      try {
        console.log("Fetching listing for ID:", id);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItems(docSnap.data());
        } else {
          console.log("Document doesn't exist");
        }
      } catch (error) {
        console.error("Error fetching listing: ", error);
      }
    };

    fetchListing();
  }, [id]); // ✅ Include `id` as a dependency so it refetches when `id` changes

  // ✅ Prevent rendering until `items` is loaded
  if (!items) return <LoadingComponent />; // Or return `null`

  return (
    <Card key={id}> {/* ✅ Use `id` as key, since `seller_id` is inside `items` */}
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={items.product_details?.images?.[0] || "/placeholder.svg"}
              alt={items.product_details?.about_product?.title || "Product"}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-medium text-lg">
                {items.product_details?.about_product?.title || "Unknown Product"}
              </h3>
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                {items.product_details?.about_product?.condition || "Unknown"}
              </Badge>
            </div>
            <p className="text-green-600 font-bold">
              Rs. {items.sale_details?.listing_price || "N/A"}
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Listed {items.createdAt || "Unknown date"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
