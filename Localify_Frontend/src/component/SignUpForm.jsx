
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_BACKEND_ROUTE}/api/users/register`,formData);
      toast.success(response.data.message || "Registration successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen GradientNeon2 flex items-center flex-col justify-center bg-gray-100 w-full">
      <p
        className="fancyFont overflow-hidden  text-white text-4xl mb-2 p-5 rounded-md  flex justify-center items-center cursor-pointer drop-shadow-lg hover:scale-95"
        onClick={() => navigate("/")}
      >
        Localify
      </p>

      <ToastContainer />
      <div className="bg-white p-6  rounded-lg shadow-lg w-[700px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center justify-center gap-2">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                required
                name="firstName"
                type="text"
                id="firstname"
                value={formData.firstName}
                onChange={changeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your firstname"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                required
                name="lastName"
                type="text"
                id="lastname"
                value={formData.lastName}
                onChange={changeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your lastname"
              />
            </div>

            <div>
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
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                type="text"
                required
                name="contact"
                value={formData.contact}
                onChange={changeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your contact"
              />
            </div>

            <div className="relative">
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
                  className="text-blue-500 text-sm mx-2 absolute top-[35px] right-2"
                >
                  {showPassword ? (
                    <IoMdEyeOff className="text-black text-xl" />
                  ) : (
                    <IoMdEye className="text-black text-xl" />
                  )}
                </button>
              </div>
            </div>

            <div>
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

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                type="date"
                required
                name="dob"
                value={formData.dob}
                onChange={changeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

           

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="flex space-x-6">
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, gender: "male" }))
                  }
                  className={`font-bold ${
                    formData.gender === "male"
                      ? "bg-slate-800 text-white"
                      : "bg-white  text-slate-800"
                  } py-2 px-4    rounded-lg focus:outline-none focus:shadow-outline border-2 border-gray-400  border-[3px]  shadow-black/30 cursor-pointer`}
                >
                  Male
                </div>
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, gender: "female" }))
                  }
                  className={`font-bold ${
                    formData.gender === "female"
                    ? "bg-slate-800 text-white"
                    : "text-slate-800 bg-white"
                  } py-2 px-4 rounded-lg   focus:outline-none focus:shadow-outline border-2 border-gray-400 border-[3px] shadow-black/30  cursor-pointer`}
                >
                  Female
                </div>
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Role
              </label>
              <div className="flex space-x-6">
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: "customer" }))
                  }
                  className={`font-bold ${
                    formData.role === "customer"
                      ? "bg-slate-800 text-white"
                      : "bg-white  text-slate-800"
                  } py-2 px-4    rounded-lg focus:outline-none focus:shadow-outline border-2 border-gray-400  border-[3px]  shadow-black/30 cursor-pointer`}
                >
                  Customer
                </div>
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: "shopkeeper" }))
                  }
                  className={`font-bold ${
                    formData.role === "shopkeeper"
                    ? "bg-slate-800 text-white"
                    : "text-slate-800 bg-white"
                  } py-2 px-4 rounded-lg   focus:outline-none focus:shadow-outline border-2 border-gray-400 border-[3px] shadow-black/30  cursor-pointer`}
                >
                  Shopkeeper
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-slate-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline border-[3px] border-gray-500"
            >
              Sign Up
            </button>
            <a
              onClick={() => navigate("/login")}
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
