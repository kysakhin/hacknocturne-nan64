"use client"

import { useEffect, useState } from "react"
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
import { useParams } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, doc, getDoc } from "firebase/firestore"

export default function ProductDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    const getItemDetails = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItemDetails(docSnap.data());
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    getItemDetails();
  }, [id]); // Only re-run if id changes

  const nextImage = () => {
    if (!itemDetails?.product_details?.images) return;
    
    setCurrentImageIndex(prevIndex =>
      prevIndex === itemDetails.product_details.images.length - 1 ? 0 : prevIndex + 1
    );
  }

  const prevImage = () => {
    if (!itemDetails?.product_details?.images) return;
    
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? itemDetails.product_details.images.length - 1 : prevIndex - 1
    );
  }

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    // Handle Firestore timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    // Handle string or number timestamp
    return new Date(timestamp).toLocaleDateString();
  }

  // Calculate discount
  const calculateDiscount = () => {
    const originalPrice = itemDetails?.sale_details?.original_price;
    const listingPrice = itemDetails?.sale_details?.listing_price;
    
    if (originalPrice && listingPrice && originalPrice > listingPrice) {
      return originalPrice - listingPrice;
    }
    return 0;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!itemDetails) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Product not found</p>
        </main>
        <Footer />
      </div>
    );
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
                src={itemDetails.product_details?.images?.[currentImageIndex] || "/placeholder.svg"}
                alt={`${itemDetails.product_details?.about_product?.title || "Product"} - image ${currentImageIndex + 1}`}
                className="object-contain w-full h-full"
              />
              {itemDetails.product_details?.images?.length > 1 && (
                <>
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
                </>
              )}
            </div>

            {itemDetails.product_details?.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {itemDetails.product_details.images.map((image, index) => (
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
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {itemDetails.product_details?.about_product?.title || "Untitled Product"}
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
                {itemDetails.product_details?.about_product?.condition && (
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    {itemDetails.product_details.about_product.condition}
                  </Badge>
                )}
                <span className="text-sm text-gray-500">
                  Listed {formatDate(itemDetails.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                ₹{itemDetails.sale_details?.listing_price || 0}
              </span>
              {itemDetails.sale_details.original_price && itemDetails.sale_details.original_price > itemDetails.sale_details.listing_price && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ₹{itemDetails.sale_details.original_price}
                </span>
              )}
              {calculateDiscount() > 0 && (
                <span className="ml-2 text-sm text-green-600 font-medium">
                  Save ₹{calculateDiscount()}
                </span>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              {itemDetails.product_details?.about_product?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{itemDetails.product_details.about_product.location}</span>
                </div>
              )}

              {itemDetails.product_details?.about_product?.year && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    Purchase year: {itemDetails.product_details.about_product.year}
                  </span>
                </div>
              )}
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
                  <p className="text-gray-700">{itemDetails.product_details?.about_product?.description || "No description available"}</p>

                  {itemDetails.product_details?.features && itemDetails.product_details.features.length > 0 && (
                    <>
                      <h3 className="font-medium text-lg">Features:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {itemDetails.product_details.features.map((feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="specifications"
                className="p-4 bg-white rounded-b-lg border border-t-0"
              >
                <div className="space-y-2">
                  {itemDetails.product_details?.about_product && Object.entries(itemDetails.product_details.about_product).map(
                    ([key, value]) => {
                      // Skip rendering empty values, complex objects, or description (since it's in the description tab)
                      if (!value || typeof value === 'object' || key === 'description') return null;
                      
                      return (
                        <div
                          key={key}
                          className="grid grid-cols-2 py-2 border-b border-gray-100 last:border-0"
                        >
                          <span className="font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="barter"
                className="p-4 bg-white rounded-b-lg border border-t-0"
              >
                {itemDetails.sale_details?.sale_type === "barter" ? (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      The seller is interested in bartering this item for the
                      following:
                    </p>

                    {itemDetails.product_details?.barterOptions && itemDetails.product_details.barterOptions.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {itemDetails.product_details.barterOptions.map((option, index) => (
                          <li key={index} className="text-gray-700">
                            {option}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">No specific barter options listed.</p>
                    )}

                    <p className="text-gray-700 mt-4">
                      Have something else to offer? Contact the seller to discuss
                      other barter options.
                    </p>

                    <Button className="mt-2">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Propose Barter
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      This seller is not currently accepting barter offers for this item.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}