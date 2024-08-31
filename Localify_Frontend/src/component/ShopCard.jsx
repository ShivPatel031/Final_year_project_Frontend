import { useNavigate } from "react-router-dom"
function ShopCard({detail})
{
    const navigate = useNavigate();

    console.log(detail)
    return (
        <div className="w-[450px] h-[450px] relative border border-black rounded-lg"
            onClick={()=>navigate('/shops/shop1')}>
            <div
                className="w-full">
                    <img 
                        src={detail.banner} 
                        alt="no image"
                        className="h-[200px]" />
            </div>
            <div
            className="w-[80px] h-[80px] absolute top-[110px] left-[15px] border border-black rounded-full">
                <img src={detail.logo} alt="no imag"/>
            </div>
            <div className="absolute w-full top-[210px] left-[20px]">
                <h3 className="text-[25px] font">{detail.name}</h3>
                <h3>{detail.domain}</h3>
                <h3>{detail.location}</h3>
                <button className="absolute top-[10px] left-[320px] w-[80px] bg-black text-white h-[30px] rounded-lg">Category</button>
            </div>
            <div className="mt-[140px] ml-[20px]">
                <p>{detail.brief}</p>
            </div>

            <button className="absolute bottom-[25px] w-[92%] bg-black text-white h-[30px] ml-[20px] rounded-lg">Visit Shop</button>

        </div>
    )
}

export default ShopCard