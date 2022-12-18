import { useNavigate } from "react-router-dom"
import { Order as OrderType } from "../../Types/Orders"

type Props={
    order: OrderType

}

export function Order(props:Props) {


    const navigate = useNavigate()
    const onDetailsClickHandler = () => {
        navigate("/OrderDetails/", {
            state: {
                order: props.order
            }
        })

    }
    


    return (
        <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden">
            
            
            <div className="flex space-between text-center ">
                <div className="flex-auto">
                    <p className="font-bold text-sm">ORDER #</p>
                    <p className="text-sm">{props.order.orderId}</p>
                    
                </div>
                <div className="flex-auto">
                    <p className="font-bold text-sm">ORDER PLACED</p>
                    <p>{props.order.orderDate.date}</p>
                </div>
                <div className="flex-auto">
                    <p className="font-bold text-sm">TOTAL</p>
                    <p>${props.order.orderPrice}</p>
                </div>
                
                <div className="flex-auto m-auto">
                    
                    <div onClick={onDetailsClickHandler} className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">View order details</div>
                </div>
            </div>
        </div>
        
    )
}