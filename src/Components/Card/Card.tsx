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
  let [reviewData, setReviewData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/products/"+props.productID+"/reviews" )
        .then((response) => response.json())
        .then((data) => {
            setReviewData(data.data) 
            let sum = 0;
            data.data.forEach((review: any) => sum += Number(review.rating));
            setAverageData(Math.round(sum/data.data.length)); 
    })
  },[]);

  function goToProductPage(){
    navigate('/product/'+props.productID);
  }  
  return (
    
        <div className="p-5">
          <div className="flex max-w-md m-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={goToProductPage}>
            <div className="w-1/3 bg-cover">
                <img src={"https://source.unsplash.com/400x600/?" + props.name + " fruit"} alt="" />
            </div> 
            <div className="w-2/3 p-4">
              <h1 className="text-gray-900 font-bold text-xl">{props.name}</h1>
              <p className="mt-2 text-black text-sm">{props.description}</p>
              <div className="flex item-center mt-2">
                {average ? <Rating nStars={average}/> : <Rating nStars={0}/>}
              </div>
              <div className="flex item-center justify-between mt-3">
                <h1 className="text-black font-bold text-xl">${props.price.toFixed(2)}</h1>
                <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
    )
}