import { ReviewPlaceholder } from "./ReviewPlaceholder"


export function ReviewContainerPlaceholder() {
    return (
        <div className="mx-auto max-w-5xl mt-20 divide-gray mb-10">
            <div className="bg-darkGray shadow-lg rounded-lg overflow-hidden">
                <div className="flex ">
                    <h1 className="flex-auto text-gray-900 font-bold text-2xl">‎</h1>
                </div>
                
                <div className="flex item-center mt-2">
                    <p className="ml-2">‎</p>
                </div>
            </div>
            
            
            <hr id="start" className="mt-2"></hr>
            
            <ReviewPlaceholder></ReviewPlaceholder>
            <ReviewPlaceholder></ReviewPlaceholder>
            <ReviewPlaceholder></ReviewPlaceholder>
            <ReviewPlaceholder></ReviewPlaceholder>

            
            <hr className="mt-2"></hr>
            <button className="mt-2 ">‎</button>
        </div>
    )
}
