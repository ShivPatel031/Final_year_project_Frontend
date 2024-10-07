import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaRegStar, FaTruck, FaHeadset, FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import T1_ProductCard from './T1_Productcard';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
          <button
            onClick={()=>{navigate(`/shops/${shopData._id}/product`)}} 
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
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

