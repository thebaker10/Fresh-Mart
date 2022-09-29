import { Card } from "../Components/Card/Card";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import {Slider} from "../Components/Card/Slider"
import { SpecialBanner } from "../Components/SpecialBanner";
// import { UserIcon } from "../Components/Nav/UserIcon";

export function HomePage() {
    return (
        <div className="h-screen ">
            <Nav></Nav>
            <div className="">
                <Slider title = {"Popular"}></Slider>
                <Slider title = {"Fruit"}></Slider>
                <Slider title = {"Vegetables"}></Slider>
                <div className="px-10">
                    <SpecialBanner text={"Special Deals"} subtext={"see our specials and save!"}></SpecialBanner>
                </div>
                
                <Slider title = {"Dairy & Eggs"}></Slider>
                <Slider title = {"Bread & Pantry"}></Slider>
                <Slider title = {"Snacks"}></Slider>
                
            </div>

            <Footer></Footer>
            


        </div>
    )
}