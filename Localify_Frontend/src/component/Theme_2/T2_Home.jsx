import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaRegStar, FaTruck, FaHeadset, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => (
  <motion.div
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={product.primary_image} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-100 mb-2 truncate">{product.name}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-green-400">${product.price.original}</span>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-gray-300">{product.rating}</span>
        </div>
      </div>
      <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">
        Add to Cart
      </button>
    </div>
  </motion.div>
);

const FeatureCarousel = ({ features }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentFeature ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="text-5xl text-purple-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-100 mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
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
      className="fixed top-0 left-0 h-1 bg-green-400 z-50"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

const T2_Home = ({ shopData }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const shopID = Cookies.get("Shopid");
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");

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
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <ScrollProgress />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">{shopData.name}</h1>
        <nav className="mb-8">
          <ul className="space-y-2">
            <li><a href="#featured" className="text-gray-300 hover:text-white">Featured Products</a></li>
            <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
            <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
          </ul>
        </nav>
        <div className="text-sm text-gray-400">
          <p>Established: {shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}</p>
          <p>Rating: {shopData.ratings?.average} / 5</p>
          <p>Shipping Zones: {shopData.shipping_info?.zones}</p>
          <p>Delivery: {shopData.shipping_info?.delivery_time?.min}-{shopData.shipping_info?.delivery_time?.max} days</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">{shopData.tagline}</h2>
          <p className="text-xl text-gray-400">{shopData.category}</p>
        </header>

        {/* Features Carousel */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Features</h2>
          <FeatureCarousel features={features} />
        </section>

        {/* Featured Products */}
        <section id="featured" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* About Us Timeline */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
          <div className="relative border-l-4 border-purple-600 pl-8 py-4 space-y-8">
            <div className="relative">
              <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
              <h3 className="text-xl font-bold">Established</h3>
              <p className="text-gray-400">{shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1, 5)}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
              <h3 className="text-xl font-bold">Milestone Reached</h3>
              <p className="text-gray-400">1000+ Happy Customers</p>
            </div>
            <div className="relative">
              <div className="absolute -left-11 w-6 h-6 bg-purple-600 rounded-full"></div>
              <h3 className="text-xl font-bold">Expanded Operations</h3>
              <p className="text-gray-400">Now serving {shopData.shipping_info?.zones} zones</p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="bg-gray-800 rounded-lg p-6 flex flex-wrap gap-8">
            <div className="flex items-center">
              <FaEnvelope className="text-2xl text-purple-500 mr-4" />
              <span>{shopData.email}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-2xl text-purple-500 mr-4" />
              <span>{shopData.contact}</span>
            </div>
            {shopData.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl text-purple-500 mr-4" />
                <span>{`${shopData.location.city}, ${shopData.location.state}, ${shopData.location.pincode}`}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Floating Cart */}
      <motion.div
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
      </motion.div>
    </div>
  );
};

export default T2_Home;