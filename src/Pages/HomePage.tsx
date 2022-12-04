import { Slider } from "../Components/Card/Slider";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import TawkTo from "../Components/TawkTo";


export function HomePage() {
    return (
        <div className="min-h-screen bg-lightGray mt-20">
            <Nav />
            <div className=" dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden m-5 min-h-full">
                <div className="flex">
                    <div className="flex-auto space-between w-1/2">
                        <div className="font-bold mt-24 ml-24 flex gap-1 text-8xl">
                            <span className="text-green">Fresh</span>
                            <span className="text-white">Market</span>
                        </div>

                        <div className="font-bold ml-24 mt-12 text-5xl">

                            <p className="text-white absolute z-[1] max-w-screen-xl leading-relaxed">We are devoted to offer our customers the</p>
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

            <Slider categoryID={1} title={"Deals"}></Slider>
            <Slider categoryID={1} title={"Popular"}></Slider>
            
            <Footer/>
            <TawkTo/>
        </div>
    )
}