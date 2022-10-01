
type Props={
    orderID: number,
    orderNum: string,
    totalPrice: number,
    itemQty: number,
    date: string,
}

export function OrderItems(props:Props) {
    return (
        <div>
            <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex space-between pl-5">
                    <p className="font-bold">ITEMS</p>
                
                </div>
            </div>
        </div>
        
        
    )
}