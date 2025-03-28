import { Recycle } from "lucide-react";
import Navbar from "@/components/navbar";

export default function RecyclePage() {
  // Mock recycling centers data
  const recyclingCenters = [
    {
      id: "1",
      name: "EcoTech Recycling Center",
      address: "123 Green St, San Francisco, CA 94110",
      hours: "Mon-Sat: 9AM-6PM, Sun: Closed",
      phone: "(415) 555-1234",
      acceptedItems: ["Smartphones", "Laptops", "Tablets", "Monitors", "Printers"],
      image: "/placeholder.svg?height=200&width=300&text=EcoTech",
      distance: "1.2 miles",
    },
    {
      id: "2",
      name: "GreenCycle Electronics",
      address: "456 Eco Ave, San Francisco, CA 94107",
      hours: "Mon-Fri: 8AM-7PM, Sat-Sun: 10AM-4PM",
      phone: "(415) 555-5678",
      acceptedItems: ["All Electronics", "Batteries", "Cables", "Appliances"],
      image: "/placeholder.svg?height=200&width=300&text=GreenCycle",
      distance: "2.5 miles",
    },
    {
      id: "3",
      name: "Bay Area E-Waste Solutions",
      address: "789 Recycle Blvd, Oakland, CA 94612",
      hours: "Mon-Sun: 9AM-5PM",
      phone: "(510) 555-9012",
      acceptedItems: ["Computers", "TVs", "Audio Equipment", "Gaming Consoles"],
      image: "/placeholder.svg?height=200&width=300&text=Bay+Area+E-Waste",
      distance: "5.8 miles",
    },
  ];

  // Mock recycling events data
  const recyclingEvents = [
    {
      id: "1",
      name: "Community E-Waste Collection Day",
      date: "June 15, 2023",
      time: "9:00 AM - 3:00 PM",
      location: "City Hall Plaza, San Francisco",
      description: "Bring your old electronics for responsible recycling. Free for all residents.",
      image: "/placeholder.svg?height=200&width=300&text=Community+Event",
    },
    {
      id: "2",
      name: "Tech Company Recycling Drive",
      date: "July 8, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Campus, Palo Alto",
      description: "Open to the public. Recycling old devices and offering discounts on new eco-friendly products.",
      image: "/placeholder.svg?height=200&width=300&text=Tech+Company+Drive",
    },
  ];

  // Mock recycling stats
  const recyclingStats = {
    devicesSaved: 10842,
    tonsOfEWaste: 54,
    co2Reduced: 320,
    usersParticipating: 5280,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <Recycle className="mr-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}