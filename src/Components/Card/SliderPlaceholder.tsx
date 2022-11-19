import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card} from "../Card/Card";
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


export function SliderPlaceholder() {
  let arr:number[] = [1,2,3,4];
    return (
      <div className="px-10">
        <h1 className="text-gray-900 font-bold text-2xl">‎</h1>
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
         {arr.map((a)=> <CardPlaceholder></CardPlaceholder>)}
          
        </Carousel> 
      </div>
      
    )
}