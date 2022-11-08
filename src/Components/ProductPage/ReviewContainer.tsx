import { Rating } from "../Card/Rating"
import { WriteReview } from "../WriteReview";
import { Review } from "./Review";

type Props={
    productID: string,
    stars: number,
    numOfReviews: number,
}



export function ReviewContainer(props:Props) {
    fetch("http://localhost/products/"+props.productID+"/reviews" )
    .then((response) => response.json())
    .then((data) => {
        for(const review of data.data){
            console.log(review);
        //     <Review username={"Jane"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 9/14/22"} reviewTitle = {"Great product!!!"} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
        }
    }).catch(console.error);
    
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
            <Review username={"Jane"} stars={Math.round(Math.random()*5)} date = {"Reviewed on: 9/14/22"} reviewTitle = {"Great product!!!"} review={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}></Review>
            <hr className="mt-2"></hr>
            <button className="mt-2 mb-10">View more</button>
        </div>
    )
}