import React, { useState, useEffect } from "react";
import { MdStarRate } from "react-icons/md";
import axios from "axios";
import debounce from "lodash/debounce";
import Cookies from "js-cookie";
import T1_ProductCard from "./T1_Productcard";


function T1_Product({id}) {
  const [featuredProducts,setFeaturedProducts]= useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shopId, setShopId] = useState("");

  const shopID=Cookies.get("Shopid")
  const auth_token=Cookies.get("auth_token")
  const user_token=Cookies.get("user_token")

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/products/featuredProducts/${id}`, {
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
  
    // Optional cleanup, if needed
    return () => {
      // Cleanup logic (if any) or remove this block if not needed
    };
  }, []);

  // Fetch shop_id from cookie
  useEffect(() => {
    const shopIdFromCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith('shop_id='))
      ?.split('=')[1];
    setShopId(shopIdFromCookie);
  }, []);

  // Fetch brands and categories
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

  // Fetch products with pagination and filters
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
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [shopId, search, sortOption, minPrice, maxPrice, category, brand]);

  // Debounce search input
  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 500);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <div className="bg-slate-200 p-5 h-[100vh] w-[100vw] flex justify-evenly">
        <div className="h-[80vh] overflow-hidden shadow-lg shadow-black/20 w-[20vw] bg-white rounded-xl border-slate-300 border-[4px] p-5">
          {/* Search */}
          <div className="w-full mb-5">
            <label>
              <p className="mb-2">Search</p>
              <input
                type="text"
                placeholder="Search Product"
                onChange={handleSearchChange}
                className="w-full h-[40px] border border-black/60 rounded-lg px-3"
              />
            </label>
          </div>

          {/* Sort By */}
          <div className="w-full mb-5">
            <label>
              <p className="mb-2">Sort By</p>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full h-[40px] border border-black/60 rounded-lg px-3"
              >
                <option value="">Select</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="ratingHighLow">Rating: High to Low</option>
              </select>
            </label>
          </div>

          {/* Price Range */}
          <div className="w-full mb-5">
            <label>
              <p className="mb-2">Min Price</p>
              <input
                type="number"
                value={minPrice}
                placeholder="Min Price"
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full h-[40px] border border-black/60 rounded-lg px-3"
              />
            </label>
          </div>

          <div className="w-full mb-5">
            <label>
              <p className="mb-2">Max Price</p>
              <input
                type="number"
                value={maxPrice}
                placeholder="Max Price"
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full h-[40px] border border-black/60 rounded-lg px-3"
              />
            </label>
          </div>

          {/* Category */}
          <div className="w-full mb-5">
            <label>
              <p className="mb-2">Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[40px] border border-black/60 rounded-lg px-3"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Brand */}
          <div className="w-full mb-5">
            <label>
              <p className="mb-2">Brand</p>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full h-[40px] border border-black/60 rounded-lg px-3"
              >
                <option value="">All Brands</option>
                {brands.map(br => (
                  <option key={br.id} value={br.id}>{br.name}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Product Cards */}
        <div className="bg-white shadow-lg p-6 gap-10 border-slate-300 border-[4px] w-[70vw] rounded-xl shadow-black/20 flex justify-center items-center flex-wrap overflow-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <T1_ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default T1_Product;
