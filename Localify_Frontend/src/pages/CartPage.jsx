import React, { useState, useEffect } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 border-b ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h2 className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </h2>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 border-t ${className}`} {...props}>
    {children}
  </div>
);

const productsArray = [
  {
    image: "/placeholder.svg?height=100&width=100",
    name: "Wireless Headphones",
    price: 99.99,
    total: 99.99
  },
  {
    image: "/placeholder.svg?height=100&width=100",
    name: "Smartwatch",
    price: 149.99,
    total: 149.99
  },
  {
    image: "/placeholder.svg?height=100&width=100",
    name: "Gaming Mouse",
    price: 59.99,
    total: 59.99
  },
  {
    image: "/placeholder.svg?height=100&width=100",
    name: "Bluetooth Speaker",
    price: 79.99,
    total: 79.99
  }
];

const CartItem = ({ product, setProducts }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProducts(prev =>
      prev.map(p => {
        if (p.name === product.name) {
          return { ...p, total: p.price * quantity };
        }
        return p;
      })
    );
  }, [quantity, product.name, product.price, setProducts]);

  const handleRemove = () => {
    setProducts(prev => prev.filter(p => p.name !== product.name));
  };

  return (
    <div className="flex items-center space-x-4 py-2">
      <div className="flex-shrink-0">
        <img src={product.image} alt={product.name} width={80} height={80} className="rounded-md" />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : prev))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          onClick={() => setQuantity(prev => (prev < 5 ? prev + 1 : prev))}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-24 text-right">
        <p className="font-semibold">${product.total.toFixed(2)}</p>
      </div>
      <Button className="text-red-500 hover:text-red-700" onClick={handleRemove}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const CartPage = () => {
  const [products, setProducts] = useState(productsArray);
  const [subTotal, setSubTotal] = useState(0);
  const user = useSelector(state=>state.user.userInfo);
  console.log(user?.id);

  useEffect(() => {
    const sum = products.reduce((acc, product) => acc + product.total, 0);
    setSubTotal(sum);
  }, [products]);

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            {products.map(product => (
              <CartItem key={product.name} product={product} setProducts={setProducts} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${subTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;