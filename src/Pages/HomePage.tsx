import { Card } from "../Components/Card/Card";
import { CheckOut } from "../Components/CheckOut";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import {Slider} from "../Components/Card/Slider"
import { SpecialBanner } from "../Components/SpecialBanner";
// import { UserIcon } from "../Components/Nav/UserIcon";

export function HomePage() {
    return (
        <div className="h-screen ">
            <Nav></Nav>
<<<<<<< HEAD
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mx-auto px-1 min-h-screen bg-lightGray">
                <Card name={"Apple"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Orange"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Onion"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Green Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Yellow Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Watermelon"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Green Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Yellow Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Green Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Yellow Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Green Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Yellow Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Green Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Yellow Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Green Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Yellow Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
=======
            <div className="">
                <Slider title = {"Popular"}></Slider>
                <Slider title = {"Fruit"}></Slider>
                <Slider title = {"Vegetables"}></Slider>
                <div className="px-10">
                    <SpecialBanner text={"Special Deals"} subtext={"see our specials and save!"}></SpecialBanner>
                </div>
>>>>>>> d8e81c267acc022e7c58c53c00ba1564af43b46d
                
                <Slider title = {"Dairy & Eggs"}></Slider>
                <Slider title = {"Bread & Pantry"}></Slider>
                <Slider title = {"Snacks"}></Slider>       
            </div>

            <Footer></Footer>
            


        </div>
    )
}