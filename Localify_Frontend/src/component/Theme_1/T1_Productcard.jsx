import {FaStar} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const T1_ProductCard = ({ product }) =>
{
    const navigate = useNavigate();
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={product.primary_image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4" onClick={()=>navigate(`/shops/${product.shop_id}/product-page/${product._id}`)}>
            <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-indigo-600">${product.price.original}</span>
                <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{product.rating}</span>
                </div>
            </div>
            
            </div>
            <button className="m-3 w-[93%] bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                Add to Cart
            </button>
        </div>
    );
} 


export default T1_ProductCard;