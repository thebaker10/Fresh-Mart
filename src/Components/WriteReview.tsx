export function WriteReview() {
    return (
        
        <div>
            <div className="mx-auto max-w-5xl">
                <button className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Write product review</button>
            </div>
            <div id="hiddenContainer">
                <div className=" bg-black bg-opacity-25 backdrop-blur-sm fixed w-screen top-0 left-0 bottom-0"></div>
            
                <div id="writeReviewContainer" className="bg-white rounded-xl">
                    <div className="flex space-between w-full text-xl text-gray-300 font-bold">
                        <h1 className="flex-auto text-xl pl-6 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Write Review</h1>
                        <div className="flex-auto text-right">
                            <button>X</button>
                        </div>
                        
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Review Title</label>
                                <input type="text" name="reviewTitle" id="reviewTitle" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="A sentence describing summary of review" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Review Content</label>
                                <textarea name="lastName" id="lastName" rows={10} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Use this space to write the body of your review" />
                            </div>
                            <div>
                                <button type="submit" className="px-3 py-2 bg-green text-white text-xs font-bold uppercase rounded">Submit Review</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        
            
    )
}

