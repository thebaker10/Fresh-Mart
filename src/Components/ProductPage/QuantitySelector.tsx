import { IconItem } from "../Nav/IconItem";
import {faPlus, faMinus, faHeartCirclePlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props={
  price: number,
  productID: number
}

export function QuantitySelector(props:Props) {
    let [count, setCount] = useState<number>(1);

    const [alertVisible, setAlertVisible] = React.useState(false);
    const [userId, setUserId] = React.useState<any>();
    const [added, setAdded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [isInCart, setIsInCart] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while adding product to cart.');

    function getCookie() {
      function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
      var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
      return match ? match[1] : null;
    }
    

    useEffect(() => {
      let cookie = getCookie();
      setUserId(cookie);

      fetch(process.env.REACT_APP_API_BASE+"/users/details/"+cookie)
            .then((response) => response.json())
            .then((data) => {
              console.log(data.data[0].shoppingCart.cartItems);
              data.data[0].shoppingCart.cartItems.forEach((e:any) => {
                if(props.productID == e.product.productId){
                  setIsInCart(true);
                }
              });
        })
    },[]);

    function addToCart(){
      if(!isInCart){
        setLoading(true);
        let data:any = {};
        data["userId"] = userId;
        data["productId"] = Number(props.productID);
        data["quantity"] = count;

        fetch("http://localhost/cart/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((response) => {
            response.json().then((body) => {
            if(body.statusCode === 500) {
                setAlertVisible(true);
                return;
            }else{
                setLoading(false);
                setAdded(true);
                setAlertVisible(false);
            }
            });
        }).catch((error) => {
            setAlertVisible(true);
        });
      }   
    }

    function incNumber(){
      count++;
      setCount(count);
    }
    
    function decNumber(){
      if(count != 1){
        count--;
        setCount(count);
      }
    }

    return (
    <div>
        { alertVisible && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
        <div className="flex gap-1 flex-row justify-center items-center">
          <button className="px-1 py-2  font-bold uppercase rounded" onClick={decNumber}><ul><IconItem icon={faMinus} /></ul></button>
          <input className="text-gray-900 text-2xl font-bold text-center bg-lightGray" type="text" id="qty" name="qty" size={3} maxLength={3} value={count}></input>
          <button className="px-1 py-2  font-bold uppercase rounded" onClick={incNumber}><ul><IconItem icon={faPlus} /></ul></button>
        </div>
      <p className="text-center text-2xl">${(props.price * count).toFixed(2)}</p>
      <div className="flex gap-1 flex-row justify-center items-center">
        <button onClick={addToCart} className="px-3 py-3 bg-green w-full text-white text-xs font-bold uppercase rounded">{loading ? <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"1x"} /> : added || isInCart ? "In Cart" : "Add To Cart"}</button>
        <ul className="flex gap-8 justify-center items-center mt-2 mb-2">
          <button className="px-2 pt-2 bg-green text-white text-xs font-bold uppercase rounded"><IconItem icon={faHeartCirclePlus} /></button>
        </ul>
      </div>
    </div>
               
    )
}

