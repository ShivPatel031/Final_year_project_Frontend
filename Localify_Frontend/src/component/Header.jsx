import { NavLink ,useNavigate} from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    
    return (
            <nav className="fixed z-10 left-[12.5%] top-[10px] w-[75%] h-[60px] bg-slate-400 rounded-3xl flex items-center justify-between  px-[50px]">
                <div className="w-[15%]">Logo</div>
                <div className="w-[70%] h-[95%] flex justify-between ">
                    <ul className="flex w-[60%] justify-between items-center ">
                        <li><NavLink to="/"><p>Home</p></NavLink></li>
                        <li><NavLink to="/about"><p>About</p></NavLink></li>
                        <li><NavLink to="/contact"><p>Contact</p></NavLink></li>
                        <li><NavLink to="/shops"><p>Shops</p></NavLink></li>
                    </ul>
                    <div className="w-[25%] h-full flex justify-between items-center">
                        <button 
                            className="w-[45%] text-white bg-slate-800 rounded-xl h-[70%]"
                            onClick={()=>navigate("/login")}>
                            Log in
                        </button>
                        <button 
                            className="w-[45%] text-white bg-slate-800 rounded-xl h-[70%]"
                            onClick={()=>navigate("/signup")}>
                            Sign up
                        </button>
                    </div>
                </div>
            </nav>
    )
}

export {Header}