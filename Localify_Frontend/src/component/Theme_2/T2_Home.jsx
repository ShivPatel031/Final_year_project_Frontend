import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, ShoppingCart, Leaf, Recycle, Zap, MapPin, Mail, Phone } from "lucide-react"

const shopData = {
  name: "GreenTech Innovations",
  tagline: "Powering a sustainable future",
  establishedYear: 2020,
  ratings: { average: 4.9 },
  shipping_info: { zones: "Global", delivery_time: { min: 3, max: 7 } },
  category: "Eco-Friendly Technology",
  email: "hello@greentechinnovations.com",
  contact: "+1 (555) 987-6543",
  location: { city: "San Francisco", state: "CA", pincode: "94105" }
}

const featuredProducts = [
  {
    id: "1",
    name: "Smart Energy Monitor",
    description: "Track and optimize your home energy usage",
    price: { original: 129.99 },
    rating: 4.8,
    primary_image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: "2",
    name: "Solar-Powered Backpack",
    description: "Charge your devices on the go",
    price: { original: 89.99 },
    rating: 4.7,
    primary_image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: "3",
    name: "Eco-Friendly Smartphone",
    description: "Made from recycled materials",
    price: { original: 399.99 },
    rating: 4.9,
    primary_image: "/placeholder.svg?height=200&width=200"
  }
]

function ProductCard({ product }) {
  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <div className="aspect-square relative overflow-hidden rounded-md">
          <img src={product.primary_image} alt={product.name} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Button variant="secondary">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.original}</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            {product.rating}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = featuredProducts.filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <header className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-green-800 dark:text-green-400 mb-4">{shopData.name}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">{shopData.tagline}</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card className="p-4">
              <CardTitle className="mb-4">Our Products</CardTitle>
              <div className="mb-4">
                <Label htmlFor="search">Search Products</Label>
                <Input
                  id="search"
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <AnimatePresence>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  layout
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
          <div className="space-y-8">
            <Card className="p-4">
              <CardTitle className="mb-4">About Us</CardTitle>
              <CardContent className="space-y-4">
                <p>
                  Established in {shopData.establishedYear}, {shopData.name} is leading the way in {shopData.category.toLowerCase()}.
                </p>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>Rating: {shopData.ratings.average} / 5</span>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Our Mission</AccordionTrigger>
                    <AccordionContent>
                      To provide innovative, eco-friendly technology solutions that help reduce our carbon footprint and create a more sustainable future.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Shipping Information</AccordionTrigger>
                    <AccordionContent>
                      We offer {shopData.shipping_info.zones} shipping. Delivery typically takes {shopData.shipping_info.delivery_time.min}-{shopData.shipping_info.delivery_time.max} business days.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardTitle className="mb-4">Our Impact</CardTitle>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span>100% Sustainable Materials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Recycle className="w-5 h-5 text-blue-600" />
                  <span>Circular Economy Model</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span>Energy Efficient Products</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardTitle className="mb-4">Contact Us</CardTitle>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span>{shopData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span>{shopData.contact}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>{shopData.location.city}, {shopData.location.state} {shopData.location.pincode}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} {shopData.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}