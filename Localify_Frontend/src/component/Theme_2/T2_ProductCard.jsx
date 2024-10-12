import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const T2_ProductCard = ({ product }) =>
    {
        const navigate = useNavigate();
        const user = JSON.parse(localStorage.getItem("userData"));

        const addToMyCart = async ()=>
        {
            let data = {product_id:product._id,shop_id:product.shop_id,customer_id:user.id};
            console.log(data);
            try {
                const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/carts/add-to-cart`,data)
                console.log(response.message);
            } catch (error) {
                console.log("got erro while adding to cart "+error)
            }
        }

    return (
        <motion.div
          className="relative bg-white rounded-lg overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src={product.primary_image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4"
            onClick={
                ()=>navigate(`/shops/${product.shop_id}/product-page/${product._id}`)
            }>
            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">${product.price.original}</span>
              
            </div>
            
          </div>
          {user?.role !== 'shopkeeper' && <button className="absolute bottom-3 right-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
                onClick={()=>{
                  if(user){addToMyCart()}
                  else {navigate('/login')}}}>
                Add to Cart
        </button>}
          
        </motion.div>
    );
    } 

export default T2_ProductCard;