import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card} from "../Card/Card";
import React, { useState, useEffect } from 'react';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
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
  title: string,
  categoryID: number,
  productID: number
}


export function MiniSlider(props:Props) {
  let [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE+"/categories/"+props.categoryID+"/products")
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.data)
    })  
  },[]);

    return (
      <div className="">
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
          {products && products.map((r) => r.productId != props.productID && <Card productID={r.productId} name={r.productName}  stars={4} price={r.product_price} description={r.product_description}/>)}
        </Carousel>
      </div>
      
    )
}