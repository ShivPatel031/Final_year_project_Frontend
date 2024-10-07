import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { MdStarRate } from "react-icons/md";

function ProductCard({ product }) {
  return (
    <div className="w-[300px] h-[400px] bg-white shadow-lg  flex flex-col justify-between items-center rounded-lg border border-slate-300">
      <img
        src={product.primary_image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description.substring(1,100)+"..."}.</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">${product.price.original}</span>
          <span className="text-sm font-medium flex items-center">
            <MdStarRate />
            {product.rating}
          </span>
        </div>
        
      </div>
    </div>
  );
}

function DashbordProduct({shopId}){
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");
  const [products, setProducts] = useState([]);

  const fetchProductData = async (shopId) => {
    try {
      const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/shop/${shopId}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth_token': auth_token,
          'user_token': user_token,
        },
      });
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error.message || "Data Fetch Failed");
    }
  };

  useEffect(()=>{fetchProductData(shopId)},[])

    return <>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          </div>
        </header>
        <div className="w-full h-min-screen flex flex-wrap justify-center items-center py-10 gap-2 px-3">
            {products.length === 0 ? <h2 className="text-[25px]">Your Don't have any Products</h2> : products.map((prod) => (
          <ProductCard product={prod} />
        ))}
        </div>
    
    </>
}

export default DashbordProduct;