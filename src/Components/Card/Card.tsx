import { useNavigate} from "react-router-dom"
import { Rating } from "./Rating"
import React, { useState, useEffect } from 'react';

type Props={
    productID: number,
    name: string,
    description: string,
    stars: number,
    price: number 
}

export function Card(props:Props) {
  let [average, setAverageData] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE+"/products/"+props.productID+"/reviews" )
        .then((response) => response.json())
        .then((data) => {
            let sum = 0;
            data.data.forEach((review: any) => sum += Number(review.rating));
            setAverageData(Math.round(sum/data.data.length)); 
    })
  },[]);

  function goToProductPage(){
    navigate('/product/'+props.productID);
  }
  // NH 2022-11-14
  // Need to stopProagation so that the div onClick is canceled
  // Otherwise button click would trigger div click too
  function handleButtonClick(e:any){
      e.stopPropagation();
      //Button click handling
  }  
  return (
    
        <div className="p-5">
          <div className="flex max-w-md m-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={goToProductPage}>
            <div className="w-1/3 bg-cover">
                <img src={"https://source.unsplash.com/400x600/?" + props.name + " food"} alt="" />
            </div> 
            <div className="flex flex-col w-2/3 p-4">
              <div className="flex-auto">
                <h1 className="text-gray-900 font-bold text-xl">{props.name}</h1>
                <div className="flex item-center mt-2">
                  {average ? <Rating nStars={average}/> : <Rating nStars={0}/>}
                </div>
                <div className="h-auto max-h-16 w-auto">
                  <p id="truncatedText" className="mt-2 text-black text-sm">{props.description}</p>
                </div>
                
                
              </div>
              <div className="flex flex-end item-center justify-between mt-3">
                <h1 className="text-black font-bold text-xl">${props.price.toFixed(2)}</h1>
                <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded" onClick={(event) => handleButtonClick(event)}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
    )
}