"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Share2,
  MessageCircle,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  MapPin,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ProductDetailPage({ params }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Mock product data
  const product = {
    id: params.id,
    name: "iPhone 13 Pro - 256GB - Pacific Blue",
    price: 699,
    originalPrice: 999,
    condition: "Like New",
    description:
      "This iPhone 13 Pro is in excellent condition with minimal signs of use. The device has been factory reset and is ready for a new owner. Comes with original charger and box. Battery health is at 92%.",
    features: [
      "A15 Bionic chip",
      "6.1-inch Super Retina XDR display with ProMotion",
      "Pro camera system with 12MP telephoto, wide, and ultra wide cameras",
      "256GB storage",
      "Face ID",
      "5G capable",
      "iOS 15 (upgradable)"
    ],
    specifications: {
      Model: "iPhone 13 Pro",
      Storage: "256GB",
      Color: "Pacific Blue",
      "Screen Size": "6.1 inches",
      "Battery Health": "92%",
      "Included Accessories": "Original charger, box, and documentation",
      Warranty: "30-day seller warranty",
      "Purchase Date": "October 2021"
    },
    images: [
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Front",
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Back",
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Side",
      "/placeholder.svg?height=600&width=600&text=iPhone+13+Pro+Box"
    ],
    seller: {
      id: "seller123",
      name: "Alex Johnson",
      rating: 4.8,
      reviews: 56,
      memberSince: "March 2020",
      location: "San Francisco, CA",
      responseTime: "Usually responds within 2 hours",
      image: "/placeholder.svg?height=100&width=100&text=AJ"
    },
    listedDate: "3 days ago",
    views: 142,
    barterOptions: ["MacBook Air M1", "iPad Pro", "Apple Watch Series 7"],
    similarProducts: [
      {
        id: "101",
        name: "iPhone 12 Pro",
        price: 599,
        condition: "Good",
        image: "/placeholder.svg?height=200&width=200&text=iPhone+12+Pro"
      },
      {
        id: "102",
        name: "iPhone 13",
        price: 649,
        condition: "Excellent",
        image: "/placeholder.svg?height=200&width=200&text=iPhone+13"
      },
      {
        id: "103",
        name: "iPhone 13 Pro Max",
        price: 849,
        condition: "Like New",
        image: "/placeholder.svg?height=200&width=200&text=iPhone+13+Pro+Max"
      }
    ]
  }

  const nextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="text-green-600 hover:text-green-700 flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to all products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${product.name} - image ${currentImageIndex + 1}`}
                className="object-contain w-full h-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                    index === currentImageIndex
                      ? "ring-2 ring-green-600"
                      : "opacity-70"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-2 flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  {product.condition}
                </Badge>
                <span className="text-sm text-gray-500">
                  Listed {product.listedDate} • {product.views} views
                </span>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="ml-2 text-sm text-green-600 font-medium">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{product.seller.location}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  Purchase date: {product.specifications["Purchase Date"]}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Seller
              </Button>
              <Button variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Offer Barter
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium">Free shipping</p>
                  <p className="text-sm text-gray-500">
                    Delivery within 3-5 business days
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium">30-day seller warranty</p>
                  <p className="text-sm text-gray-500">
                    Return or replacement if not as described
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Info className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium">Verified listing</p>
                  <p className="text-sm text-gray-500">
                    This product has been verified by SwapEnv
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Product Details Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="description">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="barter">Barter Options</TabsTrigger>
              </TabsList>

              <TabsContent
                value="description"
                className="p-4 bg-white rounded-b-lg border border-t-0"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">{product.description}</p>

                  <h3 className="font-medium text-lg">Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent
                value="specifications"
                className="p-4 bg-white rounded-b-lg border border-t-0"
              >
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-2 py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="barter"
                className="p-4 bg-white rounded-b-lg border border-t-0"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    The seller is interested in bartering this item for the
                    following:
                  </p>

                  <ul className="list-disc pl-5 space-y-1">
                    {product.barterOptions.map((option, index) => (
                      <li key={index} className="text-gray-700">
                        {option}
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray-700 mt-4">
                    Have something else to offer? Contact the seller to discuss
                    other barter options.
                  </p>

                  <Button className="mt-2">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Propose Barter
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Seller Info */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src={product.seller.image || "/placeholder.svg"}
                      alt={product.seller.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      {product.seller.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-gray-700">
                        {product.seller.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({product.seller.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Member since {product.seller.memberSince}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700">
                      {product.seller.location}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MessageCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700">
                      {product.seller.responseTime}
                    </span>
                  </div>
                </div>

                <Button className="w-full">View Seller Profile</Button>

                <Button variant="outline" className="w-full mt-2">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.similarProducts.map(item => (
              <Link href={`/products/${item.id}`} key={item.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-green-600 font-bold">${item.price}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.condition}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
