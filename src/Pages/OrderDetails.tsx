import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { useParams } from "react-router-dom";
import {Order} from "../Components/OrderPage/Order"

type Parameters = {
    
}

export function OrderDetails() {
    const params = useParams<Parameters>()
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
                <div className="mx-auto max-w-4xl mt-5">
                    <h1 className="text-gray-900 font-bold text-2xl">Order Details</h1>
                    
                </div>
                
            <Footer></Footer>
        </div>

    )
}