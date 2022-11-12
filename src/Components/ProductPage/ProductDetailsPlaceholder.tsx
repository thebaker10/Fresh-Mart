import { Rating } from "../Card/Rating"




export function ProductDetailsPlaceholder() {
    return (
        <div className="mx-auto max-w-6xl">
          <div className="flex item-center  mt-10">
            <div className="w-auto ">
                <img id="placeholderImage" className="bg-darkGray shadow-lg rounded-lg overflow-hidden"></img>
            </div> 
            
            <div className="w-2/5 px-6 py-1 divide-darkGray">
              <div className="bg-darkGray shadow-lg rounded-lg overflow-hidden">
                <h1 className="text-gray-900 font-bold text-2xl ">‎</h1>
                <p className=" font-medium  text-1xl  ">‎ </p>
              </div>
              
              
              <hr className="mt-3"></hr>
              <div className="bg-darkGray shadow-lg rounded-lg overflow-hidden mt-5">
                <p className=" font-medium  text-1xl  ">‎ </p>
                <p className=" font-bold text-lg">‎ </p>
                <p className=" font-medium">‎ </p>
              </div>
              
              <hr className="mt-3"></hr>
              <div className="bg-darkGray shadow-lg rounded-lg overflow-hidden mt-5 h-1/2">
                <h1 className="text-gray-900  font-bold ">‎ </h1>
                <p >‎ </p>
              </div>
            </div>
            
            <div className="w-1/5 flex flex-row  justify-center items-center">
              <div  className="bg-darkGray h-full  shadow-lg rounded-lg overflow-hidden p-4">
                <p className="mb-2 text-sm opacity-0">FREE delivery on orders of $15 or more!</p>
              </div>  
            </div>
          </div>
        </div>
        
    )
}