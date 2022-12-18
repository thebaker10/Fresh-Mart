import { Product } from "../Components/Checkout/Product";
import { Nav } from "../Components/Nav/Nav"
import TawkTo from "../Components/TawkTo";
import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";




export function CheckOut() {
    let [cartData, setCartData] = useState<any[]>([]);
    let [cartTotal, setCartTotal] = useState<any>();
    let [userId, setUserId] = useState<any>();
    let [userData, setUserData] = useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while adding product to cart.');
    const [alertVisible, setAlertVisible] = React.useState(false);
    const navigate = useNavigate();

    function getCookie() {
        function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
        return match ? match[1] : null;
    }

    function countrySelect(country:string) {    
        let element = document.getElementById('countrySelect') as HTMLInputElement;
        if(element != null){
            element.value = country;
        }  
    }

    function onDeleteHandler(index: number) {
        let price = cartData[index].quantity * cartData[index].product.product_price;
        cartData.splice(index, 1)
        setCartData([...cartData])  
        setCartTotal(cartTotal - price);
    }

    useEffect(() => {
        let cookie = getCookie();
        setUserId(cookie);
        fetch(process.env.REACT_APP_API_BASE+"/users/details/"+cookie)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.data);
                if(data.data[0].country != null){
                    countrySelect(data.data[0].country);
                }
                setCartData(data.data[0].shoppingCart.cartItems ?? []) ;
                let total = 0;
                data.data[0].shoppingCart.cartItems.forEach((e:any) => {
                    total += (e.quantity * e.product.product_price);
                });
                setCartTotal(total);
        })

    },[]);

    function placeOrder(){
        if(!loading){
            setLoading(true);
            let data:any = {};
            data["userId"] = Number(userId);
            
      
            fetch(process.env.REACT_APP_API_BASE+"/order/", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then((response) => {
                response.json().then((body) => {
                if(body.statusCode === 500) {
                    setAlertMessage(body.data.message);
                    setAlertVisible(true);
                    setLoading(false);
                    return;
                }else{
                    setLoading(false);
                    setAlertVisible(false);  
                    navigate('/OrderDetails/'+body.data.OrderId);
                }
                });
            })
          } 
    }
    return (
        <div>
            <Nav></Nav>
            <div className="h-screen grid grid-cols-3 mt-16">
                <div className="lg:col-span-2 col-span-3 bg-lightGray space-y-8 px-12">
                    <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div className="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-sm font-medium ml-3">Checkout</div>
                        </div>
                        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                        <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <div className="rounded-md">
                        <form id="payment-form" method="POST" action="">
                            <section>
                                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping & Billing Information</h2>
                                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Name</span>
                                        <input name="name" className="focus:outline-none px-3" placeholder="First & Last Name" value={userData[0] ? userData[0].firstName + " " + userData[0].lastName : ""}/>
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Email</span>
                                        <input name="email" type="email" className="focus:outline-none px-3" placeholder="try@example.com" value={userData[0] ? userData[0].email : ""}/>
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Address</span>
                                        <input name="address" className="focus:outline-none px-3" placeholder="10 Street XYZ 654" value={userData[0] ? userData[0].address : ""}/>
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">City</span>
                                        <input name="city" className="focus:outline-none px-3" placeholder="Minneapolis" value={userData[0] ? userData[0].city : ""}/>
                                    </label>
                                    <label className="inline-flex w-2/4 border-gray-200 py-3">
                                        <span className="text-right px-2">State</span>
                                        <input name="state" className="focus:outline-none px-3" placeholder="MN" value={userData[0] ? userData[0].state : ""}/>
                                    </label>
                                    <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200">
                                        <span className="text-right px-2 xl:px-0 xl:text-none">ZIP</span>
                                        <input name="postal_code" className="focus:outline-none px-3" placeholder="55555" value={userData[0] ? userData[0].zip : ""}/>
                                    </label>
                                    <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                                        <span className="text-right px-2">Country</span>
                                        <div id="country" className="focus:outline-none px-3 w-full flex items-center">
                                            <select id="countrySelect" name="country" className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none">
                                                <option value="AU">Australia</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BR">Brazil</option>
                                                <option value="CA">Canada</option>
                                                <option value="CN">China</option>
                                                <option value="DK">Denmark</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                                <option value="HK">Hong Kong</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IT">Italy</option>
                                                <option value="JP">Japan</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MX">Mexico</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="SG">Singapore</option>
                                                <option value="ES">Spain</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                            </select>
                                        </div>
                                    </label>
                                </fieldset>
                            </section>
                        </form>
                    </div>
                    <div className="rounded-md">
                        <section>
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information</h2>
                            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Card</span>
                                    <input name="card" className="focus:outline-none px-3 w-full" placeholder="Card number MM/YY CVC" />
                                </label>
                            </fieldset>
                        </section>
                    </div>
                    <div className="grid justify-center">
                        { alertVisible && <div className="p-4 mb-4 text-sm text-center text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
                        <button onClick={placeOrder} className="submit-button px-4 py-3 rounded-full bg-green text-white focus:ring focus:outline-none w-96 text-xl font-semibold transition-colors">
                            {loading ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> :'Pay $'+(cartTotal ? (cartTotal).toFixed(2) : 0)}
                        </button>
                    </div>
                </div>
                <div className="col-span-1 bg-white lg:block hidden">
                    <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
                    <ul className="py-6 border-b space-y-6 px-8">
                        {cartData ? cartData.map((c, i) => <Product productID={c.product.productId} name={c.product.productName} onDelete={()=> onDeleteHandler(i)} imageLink = {""} quantity={c.quantity} price={c.product.product_price}></Product>): <div></div>}
                    </ul>
                    <div className="px-8 border-b">
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-green">${cartTotal && (cartTotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Shipping</span>
                            <span className="font-semibold text-black">Free</span>
                        </div>
                    </div>
                    <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                        <span>Total</span>
                        <span>${cartTotal && (cartTotal).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <TawkTo></TawkTo>
        </div>
        
    )
}