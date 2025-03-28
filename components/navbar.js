"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, X, ShoppingCart, User, MessageCircle, Leaf } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Buy", href: "/products" },
    { name: "Sell", href: "/sell" },
    { name: "Barter", href: "/barter" },
    { name: "Recycle", href: "/recycle" },
   
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Swap<span className="text-green-600">Env</span>
            </span>
          </Link>

          <nav className="hidden ml-10 md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === link.href ? "text-green-600" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="relative flex items-center md:w-72">
              <Input type="search" placeholder="Search for electronics..." className="pr-10" autoFocus />
              <X
                className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>

          <Link href="/auth/login">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>

          <div className="hidden md:block">
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="mr-2">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Sign up
              </Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <Link href="/" className="flex items-center">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <span className="ml-2 text-lg font-bold">SwapEnv</span>
                  </Link>
                </div>
                <div className="py-4">
                  <Input type="search" placeholder="Search for electronics..." className="mb-4" />
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-base font-medium transition-colors hover:text-green-600 ${
                        pathname === link.href ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto py-4 space-y-4">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Sign up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}