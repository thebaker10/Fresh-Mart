import { FavoriteItem } from "../Components/FavoritePage/FavoriteItems";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import TawkTo from "../Components/TawkTo";

export function FavoritePage() {
    
    return (
        <div className="bg-lightGray">
            <Nav/>
                <div className="mx-auto max-w-4xl mt-5">
                    <h1 className="text-gray-900 font-bold text-2xl">My Favorites</h1>
                    <FavoriteItem></FavoriteItem>

                </div>
                
            <Footer/>
            <TawkTo></TawkTo>
        </div>

    )
}