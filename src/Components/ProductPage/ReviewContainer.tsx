import { Rating } from "../Card/Rating"
import { WriteReview } from "../WriteReview";
import { Review } from "./Review";

type Props={
    productID: string,
    stars: number,
    numOfReviews: number,
    reviews: Array<any>,
    users: Array<any>
}

export function ReviewContainer(props:Props) {
    return (
        <div className="mx-auto max-w-5xl mt-20 divide-gray mb-10">
            <div className="flex">
                <h1 className="flex-auto text-gray-900 font-bold text-2xl">Customer Reviews</h1>
                <WriteReview productID={props.productID}></WriteReview>
            </div>
            
            <div className="flex item-center mt-2">
                <Rating nStars={props.stars}/>
                <p className="ml-2">{props.numOfReviews} {props.numOfReviews == 1 ? "review" : "reviews"}</p>
            </div>
            
            <hr id="start" className="mt-2"></hr>
            <>
            {props.reviews.map((r, i) => <Review username={props.users[i]} stars={r.rating} date = {"Reviewed on: 9/14/22"} reviewTitle = {r.reviewTitle} review={r.reviewContent}></Review>)}
            </>
            
            <hr className="mt-2"></hr>
            <button className="mt-2 ">View more</button>
        </div>
    )
}
