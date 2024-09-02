import React from "react";

function ProductCard({ image, title, description, price }) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-slate-300">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">${price}</span>
            <button className=" px-4 py-2 blueGradient text-white  rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  


function ProdcutDisplay() {
  return (
    <div >
     
    <div className=" bg-slate-200 p-5  h-[100vh] w-[100vw] flex  justify-evenly ">
       
        <div className=" h-[80vh] shadow-lg shadow-black/20 w-[20vw] bg-white rounded-xl border-slate-300 border-[4px]">

        </div>

        <div className="bg-white shadow-lg p-6 over gap-10  border-slate-300 border-[4px] border w-[70vw] rounded-xl shadow-black/20 flex justify-center items-center  flex-wrap ">
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
        </div>
    </div>
    </div>
  );
}

export default ProdcutDisplay;
