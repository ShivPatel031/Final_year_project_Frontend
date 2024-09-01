import { FaRegStar } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { MdOutlineHeadphones } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

// import { features } from "./staticData";


function ProductCard() {
    return (
      <div className="w-[300px] h-[250px] bg-slate-300 rounded-md m-4 "></div>
    );
}
  
function FeaturesCard({data}) {

    return <div className="w-[400px] h-[300px] bg-white shadow-2xl rounded-md flex flex-col justify-evenly items-center">
        <span className={`text-[40px] ${data.color}`}>{data.icon}</span>
        <h3 className="text-[30px] font-semibold">{data.title}</h3>
        <h4 className="text-[20px]">{data.dec}</h4>
    </div>;
}
  
// function ShopDetails() {
//     return <div></div>;
// }

function T1_Home({shopData})
{

    console.log(shopData)
    const features =[
        {
            icon:<FaRegStar />,
            title:"Local Products",
            dec:"Handpicking items from local",
            color:"text-yellow-600"
        },
        {
            icon:<BsTruck />,
            title:"Fast Delivery",
            dec:"Quick and reliable local delivery service",
            color:"text-green-600"
        },
        {
            icon:<MdOutlineHeadphones />,
            title:"Customer Support",
            dec:"Dedicated support for all your needs",
            color:"text-blue-600"
        }
    ]

    return (
        <>
        
      {/* <div className="w-full ">
        <img 
          src={shopData.banner_image} 
          alt="banner image"
          className="w-full h-[600px]" />
      </div> */}
      <div className="relative w-full h-[400px]">
        <div className="w-full h-[400px] bg-gradient-to-r from-red-500 to-purple-500"></div>
        <h3 className="w-full text-[60px] absolute z-10 top-[25%] left-[4%] text-center text-white font-bold">
          Welcome to {shopData.name}
        </h3>
        <p className="w-full text-[25px] absolute z-10 top-[50%] left-[4%] text-center text-white">
          {shopData.tagline}
        </p>
      </div>
      <div className="w-full mt-[40px]">
        <h3 className="text-center text-[50px] font-semibold">Our Features</h3>
        <div className="w-full h-[400px] flex justify-center items-center gap-[30px] mt-[20px]">
          {features.map((data)=><FeaturesCard data={data}/>)}
        </div>
      </div>
      <h3 className="w-full text-center text-[40px] mt-[40px] font-semibold">
        Our Products
      </h3>
      <div className="flex flex-wrap justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div className=" relative w-full h-[400px] mt-[30px] bg-slate-200">
        <h3 className="absolute text-[30px] top-6 left-10 font-medium">
          Shop Details
        </h3>
        <div className="w-full h-full flex flex-wrap">
          <section className="absolute top-[30%] left-[7%]">
            <p className="text-2xl font-medium">Since </p>
            <p>{shopData?.establishedYear && JSON.stringify(shopData?.establishedYear).substring(1,5)}</p>
          </section>
          <section className="absolute top-[30%] left-[40%]">
            <p className="text-2xl font-medium">Ratings </p>
            <p>{shopData.ratings?.average}</p>
          </section>
          <section className="absolute top-[30%] left-[75%]">
            <p className="text-2xl font-medium">Shiping </p>
            <p>Zones: {shopData.shipping_info?.zones}</p>
            <p>Delivery Time {shopData.shipping_info?.delivery_time?.min}-{shopData.shipping_info?.delivery_time?.max} bussiness days</p>
          </section>
          <section className="absolute top-[65%] left-[7%]">
            <p className="text-2xl font-medium">Category </p>
            <p>{shopData.category}</p>
          </section>
        </div>
      </div>

      <div className="w-full mt-[30px] flex flex-col justify-center items-center p-10">
        <h3 className="font-semibold text-[43px]">Contact Us</h3>
        <div className="bg-slate-200 w-[400px] h-[200px] flex flex-col justify-center gap-3 rounded-md items-center p-5 mt-[20px]">
          <h4 className="text-[20px] font-medium">Get in Touch</h4>
          <section className="flex w-[70%] gap-1 items-center">
            <CiMail className="text-[20px]"/>
            <p className="text-lg">{shopData.email}</p>
          </section>
          <section className="flex w-[70%] gap-1 items-center">
            <MdOutlinePhone className="text-[20px]"/>
            <p className="text-lg">{shopData.contact}</p>
          </section>
          {shopData.location && <section className="flex w-[70%] gap-1 items-center">
            <IoLocationOutline className="text-[20px]"/>
            <p className="text-lg">{shopData.location.city}, {shopData.location.state} ,{shopData.location.pincode}</p>
          </section>}
        </div>
      </div>
      </>
    )
}

export default T1_Home;