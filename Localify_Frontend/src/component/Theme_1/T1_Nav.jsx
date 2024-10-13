import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiShoppingCart} from 'react-icons/fi';

const ShopNav = ({ shopLogo, shopId,shopName }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = JSON.parse(localStorage.getItem("userData"));

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
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
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={shopLogo} alt="shop logo" className="w-12 h-12 mr-4" />
            <h1 className="text-2xl font-bold text-indigo-600">{shopName}</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {

              if(user?.role === 'shopkeeper' && item.label === 'Other Shops') return;
              if(user?.role === 'customer' && item.label === 'Dashbord') return;
              return <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg ${ item.label !== 'Other Shops' ? 
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-gray-600'
                      :''
                  } transition-colors duration-200  hover:text-indigo-600`
                }
              >
                {item.label}
              </NavLink>
            }
            )}
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
            {user?.role !== 'shopkeeper' && <button 
              className="w-full text-left py-2 px-4 text-sm text-gray-600 hover:ring-indigo-900 transition-colors duration-200"
              onClick={()=>{
                if(user){
                  navigate(`/shops/${shopId}/cart`)
                }
                else
                {
                  navigate('/login');
                }
              }}>
                <FiShoppingCart className="text-xl" />
            </button>}
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