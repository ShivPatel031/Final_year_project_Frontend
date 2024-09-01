import { useEffect, useState } from "react";
import T1_Nav from "../component/Theme_1/T1_Nav";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import T1_Home from "../component/Theme_1/T1_Home";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import T1_About from "../component/Theme_1/T1_About";
import T1_Contact from "../component/Theme_1/T1_Contack";
import T1_Product from "../component/Theme_1/T1_Products";
axios.defaults.withCredentials = true;


function ProductCard() {
  return (
    <div className="w-[300px] h-[250px] bg-slate-300 rounded-md m-4 "></div>
  );
}

function FeaturesCard() {
  return <div className="w-[400px] h-[350px] bg-slate-400 rounded-md"></div>;
}

function ShopDetails() {
  return <div></div>;
}

function ShopPage() {
  const [shopData, setShopData] = useState({});
  console.log(shopData)
  const shopId = Cookies.get("Shopid");
  const auth_token = Cookies.get("auth_token");
  const user_token = Cookies.get("user_token");
  const data2={auth_token:auth_token,user_token:user_token}

  const fetchShopData = async () => {
    try {
      const response = await axios(
        `http://${import.meta.env.VITE_BACKEND_ROUTE}:3000/api/shops/${shopId}`,{
          headers: {
              'Content-Type': 'application/json', // Indicating JSON data
              'auth_token': auth_token, // Example of an authorization token
              'user_token': user_token // Any other custom header
          },});
      setShopData(response.data);
    } catch (error) {
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
      <T1_Nav shopLogo={shopData.logo}/>
      <Routes>
        <Route path='' element={<T1_Home shopData={shopData}/>}/>
        <Route path="about" element={<T1_About />} />
        <Route path="contact" element={<T1_Contact />} />
        <Route path="product" element={<T1_Product />} />
      </Routes>
       

      {/* <T1_Home shopData={shopData}/> */}
      
    </div>
  );
}

export default ShopPage;
