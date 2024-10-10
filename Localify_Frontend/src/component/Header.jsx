import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { makeOffline } from "../StaticData/userData";
import { HomePageNav } from "../StaticData/navbar.js";
import Cookies from "js-cookie";

function handleLogout() {
  Cookies.remove("auth_token");
  Cookies.remove("user_token");
  localStorage.removeItem("userData");
}

function NavOption({setIsOpen}) {
  return (
    <ul className="flex gap-10 justify-start items-center">
      {HomePageNav.map((navData) => (
        <li
          className="text-blue-600/90 drop-shadow-lg text-lg font-semibold"
          key={navData.id}
        >
          <NavLink 
            onClick={()=>setIsOpen(false)}
            to={navData.to}>
            <p>{navData.title}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Added state for dropdown
  const userData = JSON.parse(localStorage.getItem("userData"));
  let status;
  
  if (Cookies.get("auth_token") && Cookies.get("user_token")) {
    status = true;
  }

  return (
    <nav className="fixed opacity-[90%] z-10 w-[60vw] mx-[20vw] rounded-lg top-3 h-[60px] flex justify-between p-3 items-center bg-slate-200 border-slate-400 border-[3px] shadow-lg">
      <div className="w-[20%] ">
        <img
          src={`https://res.cloudinary.com/dtdixmfnd/image/upload/v1725194744/logo_x3cqrq.png`}
          alt="logo"
          onClick={()=>navigate("/")}
        />
      </div>
      <div className="h-[95%] flex justify-between overflow-visible">
        <NavOption setIsOpen={setIsOpen}/>
      </div>
      <div className="h-full flex items-center relative overflow-visible">
        {!status && (
          <button
            className="w-[70px] text-lg font-semibold text-fuchsia-600 hover:scale-95 rounded-xl h-[40px]"
            onClick={() =>navigate("/login")}
          >
            Login
          </button>
        )}

        {!status && (
          <button
            className="w-[75px] text-lg font-semibold text-fuchsia-600 hover:scale-95 bg-slate-300/70 rounded-xl h-[40px]"
            onClick={() =>navigate("/signup")}
          >
            Join us
          </button>
        )}

        {status && (
          <FaRegUserCircle
            onClick={() => setIsOpen((prev) => !prev)} // Toggle the dropdown on click
            className="text-4xl blueGradient text-white p-1 rounded-full cursor-pointer"
          />
        )}

        {status && isOpen && (
          <ul 
            className="absolute z-20 w-[150px] bg-slate-950/90 text-white flex flex-col rounded-xl justify-evenly items-start top-[59px] right-[-30px] p-3 gap-2"
            onMouseLeave={()=>setIsOpen(false)}>
            <li className="hover:bg-white hover:text-slate-950 border-white w-full p-1 cursor-pointer rounded-md" onClick={()=>{navigate(`/profile/${userData.id}`);setIsOpen(false)}}>
              Profile
            </li>
            {userData.role === "shopkeeper" ? (
              <li 
                onClick={()=>{navigate("/dashbord");setIsOpen(false);}}
                className="hover:bg-white hover:text-slate-950 border-white w-full p-1 cursor-pointer rounded-md">
                Manage Shop
              </li>
            ) : 
            (
            <>
            <li
              onClick={()=>{navigate("/orders");setIsOpen(false);}}
              className="hover:bg-white hover:text-slate-950 border-white w-full p-1 cursor-pointer rounded-md">
              Orders
            </li>
            </>)
            }
            <li
              className="hover:bg-red-400 hover:text-slate-100 border-white w-full p-1 cursor-pointer rounded-md"
              onClick={() => {
                handleLogout();
                setIsOpen(false); // Close the dropdown on logout
                navigate("/");
              }}
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export { Header };
