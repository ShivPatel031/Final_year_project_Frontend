import { delay, motion } from "framer-motion";
import StepCard from "./StepCard";
import { steps } from "../StaticData/step.js";

function Home(){

    
    return(
        <div className="w-full relative flex flex-col items-center">

            <div 
                className="w-screen h-[450px] homeimage flex justify-center items-center flex-col "
                >
                <motion.div 
                    className="flex flex-col justify-between items-center h-[350px]"
                    
                    initial="initial"
                    animate="animation"
                    >
                    <motion.h1 
                        className="text-[55px] w-[700px] text-center font-bold mainimageanimaion text-white"
                        >Empowering Local business with efferless Online Stores</motion.h1>
                    <motion.p 
                        className="text-slate-600 mainimageanimaion text-white/80"
                        >Where you can ,</motion.p>
                        <div className="w-[70%] flex justify-evenly">
                            <button className="bg-white text-purple-500 rounded-xl w-[100px] h-[40px] text-center mainimageanimaion">Showcase</button>
                            <button className="bg-white text-purple-500 rounded-xl w-[100px] h-[40px] text-center mainimageanimaion">Sell</button>
                            <button className="bg-white text-purple-500 rounded-xl w-[100px] h-[40px] text-center mainimageanimaion">Purchase</button>
                        </div>
                    
                </motion.div>
                
            </div>

            <div className="w-full mt-10">
            <h3 className="text-[40px] text-center">Featured Products</h3>

            </div>

            <div className="py-[40px] home-second">

                <div className="w-full h-[350px] px-[150px] flex  justify-betweenitems-center " >

                    <motion.div 
                        className="w-[47%] h-[85%] home-second-div-imag1 rounded-xl div1-image"
                        initial="initial"
                        whileInView="animate"
                        ></motion.div>
                    <motion.div 
                        className="w-[50%] h-[85%] flex flex-col items-start justify-evenly pl-40 div1-text"
                        initial="initial"
                        whileInView="animate"
                        >
                        <h1 className="text-[40px]">Grow your online presence</h1>
                        <p>Boost traffic and increase engagement by building your website easlly.</p>
                        <button className="bg-black rounded-md text-white w-[100px] h-[45px]">Start Now</button>
                    </motion.div>

                </div>

                <div className="w-full h-[350px] px-[150px] flex justify-between items-center home-second">

                    <motion.div 
                        className="w-[50%] h-[85%] flex flex-col items-start justify-evenly pr-40 div2-text"
                        initial="initial"
                        whileInView="animate"
                        >
                        <h1 className="text-[40px]">Build with the world’s most intuitive platform</h1>
                        <p>Another subheading—maybe it’s related to the image on the left, or the button below </p>
                        <button className="bg-black rounded-md text-white w-[100px] h-[45px]">Start Now</button>
                    </motion.div>
                    <motion.div 
                        className="w-[47%] h-[85%] home-second-div-imag1 rounded-xl div2-image"
                        initial="initial"
                        whileInView="animate">
                    </motion.div>

                </div>

            </div>

            <div className="w-[70%] flex flex-col items-center">

                <div className="flex flex-col items-center">
                    {steps.map(step=><StepCard key={step.step} title={step.title} step={step.step} description={step.description}/>)}
                </div>

            </div>
        </div>
    )
}

export {Home}