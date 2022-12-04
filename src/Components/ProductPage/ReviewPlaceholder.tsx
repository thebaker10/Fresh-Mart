import { Rating } from "../Card/Rating"


export function ReviewPlaceholder() {
    return (
        <div className="mx-auto max-w-4xl mt-5 bg-darkGray shadow-lg rounded-lg overflow-hidden">
            <div className="">
                <h1 className="text-gray-900 font-bold text-2xl">‎</h1>
                <div className="flex item-center mt-2">
                    <p className=" font-bold ml-2 ">‎</p>
                </div>
            </div>
            
            <div className="mt-2">
              <p>‎</p>
              <p className="font-bold mt-2">‎</p>
            </div>
        </div>
    )
}