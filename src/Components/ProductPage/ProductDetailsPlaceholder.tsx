import { Rating } from "../Card/Rating"




export function ProductDetailsPlaceholder() {
    return (
        <div className="mx-auto max-w-5xl">
          <div className="flex item-center  mt-10">
            <div className="w-auto ">
                <img id="placeholderImage" className="bg-darkGray shadow-lg rounded-lg overflow-hidden"></img>
            </div> 
            <div className="flex flex-col w-2/5 pl-16 ">
              <div className="bg-darkGray shadow-lg rounded-lg overflow-hidden h-full"></div>
            </div>
          </div>
        </div>
        
    )
}