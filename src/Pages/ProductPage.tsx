import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { ProductDetails } from "../Components/ProductPage/ProductDetails";
import { ReviewContainer } from "../Components/ProductPage/ReviewContainer";


export function ProductPage() {
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
            <ProductDetails name={"Apple"}  stars={Math.round(Math.random()*5)} price={Math.random()*10} msrp = {Math.random()*10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket.Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."}/>
            <ReviewContainer stars={Math.round(Math.random()*5)} numOfReviews={Math.round(Math.random()*500)}></ReviewContainer>  
            <Footer></Footer> 
        </div>
        
    )
}