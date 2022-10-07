
type Props={
    orderID: number,
    orderNum: string,
    totalPrice: number,
    itemQty: number,
    date: string,
}

export function Order(props:Props) {
    return (
        <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden">
            
            
            <div className="flex space-between text-center ">
                <div className="flex-auto">
                    <p className="font-bold text-sm">ORDER #</p>
                    <p className="text-sm">{props.orderNum}</p>
                    
                </div>
                <div className="flex-auto">
                    <p className="font-bold text-sm">ORDER PLACED</p>
                    <p>{props.date}</p>
                </div>
                <div className="flex-auto">
                    <p className="font-bold text-sm">ITEMS</p>
                    <p>{props.itemQty}</p>
                </div>
                <div className="flex-auto">
                    <p className="font-bold text-sm">TOTAL</p>
                    <p>${props.totalPrice}</p>
                </div>
                
                <div className="flex-auto m-auto">
                    
                    <a href={"http://localhost:3000/OrderDetails/"+props.orderID} className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">View order details</a>
                </div>
            </div>
        </div>
        
    )
}