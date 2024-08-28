import { SiFacebook ,SiInstagram,SiSnapchat} from "react-icons/si";
function Footer(){
    return(
        <div className="w-full h-[250px]  px-[150px]">
            <div className="w-full h-[250px] flex justify-between items-center">
                <div className="w-[150px] h-[150px] flex flex-col justify-between">
                    <h1 className="text-2xl">Localify</h1>
                    <div className="flex justify-between text-2xl">
                        <SiFacebook />
                        <SiInstagram />
                        <SiSnapchat />
                    </div>
                </div>
                <div className="w-[500px] h-[250px] "></div>
            </div>
        </div>
    )
}

export {Footer};