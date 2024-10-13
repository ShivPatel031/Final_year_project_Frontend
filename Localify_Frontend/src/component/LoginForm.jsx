import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useActionData, useNavigate } from "react-router-dom";
// import logo from "../../assets/biglogo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import react-toastify CSS
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeOnline, storeUserData } from "../StaticData/userData";
// import { encrypt } from "../../utils/hashing";  // Correct import



const LoginForm = ({setAddShop}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email:"",password:""});
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (event)=>
  {
    const {name,value} = event.target;
    setFormData(prev=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/users/login`, formData);
      console.log(response.data)
      const {auth_token,user_token} = response.data;
      const {role,id} = response.data.user;

      Cookies.set('auth_token', auth_token,{ expires: 5});
      Cookies.set('user_token', user_token,{ expires: 5});
      dispatch(storeUserData(response.data.user));
      localStorage.setItem("userData",JSON.stringify(response.data.user))
      
      if(role=="shopkeeper"){
        try{
          var shop_id=await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/shops/getId/`+id)
          console.log(`${shop_id.status()} consoling`);
        }
        catch(error){
          navigate("/")
        }
        }

      toast.success(response.data.message || 'Login successful');
      
      setTimeout(() => {
        if(shop_id){
          Cookies.set('Shopid',shop_id.data.shopId,{ expires: 5})
          navigate("/shops/"+shop_id.data.shopId+"/home")
        }
        else{
          navigate("/")
        }
        
        
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed'+ error);
    }
    dispatch(makeOnline());
    // setAddShop(true);
  };


  return (
    <div className=" flex-col  min-h-screen flex items-center justify-start GradientNeon2">
        
      <p
        className=" overflow-hidden p-4 drop-shadow-lg hover:scale-95  fancyFont top-3 text-white text-[40px] rounded-md m-7 flex justify-center items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        Localify
      </p>

      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />

      <div className="bg-white p-10  rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-start mb-6">
          {/* <img src={logo} alt="Logo" className="h-16 bg-black" /> */}
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 h-10">Login</h2>

        <p className="text-slate-600 text-center mb-4">Connect to Localify</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              required
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={changeHandler}
                className=" shadow-md  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-blue-500 text-sm mx-2 relative top-[-29px] left-[89%]"
              >
                {showPassword ? (
                  <IoMdEyeOff className="text-black text-xl" />
                ) : (
                  <IoMdEye className="text-black text-xl" />
                )}
              </button>
            </div>
          </div>

          <div className="w-full h-[50px] flex items-center justify-around">
            <button
              type="submit"
              className="bg-slate-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline border-[3px] border-gray-500"
            >
              Sign In
            </button>
            <a
              onClick={() => navigate("/signup")}
              className="text-slate-600/80 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
            >
              Not registered? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

