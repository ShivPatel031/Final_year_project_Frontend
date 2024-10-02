import * as React from "react"
import { useState } from "react"
import { Star, ShoppingCart, ArrowLeft, Leaf, Zap, Recycle } from "lucide-react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

// Button Component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonProps & { variant?: "default" | "outline" }>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          "h-10 px-4 py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Badge Component
const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      variant === "default" && "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      variant === "secondary" && "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      className
    )}
    {...props}
  />
))
Badge.displayName = "Badge"

// Tabs Components
const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Mock product data
const product = {
  id: "1",
  name: "Smart Energy Monitor",
  description: "Track and optimize your home energy usage with our advanced Smart Energy Monitor. This innovative device provides real-time data on your energy consumption, helping you make informed decisions to reduce your carbon footprint and save on energy bills.",
  price: { original: 129.99, discounted: 99.99 },
  rating: 4.8,
  reviews: 128,
  stock: 50,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400&text=Image+2",
    "/placeholder.svg?height=400&width=400&text=Image+3",
  ],
  features: [
    "Real-time energy consumption tracking",
    "Mobile app integration",
    "Customizable energy-saving goals",
    "Historical data analysis",
    "Compatible with smart home systems",
  ],
  specifications: {
    "Dimensions": "4.5 x 2.3 x 1.1 inches",
    "Weight": "150g",
    "Connectivity": "Wi-Fi, Bluetooth",
    "Power Source": "Rechargeable battery (included)",
    "Compatibility": "iOS 11.0+, Android 6.0+",
    "Warranty": "2 years limited",
  },
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img src={selectedImage} alt={product.name} className="object-cover w-full h-full" />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square w-20 overflow-hidden rounded-md ${
                    image === selectedImage ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">${product.price.discounted}</span>
              {product.price.original !== product.price.discounted && (
                <span className="text-lg text-gray-500 line-through">${product.price.original}</span>
              )}
              <Badge>Save ${(product.price.original - product.price.discounted).toFixed(2)}</Badge>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  variant="outline"
                >
                  -
                </Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  variant="outline"
                >
                  +
                </Button>
              </div>
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {product.stock > 10 ? 'In stock' : `Only ${product.stock} left in stock - order soon`}
            </p>
          </div>
        </div>

        <Tabs defaultValue="features" className="mt-12">
          <TabsList>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-6">
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900 dark:text-gray-100">{key}</dt>
                  <dd className="mt-2 text-sm text-gray-600 dark:text-gray-400">{value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-green-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Why Choose Our Smart Energy Monitor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Leaf className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Eco-Friendly</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Helps reduce your carbon footprint</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Energy Efficient</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Optimize your energy consumption</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Recycle className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sustainable</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Made from recycled materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}