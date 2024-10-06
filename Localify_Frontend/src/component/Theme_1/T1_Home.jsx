// import { FaRegStar } from "react-icons/fa";
// import { BsTruck } from "react-icons/bs";
// import { MdOutlineHeadphones, MdStarRate } from "react-icons/md";
// import { MdOutlinePhone } from "react-icons/md";
// import { CiMail } from "react-icons/ci";
// import { IoLocationOutline } from "react-icons/io5";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";

// function ProductCard({ product }) {
//   return (
//     <div className="w-[300px] bg-white shadow-lg  flex flex-col justify-between items-center rounded-lg overflow-hidden border border-slate-300">
//       <img
//         src={product.primary_image}
//         alt={product.name}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//         <p className="text-gray-700 mb-4">{product.description}</p>
//         <div className="flex justify-between items-center mb-2">
//           <span className="text-lg font-bold">${product.price.original}</span>
//           <span className="text-sm font-medium flex items-center">
//             <MdStarRate />
//             {product.rating}
//           </span>
//         </div>
//         <button className="w-full h-[40px] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// function FeaturesCard({ data }) {
//   return (
//     <div className="w-[400px] h-[300px] border-slate-400 border-[2px] shadow-2xl rounded-md flex flex-col justify-evenly items-center">
//       <span className={`text-[40px] ${data.color}`}>{data.icon}</span>
//       <h3 className="text-[30px] font-semibold">{data.title}</h3>
//       <h4 className="text-[20px] text-center">{data.dec}</h4>
//     </div>
//   );
// }

// function T1_Home({ shopData }) {

//   const [featuredProducts,setFeaturedProducts]= useState([]);
//   const shopID=Cookies.get("Shopid")
//   const auth_token=Cookies.get("auth_token")
//   const user_token=Cookies.get("user_token")
//   console.log(featuredProducts);

//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/featuredProducts/${shopID}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'auth_token': auth_token,
//             'user_token': user_token,
//           },
//         });
//         // console.log(response.data.
//         //   featuredProducts)
//         setFeaturedProducts(response.data.featuredProducts);
//       } catch (error) {
//         console.log(error.message || "Data Fetch Failed");
//       }
//     };
  
//     fetchData();
  
//     // Optional cleanup, if needed
//     return () => {
//       // Cleanup logic (if any) or remove this block if not needed
//     };
//   }, []);

//   const features = [
//     {
//       icon: <FaRegStar />,
//       title: "Local Products",
//       dec: "Handpicking items from local",
//       color: "text-yellow-600",
//     },
//     {
//       icon: <BsTruck />,
//       title: "Fast Delivery",
//       dec: "Quick and reliable local delivery service",
//       color: "text-green-600",
//     },
//     {
//       icon: <MdOutlineHeadphones />,
//       title: "Customer Support",
//       dec: "Dedicated support for all your needs",
//       color: "text-blue-600",
//     },
//   ];

//   return (
//     <>
//       <div className="relative w-full h-[400px]">
//         <div className="w-full h-[60vh] bg-gradient-to-r from-red-500 to-purple-500"></div>
//         <h3 className="w-full text-[60px] absolute z-10 top-[25%] left-[4%] text-center text-white font-bold">
//           Welcome to {shopData.name}
//         </h3>
//         <p className="w-full text-[25px] absolute z-10 top-[50%] left-[4%] text-center text-white">
//           {shopData.tagline}
//         </p>
//       </div>
//       <div className="w-full mt-[40px]">
//         <h3 className="text-center text-[50px] font-semibold">Our Features</h3>
//         <div className="w-full h-[400px] flex justify-center items-center gap-[30px] mt-[20px]">
//           {features.map((data) => (
//             <FeaturesCard data={data} />
//           ))}
//         </div>
//       </div>
//       <h3 className="w-full text-center text-[40px] mt-[40px] font-semibold">
//         Our Products
//       </h3>
//       <div className="mt-[20px] flex flex-wrap gap-6 justify-center">
//         {featuredProducts.map((prod) => (
//           <ProductCard product={prod} />
//         ))}
//       </div>

//       <div className=" relative w-full h-[400px] mt-[30px] bg-slate-200">
//         <h3 className="absolute text-[30px] top-6 left-10 font-medium">
//           Shop Details
//         </h3>
//         <div className="w-full h-full flex flex-wrap">
//           <section className="absolute top-[30%] left-[7%]">
//             <p className="text-2xl font-medium">Since </p>
//             <p>
//               {shopData?.establishedYear &&
//                 JSON.stringify(shopData?.establishedYear).substring(1, 5)}
//             </p>
//           </section>
//           <section className="absolute top-[30%] left-[40%]">
//             <p className="text-2xl font-medium">Ratings </p>
//             <p>{shopData.ratings?.average}</p>
//           </section>
//           <section className="absolute top-[30%] left-[75%]">
//             <p className="text-2xl font-medium">Shiping </p>
//             <p>Zones: {shopData.shipping_info?.zones}</p>
//             <p>
//               Delivery Time {shopData.shipping_info?.delivery_time?.min}-
//               {shopData.shipping_info?.delivery_time?.max} bussiness days
//             </p>
//           </section>
//           <section className="absolute top-[65%] left-[7%]">
//             <p className="text-2xl font-medium">Category </p>
//             <p>{shopData.category}</p>
//           </section>
//         </div>
//       </div>

//       <div className="w-full mt-[30px] flex flex-col justify-center items-center p-10">
//         <h3 className="font-semibold text-[43px]">Contact Us</h3>
//         <div className="bg-slate-200 w-[400px] h-[200px] flex flex-col justify-center gap-3 rounded-md items-center p-5 mt-[20px]">
//           <h4 className="text-[20px] font-medium">Get in Touch</h4>
//           <section className="flex w-[70%] gap-1 items-center">
//             <CiMail className="text-[20px]" />
//             <p className="text-lg">{shopData.email}</p>
//           </section>
//           <section className="flex w-[70%] gap-1 items-center">
//             <MdOutlinePhone className="text-[20px]" />
//             <p className="text-lg">{shopData.contact}</p>
//           </section>
//           {shopData.location && (
//             <section className="flex w-[70%] gap-1 items-center">
//               <IoLocationOutline className="text-[20px]" />
//               <p className="text-lg">
//                 {shopData.location.city}, {shopData.location.state} ,
//                 {shopData.location.pincode}
//               </p>
//             </section>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default T1_Home;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaRegStar, FaTruck, FaHeadset, FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import T1_ProductCard from './T1_Productcard';



const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
    <Icon className="text-4xl text-indigo-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const T1_Home = ({ shopData }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const shopID = Cookies.get("Shopid");
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/featuredProducts/${shopData._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token,
            'user_token': user_token,
          },
        });
        setFeaturedProducts(response.data.featuredProducts);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    fetchData();
  }, [shopID, auth_token, user_token]);

  const features = [
    { icon: FaRegStar, title: "Local Products", description: "Handpicking items from local artisans" },
    { icon: FaTruck, title: "Fast Delivery", description: "Quick and reliable local delivery service" },
    { icon: FaHeadset, title: "Customer Support", description: "Dedicated support for all your needs" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{shopData.name}</h1>
          <p className="text-xl mb-8">{shopData.tagline}</p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <T1_ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Shop Details Timeline */}
      <div className="bg-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center">
              <h3 className="text-xl font-semibold mb-2">Established</h3>
              <p className="text-3xl font-bold text-indigo-600">
                {shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}
              </p>
            </div>
            <div className="mb-8 md:mb-0 text-center">
              <h3 className="text-xl font-semibold mb-2">Customer Rating</h3>
              <p className="text-3xl font-bold text-indigo-600">{shopData.ratings?.average} / 5</p>
            </div>
            <div className="mb-8 md:mb-0 text-center">
              <h3 className="text-xl font-semibold mb-2">Shipping Zones</h3>
              <p className="text-3xl font-bold text-indigo-600">{shopData.shipping_info?.zones}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Delivery Time</h3>
              <p className="text-3xl font-bold text-indigo-600">
                {shopData.shipping_info?.delivery_time?.min}-{shopData.shipping_info?.delivery_time?.max} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      {/* <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8">Stay updated with our latest products and offers!</p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="bg-indigo-800 px-6 py-2 rounded-r-md hover:bg-indigo-900 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div> */}

      {/* Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="bg-indigo-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors duration-300"
          onClick={() => {/* Implement contact modal or redirect */}}
        >
          <FaEnvelope className="text-2xl" />
        </button>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <FaEnvelope className="text-2xl mr-4 text-indigo-400" />
              <span>{shopData.email}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-2xl mr-4 text-indigo-400" />
              <span>{shopData.contact}</span>
            </div>
            {shopData.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl mr-4 text-indigo-400" />
                <span>{`${shopData.location.city}, ${shopData.location.state}, ${shopData.location.pincode}`}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default T1_Home;

