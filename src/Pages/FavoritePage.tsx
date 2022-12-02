import { FavoriteItem } from "../Components/FavoritePage/FavoriteItems";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import TawkTo from "../Components/TawkTo";
import React, { useState, useEffect } from 'react';

export function FavoritePage() {
    let [favoriteData, setFavoriteData] = useState<any[]>([]);

    function getCookie() {
        function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
        return match ? match[1] : null;
    }

    useEffect(() => {
        let cookie = getCookie();
        fetch(process.env.REACT_APP_API_BASE+"/favorite/"+cookie)
            .then((response) => response.json())
            .then((data) => {
                setFavoriteData(data.data[0].favoriteItems);
        })

    },[]);
    
    return (
        <div className="bg-lightGray">
            <Nav/>
                <div className="mx-auto max-w-4xl mt-5">
                    <h1 className="text-gray-900 font-bold text-2xl">My Favorites</h1>
                    <FavoriteItem items = {favoriteData}></FavoriteItem>

                </div>
                
            <Footer/>
            <TawkTo></TawkTo>
        </div>

    )
}