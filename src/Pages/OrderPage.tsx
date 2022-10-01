import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { useParams } from "react-router-dom";
import {Order} from "../Components/OrderPage/Order"

type Parameters = {
    
}

export function OrderPage() {
    const params = useParams<Parameters>()
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
                <div className="mx-auto max-w-4xl mt-5">
                    <h1 className="text-gray-900 font-bold text-2xl">Order History</h1>
                    <Order orderID={8} orderNum={"39561"} totalPrice={32.45} itemQty={11} date={"10/4/2022"}></Order>
                    <Order orderID={7} orderNum={"38579"} totalPrice={104.92} itemQty={34} date={"10/3/2022"}></Order>
                    <Order orderID={6} orderNum={"38429"} totalPrice={5.99} itemQty={3} date={"10/1/2022"}></Order>
                    <Order orderID={5} orderNum={"38792"} totalPrice={54.99} itemQty={12} date={"9/25/2022"}></Order>
                    <Order orderID={4} orderNum={"39245"} totalPrice={4.56} itemQty={2} date={"9/18/2022"}></Order>
                    <Order orderID={3} orderNum={"37901"} totalPrice={67.95} itemQty={23} date={"9/13/2022"}></Order>
                    <Order orderID={2} orderNum={"29012"} totalPrice={11.95} itemQty={6} date={"9/8/2022"}></Order>
                    <Order orderID={1} orderNum={"28905"} totalPrice={26.85} itemQty={8} date={"9/1/2022"}></Order>
                    <button className="mt-2 mb-10">View more</button>
                </div>
                
            <Footer></Footer>
        </div>

    )
}