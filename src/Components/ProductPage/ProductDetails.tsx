import { Rating } from "../Card/Rating"
import { IconItem } from "../Nav/IconItem";
import {faHeartCircleMinus, faHeartCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { QuantitySelector } from "./QuantitySelector";

type Props={
    name: string,
    description: string,
    stars: number,
    price: number,
    msrp: number,
    numOfReviews: number,
}

export function ProductDetails(props:Props) {
    return (
        <div className="mx-auto max-w-6xl">
          <div className="flex item-center  mt-10">
            <div className="w-auto ">
                <img className="bg-white shadow-lg rounded-lg overflow-hidden" src={"https://source.unsplash.com/400x400/?" + props.name + " fruit"} alt="" />
            </div> 
            <div className="w-2/5 p-4">
              <h1 className="text-gray-900 font-bold text-2xl">{props.name}</h1>
              <div className="flex item-center mt-2">
                <Rating nStars={props.stars}/>
                <p className="ml-2">{props.numOfReviews} reviews</p>
              </div>
              <h1 className="text-gray-900 font-bold text-2xl mt-5">${props.price.toFixed(2)}</h1>
              <div>
                <h1 className="text-gray-900 font-bold mt-5">Product Description</h1>
                <p>{props.description}</p>
              </div>
            </div>
            <div className="w-1/5 p-4 flex flex-row  justify-center items-center">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-2 text-center">
                <p className="text-black font-bold text-xl">MSRP: ${props.msrp.toFixed(2)}</p>
                <p className="text-black font-bold text-xl">Price: ${props.price.toFixed(2)}</p>

                <QuantitySelector></QuantitySelector>

                <div className="flex gap-1 flex-row  justify-center items-center">
                  <button className="px-3 py-3 bg-green text-white text-xs font-bold uppercase rounded">Add to Cart</button>
                  <ul className="flex gap-8 justify-center items-center mt-2 mb-2">
                    <button className="px-2 pt-2 bg-green text-white text-xs font-bold uppercase rounded"><IconItem icon={faHeartCirclePlus} /></button>
                  </ul>
                </div>

              </div>  
            </div>
          </div>
        </div>
        
    )
}