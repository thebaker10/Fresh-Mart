
type Props={
    name: string,
    price: number
}

export function CardFavoriteItem(props:Props) {
    return (
        <div className="px-5 divide-gray">
            <div className="flex space-between ">
                <div className="flex w-1/3 items-center">
                    <div className="flex-1 ">
                        <img src={"https://source.unsplash.com/100x120/?" + props.name + " fruit"} alt="" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-lg">{props.name}</p>
                    </div>
                </div>
                <div className="flex w-1/3 text-right items-center">
                    <div className="flex-auto text-center">
                        <p className="font-bold text-sm">Price</p>
                        <p>{props.price}</p>
                    </div>
                </div>
                <div className="flex w-1/3 text-right">
                    <div className="grid grid-cols-2 gap-3 flex-auto items-center">
                        <button className="px-3 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded">remove</button>
                        <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">add to cart</button>
                    </div>
                </div>
            </div>
            <hr className="my-2"></hr>
        </div>     
    )
}