import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

// export default Dashbord
import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Store, Package, Bell, Home, ShoppingCart, Users, Search, ChevronDown, X ,CirclePlus} from 'lucide-react'
import AddProducts from "../component/AddProducts.jsx";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../component/DashbordComponent/DashBordSmallComponent.jsx";
import DashboardHome from "../component/DashbordComponent/DashbordHome.jsx";
import DashbordProduct from "../component/DashbordComponent/DashbordProduct.jsx";
import DashboardOrders from "../component/DashbordComponent/DashbordOrders.jsx";


// UI Components
export default function ShopkeeperDashboard() {
  const location = useLocation();
  console.log(location);
  const [hasShop, setHasShop] = useState(false)
  const [shop, setShop] = useState(null)
  const [products, setProducts] = useState([])

  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));

    const fetchProductData = async (shopId) => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/shop/${shopId}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token,
            'user_token': user_token,
          },
        });
        // console.log(response);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error.message || "Data Fetch Failed");
      }
    };

    const fetchShopData = async (shopId) => {
      try {
        const response = await axios(
          `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/${shopId}`,{
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
            const respo = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/getId/${user.id}`);
            // console.log(respo)
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
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/delete/${id}`, {
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
            <Button className="w-full" onClick={()=>navigate("/shops/addShop")}>
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
          {/* <Bell className="h-5 w-5 text-gray-500" /> */}
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-1">
            <li>
              <button onClick={()=>navigate("/dashbord")} className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${location.pathname === "/dashbord" ?" bg-gray-100" : "" } rounded-md`}>
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={()=>navigate("/dashbord/products")} className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${location.pathname === "/dashbord/products" ?" bg-gray-100" : "" }  rounded-md`}>
                <Package className="h-5 w-5 mr-3" />
                Products
              </button>
            </li>
            <li>
              <button onClick={()=>navigate("/dashbord/orders")} className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${location.pathname === "/dashbord/orders" ?" bg-gray-100" : "" } rounded-md`}>
                <ShoppingCart className="h-5 w-5 mr-3" />
                Orders
              </button>
            </li>
            <li>
              <button onClick={()=>navigate("/dashbord/addProducts")} className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${location.pathname === "/dashbord/addProducts" ?" bg-gray-100" : "" } rounded-md`}>
              <CirclePlus className="h-5 w-5 mr-3" />
                Add Product
              </button>
              <li>
              <button onClick={()=>navigate(`/shops/${shop._id}/home`)} className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md`}>
                <Store className="h-5 w-5 mr-3" />
                Go to shop
              </button>
            </li>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        <Routes>
          <Route path="" element={<DashboardHome shop={shop} user={user} products={products} handleDeleteProduct={handleDeleteProduct} />}/>
          <Route path="addProducts" element={<div className="h-full top-0 left-0 bg-white z-20" ><AddProducts shopId={shop._id} fetchProductData={fetchProductData}/></div>}/>
          <Route path="products" element={<DashbordProduct shopId={shop._id}/>}/>
          <Route path="orders" element={<DashboardOrders shop_id={shop._id} />} />
        </Routes>
      </div>
      
    </div>
  )
}