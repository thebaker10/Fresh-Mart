import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { Order } from "../Components/OrderPage/Order"
import TawkTo from "../Components/TawkTo";
import { useEffect, useState } from "react";
import { Order as OrderType } from "../Types/Orders";
import { $User } from "../Services/State";


export function OrderHistory() {
    const [orders, setOrders] = useState<OrderType[]>([])

    function getCookie() {
        function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
        return match ? match[1] : null;
    }

    useEffect(() => {
        let cookie = getCookie();
        fetch(process.env.REACT_APP_API_BASE + "/users/" + cookie + "/orders").then(b => b.json()).then(data => setOrders(data.data))
    }, [])

    return (
        <div className="bg-lightGray">
            <Nav></Nav>
            <div className="mx-auto max-w-4xl mt-8">
                <h1 className="text-gray-900 font-bold text-2xl">Order History</h1>
                {orders.map(o => <Order order={o} />)}


                <button className="mt-2 mb-10">View more</button>
            </div>

            <Footer></Footer>
            <TawkTo></TawkTo>
        </div>

    )
}