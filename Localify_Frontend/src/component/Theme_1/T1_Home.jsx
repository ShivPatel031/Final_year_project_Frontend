import { FaRegStar } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { MdOutlineHeadphones, MdStarRate } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function ProductCard({ product }) {
  return (
    <div className="w-[300px] bg-white shadow-lg  flex flex-col justify-between items-center rounded-lg overflow-hidden border border-slate-300">
      <img
        src={product.primary_image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">${product.price.original}</span>
          <span className="text-sm font-medium flex items-center">
            <MdStarRate />
            {product.rating}
          </span>
        </div>
        <button className="w-full h-[40px] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function FeaturesCard({ data }) {
  return (
    <div className="w-[400px] h-[300px] border-slate-400 border-[2px] shadow-2xl rounded-md flex flex-col justify-evenly items-center">
      <span className={`text-[40px] ${data.color}`}>{data.icon}</span>
      <h3 className="text-[30px] font-semibold">{data.title}</h3>
      <h4 className="text-[20px] text-center">{data.dec}</h4>
    </div>
  );
}

function T1_Home({ shopData }) {

  const [featuredProducts,setFeaturedProducts]= useState([]);
  const shopID=Cookies.get("Shopid")
  const auth_token=Cookies.get("auth_token")
  const user_token=Cookies.get("user_token")
  console.log(featuredProducts);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/featuredProducts/${shopID}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token,
            'user_token': user_token,
          },
        });
        // console.log(response.data.
        //   featuredProducts)
        setFeaturedProducts(response.data.featuredProducts);
      } catch (error) {
        console.log(error.message || "Data Fetch Failed");
      }
    };
  
    fetchData();
  
    // Optional cleanup, if needed
    return () => {
      // Cleanup logic (if any) or remove this block if not needed
    };
  }, []);
  

  // useEffect(()=>fetchFeaturedProducts(),[]);

  const features = [
    {
      icon: <FaRegStar />,
      title: "Local Products",
      dec: "Handpicking items from local",
      color: "text-yellow-600",
    },
    {
      icon: <BsTruck />,
      title: "Fast Delivery",
      dec: "Quick and reliable local delivery service",
      color: "text-green-600",
    },
    {
      icon: <MdOutlineHeadphones />,
      title: "Customer Support",
      dec: "Dedicated support for all your needs",
      color: "text-blue-600",
    },
  ];

  return (
    <>
      <div className="relative w-full h-[400px]">
        <div className="w-full h-[60vh] bg-gradient-to-r from-red-500 to-purple-500"></div>
        <h3 className="w-full text-[60px] absolute z-10 top-[25%] left-[4%] text-center text-white font-bold">
          Welcome to {shopData.name}
        </h3>
        <p className="w-full text-[25px] absolute z-10 top-[50%] left-[4%] text-center text-white">
          {shopData.tagline}
        </p>
      </div>
      <div className="w-full mt-[40px]">
        <h3 className="text-center text-[50px] font-semibold">Our Features</h3>
        <div className="w-full h-[400px] flex justify-center items-center gap-[30px] mt-[20px]">
          {features.map((data) => (
            <FeaturesCard data={data} />
          ))}
        </div>
      </div>
      <h3 className="w-full text-center text-[40px] mt-[40px] font-semibold">
        Our Products
      </h3>
      <div className="mt-[20px] flex flex-wrap gap-6 justify-center">
        {featuredProducts.map((prod) => (
          <ProductCard product={prod} />
        ))}
      </div>

      <div className=" relative w-full h-[400px] mt-[30px] bg-slate-200">
        <h3 className="absolute text-[30px] top-6 left-10 font-medium">
          Shop Details
        </h3>
        <div className="w-full h-full flex flex-wrap">
          <section className="absolute top-[30%] left-[7%]">
            <p className="text-2xl font-medium">Since </p>
            <p>
              {shopData?.establishedYear &&
                JSON.stringify(shopData?.establishedYear).substring(1, 5)}
            </p>
          </section>
          <section className="absolute top-[30%] left-[40%]">
            <p className="text-2xl font-medium">Ratings </p>
            <p>{shopData.ratings?.average}</p>
          </section>
          <section className="absolute top-[30%] left-[75%]">
            <p className="text-2xl font-medium">Shiping </p>
            <p>Zones: {shopData.shipping_info?.zones}</p>
            <p>
              Delivery Time {shopData.shipping_info?.delivery_time?.min}-
              {shopData.shipping_info?.delivery_time?.max} bussiness days
            </p>
          </section>
          <section className="absolute top-[65%] left-[7%]">
            <p className="text-2xl font-medium">Category </p>
            <p>{shopData.category}</p>
          </section>
        </div>
      </div>

      <div className="w-full mt-[30px] flex flex-col justify-center items-center p-10">
        <h3 className="font-semibold text-[43px]">Contact Us</h3>
        <div className="bg-slate-200 w-[400px] h-[200px] flex flex-col justify-center gap-3 rounded-md items-center p-5 mt-[20px]">
          <h4 className="text-[20px] font-medium">Get in Touch</h4>
          <section className="flex w-[70%] gap-1 items-center">
            <CiMail className="text-[20px]" />
            <p className="text-lg">{shopData.email}</p>
          </section>
          <section className="flex w-[70%] gap-1 items-center">
            <MdOutlinePhone className="text-[20px]" />
            <p className="text-lg">{shopData.contact}</p>
          </section>
          {shopData.location && (
            <section className="flex w-[70%] gap-1 items-center">
              <IoLocationOutline className="text-[20px]" />
              <p className="text-lg">
                {shopData.location.city}, {shopData.location.state} ,
                {shopData.location.pincode}
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default T1_Home;
