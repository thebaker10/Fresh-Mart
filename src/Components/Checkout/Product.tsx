import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type Props = {
    productID: number,
    name: string,
    imageLink: string,
    quantity: number,
    price: number,
    onDelete?: () => void
}

export function Product(props: Props) {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<any>();
    const navigate = useNavigate();

    function getCookie() {
        function escape(s: any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
        return match ? match[1] : null;
    }

    useEffect(() => {
        let cookie = getCookie();
        setUserId(cookie);
    }, []);


    function removeFromCart(e: any) {
        e.stopPropagation();
        if (!loading) {
            setLoading(true);
            let data: any = {};
            data["userId"] = userId;
            data["productId"] = Number(props.productID);


            fetch(process.env.REACT_APP_API_BASE + "/cart/remove", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then((response) => {
                response.json().then((body) => {
                    if (body.statusCode === 500) {
                        return;
                    } else {
                        setLoading(false);
                        //   window.location.href = "/Checkout"
                    }
                });
            })
        }
        if (props.onDelete) {
            props.onDelete()
        }
    }

    function goToProductPage() {
        navigate('/product/' + props.productID);
    }
    return (
        <div className="cursor-pointer" onClick={goToProductPage}>
            <li className="grid grid-cols-6 gap-2 border-b-1">
                <div className="col-span-1 self-center">
                    <img src={"https://source.unsplash.com/400x400/?" + props.name + " food"} alt="Product" className="rounded w-full" />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                    <span className="text-gray-600 text-md font-semi-bold">{props.name}</span>

                </div>
                <div className="col-span-2 pt-3">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2 text-sm justify-between">
                            <span className="text-gray-400">{props.quantity} x ${(props.price).toFixed(2)}</span>
                            <span className="text-green font-semibold inline-block">${(props.price * props.quantity).toFixed(2)}</span>

                        </div>
                        <div className="flex-end pt-3">
                            <button className="px-3 py-2 bg-red-600 text-white text-xs w-full font-bold uppercase rounded" onClick={removeFromCart}>{loading ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> : "Remove"}</button>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    )
}