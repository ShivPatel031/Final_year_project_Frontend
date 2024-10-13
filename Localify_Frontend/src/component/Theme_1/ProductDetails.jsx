import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.primary_image);
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleAddToCart = async () => {
    // Implement add to cart functionality here
    if(!user) navigate('/login');
    let data = {product_id:product._id,shop_id:product.shop_id,customer_id:user.id};
    console.log(data);
    try {
        const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/carts/add-to-cart`,data)
        console.log(response.message);
    } catch (error) {
        console.log("got erro while adding to cart "+error)
    }
  };

  const isDiscounted = product.price.discount > 0 && new Date(product.price.discount_expiry) > new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={selectedImage} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
          <div className="mt-4 flex space-x-2 overflow-x-auto">
            {[product.primary_image, ...product.product_images].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} - ${index}`}
                className="w-20 h-20 object-cover rounded cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Rating:</span>
            {renderStars(product.rating)}
            <span className="ml-2">({product.rating})</span>
          </div>
          <p className="text-xl font-semibold mb-2">
          <span>${product.price.original}</span>
            {/* {!isDiscounted ? (
              <>
                <span className="line-through text-gray-500 mr-2">${product.price.original}</span>
                <span className="text-red-600">${product.price.discounted_price}</span>
              </>
            ) : (
              
            )} */}
          </p>
          {isDiscounted && (
            <p className="text-sm text-green-600 mb-4">
              {product.price.discount}% off until {new Date(product.price.discount_expiry).toLocaleDateString()}
            </p>
          )}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value))))}
              className="border rounded px-2 py-1 w-16 text-center"
            />
            <span className="ml-2 text-sm text-gray-600">({product.stock} available)</span>
          </div>
          {user?.role !== 'shopkeeper' && <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Brand: {product.brand}</li>
              <li>Category: {product.category}</li>
              <li>Weight: {product.weight}g</li>
              <li>Dimensions: {product.dimensions.length}L x {product.dimensions.width}W x {product.dimensions.height}H cm</li>
              <li>Minimum Age: {product.min_age} years</li>
            </ul>
          </div>
          {product.video_url && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Product Video</h2>
              <a
                href={product.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Watch Product Video
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;