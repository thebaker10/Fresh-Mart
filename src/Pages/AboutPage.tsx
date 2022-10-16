import { ChatButton } from "../Components/ChatButton";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";



export function AboutPage() {
    return (
        <div className="min-h-screen bg-lightGray">
            <Nav></Nav>
            <div className=" dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden m-5 min-h-full">
                <div className="flex">
                    <div className="flex-auto space-between w-1/2">
                        <div className="font-bold mt-24 ml-24 flex gap-1 text-8xl">
                            <span className="text-green">Fresh</span>
                            <span className="text-white">Market</span>
                        </div>
                        
                        <div className="font-bold ml-24 mt-12 text-5xl">
                            
                            <p className="text-white absolute z-10 max-w-screen-xl leading-relaxed">We are devoted to offer our customers the</p>
                        </div>
                        <div className="font-bold ml-24 mt-32 mb-24 text-5xl ">
                            
                            <p className="text-white max-w-screen-xl leading-relaxed"><span className="text-green">freshest</span> groceries, <br></br><span className="text-green">fastest</span> delivery, and <br></br><span className="text-green">cheapest</span> prices.</p>
                        </div>
                    </div>
                    <div id="about-image" className="flex-auto space-between bg-cover w-1/2 z-0">
                        
                            <img src={"https://source.unsplash.com/1000x700/?" + " grocery"} alt="" />
                        
                    </div>
                    
                </div>
            </div>
            <div className="mb-5">
                <div className="flex">
                    <div className="flex-auto m-5 space-between bg-white w-1/3 shadow-lg rounded-lg overflow-hidden">
                        <p className="font-bold ml-12 mt-12 text-5xl text-green">Fresh</p>
                        <p className=" ml-12 mr-12 mt-4 mb-12 text-4xl leading-relaxed">Our vegetables, fruit, dairy, and produce are sourced from local farms allowing us to bring you only the freshest groceries.</p>
                    </div>
                    <div className="flex-auto m-5 space-between bg-white w-1/3 shadow-lg rounded-lg overflow-hidden">
                        <p className="font-bold ml-12 mr-12 mt-12 text-5xl text-green">Fast</p>
                        <p className=" ml-12 mr-12 mt-4 mb-12 text-4xl leading-relaxed">Our delivery service is always quick and never leaves you waiting for your orders. <span className="font-bold">FREE</span> delivery on orders of $15 or more.</p>
                    </div>
                    <div className="flex-auto m-5 space-between bg-white w-1/3 shadow-lg rounded-lg overflow-hidden">
                        <p className="font-bold ml-12 mr-12 mt-12 text-5xl text-green">Cheap</p>
                        <p className=" ml-12 mr-12 mt-4 mb-12 text-4xl leading-relaxed">We have the lowest prices for our products while never sacrificing quality. We offer frequent sales to save you money on the essentials.</p>
                    </div>
                </div>
            </div>
            <div className=" dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden m-5 min-h-full">
                <div className="flex">
                    <div className="flex-auto space-between w-1/2">
                        <div className="font-bold mt-10 ml-24 flex gap-1 text-2xl">
                            <span className="text-green">Fresh</span>
                            <span className="text-white">Market</span>
                        </div>
                        
                        <div className="font-bold ml-24  text-5xl">
                            
                            <p className="text-white absolute z-10 max-w-screen-xl leading-relaxed">Leave the shopping to us</p>
                        </div>
                        <div className="font-bold ml-24 mt-20 mb-10 text-2xl ">
                            
                            <p className="text-white max-w-screen-xl leading-relaxed">Skip the annoyances of traditional grocery stores. Order online and get your groceries delivered fast!</p>
                        </div>
                    </div>
                    <div id="about-image" className="flex-auto space-between bg-cover w-1/2 z-0">
                        
                            <img src={"https://source.unsplash.com/1000x300/?" + " grocery"} alt="" />
                        
                    </div>
                    
                </div>
            </div>
            
            <Footer></Footer>
            <ChatButton></ChatButton>
        </div>
    )
}