import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function ShopNav({shopLogo})
{
    return (
        <div className="w-full h-[70px] bg-slate-300 flex justify-around items-center">
            <div>
                <img 
                    src={shopLogo} 
                    alt="shop logo"
                    className="w-[40px] h-[40px]"/>
            </div>
            <div>
                <ul className="w-[300px] flex justify-between">
                    <li><NavLink to="/shops/shop1/">Home</NavLink></li>
                    <li><NavLink to="/shops/shop1/product">product</NavLink></li>
                    <li><NavLink to="/shops/shop1/contact">contact</NavLink></li>
                    <li><NavLink to="/shops/shop1/about">about</NavLink></li>
                </ul>
            </div>
            <div className="w-[300px] flex justify-between">
                <div className="flex w-[200px] justify-between items-center">
                    <input 
                    type="text"
                    placeholder="Search Product"
                    className="w-[160px] h-[30px] rounded-md px-4"
                    />
                    <FiSearch className="text-[25px]"/>
                </div>

                <button className="w-[70px] h-[30px] bg-black text-white rounded-md">Login</button>
            </div>
        </div>
    )
}

export default ShopNav;