import { Card } from "../Components/Nav/Card/Card";
import { Nav } from "../Components/Nav/Nav";

export function HomePage() {
    return (
        <div className="h-screen bg-lightGray">
            <Nav></Nav>
            <div className="flex flex-wrap gap-10 mx-auto px-10">
                <Card name={"Apple"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Orange"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Onion"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Green Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Yellow Pepper"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                <Card name={"Watermelon"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
                
            </div>

        </div>
    )
}