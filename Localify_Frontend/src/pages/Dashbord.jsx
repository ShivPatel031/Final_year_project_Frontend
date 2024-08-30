function Card1()
{
    return (
        <>
        <div className="relative overflow-visible">
            <div className="w-[180px] h-[120px] bg-red-500 rounded-md"></div>
            <div className="w-[40px] h-[40px] bg-blue-950 rounded-md absolute top-[-20px] left-[30px]"/>
        </div>   
        </>
    )
}

function Card2(){

    return (
        <div className="w-[220px] h-[250px] bg-red-500 rounded-md">
            
        </div>
    )
}

function Dashbord()
{
    return (
        <>
            <div className="w-screen h-screen bg-slate-300 flex justify-center items-center gap-3">
                <section className="w-[19%] h-[98%] bg-white rounded-lg flex flex-col items-center py-5">
                    <h3 className="text-[20px] font-medium my-2">Dashbord Menu</h3>
                    <ul className="my-4 w-[90%] flex flex-col items-center">
                        <li className="bg-slate-900 w-full text-white h-[40px] rounded-md text-[15px] flex justify-center items-center">Home</li>
                    </ul>
                </section>

                <div className="w-[79%] h-[98%]  bg-slate-300 rounded-md">
                    <div className="w-full h-[50px] flex justify-between items-center">
                        <h4>Dashbord / Home</h4>
                        <div className="w-[35%] flex justify-around">
                            <input 
                                type="text"
                                placeholder="search"
                                className="px-3 rounded-md w-[200px] h-[35px]"
                            />
                            <button>Notification</button>
                            <button>Settings</button>
                        </div>
                    </div>
                    <div className="w-full h-[660px] flex flex-col justify-center items-center">
                        <div className="relative w-full h-[150px] flex justify-center gap-5 overflow-visible">
                            <Card1 />
                            <Card1 />
                            <Card1 />
                        </div>
                        <div className="w-full h-[250px] flex justify-center gap-5">
                            <Card2 />
                            <Card2 />
                            <Card2 />
                        </div>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashbord