// import React, { useState, useEffect } from "react";
// import { Trash2, Minus, Plus } from "lucide-react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const Button = ({ children, className, ...props }) => (
//   <button
//     className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Card = ({ children, className, ...props }) => (
//   <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
//     {children}
//   </div>
// );

// const CardHeader = ({ children, className, ...props }) => (
//   <div className={`px-6 py-4 border-b ${className}`} {...props}>
//     {children}
//   </div>
// );

// const CardTitle = ({ children, className, ...props }) => (
//   <h2 className={`text-xl font-semibold ${className}`} {...props}>
//     {children}
//   </h2>
// );

// const CardContent = ({ children, className, ...props }) => (
//   <div className={`px-6 py-4 ${className}`} {...props}>
//     {children}
//   </div>
// );

// const CardFooter = ({ children, className, ...props }) => (
//   <div className={`px-6 py-4 border-t ${className}`} {...props}>
//     {children}
//   </div>
// );

// // const productsArray = [
// //   {
// //     image: "/placeholder.svg?height=100&width=100",
// //     name: "Wireless Headphones",
// //     price: 99.99,
// //     total: 99.99
// //   },
// //   {
// //     image: "/placeholder.svg?height=100&width=100",
// //     name: "Smartwatch",
// //     price: 149.99,
// //     total: 149.99
// //   },
// //   {
// //     image: "/placeholder.svg?height=100&width=100",
// //     name: "Gaming Mouse",
// //     price: 59.99,
// //     total: 59.99
// //   },
// //   {
// //     image: "/placeholder.svg?height=100&width=100",
// //     name: "Bluetooth Speaker",
// //     price: 79.99,
// //     total: 79.99
// //   }
// // ];

// const CartItem = ({ product, setProducts ,cart}) => {
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     setProducts(prev =>
//       prev.map(p => {
//         if (p.name === product.name) {
//           return { ...p, total: p.price.original * quantity };
//         }
//         return p;
//       })
//     );
//   }, [quantity, product.name, product.price.original, setProducts]);

//   async function deleteCartProductByid(cart_id,product_id)
//   {
//     const data = {cart_id:cart_id,product_id:product_id};
//     try {
//       const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/cart/delete-cart`,data);
//       if(response.status===200) console.log("product from cart deleted successfully")
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleRemove = () => {
//     const cartd = cart.products.filter(c=>c.product_id === product._id);
//     console.log(cartd[0].product_id);
    
//     deleteCartProductByid(cart._id,cartd[0].product_id);
//     setProducts(prev => prev.filter(p => p.name !== product.name));
//   };

//   return (
//     <div className="flex items-center space-x-4 py-2">
//       <div className="flex-shrink-0">
//         <img src={product.primary_image} alt={product.name} width={80} height={80} className="rounded-md" />
//       </div>
//       <div className="flex-grow">
//         <h3 className="font-semibold">{product.name}</h3>
//         <p className="text-sm text-gray-500">${product.price.original.toFixed(2)}</p>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Button
//           className="bg-gray-200 hover:bg-gray-300 text-gray-800"
//           onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : prev))}
//         >
//           <Minus className="h-4 w-4" />
//         </Button>
//         <span className="w-8 text-center">{quantity}</span>
//         <Button
//           className="bg-gray-200 hover:bg-gray-300 text-gray-800"
//           onClick={() => setQuantity(prev => (prev < 5 ? prev + 1 : prev))}
//         >
//           <Plus className="h-4 w-4" />
//         </Button>
//       </div>
//       <div className="w-24 text-right">
//         <p className="font-semibold">${product.total.toFixed(2)}</p>
//       </div>
//       <Button className="text-red-500 hover:text-red-700" onClick={handleRemove}>
//         <Trash2 className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// };

// const CartPage = ({shop_id}) => {
//   const [products, setProducts] = useState([]);
//   const [subTotal, setSubTotal] = useState(0);
//   const [cart,setCart] = useState([]);
//   const user = JSON.parse(localStorage.getItem("userData"));
//   console.log(cart);
  
 

//   async function fetchData(id)
//     {
//       try {
//         const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/${id}`);
//         response.data.product['total']=response.data.product.price.original;
//         if(response.status===200) setProducts(data=>[...data,response.data.product]);
//       } catch (error) {
//         console.log(error);
//       }
      
//     }

//   const getCartData = async () =>
//   {
//     const data = {customer_id:user.id,shop_id}
//     try {
//       const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/cart/get-cart`,data);
//       if(response.status === 200)
//         {
//           setCart(response.data.cart);
//         } 
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(()=>
//   {
//     if(cart.length !== 0) cart.products.forEach((data)=>{fetchData(data.product_id)});
//   },[cart])

//   useEffect(()=>
//   {
//     getCartData();
//   },[])

//   useEffect(() => {
//     const sum = products.reduce((acc, product) => acc + product.total, 0);
//     setSubTotal(sum);
    
//   }, [products]);

//   return (
//     <div className="container px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
//       <div className="grid gap-8 md:grid-cols-3">
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle>Cart Items</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {products.length != 0? products.map(product => (
//               <CartItem key={product.name} product={product} setProducts={setProducts} cart={cart}/>
//             )) : (<p>Cart is Empty</p>)}
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between mb-2">
//               <span>Subtotal</span>
//               <span className="font-semibold">${subTotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Shipping</span>
//               <span className="font-semibold">$0.00</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Tax</span>
//               <span className="font-semibold">$0.00</span>
//             </div>
//             <div className="border-t pt-2 mt-2">
//               <div className="flex justify-between">
//                 <span className="font-semibold">Total</span>
//                 <span className="font-semibold">${subTotal.toFixed(2)}</span>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//               Proceed to Checkout
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import axios from "axios";

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

const CartItem = ({ product, updateProductQuantity, removeProduct, cart }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity);
      updateProductQuantity(product._id, newQuantity);
    }
  }, [product._id, updateProductQuantity]);

  const handleRemove = useCallback(() => {
    removeProduct(product._id);
  }, [product._id, removeProduct]);

  return (
    <div className="flex items-center space-x-4 py-2">
      <div className="flex-shrink-0">
        <img src={product.primary_image} alt={product.name} width={80} height={80} className="rounded-md" />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">${product.price.original.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-24 text-right">
        <p className="font-semibold">${(product.price.original * quantity).toFixed(2)}</p>
      </div>
      <Button className="text-red-500 hover:text-red-700" onClick={handleRemove}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const CartPage = ({ shop_id }) => {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [cart, setCart] = useState(null);
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(products);

  const fetchCartData = useCallback(async () => {
    if (!user || !shop_id) return;

    try {
      const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/carts/get-cart`, {
        customer_id: user.id,
        shop_id
      });
      if (response.status === 200) {
        setCart(response.data.cart);
        fetchProductsData(response.data.cart.products);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [user, shop_id]);

  const fetchProductsData = useCallback(async (cartProducts) => {
    try {
      const productPromises = cartProducts.map(item => 
        axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/${item.product_id}`)
      );
      const productResponses = await Promise.all(productPromises);
      const fetchedProducts = productResponses.map((response, index) => ({
        ...response.data.product,
        quantity: cartProducts[index].quantity,
        total: response.data.product.price.original
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const sum = products.reduce((acc, product) => acc + product.total, 0);
    setSubTotal(sum);
  }, [products]);

  const updateProductQuantity = useCallback((productId, newQuantity) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product._id === productId
          ? { ...product, quantity: newQuantity, total: product.price.original * newQuantity }
          : product
      )
    );
  }, []);

  const removeProduct = useCallback(async (productId) => {
    if (!cart) return;

    try {
      await axios.post(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/carts/delete-cart`, {
        cart_id: cart._id,
        product_id: productId
      });
      setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  }, [cart]);

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length > 0 ? (
              products.map(product => (
                <CartItem
                  key={product._id}
                  product={product}
                  updateProductQuantity={updateProductQuantity}
                  removeProduct={removeProduct}
                  cart={cart}
                />
              ))
            ) : (
              <p>Cart is Empty</p>
            )}
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