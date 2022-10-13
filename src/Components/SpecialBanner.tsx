
type Props={
    text: string,
    subtext: string
}

export function SpecialBanner(props:Props) {
    return (
    
        <div className=" dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden min-h-full">
            <div className="flex">
                <div className="flex-auto space-between w-1/2">
                    <div className="font-bold mt-5 ml-12 flex gap-1 text-2xl">
                        <span className="text-green">Fresh</span>
                        <span className="text-white">Market</span>
                    </div>
                    
                    <div className="font-bold ml-12  text-5xl">
                        
                        <p className="text-white absolute z-10 max-w-screen-xl leading-relaxed">Never overpay for your groceries</p>
                    </div>
                    <div className="font-bold ml-12 mt-20 mb-5 text-1xl ">
                        
                        <p className="text-white max-w-screen-xl leading-relaxed">Click here to check out our specials and save!</p>
                    </div>
                </div>
                <div id="about-image" className="flex-auto space-between bg-cover w-1/2 z-0">
                    
                        <img src={"https://source.unsplash.com/1000x200/?" + " grocery"} alt="" />
                    
                </div>
                
            </div>
        </div>
    )
}