
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
                    <p className="font-medium text-sm">ORDER PLACED</p>
                    <p>{props.date}</p>
                </div>
                <div className="flex-auto">
                    <p className="font-medium text-sm">ITEMS</p>
                    <p>{props.itemQty}</p>
                </div>
                <div className="flex-auto">
                    <p className="font-medium text-sm">TOTAL</p>
                    <p>${props.totalPrice}</p>
                </div>
                <div className="flex-auto">
                    <p className="font-medium text-sm">ORDER # {props.orderNum}</p>
                    <a href={'http://localhost:3000/OrderDetails/'+props.orderID} className="font-medium text-sm hover:underline dark:text-blue">View order details</a>
                </div>
            </div>
        </div>
        
    )
}