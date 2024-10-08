import { useEffect, useState } from "react";
import T1_Nav from "../component/Theme_1/T1_Nav";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import T1_Home from "../component/Theme_1/T1_Home";
import { Routes,Route,useParams, Link } from "react-router-dom";
import T1_About from "../component/Theme_1/T1_About";
import T1_Contact from "../component/Theme_1/T1_Contact";
import T1_Product from "../component/Theme_1/T1_Products";
import { T1_Footer } from "../component/Theme_1/T1_Footer";
import T1_ProductPage from "../component/Theme_1/T1_ProductPage";
import T2_Home from "../component/Theme_2/T2_Home";
import T2_Nav from "../component/Theme_2/T2_Nav";
import CartPage from "./CartPage";
axios.defaults.withCredentials = true;

function ShopPage() {

  const [show, setShow] = useState(false);
  const [shopData, setShopData] = useState({});
  console.log(shopData)
  const {shopId} = useParams()
  console.log("this is shop page",shopId)
  console.log("shopid is "+shopId);
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");
  
  const fetchShopData = async () => {
    try {
      const response = await axios(
        `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/${shopId}`,{
          headers: {
              'Content-Type': 'application/json', 
              'auth_token': auth_token, 
              'user_token': user_token 
          },});
      setShopData(response.data);
      setShow(true)
    } catch (error) {
      setShow(false)
      toast.error(error.message || "Data Fetch Failed");
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  return (

    <div className="w-full">
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      {
           show &&
        <div>

      
      {shopData.theme === "theme_1" ? 
      (<>
        <T1_Nav shopLogo={shopData.logo} shopId={shopData._id} shopName={shopData.name}/>
              <Routes>
                <Route path='home' element={<T1_Home shopData={shopData}/>}/>
                <Route path="about" element={<T1_About shopData={shopData}/>} />
                <Route path="contact" element={<T1_Contact />} />
                <Route path="product" element={<T1_Product id={shopData._id}/>} />
                <Route path="product-page/:id" element={<T1_ProductPage />}/>
                <Route path="cart" element={<CartPage shop_id={shopData._id} />}/>
              </Routes>
        <T1_Footer/>
      </>):
      (<>
        <T2_Nav shopLogo={shopData.logo} shopId={shopData._id}/>
              <Routes>
                <Route path='home' element={<T2_Home shopData={shopData}/>}/>
                <Route path="about" element={<T1_About shopData={shopData}/>} />
                <Route path="contact" element={<T1_Contact />} />
                <Route path="product" element={<T1_Product id={shopData._id}/>} />
                <Route path="product-page/:id" element={<T1_ProductPage />}/>
                <Route path="cart" element={<CartPage shop_id={shopData._id}/>}/>
              </Routes>
        <T1_Footer/>
      </>)}
       
      </div>
      }
      {
        !show &&
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops, no shop found!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          It seems we couldn't find the shop you're looking for. Please check the URL or explore other shops.
        </p>
        
        <Link to="/" className="px-6 py-3 rounded-md text-white blueGradient hover:shadow-lg">
          Back to Home
        </Link>
      </div>
      }
    </div>
  );
}

export default ShopPage;
