import { IconItem } from "../Nav/IconItem";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';

type Props={
  price: number
}

export function QuantitySelector(props:Props) {
    let [count, setCount] = useState<number>(1);

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
    </div>
               
    )
}

