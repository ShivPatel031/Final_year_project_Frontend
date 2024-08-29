function StepCard({title,step,description})
{
    return (
        <>
            <p className=" flex justify-center items-center w-[100px] h-[100px] bg-red-500 rounded-[50%] mt-[20px]">{step}</p>
            <div className="w-[1px] h-[200px] bg-red-500 mb-[15px]"/>
            <div className="flex flex-col items-center">
                <p className="text-[15px]">step {step}</p>
                <h3 className="text-[40px]">{title}</h3>
                <p>{description}</p>
            </div>
            <div className="w-[1px] h-[300px] bg-red-500 mt-[10px]"/>
        </>
        
    )
}

export default StepCard;