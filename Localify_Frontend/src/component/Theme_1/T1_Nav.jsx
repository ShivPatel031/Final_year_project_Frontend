// import { FiSearch } from "react-icons/fi";
// import { NavLink } from "react-router-dom";

// function ShopNav({shopLogo,shopId})
// {
//     return (
//         <div className="w-full h-[70px] bg-slate-300 flex justify-around items-center">
//             <div>
//                 <img 
//                     src={shopLogo} 
//                     alt="shop logo"
//                     className="w-[40px] h-[40px]"/>
//             </div>
//             <div>
//                 <ul className="w-[300px] flex justify-between">
//                     <li><NavLink to={`/shops/${shopId}/`}>Home</NavLink></li>
//                     <li><NavLink to={`/shops/${shopId}/product`}>product</NavLink></li>
//                     <li><NavLink to={`/shops/${shopId}/contact`}>contact</NavLink></li>
//                     <li><NavLink to={`/shops/${shopId}/about`}>about</NavLink></li>
//                 </ul>
//             </div>
//             <div className="w-[300px] flex justify-between">
//                 <div className="flex w-[200px] justify-between items-center">
//                     <input 
//                     type="text"
//                     placeholder="Search Product"
//                     className="w-[160px] h-[30px] rounded-md px-4"
//                     />
//                     <FiSearch className="text-[25px]"/>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ShopNav;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

const ShopNav = ({ shopLogo, shopId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const navItems = [
    { path: `/shops/${shopId}/`, label: 'Home' },
    { path: `/shops/${shopId}/product`, label: 'Products' },
    { path: `/shops/${shopId}/contact`, label: 'Contact' },
    { path: `/shops/${shopId}/about`, label: 'About' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={shopLogo} alt="shop logo" className="w-12 h-12 mr-4" />
            <h1 className="text-2xl font-bold text-indigo-600">Shop Name</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-gray-600 hover:text-indigo-600'
                  } transition-colors duration-200`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-r-full p-2 hover:bg-indigo-700 transition-colors duration-200"
            >
              <FiSearch className="text-xl" />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
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
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-gray-600 hover:text-indigo-600'
                  } transition-colors duration-200`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <form onSubmit={handleSearch} className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-gray-100 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-r-full p-2 hover:bg-indigo-700 transition-colors duration-200"
              >
                <FiSearch className="text-xl" />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ShopNav;