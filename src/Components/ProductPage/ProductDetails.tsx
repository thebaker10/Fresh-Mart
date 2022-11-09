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
    if(props.name != "placeholder"){
      document.getElementById("placeholderImage")?.setAttribute("src", "https://source.unsplash.com/400x400/?" + props.name + " fruit");
    }
    return (
        <div className="mx-auto max-w-6xl">
          <div className="flex item-center  mt-10">
            <div className="w-auto ">
                <img id="placeholderImage" className="bg-white shadow-lg rounded-lg overflow-hidden"></img>
            </div> 
            
            <div className="w-2/5 px-6 py-1 divide-darkGray">
              {props.name == "placeholder" ? <h1 className="text-gray-900 font-bold text-2xl opacity-0">{props.name}</h1> : <h1 className="text-gray-900 font-bold text-2xl">{props.name}</h1>}
              <div className="flex item-center mt-2">
                <Rating nStars={props.stars}/>
                <p className="ml-2">{props.numOfReviews} reviews</p>
              </div>
              <hr className="mt-3"></hr>
              <p className=" font-medium text-1xl mt-5">MSRP: <span className="line-through">${props.msrp.toFixed(2)}</span></p>
              <p className=" font-medium text-1xl">Our Price: <span className="font-bold text-lg">${props.price.toFixed(2)}</span></p>
              <p className=" font-medium ">Savings: ${(props.msrp-props.price).toFixed(2)} <span className="text-sm">{"("+(props.price/props.msrp*100).toFixed(0)}%{")"}</span></p>
              <hr className="mt-3"></hr>
              <div>
                <h1 className="text-gray-900 font-bold mt-5">Product Description</h1>
                <p>{props.description}</p>
              </div>
            </div>
            
            <div className="w-1/5 p-4 flex flex-row  justify-center items-center">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <p className="text-black font-bold text-xl mb-4">${props.price.toFixed(2)}</p>
                <p className="mb-2 text-sm">FREE delivery on orders of $15 or more!</p>
                <p className="text-green font-bold mb-5">IN STOCK</p>

                <QuantitySelector></QuantitySelector>

                <div className="flex gap-1 flex-row  justify-center items-center">
                  <button className="px-3 py-3 bg-green text-white text-xs font-bold uppercase rounded">Add to Cart</button>
                  <ul className="flex gap-8 justify-center items-center mt-2 mb-2">
                    <button className="px-2 pt-2 bg-green text-white text-xs font-bold uppercase rounded"><IconItem icon={faHeartCirclePlus} /></button>
                  </ul>
                </div>
                <p className="mt-5 text-sm">Return policy: <a href="" className="font-medium text-primary-600 dark:text-blue">Returns accepted within 7 days of order. Exclusions apply.</a></p>

              </div>  
            </div>
          </div>
        </div>
        
    )
}