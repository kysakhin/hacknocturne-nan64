import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  RefreshCw,
  Search,
  Filter,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Clock
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function BarterPage() {
  // Mock barter listings data
  const barterListings = [
    {
      id: "1",
      name: "MacBook Pro 2021",
      condition: "Excellent",
      image: "/placeholder.svg?height=300&width=300&text=MacBook+Pro",
      seller: { name: "Alex Johnson", rating: 4.8 },
      location: "San Francisco, CA",
      lookingFor: ["iPad Pro", "iPhone 13 Pro", "Apple Watch Series 7"]
    },
    {
      id: "2",
      name: "Sony PlayStation 5",
      condition: "Like New",
      image: "/placeholder.svg?height=300&width=300&text=PlayStation+5",
      seller: { name: "Sarah Williams", rating: 4.9 },
      location: "New York, NY",
      lookingFor: ["Xbox Series X", "Gaming Laptop", "Nintendo Switch"]
    },
    {
      id: "3",
      name: "Canon EOS R5",
      condition: "Good",
      image: "/placeholder.svg?height=300&width=300&text=Canon+EOS+R5",
      seller: { name: "Michael Brown", rating: 4.7 },
      location: "Chicago, IL",
      lookingFor: ["Sony Alpha a7 III", "Nikon Z6", "Fujifilm X-T4"]
    },
    {
      id: "4",
      name: 'iPad Pro 12.9"',
      condition: "Excellent",
      image: "/placeholder.svg?height=300&width=300&text=iPad+Pro",
      seller: { name: "Emily Davis", rating: 4.6 },
      location: "Austin, TX",
      lookingFor: ["MacBook Air", "Surface Pro", "Samsung Galaxy Tab S7"]
    },
    {
      id: "5",
      name: "Nintendo Switch",
      condition: "Good",
      image: "/placeholder.svg?height=300&width=300&text=Nintendo+Switch",
      seller: { name: "David Wilson", rating: 4.9 },
      location: "Seattle, WA",
      lookingFor: ["PlayStation 4", "Xbox One", "Gaming Accessories"]
    },
    {
      id: "6",
      name: "Samsung Galaxy S21",
      condition: "Like New",
      image: "/placeholder.svg?height=300&width=300&text=Samsung+Galaxy+S21",
      seller: { name: "Jessica Miller", rating: 4.8 },
      location: "Boston, MA",
      lookingFor: ["iPhone 12", "Google Pixel 6", "OnePlus 9 Pro"]
    }
  ]

  // Mock active barters data
  const activeBarters = [
    {
      id: "btr-1",
      with: "Michael Brown",
      offered: "iPhone 12 Pro",
      offeredImage: "/placeholder.svg?height=150&width=150&text=iPhone+12+Pro",
      requested: "Samsung Galaxy S21",
      requestedImage: "/placeholder.svg?height=150&width=150&text=Galaxy+S21",
      status: "pending",
      date: "2 days ago"
    },
    {
      id: "btr-2",
      with: "Emily Davis",
      offered: "Nintendo Switch",
      offeredImage: "/placeholder.svg?height=150&width=150&text=Switch",
      requested: "PlayStation 4",
      requestedImage: "/placeholder.svg?height=150&width=150&text=PS4",
      status: "accepted",
      date: "1 week ago"
    },
    {
      id: "btr-3",
      with: "David Wilson",
      offered: "Bose Headphones",
      offeredImage: "/placeholder.svg?height=150&width=150&text=Bose",
      requested: "Sony WH-1000XM4",
      requestedImage: "/placeholder.svg?height=150&width=150&text=Sony",
      status: "rejected",
      date: "3 days ago"
    }
  ]

  // Mock completed barters data
  const completedBarters = [
    {
      id: "btr-4",
      with: "Sarah Williams",
      offered: "iPad Air",
      offeredImage: "/placeholder.svg?height=150&width=150&text=iPad+Air",
      requested: "Surface Pro",
      requestedImage: "/placeholder.svg?height=150&width=150&text=Surface",
      date: "2 months ago"
    },
    {
      id: "btr-5",
      with: "Alex Johnson",
      offered: "Canon DSLR",
      offeredImage: "/placeholder.svg?height=150&width=150&text=Canon",
      requested: "Sony Mirrorless",
      requestedImage: "/placeholder.svg?height=150&width=150&text=Sony",
      date: "3 months ago"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Barter Electronics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trade your electronics directly with other users. No money needed
              - just swap items of similar value.
            </p>
          </div>

          <Tabs defaultValue="browse">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Barter Listings</TabsTrigger>
              <TabsTrigger value="my-barters">My Barters</TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search barter listings..."
                    className="pl-10 w-full md:w-80"
                  />
                </div>

                <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Listings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {barterListings.map(listing => (
                  <Card
                    key={listing.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-1 truncate">
                        {listing.name}
                      </h3>
                      <Badge variant="outline" className="mb-2">
                        {listing.condition}
                      </Badge>

                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium">
                          Looking to trade for:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {listing.lookingFor.map((item, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="mr-1 mb-1"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-500">Owner: </span>
                          <span>{listing.seller.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm">
                            {listing.seller.rating}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Propose Trade
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" className="mx-auto">
                  Load More Listings
                </Button>
              </div>

              <Card className="mt-12">
                <CardHeader>
                  <CardTitle>How Bartering Works</CardTitle>
                  <CardDescription>
                    Trade your electronics directly with other users without
                    money changing hands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">
                        1. Find a Match
                      </h3>
                      <p className="text-gray-600">
                        Browse listings or post your own item to find someone
                        interested in trading
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">2. Negotiate</h3>
                      <p className="text-gray-600">
                        Discuss the details of your trade through our messaging
                        system
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">
                        3. Complete the Trade
                      </h3>
                      <p className="text-gray-600">
                        Meet up or ship items to complete your barter exchange
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/sell">
                      <Button className="bg-green-600 hover:bg-green-700">
                        List Your Item for Barter
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-barters">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Barters</CardTitle>
                    <CardDescription>
                      Your ongoing barter proposals and negotiations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeBarters.length > 0 ? (
                      <div className="space-y-4">
                        {activeBarters.map(barter => (
                          <div
                            key={barter.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="h-16 w-16 rounded-md overflow-hidden">
                                    <img
                                      src={
                                        barter.offeredImage ||
                                        "/placeholder.svg"
                                      }
                                      alt={barter.offered}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    You offer
                                  </p>
                                </div>

                                <RefreshCw className="h-6 w-6 text-gray-400" />

                                <div className="flex flex-col items-center">
                                  <div className="h-16 w-16 rounded-md overflow-hidden">
                                    <img
                                      src={
                                        barter.requestedImage ||
                                        "/placeholder.svg"
                                      }
                                      alt={barter.requested}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    You receive
                                  </p>
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium">
                                  Barter with {barter.with}
                                </p>
                                <div className="flex items-center mt-1">
                                  <p className="text-sm text-gray-600 truncate">
                                    Your {barter.offered} for their{" "}
                                    {barter.requested}
                                  </p>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Proposed {barter.date}
                                </div>
                              </div>

                              <div className="flex flex-col gap-2">
                                {barter.status === "pending" && (
                                  <Badge
                                    variant="outline"
                                    className="text-yellow-600 border-yellow-600"
                                  >
                                    Pending
                                  </Badge>
                                )}
                                {barter.status === "accepted" && (
                                  <Badge
                                    variant="outline"
                                    className="text-green-600 border-green-600"
                                  >
                                    Accepted
                                  </Badge>
                                )}
                                {barter.status === "rejected" && (
                                  <Badge
                                    variant="outline"
                                    className="text-red-600 border-red-600"
                                  >
                                    Rejected
                                  </Badge>
                                )}

                                <div className="flex gap-2 mt-2">
                                  <Button variant="outline" size="sm">
                                    <MessageCircle className="h-4 w-4 mr-1" />
                                    Message
                                  </Button>
                                  {barter.status === "accepted" && (
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <RefreshCw className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-lg">
                          No active barters
                        </h3>
                        <p className="text-gray-500 mt-1 mb-4">
                          You don't have any active barter proposals
                        </p>
                        <Link href="/products">
                          <Button className="bg-green-600 hover:bg-green-700">
                            Browse Items to Barter
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Completed Barters</CardTitle>
                    <CardDescription>
                      Your successfully completed barter exchanges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {completedBarters.length > 0 ? (
                      <div className="space-y-4">
                        {completedBarters.map(barter => (
                          <div
                            key={barter.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="h-16 w-16 rounded-md overflow-hidden">
                                    <img
                                      src={
                                        barter.offeredImage ||
                                        "/placeholder.svg"
                                      }
                                      alt={barter.offered}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    You offered
                                  </p>
                                </div>

                                <RefreshCw className="h-6 w-6 text-gray-400" />

                                <div className="flex flex-col items-center">
                                  <div className="h-16 w-16 rounded-md overflow-hidden">
                                    <img
                                      src={
                                        barter.requestedImage ||
                                        "/placeholder.svg"
                                      }
                                      alt={barter.requested}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    You received
                                  </p>
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium">
                                  Barter with {barter.with}
                                </p>
                                <div className="flex items-center mt-1">
                                  <p className="text-sm text-gray-600 truncate">
                                    Your {barter.offered} for their{" "}
                                    {barter.requested}
                                  </p>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                                  Completed {barter.date}
                                </div>
                              </div>

                              <div>
                                <Badge
                                  variant="outline"
                                  className="text-green-600 border-green-600"
                                >
                                  Completed
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-lg">
                          No completed barters
                        </h3>
                        <p className="text-gray-500 mt-1">
                          You haven't completed any barter exchanges yet
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Barter Tips</CardTitle>
                    <CardDescription>
                      Make the most of your bartering experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Be clear about your item's condition
                          </p>
                          <p className="text-sm text-gray-600">
                            Provide accurate details and clear photos of your
                            item to build trust with potential traders.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Be specific about what you want
                          </p>
                          <p className="text-sm text-gray-600">
                            List specific items you're looking for, but also be
                            open to reasonable alternatives.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Meet in safe, public locations
                          </p>
                          <p className="text-sm text-gray-600">
                            When meeting to exchange items, choose public places
                            like coffee shops or malls for safety.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Test items before completing the trade
                          </p>
                          <p className="text-sm text-gray-600">
                            Always test electronic items to ensure they're
                            working properly before finalizing the exchange.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
