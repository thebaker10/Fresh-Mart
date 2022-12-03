import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { useParams } from "react-router-dom";
import { OrderSummary } from "../Components/OrderPage/OrderSummary"
import { OrderItems } from "../Components/OrderPage/OrderItems"
import TawkTo from "../Components/TawkTo";
import { useEffect, useState } from "react";
import { $User } from "../Services/State";
import { LineItemOrder } from "../Types/LineItems";

type Parameters = {
    orderID: string
}

export function OrderDetails() {
    const params = useParams<Parameters>()
    const [order, setOrder] = useState<LineItemOrder | null>(null)
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE + "/users/" + $User.value + "/orders/" + params.orderID).then(b => b.json()).then(data => setOrder(data.data[0]))
    }, [params.orderID])


    if(!order ){
        return <div></div>
    }
    console.log(order)
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
            <div className="mx-auto max-w-4xl mt-5">
                <h1 className="text-gray-900 font-bold text-2xl">Order Details</h1>
                <OrderSummary orderNum={order.orderID} totalPrice={order.orderPrice} itemQty={order.itemQuantity} date={order.orderDate} firstName={order.firstName} 
                lastName={order.lastName} address={order.address} city={order.city} state={order.state} zip={order.zip}></OrderSummary>
                <OrderItems orderItems={order.lineItems}></OrderItems>
            </div>

            <Footer></Footer>
            <TawkTo></TawkTo>
        </div>

    )
}