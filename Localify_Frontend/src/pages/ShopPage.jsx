import ShopNav from "../component/ShopNav";
import ProductCard from "../component/ProductCard";

function ShopPage()
{
    return (
        <div className="w-full">
            <ShopNav />
            <div className="relative w-full h-[500px]">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
                    alt="shop banner"
                    className="w-full h-[500px]"/>
                <h3 className="text-[50px] absolute z-10 top-[200px] left-[50px]">shop name</h3>
                <p className="text-[20px] absolute z-10 top-[270px] left-[50px]">brief info</p>
            </div>
            <h3 className="w-full text-center text-[40px] my-3">Products</h3>
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
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                
            </div>
        </div>
        )
}

export default ShopPage;