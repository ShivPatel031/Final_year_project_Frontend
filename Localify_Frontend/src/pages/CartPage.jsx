import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

const productsArray = [
    {
        image: "https://example.com/product1.jpg",
        name: "Wireless Headphones",
        price: 99.99,
        total: 99.99
    },
    {
        image: "https://example.com/product2.jpg",
        name: "Smartwatch",
        price: 149.99,
        total: 149.99
    },
    {
        image: "https://example.com/product3.jpg",
        name: "Gaming Mouse",
        price: 59.99,
        total: 59.99
    },
    {
        image: "https://example.com/product4.jpg",
        name: "Bluetooth Speaker",
        price: 79.99,
        total: 79.99
    }
];
function CartItems({product,setProducts}){
    const [Quentity,setQuentity] = useState(1);


    useEffect(()=>setProducts(prev=>
        prev.map(p=>
        {
            if(p.name==product.name)
            {
                return {...p,["total"]:p.price*Quentity}
            }
            else return p
        }
        )   
    ),[Quentity])

    return (
        <div className="w-full flex justify-between">
            <div className="w-[150px] h-[100px] bg-blue-600 flex justify-center items-center">
                <img 
                    src={product.image} 
                    alt="image"
                    className="w-[30px] h-[40px]" />
            </div>
            <div className="w-[150px] h-[100px] flex justify-center items-center text-center">
                <p>{product.name}</p>
            </div>
            <div className="w-[100px] h-[100px] flex justify-between items-center">
                <button 
                    className="w-[30px] h-[30px] rounded-full border border-black flex justify-center items-center text-[20px]"
                    onClick={()=>setQuentity(prev=>prev>1?prev-1:prev)}
                >-</button>
                <p>{Quentity}</p>
                <button 
                    className="w-[30px] h-[30px] rounded-full border border-black flex justify-center items-center text-[20px]"
                    onClick={()=>setQuentity(prev=>prev<5?prev+1:prev)}
                >+</button>
            </div>
            <div className="w-[100px] h-[100px] flex justify-center items-center">
                <p>{product.price.toFixed(2)}</p>
            </div>
            <div className="w-[100px] h-[100px] flex justify-center items-center">
            <p>{product.total.toFixed(2)}</p>
            </div>
            <div className="w-[100px] h-[100px] flex justify-center items-center">
                <MdDeleteForever />
            </div>

        </div>
    )
}

function CartPage()
{
    const [products,setProducts] = useState(productsArray);
    const [subTotal,setSubTotal] = useState(0);
    // console.log(products);
    // console.log(subTotal);

    useEffect(()=>
    {
        let sum=0;
        products.forEach(pro=>sum+=pro.total)
        // console.log("sum is "+sum)
        setSubTotal(sum);
    }
    ,[products])

    return (
        <div className="w-screen h-screen bg-red-200">
            <h2 className="text-[45px] px-[50px] mt-[50px]">Your Cart</h2>
            <div className="w-full h-full flex justify-around">
                <div className="w-[70%] h-full bg-slate-400 flex flex-col">
                    <div className="w-full h-[50px] bg-red-500"></div>
                    {products.map(product=><CartItems  key={product.name} product={product} setProducts={setProducts}/>)}
                </div>
                <div className="w-[25%] h-[100px] bg-slate-700">
                    <p>SubTotal</p>
                    <p>{subTotal.toFixed(2)}</p>

                </div>
            </div>
        </div>
    )
}

export default CartPage;