import { useNavigate } from "react-router-dom";

function AskToRegisterAsShopkeeper({setAddShop})
{
    const navigate = useNavigate();

    return (
        <div className="fixed w-[1490px] h-[700px] top-3 left-4 bg-white/90 rounded-2xl z-20">
                <h3 className="absolute text-[60px] top-[200px] left-[480px] ">Welcome to Localify</h3>
                <p className="absolute text-[20px] top-[300px] left-[600px]">Want to Register as Shopkeeper</p>
                <button className="absolute top-[380px] left-[680px] w-[150px] h-[50px] bg-black/80 text-white rounded-lg">As Shopkeeper</button>
                <p 
                    className="absolute text-[15px] top-[600px] left-[720px] cursor-pointer"
                    onClick={()=>{setAddShop(false);navigate('/');}}>
                Skip for now
                </p>
        </div>
    )
}

export default AskToRegisterAsShopkeeper;