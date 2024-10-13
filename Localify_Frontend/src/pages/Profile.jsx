import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Phone, Calendar, MapPin, Briefcase, Store, ShoppingCart, Trash2, Edit, Star, Linkedin, Twitter, Instagram, Video } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import MultiShopCart from '../component/MultiShopCart';

const cartData = [
  {
    shop_id: "66cf15a23d5b684caf739089",
    shopInfo: {
      name: "Shop Name",
      location: "Shop Location",
      logo: "/path/to/shop/logo.png"
    },
    products: [
      {
        _id: "67055c24dc416abec970852f",
        name: "Product Name",
        price: 19.99,
        quantity: 2,
        image: "/path/to/product/image.png"
      },
    ]
  },
];

const Profile = () => {
    const {id} = useParams();
    console.log(id);
    const [user,setUser] = useState(null);
    const [shop,setShop] = useState(null);
  const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");
  console.log(carts);

  // const fetchCartData = async()=>{
  //   const user_id=id;
  //   try {
  //     const response = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/carts/get-all-cart/${user_id}`);

  //     setCarts(response.data.data);
      
  //   } catch (error) {
  //     console.error("Error removing product from cart:", error);
  //   }
  // }

  const fetchShopData = async (shopId) => {
    try {
      const response = await axios(
        `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/${shopId}`,{
          headers: {
              'Content-Type': 'application/json', 
              'auth_token': auth_token, 
              'user_token': user_token 
          },});
      if(response) 
      {
        setShop(response.data)
      }
    } catch (error) {
      toast.error(error.message || "Data Fetch Failed");
    }
  };


  const fetchShopIfExist= async(id)=>{

      try {
          const respo = await axios(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/getId/${id}`);
          console.log(respo)
          if(respo) 
          {
            await fetchShopData(respo.data.shopId);
          }
      } catch (error) {
          console.log("shop not found")
      }
      
  }

  const fetchUserData = async () => {
    try {
      const response = await axios(
        `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/users/${id}`,{
          headers: {
              'Content-Type': 'application/json', 
              'auth_token': auth_token, 
              'user_token': user_token 
          },});
          console.log(response.data);
          await fetchShopIfExist(response.data._id);
          setUser(response.data);

    } catch (error) {
      toast.error(error.message || "Data Fetch Failed");
    }
  };
  // useEffect(()=>{
  //   async function getshops()
  //   {
  //     carts.forEach(async (data)=>{
  //       let products =[];
  //       let shopInfo = {};
  //       try {
  //         shopInfo= await axios(
  //           `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/${data.shop_id}`,{
  //             headers: {
  //                 'Content-Type': 'application/json', 
  //                 'auth_token': auth_token, 
  //                 'user_token': user_token 
  //             },});
  //       } catch (error) {
  //         toast.error(error.message || "Data Fetch Failed");
  //       }

  //       carts.products.forEach((d)=>{

  //       })
  //     })
  //   }
  //   getshops();
  // },[carts])

  useEffect(()=>{fetchUserData();},[]);
  useEffect(() => {
    if (user?.role === 'customer') {
      // fetchCartData();
    } else if (user?.role === 'shopkeeper') {
      setOrders([
        { id: '1', customer: 'John Doe', total: 30, status: 'Pending', date: '2024-09-01' },
        { id: '2', customer: 'Jane Smith', total: 50, status: 'Delivered', date: '2024-08-28' },
      ]);
    }
  }, [user?.role]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };


  if (!user) {
    return <div className="container mx-auto px-4 py-8">User data not available</div>;
  }

  return (
    <div className="container px-4 py-8 mt-14 min-h-screen">
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
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={user.image || 'https://via.placeholder.com/100'}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{`${user.firstName || ''} ${user.lastName || ''}`}</h1>
              <p className="text-lg text-gray-600 capitalize">{user.role || 'User'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-2" />
                {user.email || 'N/A'}
              </p>
              <p className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 mr-2" />
                {user.contact || 'N/A'}
              </p>
              <p className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" />
                Born on {formatDate(user.dob)}
              </p>
              <p className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-2" />
                {user.gender || 'N/A'}
              </p>
            </div>
            <div className="space-y-3">
              <p className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" />
                Joined on {formatDate(user.createdAt)}
              </p>
              <p className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" />
                Last updated on {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        
        
        {/* {user.role === 'customer' && <MultiShopCart cartData={cartData}/>} */}

        {user.role === 'shopkeeper' && shop && (
          <>
            <div className="bg-gray-100 p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shop Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <Store className="w-5 h-5 mr-2" />
                    {shop.name || 'N/A'}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-2" />
                    {shop.location ? `${shop.location.city}, ${shop.location.state}, ${shop.location.country}` : 'N/A'}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-2" />
                    {shop.email || 'N/A'}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-2" />
                    {shop.contact || 'N/A'}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Established in {shop.establishedYear ? new Date(shop.establishedYear.$date).getFullYear() : 'N/A'}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Star className="w-5 h-5 mr-2" />
                    {shop.ratings ? `${shop.ratings.average} (${shop.ratings.count} reviews)` : 'No ratings yet'}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {shop.category || 'N/A'}
                  </p>
                  <div className="flex space-x-4">
                    {shop.linkedin && <a href={shop.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5" /></a>}
                    {shop.twitter && <a href={shop.twitter} target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5" /></a>}
                    {shop.instagram && <a href={shop.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5" /></a>}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{shop.brief_info || 'No description available.'}</p>
              {shop.keyPeople && shop.keyPeople.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Key People</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shop.keyPeople.map((person) => (
                      <div key={person._id.$oid} className="bg-white p-4 rounded-lg shadow">
                        <img src={person.keyPeopleImage} alt={person.name} className="w-full h-56 rounded-lg mb-2 object-cover object-top" />
                        <h4 className="font-semibold">{person.name}</h4>
                        <p className="text-sm text-gray-600">{person.position}</p>
                        <p className="text-sm mt-1">{person.info}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {shop.other_images && shop.other_images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Media</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {shop.other_images.map((image, index) => (
                      <img key={index} src={image} alt={`Shop image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    ))}
                  </div>
                  {shop.video_url && (
                    <div className="mt-4">
                      <iframe className='w-full' height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
                      <a href={shop.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600">
                        <Video className="w-5 h-5 mr-2" />
                        Watch shop video
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
              {orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                <ul className="space-y-4">
                  {orders.map(order => (
                    <li key={order.id} className="bg-white p-4 rounded-lg shadow">
                      <p><strong>Order #{order.id}</strong></p>
                      <p>Customer: {order.customer}</p>
                      <p>Total: ${order.total}</p>
                      <p>Status: {order.status}</p>
                      <p>Date: {formatDate(order.date)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};


export default Profile;