import { Rating } from "../../Card/Rating"

type Props = {
  name: string,
  description: string,
  stars: number,
  price: number,
  image?: string
}

export function SearchBarCard(props: Props) {
  return (

    <div className="p-5">
      <div className="flex max-w-md m-auto bg-white shadow-lg rounded-lg overflow-hidden h-32 w-96">

        <img src={props.image} className="w-1/3 " alt="" />

        <div className="w-2/3 p-4">
          <h1 className="text-gray-900 font-bold text-xl">{props.name}</h1>
          <Rating nStars={props.stars}/>
          <div className="flex item-center justify-between mt-3">
            
            <h1 className="text-black font-bold text-xl">${props.price.toFixed(2)}</h1>
            
            <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}