import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { ProductDetails } from "../Components/ProductPage/ProductDetails";
import { ReviewContainer } from "../Components/ProductPage/ReviewContainer";
import { useParams } from "react-router-dom";
import {ProductDetailsPlaceholder} from "../Components/ProductPage/ProductDetailsPlaceholder";
import { Slider } from "../Components/Card/Slider";
import TawkTo from "../Components/TawkTo";
import React, { useState, useEffect } from 'react';

type Parameters = {
    productID: string
}

export function ProductPage() {
    const params = useParams<Parameters>()
    let [product, setProductData] = useState<any>();

    //NH 2022-11-09
    //useEffect hook is the functional alternative for componentDidMount and componentDidUpdate functions
    //https://reactjs.org/docs/hooks-effect.html and https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
    useEffect(() => {
        fetch("http://localhost/products/"+params.productID)
        .then((response) => response.json())
        .then((data) => {
            setProductData(data.data);
        })
    },[]);

    return (
        <div className="bg-lightGray">
            <Nav></Nav>
            {product ? <ProductDetails name={product.productName} stars={4} numOfReviews={100} price={product.product_price} msrp={product.product_msrp} description={"Test"} /> : <ProductDetailsPlaceholder></ProductDetailsPlaceholder>}
            <ReviewContainer stars={Math.round(Math.random() * 5)} numOfReviews={Math.round(Math.random() * 500)}></ReviewContainer>
            <Footer></Footer>
            <TawkTo></TawkTo>
        </div>

    )
}