import { Rating } from "../Nav/Card/Rating"

type Props={
    name: string,
    description: string,
    stars: number,
    price: number
    msrp: number
}

export function ProductDetails(props:Props) {
    return (
        <div className="mx-auto max-w-6xl">
          <div className="flex item-center justify-between mt-10">
            <div className="w-2/5 p-4">
                <img src={"https://source.unsplash.com/400x400/?" + props.name + " fruit"} alt="" />
            </div> 
            <div className="w-2/5 p-4">
              <h1 className="text-gray-900 font-bold text-2xl">{props.name}</h1>
              <div className="flex item-center mt-5">
                <Rating nStars={props.stars}/>
              </div>
              <h1 className="text-gray-900 font-bold text-2xl mt-5">${props.price.toFixed(2)}</h1>
            </div>
            <div className="w-1/5 p-4 flex flex-row  justify-center items-center">
              <div className="border-solid border-2 border-sky-500 p-2 text-center">
                <p className="text-black font-bold text-xl">MSRP: ${props.msrp.toFixed(2)}</p>
                <p className="text-black font-bold text-xl">Price: ${props.price.toFixed(2)}</p>
                <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Add to Cart</button>
              </div>  
            </div>
          </div>
        </div>
    )
}