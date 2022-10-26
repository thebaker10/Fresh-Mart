import { Rating } from "../Card/Rating"
import { WriteReview } from "../WriteReview";
import { Review } from "./Review";

type Props={
    stars: number,
    numOfReviews: number,
}

export function ReviewContainer(props:Props) {
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
            <hr className="mt-2"></hr>
            <Review username={"Jane"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 9/14/22"} reviewTitle = {"Great product!!!"} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
            <Review username={"Bob"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 9/12/22"} reviewTitle = {"Terrible product. Wont buy again"} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
            <Review username={"Casey"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 8/20/22"} reviewTitle = {"It is ok."} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
            <Review username={"Baker"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 3/9/22"} reviewTitle = {"I always buy these"} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
            <Review username={"Louise"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 5/28/22"} reviewTitle = {"Not what I thought it was"} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
            <Review username={"Nick"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 1/1/22"} reviewTitle = {"Good"} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
            <hr className="mt-2"></hr>
            <button className="mt-2 mb-10">View more</button>
        </div>
    )
}