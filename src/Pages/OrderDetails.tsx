import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { useLocation } from "react-router-dom";
import { OrderSummary } from "../Components/OrderPage/OrderSummary"
import TawkTo from "../Components/TawkTo";
import { useState } from "react";
import { Order } from "../Types/Orders";
import { UserData } from "../Types/User";
import { $User } from "../Services/State";
import { OrderItems } from "../Components/OrderPage/OrderItems";

type Parameters = {
    orderID: string
}

export function OrderDetails() {
    const state = useLocation().state
    const [order, setOrder] = useState<Order | null>(state.order)
    const [user, setUser] = useState<UserData | null>($User.value)



    if(!order || !user){
        return <div></div>
    }
    console.log(order)
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
            <div className="mx-auto max-w-4xl mt-5">
                <h1 className="text-gray-900 font-bold text-2xl">Order Details</h1>
                <OrderSummary orderNum={order.orderId} totalPrice={order.orderPrice} itemQty={order.lineItems.length} date={order.orderDate.date} firstName={user.firstName} 
                lastName={user.lastName} address={user.address} city={user.city} state={user.state} zip={user.zip}></OrderSummary>
                <OrderItems orderItems={order.lineItems}></OrderItems>
            </div>

            <Footer></Footer>
            <TawkTo></TawkTo>
        </div>

    )
}