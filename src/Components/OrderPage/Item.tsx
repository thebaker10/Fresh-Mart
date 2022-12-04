
type Props={
    name: string,
    price: number,
    qty: number,
}

export function Item(props:Props) {
    return (
        <div className="px-5 divide-gray">
            <div className="flex space-between ">
                <div className="flex w-1/3">
                    <div className="flex-1 ">
                        <img src={"https://source.unsplash.com/100x100/?" + props.name + " fruit"} alt="" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-lg">{props.name}</p>
                        <p>${props.price.toPrecision(2).padStart(2,"0")}</p>
                    </div>
                </div>
                <div className="flex w-1/3 text-right">
                    <div className="flex-auto text-center">
                        <p className="font-bold text-sm">QUANTITY</p>
                        <p>{props.qty}</p>
                    </div>
                </div>
                <div className="flex w-1/3 text-right">
                    <div className="flex-auto">
                        <p className="font-bold text-sm">TOTAL</p>
                        <p>${(props.qty*props.price).toPrecision(2).padStart(2,"0")}</p>
                        <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Write product review</button>
                    </div>
                </div>
            </div>
            <hr className="my-2"></hr>
        </div>     
    )
}