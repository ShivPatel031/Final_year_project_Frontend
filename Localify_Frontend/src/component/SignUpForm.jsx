
import React, { useState } from "react";
// import logo from "../../assets/biglogo.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({username:"",email:"",password:"",confirmPassword:"",role:"customer",dob:"",contact:"",gender:"male"});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  console.log(formData)
  
  const togglePasswordVisibility=()=>
  {
    setShowPassword(prev=>!prev);
  }

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
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",formData);
      toast.success(response.data.message || "Registration successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <p 
        className="absolute top-0 text-black/80 text-[40px] rounded-md m-5 flex justify-center items-center cursor-pointer"
        onClick={()=>navigate('/')}
        >
      Localify
      </p>

      <ToastContainer />
      <div className="bg-white mt-15 p-10 rounded-lg shadow-lg w-[700px]">
        <div className="flex justify-center mb-3">
          {/* <img src={logo} alt="Logo" className="h-16 bg-black" /> */}
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
          Register in  Localify
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-evenly">
          <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              required
              name="username"
              type="text"
              id="username"
              value={formData.username}
              onChange={changeHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={changeHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className=" relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div>
              <input
                required
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
                onClick={togglePasswordVisibility}
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              required
              name="confirmPassword"
              type="password"
              id="confirm-password"
              value={formData.confirmPassword}
              onChange={changeHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              onPaste={(e) => e.preventDefault()}
            />
          </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-4">
                <p>Data of Birth:</p>
                <input 
                  type="date"
                  required
                  name="dob"
                  value={formData.dob}
                  onChange={changeHandler}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  ></input>
              </label>
              
              <label className="block text-gray-700 text-sm font-bold mb-5">
                <p>Contact:</p>
                <input 
                  type="text"
                  required
                  name="contact"
                  value={formData.contact}
                  onChange={changeHandler}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  placeholder="Enter your contact">

                  </input>
              </label>
              
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender:
                <div className="w-[160px] flex justify-between mt-2">
                  <div
                    onClick={()=>setFormData(prev=>{return {...prev,gender:"male"}})}
                    className={`font-bold ${formData.gender=="male" ?"bg-black text-white":"text-black bg-white"} py-2 px-4 rounded-full focus:outline-none focus:shadow-outline border-2 border-gray-400 cursor-pointer`}>
                      Male
                  </div>
                  <div
                    onClick={()=>setFormData(prev=>{return {...prev,gender:"female"}})}
                    className={`font-bold ${formData.gender=="female" ?"bg-black text-white":"text-black bg-white"} py-2 px-4 rounded-full focus:outline-none focus:shadow-outline border-2 border-gray-400 cursor-pointer`}>
                    Female
                  </div>
                </div>
              </label>
          </div>
          </div>
          

          <div className="flex items-center justify-around">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline border-2 border-gray-400"
            >
              Sign Up
            </button>
            <a
              onClick={()=>navigate('/login')}
              className="text-slate-600/80 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
            >
              Already registered? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
