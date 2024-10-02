import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

// export default Dashbord
import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Store, Package, Bell, Home, ShoppingCart, Users, Search, ChevronDown, X } from 'lucide-react'
import AddProducts from "../component/AddProducts.jsx";


// UI Components
const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant || 'default']} ${sizes[size || 'default']} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

const Card = ({ className, ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
)

const CardHeader = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)

const CardTitle = ({ className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
)

const CardDescription = ({ className, ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props} />
)

const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)

const CardFooter = ({ className, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
)

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
))

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
))

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
))

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`[&_tr:last-child]:border-0 ${className}`}
    {...props}
  />
))

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={`bg-primary font-medium text-primary-foreground ${className}`}
    {...props}
  />
))

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}
    {...props}
  />
))

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={`mt-4 text-sm text-muted-foreground ${className}`}
    {...props}
  />
))




export default function ShopkeeperDashboard() {
  const [hasShop, setHasShop] = useState(false)
  const [shop, setShop] = useState(null)
  const [products, setProducts] = useState([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));

    const fetchProductData = async (shopId) => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/shop/${shopId}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token,
            'user_token': user_token,
          },
        });
        console.log(response);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error.message || "Data Fetch Failed");
      }
    };

    const fetchShopData = async (shopId) => {
      try {
        const response = await axios(
          `http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/shops/${shopId}`,{
            headers: {
                'Content-Type': 'application/json', 
                'auth_token': auth_token, 
                'user_token': user_token 
            },});
        if(response) 
        {
          setShop(response.data)
          await fetchProductData(shopId)
        }
      } catch (error) {
        toast.error(error.message || "Data Fetch Failed");
      }
    };


    const fetchShopIfExist= async()=>{

        try {
            const respo = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/shops/getId/${user.id}`);
            console.log(respo)
            if(respo) 
            {
              await fetchShopData(respo.data.shopId);
              setHasShop(true)
            }
        } catch (error) {
            console.log("shop not found")
        }
        
    }
        
      

  useEffect(() => {
    fetchShopIfExist()
  }, [])

  const handleDeleteProduct = async(id) => {
    // Simulate API call to delete product
    console.log(id);
    try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/delete/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token,
            'user_token': user_token,
          },
        });
        console.log(response);
       
      } catch (error) {
        console.log(error.message || "Failed to delete product");
      }
    setProducts(products.filter(product => product._id !== id))
  }

  if (!hasShop) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome, Shopkeeper!</CardTitle>
            <CardDescription>You haven't registered a shop yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Your Shop
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-full bg-gray-100 mt-[70px]">
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white shadow-md">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-lg font-semibold">Shopkeeper Dashboard</span>
          <Bell className="h-5 w-5 text-gray-500" />
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-1">
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Package className="h-5 w-5 mr-3" />
                Products
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <ShoppingCart className="h-5 w-5 mr-3" />
                Orders
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="ml-4 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Shop Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Shop Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Name:</strong> {shop.name}</p>
                  <p><strong>Location:</strong> {shop.location.city}, {shop.location.state}</p>
                  <p><strong>Tagline:</strong> {shop.tagline}</p>
                  <p><strong>Email:</strong> {shop.email}</p>
                  <p><strong>Contact:</strong> {shop.contact}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit Shop Details
                  </Button>
                </CardFooter>
              </Card>

              {/* Quick Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <Store className="h-8 w-8 mx-auto text-blue-500" />
                      <p className="mt-2 font-semibold text-2xl">{products.length}</p>
                      <p className="text-sm text-gray-500">Total Products</p>
                    </div>
                    <div className="text-center">
                      <Package className="h-8 w-8 mx-auto text-green-500" />
                      <p className="mt-2 font-semibold text-2xl">{products.reduce((acc, product) => acc + product.stock, 0)}</p>
                      <p className="text-sm text-gray-500">Total Stock</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Table */}
            <div className="mt-8">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Products</h2>
                <Button onClick={() => setIsAddingProduct(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
              <Card>
                <CardContent>
                  <Table>
                    <TableCaption>A list of your products.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.discounted_price || product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="mr-2">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {isAddingProduct && <div className="fixed w-screen h-full top-0 left-0 bg-white z-20" ><AddProducts closeIt={setIsAddingProduct} shopId={shop._id}/></div>}
      
    </div>
  )
}