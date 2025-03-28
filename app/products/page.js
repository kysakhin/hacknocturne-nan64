"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image";
import { getAuth } from "firebase/auth";

export default function ProductsPage() {


  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchListing() {
      const res = await fetch('/api/fetch-listings');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setProducts(data.data);
    }

    fetchListing();
  }, [])


  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [0, 3000],
    conditions: new Set(),
    categories: new Set(),
    brands: new Set(),
    sellerRatings: new Set(),
    listingTypes: new Set(),
    searchQuery: "",
    sortBy: "newest",
  });

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[key]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [key]: newSet };
    });
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.product_details.sale_details?.listing_price >= filters.priceRange[0] &&
      product.product_details.sale_details?.listing_price <= filters.priceRange[1] &&
      product.product_details.sale_details?.status === "Available" &&
      (filters.conditions.size === 0 || filters.conditions.has(product.condition)) &&
      (filters.searchQuery === "" || product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 lg:w-72 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-600"
                onClick={() => setFilters({
                  priceRange: [0, 3000],
                  conditions: new Set(),
                  categories: new Set(),
                  brands: new Set(),
                  sellerRatings: new Set(),
                  listingTypes: new Set(),
                  searchQuery: "",
                  sortBy: "newest",
                })}
              >
                Reset
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-4">
                  <Slider 
                    defaultValue={[0, 3000]} 
                    max={5000} 
                    step={100}
                    onValueChange={(val) => setFilters((prev) => ({ ...prev, priceRange: val }))}                    
                  />
                  <div className="flex items-center justify-between">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      className="w-24" 
                      value={filters.priceRange[0]} 
                      onChange={(e) => setFilters((prev) => ({ 
                        ...prev, 
                        priceRange: [Number(e.target.value), prev.priceRange[1]] 
                      }))}
                    />
                    <span className="text-gray-500">to</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      className="w-24" 
                      value={filters.priceRange[1]} 
                      onChange={(e) => setFilters((prev) => ({ 
                        ...prev, 
                        priceRange: [prev.priceRange[0], Number(e.target.value)] 
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Condition</h3>
                <div className="space-y-2">
                  {["Like New", "Excellent", "Good", "Fair", "Poor"].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`condition-${condition}`}
                        checked={filters.conditions.has(condition)}
                        onCheckedChange={() => handleCheckboxChange('conditions', condition)}
                      />
                      <Label htmlFor={`condition-${condition}`} className="font-normal">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other filter sections remain the same */}
              
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <Input 
                  placeholder="Search products..." 
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                />
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 mt-4"
                onClick={() => console.log("Filters applied:", filters)}
              >
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 w-full sm:w-80"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select 
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Seller Rating</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length === 0 ? (<LoaderComponent />) : (
                  products.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative">
                          <Image
                            height={300}
                            width={300}
                            src={product.product_details.images[0] || "/placeholder.svg"}
                            alt={product.product_details.about_product.brand}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1 truncate">{product.product_details.about_product.brand || "Unknown Brand"}</h3>
                          <p className="text-green-600 font-bold">₹ {product.sale_details?.listing_price}</p>
                          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                            <span>{product.product_details.about_product.condition}</span>
                            <span>{product.product_details.about_product.location || "Unknown Location"}</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div className="text-sm">
                              <span className="text-gray-500">Seller: </span>
                              <span>{product.seller_id}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm">5</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
              )}
              
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="mx-1">
                Previous
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  className={page === 1 ? "mx-1 bg-green-600 hover:bg-green-700" : "mx-1"}
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" className="mx-1">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const LoaderComponent = () => {
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