import { useNavigate } from "react-router-dom"
function ShopCard({detail})
{
    const navigate = useNavigate();

    console.log(detail)
    return (
        <div className="w-[400px] h-[400px] relative border border-black rounded-lg"
            onClick={()=>navigate('/shops/shop1')}>
            <div
                className="w-full">
                    <img src={detail.banner} alt="no image" />
            </div>
            <div
            className="w-[100px] h-[100px] absolute top-[80px] left-[10px] border border-black rounded-md">
                <img src={detail.logo} alt="no imag"/>
            </div>
            <div className="absolute top-[130px] left-[170px]">
                <h3>{detail.domain}</h3>
                <h3>{detail.name}</h3>
                <h3 className="mt-[20px]">{detail.location}</h3>
            </div>
            <div className="mt-[120px] ml-[10px]">
                <h4>Brief info:</h4>
                <p>{detail.brief}</p>
            </div>

        </div>
    )
}

export default ShopCard