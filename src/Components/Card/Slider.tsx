import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card} from "../Card/Card";
import React, { useState, useEffect } from 'react';
import { CardPlaceholder } from "./CardPlaceholder";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

type Props={
  categoryID: number,
  title: string,
  showDeal?: boolean
}


export function Slider(props:Props) {
  const arr:number[] = [1,2,3,4];
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE+"/categories/"+props.categoryID+"/products")
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.data)
    })  
  },[]);

if(!products){
  return null
}

    return (
      <div className="px-10">
        <h1 className="text-gray-900 font-bold text-2xl">{props.title}</h1>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        > 
        {products.length !== 0 ? products.map((r) => <Card productID={r.productId} msrp={r.product_msrp} name={r.productName} showDeal={props.showDeal} stars={4} price={r.product_price} description={r.product_description}/>) : arr.map((a)=> <CardPlaceholder></CardPlaceholder>)}
          
        </Carousel>
      </div>
      
    )
}