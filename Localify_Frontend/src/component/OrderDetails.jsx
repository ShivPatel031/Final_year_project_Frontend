import React from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import axios from 'axios';

const OrderDetails = ({ order, shopDetails, productDetails }) => {

  shopDetails=order.shopDetails;
  productDetails=order.productDetails;
  order=order.cart;


  const makeOrderComplete = async ()=>
  {
    let order_id = order._id;
    try {
      const response = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/orders/set-order-completed/${order_id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const makeOrderCancel = async ()=>
    {
      let order_id = order._id;
      try {
        const response = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/orders/set-order-cancelled/${order_id}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-8">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          {/* <h2 className="text-2xl font-bold">Order #{order._id.$oid.slice(-6)}</h2> */}
          <span className="px-3 py-1 bg-white text-indigo-600 rounded-full text-sm font-semibold">
            {order.status.toUpperCase()}
          </span>
        </div>
        <p className="mt-2">Placed on {order?.createdAt}</p>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-6">
          <img
            src={shopDetails.logo || '/placeholder.svg?height=50&width=50'}
            alt={shopDetails.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{shopDetails.name}</h3>
            {/* <p className="text-gray-600">Shop ID: {order.shop_id}</p> */}
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <h4 className="text-lg font-semibold mb-4">Order Items</h4>
          {productDetails.map((item) => {
            return (
              <div key={item._id} className="flex items-center justify-between mb-4 last:mb-0">
                <div className="flex items-center">
                  <img
                    src={item?.primary_image || '/placeholder.svg?height=80&width=80'}
                    alt={item?.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h5 className="font-semibold">{item?.name || 'Product Name'}</h5>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{item?.price.original || 0}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-gray-700">
            <ShoppingBag className="mr-2" size={20} />
            <span>Total Items: {order.products.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="text-2xl font-bold">
            Total: ₹{order.total}
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <MapPin className="mr-2 text-indigo-600" size={20} />
            <h4 className="font-semibold">Delivery Address</h4>
          </div>
          <p className="text-gray-700">
            {order.delivery_location.address}, {order.delivery_location.city},
            <br />
            {order.delivery_location.state} - {order.delivery_location.pincode}
          </p>
        </div>
        <div className='w-full h-[70px] flex justify-end items-center'>
          {shopDetails.role && order.status !== 'cancelled' && <button 
            className='w-[200px] h-[50px] bg-purple-300 rounded-2xl'
            onClick={()=>makeOrderComplete()}>Complete</button>}
          {shopDetails.logo && order.status !== 'delivered'&& order.status !== 'cancelled' && <button 
            className='w-[200px] h-[50px] bg-purple-300 rounded-2xl'
            onClick={()=>makeOrderCancel()}>Cancel</button>}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;