import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Phone, Calendar, MapPin, Briefcase, Store, ShoppingCart, Trash2, Edit, Star, Linkedin, Twitter, Instagram, Video } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const Profile = () => {
    const {id} = useParams();
    console.log(id);
    const [user,setUser] = useState(null);
    const [shop,setShop] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingCartItem, setEditingCartItem] = useState(null);
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");

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

  useEffect(()=>{fetchUserData();},[]);
  useEffect(() => {
    if (user?.role === 'customer') {
      setCartItems([
        { id: '1', name: 'Product 1', price: 10, quantity: 2 },
        { id: '2', name: 'Product 2', price: 20, quantity: 1 },
      ]);
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

  const handleEditCartItem = (id) => {
    setEditingCartItem(id);
  };

  const handleUpdateCartItem = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    setEditingCartItem(null);
  };

  const handleDeleteCartItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-8">User data not available</div>;
  }

  return (
    <div className="container px-4 py-8 mt-14">
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
                Born on {formatDate(user.dob?.$date)}
              </p>
              <p className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-2" />
                {user.gender || 'N/A'}
              </p>
            </div>
            <div className="space-y-3">
              <p className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" />
                Joined on {formatDate(user.createdAt?.$date)}
              </p>
              <p className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" />
                Last updated on {formatDate(user.updatedAt?.$date)}
              </p>
            </div>
          </div>
        </div>
        
        {user.role === 'customer' && (
          <div className="bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                    <span>{item.name} - ${item.price}</span>
                    {editingCartItem === item.id ? (
                      <div>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateCartItem(item.id, parseInt(e.target.value))}
                          className="w-16 px-2 py-1 border rounded mr-2"
                        />
                        <button onClick={() => setEditingCartItem(null)} className="text-blue-600">
                          Save
                        </button>
                      </div>
                    ) : (
                      <div>
                        <span className="mr-4">Quantity: {item.quantity}</span>
                        <button onClick={() => handleEditCartItem(item.id)} className="text-blue-600 mr-2">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeleteCartItem(item.id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

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
                        <img src={person.keyPeopleImage} alt={person.name} className="w-full h-40 object-cover rounded-lg mb-2" />
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
                      <a href={shop.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600">
                        <Video className="w-5 h-5 mr-2" />
                        Watch shop video
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="p-6">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Profile.propTypes = {
//   user: PropTypes.shape({
//     _id: PropTypes.shape({ $oid: PropTypes.string }),
//     email: PropTypes.string,
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     dob: PropTypes.shape({ $date: PropTypes.string }),
//     gender: PropTypes.string,
//     role: PropTypes.oneOf(['shopkeeper', 'customer']),
//     contact: PropTypes.string,
//     image: PropTypes.string,
//     createdAt: PropTypes.shape({ $date: PropTypes.string }),
//     updatedAt: PropTypes.shape({ $date: PropTypes.string }),
//   }),
//   shop: PropTypes.shape({
//     _id: PropTypes.shape({ $oid: PropTypes.string }),
//     name: PropTypes.string,
//     location: PropTypes.shape({
//       city: PropTypes.string,
//       state: PropTypes.string,
//       country: PropTypes.string,
//       pincode: PropTypes.string,
//       latitude: PropTypes.number,
//       longitude: PropTypes.number,
//     }),
//     keyPeople: PropTypes.arrayOf(PropTypes.shape({
//       name: PropTypes.string,
//       info: PropTypes.string,
//       position: PropTypes.string,
//       keyPeopleImage: PropTypes.string,
//       _id: PropTypes.shape({ $oid: PropTypes.string }),
//     })),
//     tagline: PropTypes.string,
//     brief_info: PropTypes.string,
//     shopkeeper_id: PropTypes.shape({ $oid: PropTypes.string }),
//     establishedYear: PropTypes.shape({ $date: PropTypes.string }),
//     email: PropTypes.string,
//     contact: PropTypes.string,
//     linkedin: PropTypes.string,
//     twitter: PropTypes.string,
//     instagram: PropTypes.string,
//     logo: PropTypes.string,
//     banner_image: PropTypes.string,
//     other_images: PropTypes.arrayOf(PropTypes.string),
//     video_url: PropTypes.string,
//     theme: PropTypes.string,
//     ratings: PropTypes.shape({
//       average: PropTypes.number,
//       count: PropTypes.number,
//     }),
//     shipping_info: PropTypes.shape({
//       delivery_time: PropTypes.shape({
//         min: PropTypes.number,
//         max: PropTypes.number,
//       }),
//       zones: PropTypes.string,
//     }),
//     category: PropTypes.string,
//     featured_products: PropTypes.array,
//     visitors: PropTypes.shape({
//       visitorId: PropTypes.array,
//       count: PropTypes.number,
//     }),
//   }),
// };

export default Profile;