import React from "react";
import { useNavigate } from "react-router-dom";

type Props={
    productID: string
}

export function WriteReview(props:Props) {
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while submitting review.');
    let rating = 5;

    function submitForm(e:any){

        e.preventDefault();
        let formData = new FormData(e.target as HTMLFormElement);

        //@TODO Add Loading Indicator

        let data:any = {};
        //@TODO Set user and product ID  with real data and add date
        data["userId"] = 1;
        data["productId"] = Number(props.productID);
        data["rating"] = rating;

        formData.forEach((value:any,key:any) => {
            data[key] = value;
        });

        //CF 2022-10-16
        //Fetch is asynchronous, so it returns a Promise.  When it is resolved (the request is completed),
        // it moves onto the then block. If an error is thrown, it is caught in the catch block.
        fetch("http://localhost/reviews/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((response) => {
            //response.json() returns a promise
            response.json().then((body) => {

            if(body.statusCode === 500) {
                //setAlertMessage(body.data.message);
                setAlertVisible(true);
                
                return;
            }else{
                setAlertVisible(false);
                toggleHiddenContainer();
            }
            });
        }).catch((error) => {
            setAlertVisible(true);
            console.log(error);
        });
    }

    function setRating(i: any){
        let el = document.getElementById("starSelector");
        rating = i;
        if(el != null){
            for(let x = 0; x<5; x++){
                el.children[x+1].children[0].setAttribute("class","w-5 h-5 fill-black");
            }
            for(let y = 0; y<i; y++){
                el.children[y+1].children[0].setAttribute("class","w-5 h-5 fill-yellow");
            }
        }  
    }
    
    
    return (
        
        <div>
            <div className="mx-auto max-w-5xl">
                <button onClick={toggleHiddenContainer} className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Write product review</button>
            </div>
            <div id="hiddenContainer">
                <div className=" bg-black bg-opacity-25 backdrop-blur-sm fixed w-screen top-0 left-0 bottom-0 z-10"></div>
            
                <div id="writeReviewContainer" className="bg-white rounded-xl">
                    <div className="flex space-between w-full text-xl text-gray-300 font-bold">
                        <h1 className="flex-auto text-xl pl-6 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Write Review</h1>
                        
                        <div className="flex-auto text-right pr-2">
                            <button onClick={toggleHiddenContainer}>X</button>
                        </div>
                        
                    </div>
                    
                    <div className="p-6 pt-2 space-y-2">
                        { alertVisible && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
                        <form className="space-y-2" action="#" onSubmit={submitForm}>
                            
                            <div id="starSelector">
                                <p className="block mb-2 text-lg font-medium text-gray-900">Rating</p>
                                <button type='button' onClick={() =>setRating(1)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24" >
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>setRating(2)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>setRating(3)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>setRating(4)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>setRating(5)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Review Title</label>
                                <input type="text" name="reviewTitle" id="reviewTitle" className="bg-gray-50 border border-gray-700 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="A sentence describing summary of review" required/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Review Content</label>
                                <textarea name="reviewContent" id="reviewContent" rows={2} className="bg-gray-50 border border-gray-700 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Use this space to write the body of your review" required/>
                            </div>
                            <div className="m-auto w-fit">
                                <button type="submit" className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Submit Review</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        
            
    )
}

function toggleHiddenContainer(){
    let el = document.getElementById("hiddenContainer");
    if(el != null){
        if(el.style.visibility != "visible"){
            el.style.visibility = "visible";
        }
        else{
            el.style.visibility = "hidden";
        } 
    }
}
