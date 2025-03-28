"use client";

import React from "react";
import { app } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea as TextareaUI } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Trash,
  Plus,
  RefreshCw,
  DollarSign,
  Leaf,
  Info,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import listingFormFields from "@/shared/form-fields.json";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function SellPage() {
  // UI states.
  const [activeTab, setActiveTab] = useState("details");
  const [listingType, setListingType] = useState("sale");
  const [isUploading, setIsUploading] = useState(false);

  // Form states.
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [includedBox, setIncludedBox] = useState([]);
  const [saleDetails, setSaleDetails] = useState({});

  // User state.
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
  }, []);

  const handleSaleDetailsChange = (e) => {
    setSaleDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  // Handing Image Uploads
  const handleImageChange = (e) => {
    if (typeof window !== "undefined"){
      const files = Array.from(e.target.files);
      if (files.length) {
        const newImages = files.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
          id: uuidv4(),
        }));

        setImages((prev) => [...prev, ...newImages]);

        console.log(images.length)
      }
    }
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const updatedImages = [...prev];
      URL.revokeObjectURL(updatedImages[id].previewUrl);
      updatedImages.splice(id, 1);
      return updatedImages;
    });
  };

  // Cloudinary upload function
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload Failed: ${errorText}`);
        
      }

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error: ", error);
      throw error;
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleIncludedChange = (featureName) => {
    setIncludedBox((prev) =>
      prev.includes(featureName)
        ? prev.filter((item) => item != featureName)
        : [...prev, featureName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    try {
      const uploadPromises = images.map(async (imageFile) => {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        return { ...imageFile, uploadedUrl };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      const finalData = {
        buyerId: formData.buyerId || "",
        product_details: {
          about_product: {
            title: formData.title || "",
            brand: formData.brand || "",
            category: formData.category || "",
            color: formData.color || "",
            condition: formData.condition || "",
            description: formData.description || "",
            location: formData.location || "",
            screen_size: formData.screen_size || "",
            storage: formData.storage || 0,
            year: formData.year || 0,
          },
          images: uploadedImages.map((img) => img.uploadedUrl),
          included_in_box: includedBox,
        },
        sale_details: {
          barter_for: saleDetails.barter_for || "",
          listing_price: saleDetails.listing_price || 0,
          original_price: saleDetails.original_price || 0,
          sale_type: saleDetails.sale_type || "Sell",
          status: saleDetails.status || "Available",
        },
        seller_id: userId || "",
      };

      const response = await fetch("/api/new-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) throw new Error("Listing Submission to backend failed");

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Submission error: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create a Listing</h1>
          {/* sell details card  */}
          <Card>
            <CardHeader>
              <CardTitle>What would you like to do?</CardTitle>
              <CardDescription>
                Choose how you want to list your electronics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className={`cursor-pointer border-2 ${
                    listingType === "sale"
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                  onClick={() => setListingType("sale")}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium">Sell</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      List your item for sale
                    </p>
                    {listingType === "sale" && (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-2" />
                    )}
                  </CardContent>
                </Card>
                {/* barter details card */}
                <Card
                  className={`cursor-pointer border-2 ${
                    listingType === "barter"
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                  onClick={() => setListingType("barter")}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <RefreshCw className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium">Barter</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Trade for other items
                    </p>
                    {listingType === "barter" && (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-2" />
                    )}
                  </CardContent>
                </Card>

                {/* barter + sale card */}

                <Card
                  className={`cursor-pointer border-2 ${
                    listingType === "both"
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                  onClick={() => setListingType("both")}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium">Both</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Sell or barter your item
                    </p>
                    {listingType === "both" && (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-2" />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Options</TabsTrigger>
              </TabsList>
              {/* *********************** form starts********************* */}
              <form onSubmit={handleSubmit}>
                <TabsContent value="details" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Item Details</CardTitle>
                      <CardDescription>
                        Provide information about your electronic item
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., iPhone 13 Pro - 256GB - Pacific Blue"
                          required
                          value={formData.title || ""}
                          onChange={handleFormChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                            defaultValue={formData.category}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="smartphone">
                                Smartphone
                              </SelectItem>
                              <SelectItem value="laptop">Laptop</SelectItem>
                              <SelectItem value="tablet">Tablet</SelectItem>
                              <SelectItem value="camera">Camera</SelectItem>
                              <SelectItem value="audio">Audio</SelectItem>
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="wearable">Wearable</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand">Brand</Label>
                          <Select 
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, brand: value }))}
                            defaultValue={formData.brand}>
                            <SelectTrigger id="brand">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="samsung">Samsung</SelectItem>
                              <SelectItem value="google">Google</SelectItem>
                              <SelectItem value="sony">Sony</SelectItem>
                              <SelectItem value="microsoft">
                                Microsoft
                              </SelectItem>
                              <SelectItem value="dell">Dell</SelectItem>
                              <SelectItem value="lg">LG</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select 
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                          defaultValue="likeNew">
                          <SelectTrigger id="condition">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="likeNew">Like New</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <TextareaUI
                          id="description"
                          placeholder="Describe your item in detail. Include information about its condition, features, and any accessories included."
                          className="min-h-[150px]"
                          value={formData.description}
                          onChange={handleFormChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Specifications</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input 
                            id="storage"
                            value={formData.storage || ""}
                            onChange={handleFormChange}
                            placeholder="Storage (e.g., 256GB)" />
                          <Input 
                            id="screen_size"
                            value={formData.screen_size || ""}
                            onChange={handleFormChange}
                            placeholder="Screen Size (e.g., 6.1 inches)" />
                          <Input 
                            id="color"
                            value={formData.color || ""}
                            onChange={handleFormChange}
                            placeholder="Color" />
                          <Input 
                            id="model"
                            value={formData.model || ""}
                            onChange={handleFormChange}
                            placeholder="Model" />
                          <Input 
                            id="year"
                            value={formData.year || ""}
                            onChange={handleFormChange}
                            placeholder="Year of Purchase" />
                          <Input 
                            id="battery"
                            value={formData.battery || ""}
                            onChange={handleFormChange}
                            placeholder="Battery Health (%)" />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add More Specifications
                        </Button>
                      </div>
                      {/* ************************** ??? ****************** */}
                      <div className="space-y-2">
                        <Label>Included Items</Label>
                        <div className="space-y-2">
                          {[
                            "Original box",
                            "Charger",
                            "Manual",
                            "Warranty card",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox 
                                  id={`item-${index}`} 
                                  checked={includedBox.includes(item)}
                                  onCheckedChange={() => handleIncludedChange(item)}
                                />
                              <Label
                                htmlFor={`item-${index}`}
                                className="font-normal"
                              >
                                {item}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Custom Item
                        </Button>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={() => setActiveTab("photos")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Continue to Photos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="photos" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Item Photos</CardTitle>
                      <CardDescription>
                        Add clear photos of your item from different angles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div
                            key={image.id}
                            className="relative aspect-square rounded-md overflow-hidden border"
                          >
                            <Image
                              height={300}
                              width={300}
                              src={image.previewUrl || "/placeholder.svg"}
                              alt={`Product image ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 rounded-full"
                              onClick={() => removeImage(index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        {images.length < 6 && (
                          <div>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              id="fileUpload"
                              onChange={handleImageChange}
                            />
                            <label htmlFor="fileUpload">
                              <div className="aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm font-medium">
                                  Upload Image
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {images.length === 0
                                    ? "Add your first image"
                                    : `${images.length}/6 images`}
                                </p>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Photo Tips
                          </p>
                          <ul className="text-xs text-blue-700 mt-1 list-disc pl-4 space-y-1">
                            <li>Take photos in good lighting</li>
                            <li>Show the item from multiple angles</li>
                            <li>Include photos of any damage or wear</li>
                            <li>Include original packaging if available</li>
                            <li>Avoid using stock photos</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("details")}
                        >
                          Back to Details
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setActiveTab("pricing")}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={images.length === 0}
                        >
                          Continue to Pricing
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pricing" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing & Options</CardTitle>
                      <CardDescription>
                        Set your price and listing preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {(listingType === "sale" || listingType === "both") && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Sale Options</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Price (₹)</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input
                                  id="listing_price"
                                  type="number"
                                  value={saleDetails.listing_price || ''}
                                  onChange={handleSaleDetailsChange}
                                  placeholder="0"
                                  className="pl-10"
                                  required={ listingType === "sale" || listingType === "both" }
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="originalPrice">
                                Original Price (₹)
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input
                                  id="original_price"
                                  type="number"
                                  placeholder="0"
                                  value={saleDetails.original_price || ''}
                                  onChange={handleSaleDetailsChange}
                                  required={listingType === "sale" || listingType === "both"}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="negotiable" />
                            <Label htmlFor="negotiable" className="font-normal">
                              Price is negotiable
                            </Label>
                          </div>
                        </div>
                      )}

                      {(listingType === "barter" || listingType === "both") && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Barter Options</h3>

                          <div className="space-y-2">
                            <Label htmlFor="barterFor">
                              What would you like to barter for?
                            </Label>
                            <TextareaUI
                              id="barterFor"
                              placeholder="e.g., MacBook Air, iPad Pro, Apple Watch Series 7"
                              className="min-h-[100px]"
                              required={listingType === "barter"}
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="openToOffers" defaultChecked />
                            <Label
                              htmlFor="openToOffers"
                              className="font-normal"
                            >
                              Open to other barter offers
                            </Label>
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h3 className="font-medium">
                          Shipping & Pickup Options
                        </h3>

                        <div className="space-y-2">
                          {["Local pickup", "Shipping", "Both"].map(
                            (option, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`delivery-${index}`}
                                  defaultChecked={index === 2}
                                />
                                <Label
                                  htmlFor={`delivery-${index}`}
                                  className="font-normal"
                                >
                                  {option}
                                </Label>
                              </div>
                            )
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Your Location</Label>
                          <Input
                            id="location"
                            placeholder="e.g., San Francisco, CA"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Listing Options</h3>

                        <div className="space-y-2">
                          {[
                            "I certify this item is authentic and not counterfeit",
                            "I am the owner of this item and have the right to sell it",
                            "This item is in working condition (unless otherwise stated)",
                          ].map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`certification-${index}`}
                                required
                              />
                              <Label
                                htmlFor={`certification-${index}`}
                                className="font-normal"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("photos")}
                        >
                          Back to Photos
                        </Button>
                        <Button
                          disabled={isUploading}
                          type="submit"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Create Listing
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
