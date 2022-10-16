import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { ProductDetails } from "../Components/ProductPage/ProductDetails";
import { ReviewContainer } from "../Components/ProductPage/ReviewContainer";
import { useParams } from "react-router-dom";
import { Slider } from "../Components/Card/Slider";
import { ChatButton } from "../Components/ChatButton";

type Parameters = {
    productID: string
}

export function ProductPage() {
    const params = useParams<Parameters>()
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
            <ProductDetails name={"Apple " + params.productID} stars={Math.round(Math.random() * 5)} price={Math.random() * 10} msrp={Math.random() * 10} description={"Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket.Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket."} />
            <Slider title = {"Similar Products"}></Slider>
            <ReviewContainer stars={Math.round(Math.random() * 5)} numOfReviews={Math.round(Math.random() * 500)}></ReviewContainer>
            <Footer></Footer>
            <ChatButton></ChatButton>
        </div>

    )
}