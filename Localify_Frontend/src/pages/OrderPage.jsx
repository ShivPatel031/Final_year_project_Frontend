import axios from "axios";
import { useEffect, useState } from "react";

const order = {/* Your order object */};
  const shopDetails = {
    name: "Amazing Shop",
    logo: "https://example.com/shop-logo.png"
  };
  const productDetails = [
    {
      _id: { $oid: "66ee6d55f9eebc304d227b54" },
      name: "Product 1",
      price: 999,
      image: "https://example.com/product1.jpg"
    },
    {
      _id: { $oid: "66ee6d55f9eebc304d227b62" },
      name: "Product 2",
      price: 735,
      image: "https://example.com/product2.jpg"
    }
  ];

function OrderPage(){
    const [orders,setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("userData"));

    async function fetchOrders()
    {
        const customer_id = user.id;
        try {
            const response = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/orders/get-user-order/${customer_id}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchOrders();
    },[]);

    if(orders.length===0) return <div className="w-screen h-screen flex justify-center items-center"><p>No Orders</p></div>
    else{
        return <></>
    }
}

export default OrderPage;