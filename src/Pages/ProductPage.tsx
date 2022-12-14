import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { ProductDetails } from "../Components/ProductPage/ProductDetails";
import { ReviewContainer } from "../Components/ProductPage/ReviewContainer";
import { useParams } from "react-router-dom";
import {ProductDetailsPlaceholder} from "../Components/ProductPage/ProductDetailsPlaceholder";
import TawkTo from "../Components/TawkTo";
import React, { useState, useEffect } from 'react';
import { ReviewContainerPlaceholder } from "../Components/ProductPage/ReviewContainerPlaceholder";
import { MiniSlider } from "../Components/Card/MiniSlider";
import { MiniSliderPlaceholder } from "../Components/Card/MiniSliderPlaceholder";

type Parameters = {
    productID: string
}

export function ProductPage() {
    const params = useParams<Parameters>()
    let [average, setAverageData] = useState<any>();
    let [reviewData, setReviewData] = useState<any[]>([]);
    let [product, setProductData] = useState<any>();
    let [userData, setUserData] = useState<any[]>([]);
    let [sliderProducts, setSliderProducts] = useState<any[]>([]);

    //NH 2022-11-09
    //useEffect hook is the functional alternative for componentDidMount and componentDidUpdate functions
    //https://reactjs.org/docs/hooks-effect.html and https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
    useEffect(() => {
        // Gets reviews for given productID and stores it in reviewData
        // Calculates review score average and stores it in average
        fetch(process.env.REACT_APP_API_BASE+"/products/"+params.productID+"/reviews" )
            .then((response) => response.json())
            .then((data) => {
                setReviewData(data.data) 
                let sum = 0;
                data.data.forEach((review: any) => sum += Number(review.rating));
                setAverageData(Math.round(sum/data.data.length)); 
        })
        // Gets product data for given productID and stores it in product
        fetch(process.env.REACT_APP_API_BASE+"/products/"+params.productID)
        .then((response) => response.json())
        .then((data) => {
            setProductData(data.data);
            // Gets products of the same category
            // Might be able to increase performance by replacing w/ new API endpoint 
            // rather than a nested fetch
            fetch(process.env.REACT_APP_API_BASE+"/categories/"+data.data.categoryId+"/products")
                .then((response) => response.json())
                .then((data) => {
                    setSliderProducts(data.data)
            })
        })
        // Gets user data (Only First+Last name) and stores it in userData 
        fetch(process.env.REACT_APP_API_BASE+"/products/"+params.productID+"/users" )
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.data)
        })  
    },[params.productID]);

    function handleWriteReview(data:any){
        console.log(data.name);
        userData.push(data.name);
        setUserData([...userData]);
        reviewData.push(data);
        setReviewData([...reviewData]);
        let thisAverage = average == 0 ?  data.rating : (average + data.rating)/2;
        setAverageData(thisAverage);
    }

    return (
        <div className="bg-lightGray pt-16">
            <Nav></Nav>
            {product ? <ProductDetails productID={product.productId} name={product.productName} stars={average} numOfReviews={reviewData.length} price={product.product_price} msrp={product.product_msrp} description={product.product_description} /> : <ProductDetailsPlaceholder></ProductDetailsPlaceholder>}
            <div className="mx-auto max-w-5xl mt-20">
                {sliderProducts.length !== 0 ? <MiniSlider title="Similar Products"  products={sliderProducts} productID={product.productId}></MiniSlider> : <MiniSliderPlaceholder></MiniSliderPlaceholder>}
            </div>
            
            {product ? <ReviewContainer handleClick={(data:Array<any>)=> handleWriteReview(data)} productID = {product.productId} reviews={reviewData} users={userData} stars={average} numOfReviews={reviewData.length}></ReviewContainer>:<ReviewContainerPlaceholder></ReviewContainerPlaceholder>}
            <Footer></Footer>
            <TawkTo></TawkTo>
        </div>

    )
}