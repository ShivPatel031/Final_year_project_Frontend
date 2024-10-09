import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaMapMarkerAlt, FaSearch, FaShoppingBag } from 'react-icons/fa'; // Using React Icons
import Button from '../component/ui/Button';
import Input from '../component/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../component/ui/Card';
import Badge from '../component/ui/Badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Shops() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('name');
  console.log(filteredShops);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data } = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops?page=${currentPage}`);
        console.log(data.shops);
        setShops(data.shops);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    fetchShops();
  }, [currentPage]);

  // Handle Filtering by search term and category
  useEffect(() => {
    if (shops && Array.isArray(shops)) {
      let filtered = [...shops];

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(shop =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(shop => shop.category === selectedCategory);
      }

      setFilteredShops(filtered); // Only update if filters are applied
    }
  }, [searchTerm, selectedCategory, shops]);

  // Handle Sorting
  useEffect(() => {
    if (filteredShops.length > 0) {
      const sortedShops = [...filteredShops].sort((a, b) => {
        if (sortOption === 'name') return a.name.localeCompare(b.name);
        if (sortOption === 'rating') return b.ratings.average - a.ratings.average;
        return 0;
      });
      setFilteredShops(sortedShops);
    }
  }, [sortOption]); // Remove `filteredShops` from the dependencies

  const goToShop=(sid)=>{
    navigate("/shops/"+sid+"/home");
  }

  return (
    <div className="min-h-screen bg-gray-200 mt-20">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Our Partners</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search shops..."
                className="pl-10 pr-4 py-2 rounded-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {/* <Button variant="outline" size="icon">
              <FaShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Button> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 overflow-hidden p-1">Registered Businesses</h2>
          <div className="flex space-x-4">
            {/* Category Selection */}
            <select
              className="border border-gray-300 rounded-md p-2"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Grocery">Grocery</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>

            {/* Sorting Options */}
            <select
              className="border border-gray-300 rounded-md p-2"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops.map(shop => (
            <Card key={shop._id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={shop.banner_image}
                  alt={`${shop.name} banner`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white rounded-full p-1 shadow-md">
                  <img
                    src={shop.logo}
                    alt={`${shop.name} logo`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              </div>
              <CardHeader>
                <CardTitle>{shop.name}</CardTitle>
                <CardDescription>
                  <FaMapMarkerAlt className="inline-block text-gray-400 mr-1" />
                  {shop.location.city}, {shop.location.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{shop.description}</p>
                <div className="mt-2">
                  {shop.category}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>goToShop(shop.theme,shop._id)}>View Shop</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* <div className="mt-8 flex justify-between">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div> */}
      </main>
    </div>
  );
}

export default Shops;
