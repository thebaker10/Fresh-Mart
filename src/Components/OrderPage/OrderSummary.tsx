
type Props={
    orderID: number,
    orderNum: string,
    totalPrice: number,
    itemQty: number,
    date: string,

    firstName: string,
    lastName: string,
    address: string,
    city: string,
    zip: string,
    state: string,
    country: string,
}

export function OrderSummary(props:Props) {
    return (
        <div>
            <div className="flex gap-2">
                <p>Ordered on {props.date}</p>
                <p>|</p>
                <p>Order # {props.orderNum}</p>
            </div>
            <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex space-between pl-5">
                    <div className="w-1/2">
                        <div className="flex-auto">
                            <p className="font-bold">ORDER SUMMARY</p>
                            <div className="flex pt-2">
                                <p className="font-medium flex-1">{"Item(s) Subtotal:"}</p>
                                <p className="font-medium flex-1">${props.totalPrice}</p>
                            </div>
                            <div className="flex">
                                <p className="font-medium  flex-1">{"Delivery Fees:"}</p>
                                <p className="font-medium  flex-1">$0.00</p>
                            </div>
                            <div className="flex">
                                <p className="font-medium flex-1">{"Total before tax:"}</p>
                                <p className="font-medium flex-1">${props.totalPrice}</p>
                            </div>
                            <div className="flex">
                                <p className="font-medium flex-1">{"Estimated tax:"}</p>
                                <p className="font-medium flex-1">$0.00</p>
                            </div>
                            <div className="flex pt-2">
                                <p className="font-bold flex-1">{"Grand Total:"}</p>
                                <p className="font-bold flex-1">${props.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex-auto">
                            <p className="font-bold">DELIVERY ADDRESS</p>
                            <div className="flex pt-2">
                                <p className="font-medium flex-1">{props.firstName} {props.lastName}</p>
                            </div>
                            <div className="flex">
                                <p className="font-medium  flex-1">{props.address}</p>
                                
                            </div>
                            <div className="flex">
                                <p className="font-medium flex-1">{props.city}, {props.state} {props.zip}</p>
                            </div>
                            <div className="flex">
                                <p className="font-medium flex-1">{props.country}</p>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
        
        
    )
}