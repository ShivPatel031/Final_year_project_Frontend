import shops from "../StaticData/shops";
import ShopCard from "../component/ShopCard";
function Shops()
{
    return (
        <div className="w-screen h-screen items-center mt-[20px]">
            <h3 className="text-[30px] text-center">Shops:</h3>
            <div className="w-full flex flex-wrap mt-[50px] justify-center">
                {shops.map(shop=><ShopCard detail={shop}/>)}
            </div>
            
        </div>
    )
}

export default Shops;

// import React, { useState } from 'react'
// import { ChevronDown, MapPin, Search, ShoppingBag } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// // Mock data for local shopkeepers
// const shopkeepers = [
//   {
//     id: 1,
//     name: "Green Grocer",
//     location: "123 Main St, Anytown",
//     category: "Grocery",
//     bannerImage: "/placeholder.svg?height=200&width=400",
//     logo: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     id: 2,
//     name: "Tech Haven",
//     location: "456 Elm St, Techville",
//     category: "Electronics",
//     bannerImage: "/placeholder.svg?height=200&width=400",
//     logo: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     id: 3,
//     name: "Fashion Forward",
//     location: "789 Oak Ave, Styleburg",
//     category: "Clothing",
//     bannerImage: "/placeholder.svg?height=200&width=400",
//     logo: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     id: 4,
//     name: "Bookworm's Paradise",
//     location: "101 Library Ln, Readington",
//     category: "Books",
//     bannerImage: "/placeholder.svg?height=200&width=400",
//     logo: "/placeholder.svg?height=100&width=100",
//   },
// ]

// function Shops() {
//   const [selectedCategory, setSelectedCategory] = useState("All")

//   const filteredShopkeepers = selectedCategory === "All"
//     ? shopkeepers
//     : shopkeepers.filter(shop => shop.category === selectedCategory)

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-800">LocalShop</h1>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Input
//                 type="search"
//                 placeholder="Search shops..."
//                 className="pl-10 pr-4 py-2 rounded-full"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             </div>
//             <Button variant="outline" size="icon">
//               <ShoppingBag className="h-5 w-5" />
//               <span className="sr-only">Shopping cart</span>
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Local Shopkeepers</h2>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 {selectedCategory} <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem onSelect={() => setSelectedCategory("All")}>All</DropdownMenuItem>
//               <DropdownMenuItem onSelect={() => setSelectedCategory("Grocery")}>Grocery</DropdownMenuItem>
//               <DropdownMenuItem onSelect={() => setSelectedCategory("Electronics")}>Electronics</DropdownMenuItem>
//               <DropdownMenuItem onSelect={() => setSelectedCategory("Clothing")}>Clothing</DropdownMenuItem>
//               <DropdownMenuItem onSelect={() => setSelectedCategory("Books")}>Books</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredShopkeepers.map((shop) => (
//             <Card key={shop.id} className="overflow-hidden">
//               <div className="relative h-48">
//                 <img
//                   src={shop.bannerImage}
//                   alt={`${shop.name} banner`}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute bottom-4 left-4 bg-white rounded-full p-1 shadow-md">
//                   <img
//                     src={shop.logo}
//                     alt={`${shop.name} logo`}
//                     className="w-16 h-16 rounded-full"
//                   />
//                 </div>
//               </div>
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <CardTitle>{shop.name}</CardTitle>
//                     <CardDescription className="flex items-center mt-1">
//                       <MapPin className="mr-1 h-4 w-4" /> {shop.location}
//                     </CardDescription>
//                   </div>
//                   <Badge>{shop.category}</Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 </p>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full">Visit Shop</Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </main>
//     </div>
//   )
// }

// export default Shops