// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { motion } from 'framer-motion';
// import { FaShoppingCart, FaStar, FaRegStar, FaTruck, FaHeadset, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// const ProductCard = ({ product }) => (
//   <motion.div
//     className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
//     whileHover={{ scale: 1.05 }}
//     transition={{ duration: 0.3 }}
//   >
//     <img src={product.primary_image} alt={product.name} className="w-full h-48 object-cover" />
//     <div className="p-4">
//       <h3 className="text-xl font-bold text-gray-100 mb-2 truncate">{product.name}</h3>
//       <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
//       <div className="flex justify-between items-center">
//         <span className="text-2xl font-bold text-green-400">${product.price.original}</span>
//         <div className="flex items-center">
//           <FaStar className="text-yellow-400 mr-1" />
//           <span className="text-gray-300">{product.rating}</span>
//         </div>
//       </div>
//       <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">
//         Add to Cart
//       </button>
//     </div>
//   </motion.div>
// );

// const FeatureCarousel = ({ features }) => {
//   const [currentFeature, setCurrentFeature] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentFeature((prev) => (prev + 1) % features.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [features.length]);

//   return (
//     <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
//       {features.map((feature, index) => (
//         <motion.div
//           key={index}
//           className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: index === currentFeature ? 1 : 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <feature.icon className="text-5xl text-purple-500 mb-4" />
//           <h3 className="text-2xl font-bold text-gray-100 mb-2">{feature.title}</h3>
//           <p className="text-gray-400">{feature.description}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const ScrollProgress = () => {
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (window.pageYOffset / totalHeight) * 100;
//       setScrollProgress(progress);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <motion.div
//       className="fixed top-0 left-0 h-1 bg-green-400 z-50"
//       style={{ width: `${scrollProgress}%` }}
//     />
//   );
// };

// const T2_Home = ({ shopData }) => {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [cartItems, setCartItems] = useState(0);
//   const shopID = Cookies.get("Shopid");
//   const auth_token = Cookies.get("auth_token");
//   const user_token = Cookies.get("user_token");

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
//         setFeaturedProducts(response.data.featuredProducts);
//       } catch (error) {
//         console.error("Failed to fetch featured products:", error);
//       }
//     };

//     fetchData();
//   }, [shopID, auth_token, user_token]);

//   const features = [
//     { icon: FaRegStar, title: "Local Products", description: "Handpicking items from local artisans" },
//     { icon: FaTruck, title: "Fast Delivery", description: "Quick and reliable local delivery service" },
//     { icon: FaHeadset, title: "Customer Support", description: "Dedicated support for all your needs" },
//   ];

//   return (
//     <div className="bg-gray-900 min-h-screen text-gray-100 flex">
//       <ScrollProgress />
      
//       {/* Sidebar */}
//       <div className="left-0 top-0 bottom-0 w-[50%] bg-gray-800 p-6">
//         <h1 className="text-3xl font-bold mb-6">{shopData.name}</h1>
//         <nav className="mb-8">
//           <ul className="space-y-2">
//             <li><a href="#featured" className="text-gray-300 hover:text-white">Featured Products</a></li>
//             <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
//             <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
//           </ul>
//         </nav>
//         <div className="text-sm text-gray-400">
//           <p>Established: {shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}</p>
//           <p>Rating: {shopData.ratings?.average} / 5</p>
//           <p>Shipping Zones: {shopData.shipping_info?.zones}</p>
//           <p>Delivery: {shopData.shipping_info?.delivery_time?.min}-{shopData.shipping_info?.delivery_time?.max} days</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-8">
//         <header className="mb-12 text-center">
//           <h2 className="text-4xl font-bold mb-4">{shopData.tagline}</h2>
//           <p className="text-xl text-gray-400">{shopData.category}</p>
//         </header>

//         {/* Features Carousel */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-6">Our Features</h2>
//           <FeatureCarousel features={features} />
//         </section>

//         {/* Featured Products */}
//         <section id="featured" className="mb-16">
//           <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </section>

//         {/* About Us Timeline */}
//         <section id="about" className="mb-16">
//           <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
//           <div className="relative border-l-4 border-purple-600 pl-8 py-4 space-y-8">
//             <div className="relative">
//               <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
//               <h3 className="text-xl font-bold">Established</h3>
//               <p className="text-gray-400">{shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}</p>
//             </div>
//             <div className="relative">
//               <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
//               <h3 className="text-xl font-bold">Milestone Reached</h3>
//               <p className="text-gray-400">1000+ Happy Customers</p>
//             </div>
//             <div className="relative">
//               <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
//               <h3 className="text-xl font-bold">Expanded Operations</h3>
//               <p className="text-gray-400">Now serving {shopData.shipping_info?.zones} zones</p>
//             </div>
//           </div>
//         </section>

//         {/* Contact Information */}
//         <section id="contact" className="mb-16">
//           <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
//           <div className="bg-gray-800 rounded-lg p-6 flex flex-wrap gap-8">
//             <div className="flex items-center">
//               <FaEnvelope className="text-2xl text-purple-500 mr-4" />
//               <span>{shopData.email}</span>
//             </div>
//             <div className="flex items-center">
//               <FaPhone className="text-2xl text-purple-500 mr-4" />
//               <span>{shopData.contact}</span>
//             </div>
//             {shopData.location && (
//               <div className="flex items-center">
//                 <FaMapMarkerAlt className="text-2xl text-purple-500 mr-4" />
//                 <span>{`${shopData.location.city}, ${shopData.location.state}, ${shopData.location.pincode}`}</span>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>

//       {/* Floating Cart */}
//       <motion.div
//         className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setCartItems(prev => prev + 1)}
//       >
//         <FaShoppingCart className="text-2xl" />
//         {cartItems > 0 && (
//           <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//             {cartItems}
//           </span>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default T2_Home;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const ProductSlider = ({ products }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextProduct = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
//   };

//   const prevProduct = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
//   };

//   return (
//     <div className="relative w-full h-96 overflow-hidden rounded-lg">
//       {products.map((product, index) => (
//         <div
//           key={product.id}
//           className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
//             index === currentIndex ? 'translate-x-0' : 'translate-x-full'
//           }`}
//         >
//           <img src={product.primary_image} alt={product.name} className="w-full h-full object-cover" />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//             <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
//             <p className="text-white mb-2">{product.description}</p>
//             <div className="flex justify-between items-center">
//               <span className="text-2xl font-bold text-yellow-400">${product.price.original}</span>
//               <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition-colors duration-300">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={prevProduct}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
//       >
//         ←
//       </button>
//       <button
//         onClick={nextProduct}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
//       >
//         →
//       </button>
//     </div>
//   );
// };

// const ShopStats = ({ shopData }) => (
//   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//     <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-lg text-white text-center">
//       <h3 className="text-2xl font-bold mb-2">{shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}</h3>
//       <p className="text-sm">Established</p>
//     </div>
//     <div className="bg-gradient-to-br from-green-500 to-teal-600 p-4 rounded-lg text-white text-center">
//       <h3 className="text-2xl font-bold mb-2">{shopData.ratings?.average}</h3>
//       <p className="text-sm">Average Rating</p>
//     </div>
//     <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-lg text-white text-center">
//       <h3 className="text-2xl font-bold mb-2">{shopData.shipping_info?.zones}</h3>
//       <p className="text-sm">Shipping Zones</p>
//     </div>
//     <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-lg text-white text-center">
//       <h3 className="text-2xl font-bold mb-2">{shopData.shipping_info?.delivery_time?.min}-{shopData.shipping_info?.delivery_time?.max}</h3>
//       <p className="text-sm">Delivery Days</p>
//     </div>
//   </div>
// );

// const T2_Home = ({ shopData }) => {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const auth_token = Cookies.get("auth_token");
//   const user_token = Cookies.get("user_token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/featuredProducts/${shopData._id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'auth_token': auth_token,
//             'user_token': user_token,
//           },
//         });
//         setFeaturedProducts(response.data.featuredProducts);
//       } catch (error) {
//         console.error("Failed to fetch featured products:", error);
//       }
//     };

//     fetchData();
//   }, [auth_token, user_token]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">

//       <main className="container mx-auto px-4 py-8">
//         <section className="mb-12">
//           <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">{shopData.tagline}</h2>
//           <p className="text-xl text-center text-gray-600">{shopData.category}</p>
//         </section>

//         <ShopStats shopData={shopData} />

//         <section className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
//           <p className="text-gray-600 mb-4">
//             Established in {shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}, 
//             {shopData.name} has been serving customers with excellence for years. We pride ourselves on our 
//             average rating of {shopData.ratings?.average}/5, showcasing our commitment to customer satisfaction.
//           </p>
//           <p className="text-gray-600">
//             We currently serve {shopData.shipping_info?.zones} shipping zones, ensuring that our products reach 
//             a wide range of customers. Our efficient delivery system guarantees that you receive your orders 
//             within {shopData.shipping_info?.delivery_time?.min}-{shopData.shipping_info?.delivery_time?.max} days.
//           </p>
//         </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
//             <ProductSlider products={featuredProducts} />
//           </section>
       
//           <section className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
//             <div className="space-y-4">
//               <p className="flex items-center text-gray-600">
//                 <span className="mr-2">📧</span> {shopData.email}
//               </p>
//               <p className="flex items-center text-gray-600">
//                 <span className="mr-2">📞</span> {shopData.contact}
//               </p>
//               {shopData.location && (
//                 <p className="flex items-center text-gray-600">
//                   <span className="mr-2">📍</span> {`${shopData.location.city}, ${shopData.location.state}, ${shopData.location.pincode}`}
//                 </p>
//               )}
//             </div>
//           </section>
     
//       </main>

//     </div>
//   );
// };

// export default T2_Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaRegStar, FaTruck, FaHeadset, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import T2_ProductCard from './T2_ProductCard';



const FeatureCarousel = ({ features }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentFeature ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="text-5xl text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-purple-600 z-50"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

const ShopStats = ({ shopData }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <FaCalendar className="text-2xl text-purple-600 mb-2" />
      <p className="text-sm text-gray-600">Established</p>
      <p className="text-lg font-bold text-gray-800">{shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <FaStar className="text-2xl text-purple-600 mb-2" />
      <p className="text-sm text-gray-600">Rating</p>
      <p className="text-lg font-bold text-gray-800">{shopData.ratings?.average} / 5</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <FaTruck className="text-2xl text-purple-600 mb-2" />
      <p className="text-sm text-gray-600">Shipping Zones</p>
      <p className="text-lg font-bold text-gray-800">{shopData.shipping_info?.zones}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <FaHeadset className="text-2xl text-purple-600 mb-2" />
      <p className="text-sm text-gray-600">Delivery Time</p>
      <p className="text-lg font-bold text-gray-800">{shopData.shipping_info?.delivery_time?.min}-{shopData.shipping_info?.delivery_time?.max} days</p>
    </div>
  </div>
);

const T2_Home = ({ shopData }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/featuredProducts/${shopData._id}`, {
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
  }, [auth_token, user_token]);

  const features = [
    { icon: FaRegStar, title: "Local Products", description: "Handpicking items from local artisans" },
    { icon: FaTruck, title: "Fast Delivery", description: "Quick and reliable local delivery service" },
    { icon: FaHeadset, title: "Customer Support", description: "Dedicated support for all your needs" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <ScrollProgress />
      
      <header className="bg-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{shopData.name}</h1>
          <p className="text-xl">{shopData.tagline}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ShopStats shopData={shopData} />

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Features</h2>
          <FeatureCarousel features={features} />
        </section>

        <section id="featured" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <T2_ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative border-l-4 border-purple-600 pl-8 py-4 space-y-8">
              <div className="relative">
                <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold">Established</h3>
                <p className="text-gray-600">{shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold">Milestone Reached</h3>
                <p className="text-gray-600">1000+ Happy Customers</p>
              </div>
              <div className="relative">
                <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold">Expanded Operations</h3>
                <p className="text-gray-600">Now serving {shopData.shipping_info?.zones} zones</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-wrap gap-8">
            <div className="flex items-center">
              <FaEnvelope className="text-2xl text-purple-600 mr-4" />
              <span>{shopData.email}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-2xl text-purple-600 mr-4" />
              <span>{shopData.contact}</span>
            </div>
            {shopData.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl text-purple-600 mr-4" />
                <span>{`${shopData.location.city}, ${shopData.location.state}, ${shopData.location.pincode}`}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* <motion.div
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCartItems(prev => prev + 1)}
      >
        <FaShoppingCart className="text-2xl" />
        {cartItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartItems}
          </span>
        )}
      </motion.div> */}
    </div>
  );
};

export default T2_Home;

