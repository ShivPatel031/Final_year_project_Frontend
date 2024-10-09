import { useState } from "react";
import { useSelector } from "react-redux";
import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { Outlet, Routes,Route ,useLocation, BrowserRouter} from "react-router-dom";
import Home_Page from './pages/Home_Page.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Shops from './pages/Shops.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ShopPage from "./pages/ShopPage.jsx";
import AddShop from "./component/AddShop.jsx";
import Dashbord from "./pages/Dashbord.jsx";
import Profile from "./pages/Profile.jsx";
import OrderPage from "./pages/OrderPage.jsx";

function App() {

  const location = useLocation();
  // console.log(location);
  const userData = useSelector(state=>state.user.userInfo);
  // const [addShop,setAddShop] = useState(false);
  const user={role:"customer"}


  console.log(userData);

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname.substring(0,7) !== "/shops/" && <Header />}
       <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shops" element={<Shops />} /> 
          <Route path="/login" element={<Login />} />  
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashbord/*" element={<Dashbord />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/orders" element={<OrderPage/>}/>
       </Routes>
       {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname.substring(0,7) !== "/shops/" &&  <Footer />}
       
       {/* {addShop && <AskToRegisterAsShopkeeper setAddShop={setAddShop} />} */}

       <Routes>
        <Route path='/shops/:shopId/*' element={<ShopPage />}/>
        <Route path="/shops/addShop" element={<AddShop />} />
       </Routes>
    </>
  );
}

export default App;
