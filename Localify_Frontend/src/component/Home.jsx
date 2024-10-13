import React from "react";
import { motion } from "framer-motion";
import { steps } from "../StaticData/step.js";


function StepCard({ title, step, description, index }) {
    return (
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and below the viewport
        whileInView={{ opacity: 1, y: 0 }} // Animate to full visibility when in view
        transition={{ duration: 0.5, delay: index * 0.2 }} // Smooth transition with a delay based on step index
        viewport={{ once: true }} // Only animate once when scrolled into view
      >
        <p className="flex justify-center items-center w-[100px] h-[100px] pinkGradient rounded-[50%] mt-[20px] mb-3">
          {step}
        </p>
        <div className="w-[1px] h-[150px] blueGradient mb-[15px]" />
        <div className="flex flex-col text-white gap-4 w-[50vw] h-[35vh] items-center border-fuchsia-800/90 border-2 bg-black/80 p-7 rounded-xl hover:shadow-lg shadow-black">
          <p className="text-3xl">Step {step}</p>
          <h3 className="text-5xl">{title}</h3>
          <p className="text-center">{description}</p>
        </div>
        {step !== '5' && <div className="w-[1px] h-[150px] blueGradient mt-3" />}
      </motion.div>
    );
  }

function Home() {
  return (
    <div className="w-full GradientNeon relative flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full h-screen bgImage flex justify-center items-center flex-col">
        <motion.div className="flex bg-black opacity-80 p-2 rounded-2xl flex-col justify-between items-center h-[350px]" initial="initial" animate="animation">
          <motion.h1 className="text-[55px] w-[700px] text-center font-bold mainimageanimaion text-white">
            Empowering Local Businesses with Effortless Online Stores
          </motion.h1>
          <motion.p className="text-slate-600 mainimageanimaion font-semibold text-white/80 text-xl">Where you can </motion.p>
          <div className="w-[70%] flex justify-evenly">
            <button className="bg-white text-purple-500 rounded-xl w-[100px] h-[40px] text-center mainimageanimaion font-semibold hover:scale-95 ease-in-out ">Showcase</button>
            <button className="bg-white text-purple-500 rounded-xl w-[100px] h-[40px] text-center mainimageanimaion font-semibold  hover:scale-95 ease-in-out">Sell</button>
            <button className="bg-white text-purple-500 rounded-xl w-[100px] h-[40px] text-center mainimageanimaion font-semibold  hover:scale-95 ease-in-out">Purchase</button>
          </div>
        </motion.div>
      </div>

      {/* Featured Section */}
      <div className="w-full mt-10">
        <h3 className="text-[40px] text-center"></h3>
      </div>

      <div className="py-[40px] home-second  ">

                <div className="w-full h-[350px] px-[150px] flex  justify-between items-center " >

                    <motion.div 
                        className="w-[47%] h-[85%] home-second-div-imag1 rounded-xl div1-image"
                        initial="initial"
                        whileInView="animate"
                        ></motion.div>
                    <motion.div 
                        className="w-[50%] h-[85%] border-2 border-fuchsia-950 rounded-3xl flex flex-col items-start justify-evenly pl-40 hover:shadow-lg hover:scale-105 ease-out hover:shadow-fuchsia-950/50   div1-text"
                        initial="initial"
                        whileInView="animate"
                        >
                        <h1 className="text-[40px]">Grow your online presence</h1>
                        <p>Boost traffic and increase engagement by building your website easlly.</p>
                        <button className="bg-black rounded-md text-white w-[100px] h-[45px]">Start Now</button>
                    </motion.div>

                </div>

                <div className="w-full h-[350px] px-[150px] flex justify-between items-center home-second ">

                    <motion.div 
                        className="w-[50%] h-[85%] flex flex-col items-start justify-evenly pr-40 div2-text w-[50%] h-[85%] border-2 border-fuchsia-950 rounded-3xl flex flex-col items-start justify-evenly pl-40 hover:shadow-lg hover:scale-105 ease-out hover:shadow-fuchsia-950/50   div1-text"
                        initial="initial"
                        whileInView="animate"
                        >
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

      {/* Step-by-Step Section */}
      <div className="w-[97vw] p-10 mt-10 flex flex-col items-center ">
        <div className="flex flex-col items-center mb-10">
          {steps.map((step, index) => (
            <StepCard key={step.step} title={step.title} step={step.step} description={step.description} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}


export  {Home};
// export { StepCard };
