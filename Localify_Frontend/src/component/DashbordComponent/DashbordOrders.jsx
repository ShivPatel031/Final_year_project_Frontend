import { useState,useEffect } from "react";
import axios from "axios";
import OrderDetails from "../OrderDetails";

function DashboardOrders({shop_id})
{
  const [order,setOrder] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(order)

  async function fetchOrders()
    {
      let response = {};

        try {
           response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/orders/get-shop-order/${shop_id}`);
            response=response.data.data;
        } catch (error) {
            console.error(error);
        }

        // console.log(response);

        const cart = await Promise.all(response.map(async (element) => {
            let shopDetails = await fetchUserData(element.customer_id);
            shopDetails = {...shopDetails,name:`${shopDetails.firstName} ${shopDetails.lastName}`};
            const productDetails = await fetchProducts(element.products);
            return { cart: element, shopDetails, productDetails };
        }));

        setOrder(cart);
    }

    

    const fetchUserData = async (id) => {
      console.log(id);
      try {
        const response = await axios(
          `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/users/${id}`);
            return response.data
  
      } catch (error) {
        // toast.error(error.message || "Data Fetch Failed");
        console.log(error);
      }
    };

    async function fetchProducts (orderedProducts){
        try {
            const products = await Promise.all(orderedProducts.map(async (item) => {
                const d = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/${item.product_id}`);
                return d.data.product;
            }));

            return products;
            
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
    } 

    useEffect(()=>{
        fetchOrders();
    },[]);
    return <>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          </div>
        </header>
        <div className="w-full h-min-screen">
            {order.length === 0 ? <h2 className="text-[25px] mt-[50px]">You don't have any Orders</h2> : order.map((data)=><OrderDetails order={data}/>)}
        </div>
        
    </>
}

export default DashboardOrders;