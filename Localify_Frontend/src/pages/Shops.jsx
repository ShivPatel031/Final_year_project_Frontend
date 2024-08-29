import shops from "../StaticData/shops";
import ShopCard from "../component/ShopCard";
function Shops()
{
    return (
        <div className="w-screen h-screen flex flex-col items-center mt-28">
            Shops:
            <div>
                {shops.map(shop=><ShopCard detail={shop}/>)}
            </div>
            
        </div>
    )
}

export default Shops;