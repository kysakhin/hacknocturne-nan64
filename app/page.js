import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, BarChart, MessageCircle, ShieldCheck, Zap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Give Electronics a <span className="text-green-600">Second Life</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Buy, sell, or barter used electronics. Reduce e-waste and contribute to a sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href = "/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>

                <Link href = "/sell">
                <Button size="lg" variant="outline">
                  Sell Your Device
                </Button>
                </Link>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                <span>created with love, for the environment</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/SwapEnv.jpg"
                  alt="Electronics marketplace"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-green-100 rounded-full z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-100 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How Swap Env Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to trade electronics sustainably
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-green-600" />}
              title="Buy & Sell"
              description="List your unused electronics or find great deals on pre-owned devices"
            />
            <FeatureCard
              icon={<Recycle className="h-10 w-10 text-green-600" />}
              title="Barter System"
              description="Trade your electronics directly with other users without money changing hands"
            />
            <FeatureCard
              icon={<MessageCircle className="h-10 w-10 text-green-600" />}
              title="AI Support Assist"
              description="Use our AI assistant to get help with you questions."
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-green-600" />}
              title="User prioritized "
              description="Be a seller or a buyer, you'll be respected always "
            />
            <FeatureCard
              icon={<Recycle className="h-10 w-10 text-green-600" />}
              title="Recycling Options"
              description="Can't sell it? We'll help you recycle it responsibly"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-green-600" />}
              title="Secure Authentication"
              description="Your account and transactions are protected with robust security"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to make a difference?</h2>
            <p className="mt-4 text-xl text-green-100 max-w-2xl mx-auto">
              Join us, help us reducing e-waste and saving money
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Electronics</h2>
            <Link href="/products" className="text-green-600 hover:text-green-700 flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "iPhone 13", src: "/listing-images/iPhone-13-Pro.jpg", price: "$499", condition: "Like New" },
              { name: "MacBook Pro 2021", src: "/listing-images/Macbook-Air-M1.jpg", price: "$1299", condition: "Good" },
              { name: "Samsung Galaxy S21", src: "/listing-images/Samsung-Galaxy-S21.webp", price: "$399", condition: "Fair" },
              { name: "Sony Headphones", src: "/listing-images/Sony-XM4.jpg", price: "$89", condition: "Excellent" },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200">
                  <img
                    src={product.src}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-green-600 font-bold">{product.price}</span>
                    <span className="text-sm text-gray-500">{product.condition}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      

      {/* Environmental Impact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Environmental Impact</h2>
              <p className="mt-4 text-xl text-gray-600">Every device reused or properly recycled makes a difference</p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Recycle className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">10,000+ Devices</h3>
                    <p className="text-gray-600">Kept out of landfills through our platform</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">500+ Tons</h3>
                    <p className="text-gray-600">Of CO2 emissions prevented</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">5,000+ Users</h3>
                    <p className="text-gray-600">Committed to sustainable technology consumption</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/placeholder.jpg"
                  alt="Environmental impact visualization"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-green-100 rounded-full z-0"></div>
            </div>
          </div>
        </div>
        
      </section>
      
      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description, }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
