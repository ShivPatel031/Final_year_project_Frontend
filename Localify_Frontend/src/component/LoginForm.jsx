import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/biglogo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import react-toastify CSS
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Navigate } from "react-router-dom";
// import { encrypt } from "../../utils/hashing";  // Correct import



const LoginForm = () => {
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
      const response = await axios.post("http://localhost:3000/api/users/login", formData);

      const { token, user } = response.data;
      const { username, role, id } = user;

      Cookies.set('token', token, { expires: 10 });
      Cookies.set('username', username,{ expires: 10 });
      Cookies.set('role', role,{ expires: 10 });
      Cookies.set('id', id),{ expires: 10 };

      toast.success(response.data.message || 'Login successful');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">

        <div className="flex justify-center mb-6">
          {/* <img src={logo} alt="Logo" className="h-16 bg-black" /> */}
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Login 
        </h2>

        <p className="text-slate-600 text-center mb-4">Connect to Localify</p>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />

          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>

            <div>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(prev=>!prev)}
                className="text-blue-500 text-sm mx-2 relative top-[-29px] left-[89%]"
              >
                {showPassword ? <IoMdEyeOff className="text-black text-xl" /> : <IoMdEye className="text-black text-xl" />}
              </button>

            </div>
          </div>

          <div className="flex items-center justify-between">

            <button
              type="submit"
              className="bg-black/80 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg hover:scale-105"
            >
              Sign In
            </button>
            <a
              onClick={()=>navigate('/signup')}
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