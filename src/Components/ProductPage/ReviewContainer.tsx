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

    let [reviewData, setReviewData] = useState<any[]>([]);

    //NH 2022-11-08
    //useEffect hook is the functional alternative for componentDidMount and componentDidUpdate functions
    //https://reactjs.org/docs/hooks-effect.html and https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
    useEffect(() => {
        fetch("http://localhost/products/"+props.productID+"/reviews" )
            .then((response) => response.json())
            .then((data) => {
                setReviewData(data.data)
        })
    },[]);
    
    return (
        <div className="mx-auto max-w-5xl mt-10 divide-gray">
            <div className="flex">
                <h1 className="flex-auto text-gray-900 font-bold text-2xl">Customer Reviews</h1>
                <WriteReview></WriteReview>
            </div>
            
            <div className="flex item-center mt-2">
                <Rating nStars={props.stars}/>
                <p className="ml-2">{props.numOfReviews} reviews</p>
            </div>
            
            <hr id="start" className="mt-2"></hr>
            <>
            {reviewData && reviewData.map((r) => <Review username={r.userId} stars={r.rating} date = {"Reviewed on: 9/14/22"} reviewTitle = {r.reviewTitle} review={r.reviewContent}></Review>)}
            </>
            
            <hr className="mt-2"></hr>
            <button className="mt-2 mb-10">View more</button>
        </div>
    )
}
