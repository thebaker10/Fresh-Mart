import { Rating } from "./Rating"

type Props={
    name: string,
    description: string,
    stars: number,
    price: number,
    image?: string
}

export function Card(props:Props) {
    return (
    
        <div className="p-5">
          <div className="flex max-w-md m-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-1/3 bg-cover">
            <img src={"https://source.unsplash.com/400x600/?" + props.name + " fruit"} alt="" />
            </div> 
            <div className="w-2/3 p-4">
              <h1 className="text-gray-900 font-bold text-xl">{props.name}</h1>
              <p className="mt-2 text-black text-sm">{props.description}</p>
              <div className="flex item-center mt-2">
                <Rating nStars={props.stars}/>
              </div>
              <div className="flex item-center justify-between mt-3">
                <h1 className="text-black font-bold text-xl">${props.price.toFixed(2)}</h1>
                <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
    )
}