import { Rating } from "../Card/Rating"
import { WriteReview } from "../WriteReview";
import { Review } from "./Review";
import React, { useState, useEffect } from 'react';

type Props={
    productID: string,
    stars: number,
    numOfReviews: number,
}


export function ReviewContainer(props:Props) {
    let [average, setAverageData] = useState<any>();
    let [reviewData, setReviewData] = useState<any[]>([]);
    let [userData, setUserData] = useState<any[]>([]);
    
    //NH 2022-11-08
    //useEffect hook is the functional alternative for componentDidMount and componentDidUpdate functions
    //https://reactjs.org/docs/hooks-effect.html and https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
    useEffect(() => {
        fetch("http://localhost/products/"+props.productID+"/reviews" )
            .then((response) => response.json())
            .then((data) => {
                setReviewData(data.data) 
                let sum = 0;
                data.data.forEach((review: any) => sum += Number(review.rating));
                setAverageData(Math.round(sum/data.data.length)); 
        })
        fetch("http://localhost/products/"+props.productID+"/users" )
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.data)
        })  
    },[]);
    
    return (
        <div className="mx-auto max-w-5xl mt-10 divide-gray">
            <div className="flex">
                <h1 className="flex-auto text-gray-900 font-bold text-2xl">Customer Reviews</h1>
                <WriteReview productID={props.productID}></WriteReview>
            </div>
            
            <div className="flex item-center mt-2">
                {average ? <Rating nStars={average}/> : <Rating nStars={0}/>}
                <p className="ml-2">{reviewData ? reviewData.length : 0} {reviewData.length == 1 ? "review" : "reviews"}</p>
            </div>
            
            <hr id="start" className="mt-2"></hr>
            <>
            {reviewData && reviewData.map((r, i) => <Review username={userData[i]} stars={r.rating} date = {"Reviewed on: 9/14/22"} reviewTitle = {r.reviewTitle} review={r.reviewContent}></Review>)}
            </>
            
            <hr className="mt-2"></hr>
            <button className="mt-2 mb-10">View more</button>
        </div>
    )
}
