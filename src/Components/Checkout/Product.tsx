import { Rating } from "../Card/Rating"

type Props={
    name: string,
    category: string,
    imageLink: string,
    quantity: number,
    price: number,
}

export function Product(props:Props) {
    return (
        <div className="">
            <li className="grid grid-cols-6 gap-2 border-b-1">
                <div className="col-span-1 self-center">
                    <img src={"https://source.unsplash.com/400x400/?" + props.name + " food"} alt="Product" className="rounded w-full" />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                    <span className="text-gray-600 text-md font-semi-bold">{props.name}</span>
                    <span className="text-gray-400 text-sm inline-block pt-2">{props.category}</span>
                </div>
                <div className="col-span-2 pt-3">
                    <div className="flex items-center space-x-2 text-sm justify-between">
                        <span className="text-gray-400">{props.quantity} x ${(props.price).toFixed(2)}</span>
                        <span className="text-green font-semibold inline-block">${(props.price * props.quantity).toFixed(2)}</span>
                    </div>
                </div>
            </li>
        </div>
    )
}