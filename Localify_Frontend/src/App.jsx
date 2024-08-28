import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { Outlet, Routes,Route ,useLocation} from "react-router-dom";
import Home_Page from './pages/Home_Page.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Shops from './pages/Shops.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ShopPage from "./pages/ShopPage.jsx";
import AddShop from "./component/AddShop.jsx";

function App() {

  const location = useLocation();

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
       </Routes>
       {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname.substring(0,7) !== "/shops/" &&  <Footer />}

       <Routes>
        <Route path='/shops/shop1' element={<ShopPage />}/>
       </Routes>

       {/* < AddShop /> */}
       
      
    </>
  );
}

export default App;
