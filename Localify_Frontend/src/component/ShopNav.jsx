import { FiSearch } from "react-icons/fi";

function ShopNav()
{
    return (
        <div className="w-full h-[70px] bg-slate-300 flex justify-around items-center">
            <div>logo</div>
            <div>
                <ul className="w-[300px] flex justify-between">
                    <li>Home</li>
                    <li>product</li>
                    <li>contact</li>
                    <li>about</li>
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