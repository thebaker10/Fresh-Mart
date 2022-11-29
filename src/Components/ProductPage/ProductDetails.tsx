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
    productID: number
}

export function ProductDetails(props:Props) {
    return (
        <div className="mx-auto max-w-5xl">
          <div className="flex item-center  mt-10">
            <div className="w-3/5">
                <img id="placeholderImage" src={"https://source.unsplash.com/800x800/?" + props.name + " food"} className="bg-darkGray shadow-lg rounded-lg overflow-hidden"></img>
            </div> 
            
            <div className="flex flex-col w-2/5  pt-1 pl-16 divide-darkGray">
              
              <div className="flex-auto">
                <h1 className="text-gray-900 font-bold text-5xl">{props.name}</h1>            
                <div className="flex item-center mt-2">
                  <Rating nStars={props.stars}/>
                  <p className="ml-2">{props.numOfReviews} reviews</p>
                </div>
                
                <p className="flex-1 text-green font-bold my-5">IN STOCK</p>
                <p className=" font-medium text-1xl ">MSRP: <span className="line-through">${props.msrp.toFixed(2)}</span></p>
                <p className=" font-medium">Savings: ${(props.msrp-props.price).toFixed(2)} <span className="text-sm">{"("+(props.price/props.msrp*100).toFixed(0)}%{")"}</span></p>
                <p className=" font-medium text-2xl">Our Price: <span className="font-bold text-2xl">${props.price.toFixed(2)}</span></p>
                
                <div>
                  <h1 className="text-gray-900 font-bold mt-5 text-lg">Product Description</h1>
                  <p className="text-lg">{props.description}</p>
                </div>
              </div>
              
              
              <div className="flex-end ">
              <QuantitySelector price={props.price} productID={props.productID}></QuantitySelector>
              </div>
              
            </div>
          </div>
        </div>
        
    )
}