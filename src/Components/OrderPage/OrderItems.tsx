import { LineItem } from "../../Types/Orders"
import {Item} from "./Item"

type Props={
    orderItems: LineItem[]
}

export function OrderItems(props:Props) {
    return (
        <div>
            <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden divide-gray">   
                <p className="font-bold pl-5 mb-2">ITEMS</p> 
                <hr className="my-2"></hr>
                {props.orderItems.map((item, i) => <Item id={item.productId.toString()} price={item.lineItemPrice} qty={item.quantity}></Item>)}
                
            </div>
        </div>
        
        
    )
}