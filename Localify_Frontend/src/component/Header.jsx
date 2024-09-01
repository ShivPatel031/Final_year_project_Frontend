import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { makeOffline } from "../StaticData/userData";
import {HomePageNav} from "../StaticData/navbar.js";

function NavOption()
{
  return (
    <ul className="flex w-[45%] justify-between items-center">
      {HomePageNav.map(navData=><li key={navData.id}><NavLink to={navData.to}><p>{navData.title}</p></NavLink></li>)}
    </ul>
  )
}

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const userData = useSelector(state=>state.user.userInfo);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-10 w-screen h-[60px] bg-white flex items-center justify-between px-[50px] overflow-visible">
      <div className="w-[15%]">
        <img src={`https://res.cloudinary.com/dtdixmfnd/image/upload/v1725194744/logo_x3cqrq.png`} alt="logo" />
      </div>
      <div className="w-[60%] h-[95%] flex justify-between overflow-visible">

          <NavOption />

        <div className="h-full flex items-center relative overflow-visible">

          {!status && (
            <button
              className="w-[70px] text-purple-500 bg-slate-300 rounded-xl h-[40px] mr-2"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          )}

          {!status && (
            <button
              className="w-[75px] text-purple-500 bg-slate-300 rounded-xl h-[40px] ml-2"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          )}

          {status && (
            <FaRegUserCircle
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-[30px] text-slate-600 cursor-pointer"
            />
          )}

          {isOpen && (
            <ul className="absolute z-20 w-[150px] bg-black text-white flex flex-col rounded-xl justify-evenly items-start top-[59px] right-[-30px] p-3 gap-2">
              <li className="hover:border-b-2 border-white w-full p-1 cursor-pointer">{userData.firstName}</li>
              {userData.role=="shopkeeper" && <li className="hover:border-b-2 border-white w-full p-1 cursor-pointer"> Add Shop</li>}
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
