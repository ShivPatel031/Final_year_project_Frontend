// import React, { useState } from 'react';
// import {X} from 'lucide-react'
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// const AddProducts = ({shopId,fetchProductData}) => {
//   const navigate = useNavigate();
//   console.log(shopId);
//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     description: '',
//     brand: '',
//     video_url: '',
//     primary_image: null,
//     product_images: [],
//     weight: 0,
//     dimensions: {
//       length: 0,
//       width: 0,
//       height: 0
//     },
//     min_age: 3,
//     price: {
//       original: 0,
//       discount: 0,
//       discount_expiry: '',
//       discounted_price: 0
//     },
//     stock: 0,
//     rating: 0,
//     is_featured: false,
//     is_bestseller: false,
//     related_products: []
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log("on change");
//     if(name=="primary_image")
//     {
//       console.log("handling image");
//       const {files} = e.target;
//       setProduct((prevData) => ({
//         ...prevData,
//         [name]: files[0], // Only handle the first file
//       }));
//     }
//     else{
//     setProduct(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }
//   };

//   const handleDimensionChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({
//       ...prev,
//       dimensions: {
//         ...prev.dimensions,
//         [name]: parseFloat(value)
//       }
//     }));
//   };

//   const handlePriceChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({
//       ...prev,
//       price: {
//         ...prev.price,
//         [name]: name === 'discount_expiry' ? value : parseFloat(value)
//       }
//     }));
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     console.log(product);

//     const data = new FormData();
//     data.append("name", product.name);
//     data.append("brand", product.brand);
//     data.append("category", product.category);
//     data.append("description", product.description);
//     data.append("is_bestseller", product.is_bestseller);
//     data.append("is_featured", product.is_featured);
//     data.append("stock", product.stock);
//     data.append("shopId",shopId);

//     Object.keys(product.price).forEach((key) => {
//       data.append(`price[${key}]`, product.price[key]);
//     });

//     // Add files
//     data.append("primary_image",product.primary_image);
    
//     try {
//       console.log(data);
//       const response = await axios.post(
//         `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/add`,
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("Product added successfully!");
//       navigate('/dashbord');
//       console.log(response.data);
//       fetchProductData(shopId);
//     } catch (error) {
//       console.error("Error adding Product:", error);
//       alert("Failed to add shop");
//     }
//   };

//   return (
//     <>
//     <X className='absolute top-[40px] left-[100px]' onClick={()=>navigate('/dashbord')}/>

//     <h2 className="text-2xl font-bold mb-4 text-center mt-[50px]">Add New Product</h2>
//     <form onSubmit={handleSubmit} className="space-y-4 w-screen h-screen mx-auto p-6 flex flex-col items-center gap-10">
//       <div className='flex w-full justify-evenly h-[70%]'>
//         <div className='w-[45%] flex flex-col justify-evenly'>
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>

//       <div>
//         <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//         <input
//           type="text"
//           id="category"
//           name="category"
//           value={product.category}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       <div>
//         <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
//         <input
//           type="text"
//           id="brand"
//           name="brand"
//           value={product.brand}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       {/* <div>
//         <label htmlFor="video_url" className="block text-sm font-medium text-gray-700">Video URL</label>
//         <input
//           type="text"
//           id="video_url"
//           name="video_url"
//           value={product.video_url}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div> */}

//       <div>
//         <label htmlFor="primary_image" className="block text-sm font-medium text-gray-700">Primary Image URL</label>
//         <input
//           type="file"
//           id="primary_image"
//           name="primary_image"
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       {/* <div>
//         <label htmlFor="product_images" className="block text-sm font-medium text-gray-700">Additional Image URLs (comma-separated)</label>
//         <input
//           type="text"
//           id="product_images"
//           name="product_images"
//           value={product.product_images.join(',')}
//           onChange={(e) => setProduct(prev => ({ ...prev, product_images: e.target.value.split(',') }))}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div> */}
//       <div>
//         <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
//         <input
//           type="number"
//           id="weight"
//           name="weight"
//           value={product.weight}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       </div>

//       <div className='w-[45%] flex flex-col justify-evenly'>

//       {/* <div className="grid grid-cols-3 gap-4">
//         <div>
//           <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length</label>
//           <input
//             type="number"
//             id="length"
//             name="length"
//             value={product.dimensions.length}
//             onChange={handleDimensionChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
//           <input
//             type="number"
//             id="width"
//             name="width"
//             value={product.dimensions.width}
//             onChange={handleDimensionChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
//           <input
//             type="number"
//             id="height"
//             name="height"
//             value={product.dimensions.height}
//             onChange={handleDimensionChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//       </div> */}

//       <div>
//         <label htmlFor="min_age" className="block text-sm font-medium text-gray-700">Minimum Age</label>
//         <input
//           type="number"
//           id="min_age"
//           name="min_age"
//           min="3"
//           value={product.min_age}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="original" className="block text-sm font-medium text-gray-700">Original Price</label>
//           <input
//             type="number"
//             id="original"
//             name="original"
//             value={product.price.original}
//             onChange={handlePriceChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
//           <input
//             type="number"
//             id="discount"
//             name="discount"
//             min="0"
//             max="100"
//             value={product.price.discount}
//             onChange={handlePriceChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//       </div>

//       <div>
//         <label htmlFor="discount_expiry" className="block text-sm font-medium text-gray-700">Discount Expiry Date</label>
//         <input
//           type="date"
//           id="discount_expiry"
//           name="discount_expiry"
//           value={product.price.discount_expiry}
//           onChange={handlePriceChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       <div>
//         <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
//         <input
//           type="number"
//           id="stock"
//           name="stock"
//           value={product.stock}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       {/* <div>
//         <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
//         <input
//           type="number"
//           id="rating"
//           name="rating"
//           min="0"
//           max="5"
//           step="0.1"
//           value={product.rating}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div> */}

//       <div className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           id="is_featured"
//           name="is_featured"
//           checked={product.is_featured}
//           onChange={(e) => setProduct(prev => ({ ...prev, is_featured: e.target.checked }))}
//           className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Featured Product</label>
//       </div>

//       <div className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           id="is_bestseller"
//           name="is_bestseller"
//           checked={product.is_bestseller}
//           onChange={(e) => setProduct(prev => ({ ...prev, is_bestseller: e.target.checked }))}
//           className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         <label htmlFor="is_bestseller" className="text-sm font-medium text-gray-700">Bestseller</label>
//       </div>

//       {/* <div>
//         <label htmlFor="related_products" className="block text-sm font-medium text-gray-700">Related Product IDs (comma-separated)</label>
//         <input
//           type="text"
//           id="related_products"
//           name="related_products"
//           value={product.related_products.join(',')}
//           onChange={(e) => setProduct(prev => ({ ...prev, related_products: e.target.value.split(',') }))}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div> */}
//       </div>
//       </div>

//       <button
//         type="submit"
//         className="w-[20%] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         Add Product
//       </button>
//     </form>
//     </>
//   );
// };

// export default AddProducts;

import React, { useState, forwardRef } from 'react'
import { X, Check } from 'lucide-react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import * as LabelPrimitive from "@radix-ui/react-label"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

// Utility function to conditionally join classNames
const cn = (...inputs) => inputs.filter(Boolean).join(" ")

// Button Component
const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
          "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "h-10 py-2 px-4": size === "default",
          "h-9 px-3 rounded-md": size === "sm",
          "h-11 px-8 rounded-md": size === "lg",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

// Input Component
const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

// Textarea Component
const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

// Label Component
const Label = forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))

// Checkbox Component
const Checkbox = forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

// Main AddProducts Component
export default function AddProducts({ shopId, fetchProductData }) {
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    brand: '',
    primary_image: null,
    weight: 0,
    min_age: 3,
    price: {
      original: 0,
      discount: 0,
      discount_expiry: '',
    },
    stock: 0,
    is_featured: false,
    is_bestseller: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (name === "primary_image") {
      setProduct((prev) => ({ ...prev, [name]: files[0] }))
    } else if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked }))
    } else if (name.includes("price.")) {
      const priceField = name.split(".")[1]
      setProduct((prev) => ({
        ...prev,
        price: { ...prev.price, [priceField]: value }
      }))
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(product).forEach((key) => {
      if (key === "price") {
        Object.keys(product.price).forEach((priceKey) => {
          formData.append(`price[${priceKey}]`, product.price[priceKey])
        })
      } else if (key === "primary_image") {
        formData.append(key, product[key])
      } else {
        formData.append(key, product[key])
      }
    })
    formData.append("shopId", shopId)

    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      alert("Product added successfully!")
      navigate('/dashbord')
      fetchProductData(shopId)
    } catch (error) {
      console.error("Error adding Product:", error)
      alert("Failed to add product")
    }
  }

  return (
    <><header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">Add New Products</h1>
    </div>
  </header>
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashbord')}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="h-full space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={product.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={product.category} onChange={handleChange} required />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={product.description} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" value={product.brand} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="primary_image">Primary Image</Label>
                <Input id="primary_image" name="primary_image" type="file" onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" name="weight" type="number" value={product.weight} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="min_age">Minimum Age</Label>
                <Input id="min_age" name="min_age" type="number" min="3" value={product.min_age} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="price.original">Original Price</Label>
                <Input id="price.original" name="price.original" type="number" value={product.price.original} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="price.discount">Discount (%)</Label>
                <Input id="price.discount" name="price.discount" type="number" min="0" max="100" value={product.price.discount} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="price.discount_expiry">Discount Expiry Date</Label>
                <Input id="price.discount_expiry" name="price.discount_expiry" type="date" value={product.price.discount_expiry} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" name="stock" type="number" value={product.stock} onChange={handleChange} required />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="is_featured" name="is_featured" checked={product.is_featured} onCheckedChange={(checked) => setProduct(prev => ({ ...prev, is_featured: checked }))} />
                <Label htmlFor="is_featured">Featured Product</Label>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="is_bestseller" name="is_bestseller" checked={product.is_bestseller} onCheckedChange={(checked) => setProduct(prev => ({ ...prev, is_bestseller: checked }))} />
                <Label htmlFor="is_bestseller">Bestseller</Label>
              </div> */}
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={() => navigate('/dashbord')} className="mr-3">
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
    
  )
}