import {Link} from "react-router-dom";

type Props={
    orderID: number,
    totalPrice: number,
    date: string,
}

export function Order(props:Props) {
    return (
        <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden">
            
            
            <div className="flex space-between text-center ">
                <div className="flex-auto">
                    <p className="font-bold text-sm">ORDER #</p>
                    <p className="text-sm">{props.orderID}</p>
                    
                </div>
                <div className="flex-auto">
                    <p className="font-bold text-sm">ORDER PLACED</p>
                    <p>{props.date}</p>
                </div>
                <div className="flex-auto">
                    <p className="font-bold text-sm">TOTAL</p>
                    <p>${props.totalPrice}</p>
                </div>
                
                <div className="flex-auto m-auto">
                    
                    <Link to={"/OrderDetails/"+props.orderID} className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">View order details</Link>
                </div>
            </div>
        </div>
        
    )
}