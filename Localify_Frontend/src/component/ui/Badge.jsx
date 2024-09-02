import React from 'react';

const Badge = ({ children }) => {
  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
      {children}
    </span>
  );
};

export default Badge;