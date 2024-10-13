import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const T2_Nav = ({ shopLogo, shopId, shopName }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = JSON.parse(localStorage.getItem("userData"));

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  const navItems = [
    { path: `/shops/${shopId}/home`, label: 'Home' },
    { path: `/shops/${shopId}/product`, label: 'Products' },
    { path: `/shops/${shopId}/contact`, label: 'Contact' },
    { path: `/shops/${shopId}/about`, label: 'About' },
    { path: `/shops`, label: 'Other Shops' },
    { path: `/dashbord`, label: 'Dashbord' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img src={shopLogo} alt="shop logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-xl font-bold text-purple-600">{shopName}</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              if(user?.role === 'shopkeeper' && item.label === 'Other Shops') return;
              if(user?.role === 'customer' && item.label === 'Dashbord') return;
              return <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium ${ item.label !== 'Other Shops' ? 
                    isActive
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600' 
                      : ''
                  } transition-colors duration-200 hover:text-purple-600`
                }
              >
                {item.label}
              </NavLink>
            }
            )}
          </div>

          {/* Search Bar and Cart Icon */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 rounded-full py-2 pl-4 pr-10 w-48 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-purple-600"
              >
                <FiSearch className="text-xl" />
              </button>
            </form>
            {user?.role !== 'shopkeeper' && <button 
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
              onClick={()=>{if(user){ 
                navigate(`/shops/${shopId}/cart`)
              }
              else{
                navigate('/login');
              }}}>
              <FiShoppingCart className="text-2xl" />
            </button>}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-purple-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-2 px-4 text-sm ${
                      isActive
                        ? 'text-purple-600 font-medium'
                        : 'text-gray-600 hover:text-purple-600'
                    } transition-colors duration-200`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <form onSubmit={handleSearch} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-purple-600"
                >
                  <FiSearch className="text-xl" />
                </button>
              </form>
              <button 
                className="mt-4 w-full text-left py-2 px-4 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">
                <FiShoppingCart className="inline-block mr-2 text-xl" /> Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default T2_Nav;