import React, { useState } from 'react';
import {X} from 'lucide-react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddProducts = ({shopId,fetchProductData}) => {
  const navigate = useNavigate();
  console.log(shopId);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    brand: '',
    video_url: '',
    primary_image: null,
    product_images: [],
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    min_age: 3,
    price: {
      original: 0,
      discount: 0,
      discount_expiry: '',
      discounted_price: 0
    },
    stock: 0,
    rating: 0,
    is_featured: false,
    is_bestseller: false,
    related_products: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("on change");
    if(name=="primary_image")
    {
      console.log("handling image");
      const {files} = e.target;
      setProduct((prevData) => ({
        ...prevData,
        [name]: files[0], // Only handle the first file
      }));
    }
    else{
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  }
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: parseFloat(value)
      }
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      price: {
        ...prev.price,
        [name]: name === 'discount_expiry' ? value : parseFloat(value)
      }
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(product);

    const data = new FormData();
    data.append("name", product.name);
    data.append("brand", product.brand);
    data.append("category", product.category);
    data.append("description", product.description);
    data.append("is_bestseller", product.is_bestseller);
    data.append("is_featured", product.is_featured);
    data.append("stock", product.stock);
    data.append("shopId",shopId);

    Object.keys(product.price).forEach((key) => {
      data.append(`price[${key}]`, product.price[key]);
    });

    // Add files
    data.append("primary_image",product.primary_image);
    
    try {
      console.log(data);
      const response = await axios.post(
        `http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/add`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");
      navigate('/dashbord');
      console.log(response.data);
      fetchProductData(shopId);
    } catch (error) {
      console.error("Error adding Product:", error);
      alert("Failed to add shop");
    }
  };

  return (
    <>
    <X className='absolute top-[40px] left-[100px]' onClick={()=>navigate('/dashbord')}/>

    <h2 className="text-2xl font-bold mb-4 text-center mt-[50px]">Add New Product</h2>
    <form onSubmit={handleSubmit} className="space-y-4 w-screen h-screen mx-auto p-6 flex flex-col items-center gap-10">
      <div className='flex w-full justify-evenly h-[70%]'>
        <div className='w-[45%] flex flex-col justify-evenly'>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* <div>
        <label htmlFor="video_url" className="block text-sm font-medium text-gray-700">Video URL</label>
        <input
          type="text"
          id="video_url"
          name="video_url"
          value={product.video_url}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div> */}

      <div>
        <label htmlFor="primary_image" className="block text-sm font-medium text-gray-700">Primary Image URL</label>
        <input
          type="file"
          id="primary_image"
          name="primary_image"
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* <div>
        <label htmlFor="product_images" className="block text-sm font-medium text-gray-700">Additional Image URLs (comma-separated)</label>
        <input
          type="text"
          id="product_images"
          name="product_images"
          value={product.product_images.join(',')}
          onChange={(e) => setProduct(prev => ({ ...prev, product_images: e.target.value.split(',') }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div> */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={product.weight}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      </div>

      <div className='w-[45%] flex flex-col justify-evenly'>

      {/* <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length</label>
          <input
            type="number"
            id="length"
            name="length"
            value={product.dimensions.length}
            onChange={handleDimensionChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
          <input
            type="number"
            id="width"
            name="width"
            value={product.dimensions.width}
            onChange={handleDimensionChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="number"
            id="height"
            name="height"
            value={product.dimensions.height}
            onChange={handleDimensionChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div> */}

      {/* <div>
        <label htmlFor="min_age" className="block text-sm font-medium text-gray-700">Minimum Age</label>
        <input
          type="number"
          id="min_age"
          name="min_age"
          min="3"
          value={product.min_age}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div> */}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="original" className="block text-sm font-medium text-gray-700">Original Price</label>
          <input
            type="number"
            id="original"
            name="original"
            value={product.price.original}
            onChange={handlePriceChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            min="0"
            max="100"
            value={product.price.discount}
            onChange={handlePriceChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="discount_expiry" className="block text-sm font-medium text-gray-700">Discount Expiry Date</label>
        <input
          type="date"
          id="discount_expiry"
          name="discount_expiry"
          value={product.price.discount_expiry}
          onChange={handlePriceChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={product.rating}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div> */}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_featured"
          name="is_featured"
          checked={product.is_featured}
          onChange={(e) => setProduct(prev => ({ ...prev, is_featured: e.target.checked }))}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Featured Product</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_bestseller"
          name="is_bestseller"
          checked={product.is_bestseller}
          onChange={(e) => setProduct(prev => ({ ...prev, is_bestseller: e.target.checked }))}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="is_bestseller" className="text-sm font-medium text-gray-700">Bestseller</label>
      </div>

      {/* <div>
        <label htmlFor="related_products" className="block text-sm font-medium text-gray-700">Related Product IDs (comma-separated)</label>
        <input
          type="text"
          id="related_products"
          name="related_products"
          value={product.related_products.join(',')}
          onChange={(e) => setProduct(prev => ({ ...prev, related_products: e.target.value.split(',') }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div> */}
      </div>
      </div>

      <button
        type="submit"
        className="w-[20%] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Product
      </button>
    </form>
    </>
  );
};

export default AddProducts;