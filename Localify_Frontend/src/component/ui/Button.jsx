// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = "px-4 py-2 rounded";
  const variantStyles = variant === 'outline' ? "border border-gray-300 text-gray-800" : "bg-blue-500 text-white";
  const sizeStyles = size === 'icon' ? "p-2" : "text-base";

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
