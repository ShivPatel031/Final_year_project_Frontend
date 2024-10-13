// import React, { useState, useEffect } from "react";
// import { MdStarRate } from "react-icons/md";
// import axios from "axios";
// import debounce from "lodash/debounce";
// import Cookies from "js-cookie";
// import T1_ProductCard from "./T1_Productcard";


// function T1_Product({id}) {
//   const [featuredProducts,setFeaturedProducts]= useState([]);
//   const [search, setSearch] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [shopId, setShopId] = useState("");

//   const shopID=Cookies.get("Shopid")
//   const auth_token=Cookies.get("auth_token")
//   const user_token=Cookies.get("user_token")

//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/featuredProducts/${id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'auth_token': auth_token,
//             'user_token': user_token,
//           },
//         });
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

//   // Fetch shop_id from cookie
//   useEffect(() => {
//     const shopIdFromCookie = document.cookie
//       .split("; ")
//       .find(row => row.startsWith('shop_id='))
//       ?.split('=')[1];
//     setShopId(shopIdFromCookie);
//   }, []);

//   // Fetch brands and categories
//   useEffect(() => {
//     if (shopId) {
//       axios.get(`/api/shops/brands`)
//         .then(res => setBrands(res.data))
//         .catch(err => console.error(err));
      
//       axios.get(`/api/shops/category`)
//         .then(res => setCategories(res.data))
//         .catch(err => console.error(err));
//     }
//   }, [shopId]);

//   // Fetch products with pagination and filters
//   useEffect(() => {
//     if (shopId) {
//       const queryParams = new URLSearchParams({
//         query: search,
//         sort: sortOption,
//         minPrice,
//         maxPrice,
//         category,
//         brand
//       }).toString();

//       axios.get(`/api/products/${shopId}?${queryParams}`)
//         .then(res => setProducts(res.data))
//         .catch(err => console.error(err));
//     }
//   }, [shopId, search, sortOption, minPrice, maxPrice, category, brand]);

//   // Debounce search input
//   const debouncedSearch = debounce((value) => {
//     setSearch(value);
//   }, 500);

//   const handleSearchChange = (e) => {
//     debouncedSearch(e.target.value);
//   };

//   return (
//     <div>
//       <div className="bg-slate-200 p-5 h-[100vh] w-[100vw] flex justify-evenly">
//         <div className="h-[80vh] overflow-hidden shadow-lg shadow-black/20 w-[20vw] bg-white rounded-xl border-slate-300 border-[4px] p-5">
//           {/* Search */}
//           <div className="w-full mb-5">
//             <label>
//               <p className="mb-2">Search</p>
//               <input
//                 type="text"
//                 placeholder="Search Product"
//                 onChange={handleSearchChange}
//                 className="w-full h-[40px] border border-black/60 rounded-lg px-3"
//               />
//             </label>
//           </div>

//           {/* Sort By */}
//           <div className="w-full mb-5">
//             <label>
//               <p className="mb-2">Sort By</p>
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="w-full h-[40px] border border-black/60 rounded-lg px-3"
//               >
//                 <option value="">Select</option>
//                 <option value="priceLowHigh">Price: Low to High</option>
//                 <option value="priceHighLow">Price: High to Low</option>
//                 <option value="ratingHighLow">Rating: High to Low</option>
//               </select>
//             </label>
//           </div>

//           {/* Price Range */}
//           <div className="w-full mb-5">
//             <label>
//               <p className="mb-2">Min Price</p>
//               <input
//                 type="number"
//                 value={minPrice}
//                 placeholder="Min Price"
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 className="w-full h-[40px] border border-black/60 rounded-lg px-3"
//               />
//             </label>
//           </div>

//           <div className="w-full mb-5">
//             <label>
//               <p className="mb-2">Max Price</p>
//               <input
//                 type="number"
//                 value={maxPrice}
//                 placeholder="Max Price"
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 className="w-full h-[40px] border border-black/60 rounded-lg px-3"
//               />
//             </label>
//           </div>

//           {/* Category */}
//           <div className="w-full mb-5">
//             <label>
//               <p className="mb-2">Category</p>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full h-[40px] border border-black/60 rounded-lg px-3"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map(cat => (
//                   <option key={cat.id} value={cat.id}>{cat.name}</option>
//                 ))}
//               </select>
//             </label>
//           </div>

//           {/* Brand */}
//           <div className="w-full mb-5">
//             <label>
//               <p className="mb-2">Brand</p>
//               <select
//                 value={brand}
//                 onChange={(e) => setBrand(e.target.value)}
//                 className="w-full h-[40px] border border-black/60 rounded-lg px-3"
//               >
//                 <option value="">All Brands</option>
//                 {brands.map(br => (
//                   <option key={br.id} value={br.id}>{br.name}</option>
//                 ))}
//               </select>
//             </label>
//           </div>
//         </div>

//         {/* Product Cards */}
//         <div className="bg-white shadow-lg p-6 gap-10 border-slate-300 border-[4px] w-[70vw] rounded-xl shadow-black/20 flex justify-center items-center flex-wrap overflow-scroll">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {featuredProducts.map((product) => (
//               <T1_ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default T1_Product;

import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import Cookies from "js-cookie";
import { Star } from "lucide-react";
import T1_ProductCard from "./T1_Productcard";

// Utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Input Component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

// Select Component
const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

// Card Component
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));

// Label Component
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));

// Slider Component
const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <input
    type="range"
    ref={ref}
    className={cn(
      "w-full",
      className
    )}
    {...props}
  />
));

// Main Component
export default function T1_Product({ id }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shopId, setShopId] = useState("");

  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/featuredProducts/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token,
            'user_token': user_token,
          },
        });
        setFeaturedProducts(response.data.featuredProducts);
      } catch (error) {
        console.log(error.message || "Data Fetch Failed");
      }
    };
    fetchData();
  }, [id, auth_token, user_token]);

  useEffect(() => {
    const shopIdFromCookie = Cookies.get('shop_id');
    setShopId(shopIdFromCookie);
  }, []);

  useEffect(() => {
    if (shopId) {
      axios.get(`/api/shops/brands`)
        .then(res => setBrands(res.data))
        .catch(err => console.error(err));
      
      axios.get(`/api/shops/category`)
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }
  }, [shopId]);

  useEffect(() => {
    if (shopId) {
      const queryParams = new URLSearchParams({
        query: search,
        sort: sortOption,
        minPrice,
        maxPrice,
        category,
        brand
      }).toString();

      axios.get(`/api/products/${shopId}?${queryParams}`)
        .then(res => setFeaturedProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [shopId, search, sortOption, minPrice, maxPrice, category, brand]);

  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 500);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="md:col-span-1 p-6">
            <h2 className="text-2xl font-bold mb-6">Filters</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="search" className="block mb-2">Search</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search products"
                  onChange={handleSearchChange}
                />
              </div>
              <div>
                <Label htmlFor="sort" className="block mb-2">Sort By</Label>
                <Select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="ratingHighLow">Rating: High to Low</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="minPrice" className="block mb-2">Min Price</Label>
                <Input
                  id="minPrice"
                  type="number"
                  value={minPrice}
                  placeholder="Min Price"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maxPrice" className="block mb-2">Max Price</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  placeholder="Max Price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category" className="block mb-2">Category</Label>
                <Select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="brand" className="block mb-2">Brand</Label>
                <Select
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map(br => (
                    <option key={br.id} value={br.id}>{br.name}</option>
                  ))}
                </Select>
              </div>
            </div>
          </Card>
          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <T1_ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}