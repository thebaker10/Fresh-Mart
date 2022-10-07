import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { useParams } from "react-router-dom";
import {OrderSummary} from "../Components/OrderPage/OrderSummary"
import {OrderItems} from "../Components/OrderPage/OrderItems"

type Parameters = {
    
}

export function OrderDetails() {
    const params = useParams<Parameters>()
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
                <div className="mx-auto max-w-4xl mt-5">
                    <h1 className="text-gray-900 font-bold text-2xl">Order Details</h1>
                    <OrderSummary orderID={8} orderNum={"39561"} totalPrice={32.45} itemQty={11} date={"10/4/2022"} firstName={"Nick"} lastName={"Handberg"} address={"1132 Desert Broom Court"} city={"Newark"} state={"NJ"} zip={"07102"} country={"United States"}></OrderSummary>
                    <OrderItems></OrderItems>
                </div>
                
            <Footer></Footer>
        </div>

    )
}