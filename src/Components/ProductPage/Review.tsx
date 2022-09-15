import { Rating } from "../Nav/Card/Rating"

type Props={
    username: string,
    reviewTitle: string,
    review: string,
    stars: number,
    date: string,
}

export function Review(props:Props) {
    return (
        <div className="mx-auto max-w-4xl mt-5">
            <h1 className="text-gray-900 font-bold text-2xl">{props.username}</h1>
            <div className="flex item-center mt-2">
                <Rating nStars={props.stars}/>
                <p className=" font-bold ml-2 ">{props.reviewTitle}</p>
            </div>
            <div className="mt-2">
              <p>{props.review}</p>
              <p className="font-bold mt-2">{props.date}</p>
            </div>
        </div>
    )
}