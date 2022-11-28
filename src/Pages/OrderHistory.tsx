import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { useParams } from "react-router-dom";
import {Order} from "../Components/OrderPage/Order"
import TawkTo from "../Components/TawkTo";
import { useEffect, useState } from "react";
import { Order as OrderType } from "../Types/Orders";
import { $User } from "../Services/State";
import { getCookie } from "../Services/Util";

type Parameters = {
    
}

export function OrderHistory() {
    const params = useParams<Parameters>()
    const [orders, setOrders] = useState<OrderType[]>([])

    useEffect(() => {
        let user = getCookie("freshMartUserId")
        fetch(process.env.REACT_APP_API_BASE + "/users/" + 1 + "/orders").then(b => b.json()).then(data => setOrders(data.data))
    },[])

    return (
        <div className="bg-lightGray">
            <Nav></Nav>
                <div className="mx-auto max-w-4xl mt-5">
                    <h1 className="text-gray-900 font-bold text-2xl">Order History</h1>
                    {orders && orders.map(o => <Order orderID={o.orderID} orderNum={o.orderNum} totalPrice={o.orderPrice} itemQty={o.itemQuantity} date={o.orderDate}></Order>)}
                    
                  
                    <button className="mt-2 mb-10">View more</button>
                </div>
                
            <Footer></Footer>
            <TawkTo></TawkTo>
        </div>

    )
}