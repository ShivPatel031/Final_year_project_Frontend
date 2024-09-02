// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

const CardFooter = ({ children }) => (
  <div className="p-4 border-t">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
