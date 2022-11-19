import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card} from "../Card/Card";
import { CardPlaceholder } from "./CardPlaceholder";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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


export function MiniSliderPlaceholder() {
    return (
      <div className="">
        <div className="bg-darkGray shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-gray-900 font-bold text-2xl">‎</h1>
        </div>
        <div className="flex">
          <div className="flex-1">
            <CardPlaceholder></CardPlaceholder>
          </div>
          <div className="flex-1">
            <CardPlaceholder></CardPlaceholder>
          </div>
        </div>    
      </div>
      
    )
}