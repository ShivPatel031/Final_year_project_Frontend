import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MultiShopCart from "../component/MultiShopCart";
import OrderDetails from "../component/OrderDetails";

// const order = {/* Your order object */};
//   const shopDetails = {
//     name: "Amazing Shop",
//     logo: "https://example.com/shop-logo.png"
//   };
//   const productDetails = [
//     {
//       _id: { $oid: "66ee6d55f9eebc304d227b54" },
//       name: "Product 1",
//       price: 999,
//       image: "https://example.com/product1.jpg"
//     },
//     {
//       _id: { $oid: "66ee6d55f9eebc304d227b62" },
//       name: "Product 2",
//       price: 735,
//       image: "https://example.com/product2.jpg"
//     }
//   ];

function OrderPage(){
    const [orders,setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("userData"));

    async function fetchOrders()
    {
        let response = {};
        const customer_id = user.id;
        try {
            response = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/orders/get-user-order/${customer_id}`);
            response=response.data.data;
        } catch (error) {
            console.error(error);
        }

        const cart = await Promise.all(response.map(async (element) => {
            const shopDetails = await fetchShopData(element.shop_id);
            const productDetails = await fetchProducts(element.products);
            return { cart: element, shopDetails, productDetails };
        }));

        setOrders(cart);
    }

    async function fetchShopData (shopId,shop){
        
        try {
          const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/${shopId}`);
        return response.data;
        } catch (error) {
          toast.error(error.message || "Data Fetch Failed");
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

    

    if(orders.length===0)
    { return <div className="w-screen h-screen flex justify-center items-center"><p>No Orders</p></div>} 
    else{

        return <div className="w-screen h-min-screen mt-[100px]">
            <div className="flex justify-center items-center w-screen h-[100px]">
                <h2 className="text-[40px]">your orders</h2>
            </div>
            {orders.map((data)=><OrderDetails order={data}/>)}
        </div>
        
    }
}

export default OrderPage;