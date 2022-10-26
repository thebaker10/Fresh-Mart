export function WriteReview() {
    return (
        
        <div>
            <div className="mx-auto max-w-5xl">
                <button onClick={toggleHiddenContainer} className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Write product review</button>
            </div>
            <div id="hiddenContainer">
                <div className=" bg-black bg-opacity-25 backdrop-blur-sm fixed w-screen top-0 left-0 bottom-0"></div>
            
                <div id="writeReviewContainer" className="bg-white rounded-xl">
                    <div className="flex space-between w-full text-xl text-gray-300 font-bold">
                        <h1 className="flex-auto text-xl pl-6 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Write Review</h1>
                        <div className="flex-auto text-right">
                            <button onClick={toggleHiddenContainer}>X</button>
                        </div>
                        
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        
                        <form className="space-y-4 md:space-y-6" action="#">
                            
                            <div id="starSelector">
                                <p className="block mb-2 text-lg font-medium text-gray-900">Rating</p>
                                <button type='button' onClick={() =>changeStars(1)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24" >
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>changeStars(2)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>changeStars(3)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>changeStars(4)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                                <button type='button' onClick={() =>changeStars(5)}>
                                        <svg className={"w-5 h-5 fill-yellow"} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                </button>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Review Title</label>
                                <input type="text" name="reviewTitle" id="reviewTitle" className="bg-gray-50 border border-gray-700 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="A sentence describing summary of review" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Review Content</label>
                                <textarea name="lastName" id="lastName" rows={10} className="bg-gray-50 border border-gray-700 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Use this space to write the body of your review" />
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
        if(el.style.visibility == "hidden"){
            el.style.visibility = "visible";
        }
        else{
            el.style.visibility = "hidden";
        } 
    }
}

function changeStars(i: any){
    let el = document.getElementById("starSelector");
    
    if(el != null){
        for(let x = 0; x<5; x++){
            el.children[x+1].children[0].setAttribute("class","w-5 h-5 fill-black");
        }
        for(let y = 0; y<i; y++){
            el.children[y+1].children[0].setAttribute("class","w-5 h-5 fill-yellow");
        }
    }  
}