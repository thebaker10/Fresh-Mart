import { IconItem } from "../Nav/IconItem";
import {faPlus, faMinus, faHeartCirclePlus} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';

type Props={
  price: number,
  productID: number
}

export function QuantitySelector(props:Props) {
    let [count, setCount] = useState<number>(1);

    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while submitting review.');

    function addToCart(e:any){

        e.preventDefault();
        let formData = new FormData(e.target as HTMLFormElement);

        //@TODO Add Loading Indicator

        let data:any = {};
        data["userId"] = 1;
        data["productId"] = Number(props.productID);
        data["quantity"] = count;

        formData.forEach((value:any,key:any) => {
            data[key] = value;
        });

        //CF 2022-10-16
        //Fetch is asynchronous, so it returns a Promise.  When it is resolved (the request is completed),
        // it moves onto the then block. If an error is thrown, it is caught in the catch block.
        fetch("http://localhost/cart/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((response) => {
            //response.json() returns a promise
            response.json().then((body) => {

            if(body.statusCode === 500) {
                //setAlertMessage(body.data.message);
                setAlertVisible(true);
                
                return;
            }else{
                setAlertVisible(false);
            }
            });
        }).catch((error) => {
            setAlertVisible(true);
            console.log(error);
        });
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
        <div className="flex gap-1 flex-row justify-center items-center">
          <button className="px-1 py-2  font-bold uppercase rounded" onClick={decNumber}><ul><IconItem icon={faMinus} /></ul></button>
          <input className="text-gray-900 text-2xl font-bold text-center bg-lightGray" type="text" id="qty" name="qty" size={3} maxLength={3} value={count}></input>
          <button className="px-1 py-2  font-bold uppercase rounded" onClick={incNumber}><ul><IconItem icon={faPlus} /></ul></button>
        </div>
      <p className="text-center text-2xl">${(props.price * count).toFixed(2)}</p>
      <div className="flex gap-1 flex-row justify-center items-center">
        <button className="px-3 py-3 bg-green w-full text-white text-xs font-bold uppercase rounded">Add to Cart</button>
        <ul className="flex gap-8 justify-center items-center mt-2 mb-2">
          <button className="px-2 pt-2 bg-green text-white text-xs font-bold uppercase rounded"><IconItem icon={faHeartCirclePlus} /></button>
        </ul>
      </div>
    </div>
               
    )
}

