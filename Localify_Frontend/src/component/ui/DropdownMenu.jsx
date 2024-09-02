// src/components/ui/DropdownMenu.jsx
import React from 'react';

const DropdownMenu = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

const DropdownMenuTrigger = ({ asChild, children }) => (
  <div>
    {React.cloneElement(children, { className: "flex items-center cursor-pointer" })}
  </div>
);

const DropdownMenuContent = ({ children }) => (
  <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
    {children}
  </div>
);

const DropdownMenuItem = ({ onSelect, children }) => (
  <button
    onClick={onSelect}
    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
  >
    {children}
  </button>
);

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
