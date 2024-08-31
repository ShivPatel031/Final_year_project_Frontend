import { useEffect, useState } from "react";
import ShopNav from "../component/ShopNav";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
axios.defaults.withCredentials = true;

function ProductCard() {
  return (
    <div className="w-[300px] h-[250px] bg-slate-300 rounded-md m-4 "></div>
  );
}

function FeaturesCard() {
  return <div className="w-[400px] h-[350px] bg-slate-400 rounded-md"></div>;
}

function ShopDetails() {
  return <div></div>;
}

function ShopPage() {
  const [shopData, setShopData] = useState({});
  const shopId = Cookies.get("Shopid");

  const fetchShopData = async () => {
    try {
      const response = await fetch(
        `http://192.168.82.203:3000/api/shops/${shopId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setShopData(data);
    } catch (error) {
      toast.error(error.message || "Data Fetch Failed");
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  return (
    <div className="w-full">
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
      <ShopNav />
      <div className="relative w-full h-[500px]">
        <div className="w-full h-[500px] bg-gradient-to-r from-red-500 to-purple-500"></div>
        <h3 className="w-full text-[60px] absolute z-10 top-[200px] left-[50px] text-center text-white font-bold">
          Welcome to Shop
        </h3>
        <p className="w-full text-[25px] absolute z-10 top-[290px] left-[50px] text-center text-white">
          Discover our unique products and experience the best of local shopping
          online.
        </p>
      </div>
      <div className="w-full mt-[40px]">
        <h3 className="text-center text-[50px] font-semibold">Our Features</h3>
        <div className="w-full flex justify-center gap-[30px] mt-[20px]">
          <FeaturesCard />
          <FeaturesCard />
          <FeaturesCard />
        </div>
      </div>
      <h3 className="w-full text-center text-[40px] mt-[40px] font-semibold">
        Our Products
      </h3>
      <div className="flex flex-wrap justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div className=" relative w-full h-[400px] mt-[30px] bg-slate-200">
        <h3 className="absolute text-[30px] top-6 left-5 font-medium">
          Shop Details
        </h3>
        <div className="flex flex-wrap">
          <ShopDetails />
        </div>
      </div>

      <div className="w-full mt-[30px] flex flex-col justify-center items-center">
        <h3 className="font-semibold text-[50px]">Contact Us</h3>
        <div className="bg-slate-200 w-[500px] h-[300px] flex flex-col rounded-md items-center p-5 mt-[20px]">
          <h4 className="text-[20px] font-medium">Get in Touch</h4>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
