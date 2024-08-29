import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { makeOffline } from "../StaticData/userData";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.status);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-10 left-[12.5%] top-[10px] w-[75%] h-[60px] bg-slate-400 flex items-center justify-between px-[50px] rounded-3xl overflow-visible">
      <div className="w-[15%]">Logo</div>
      <div className="w-[70%] h-[95%] flex justify-between overflow-visible">
        <ul className="flex w-[60%] justify-between items-center">
          <li><NavLink to="/"><p>Home</p></NavLink></li>
          <li><NavLink to="/about"><p>About</p></NavLink></li>
          <li><NavLink to="/contact"><p>Contact</p></NavLink></li>
          <li><NavLink to="/shops"><p>Shops</p></NavLink></li>
        </ul>
        <div className="h-full flex items-center relative overflow-visible">
          {!user && (
            <button
              className="w-[70px] text-white bg-slate-800 rounded-xl h-[40px] mr-2"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          )}
          {!user && (
            <button
              className="w-[75px] text-white bg-slate-800 rounded-xl h-[40px] ml-2"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          )}
          {user && (
            <FaRegUserCircle
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-[30px] text-slate-600 cursor-pointer"
            />
          )}
          {isOpen && (
            <ul className="absolute z-20 w-[150px] bg-black text-white flex flex-col rounded-xl justify-evenly items-start top-[59px] right-[-30px] p-3 gap-2">
              <li className="hover:border-b-2 border-white w-full p-1 cursor-pointer">Profile</li>
              <li className="hover:border-b-2 border-white w-full p-1 cursor-pointer"> Add Shop</li>
              <li 
                className="hover:border-b-2 border-white w-full p-1 cursor-pointer"
                onClick={()=>{dispatch(makeOffline());navigate('/');setIsOpen((prev) => !prev);}}>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export { Header };
