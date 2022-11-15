import { Slider } from "../Components/Card/Slider";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { SpecialBanner } from "../Components/SpecialBanner";
import TawkTo from "../Components/TawkTo";
import React, { useState, useEffect } from 'react';

export function Category() {
    let [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE+"/categories")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data)
        })  
    },[]);

    return (
        <div className="min-h-screen bg-lightGray">
            <Nav></Nav>
            <div className="">
                <div className="px-10 py-5">
                    <SpecialBanner text={"Special Deals"} subtext={"see our specials and save!"}></SpecialBanner>
                </div>
                {categories && categories.map((r) => <Slider categoryID={r.categoryId} title={r.categoryName}></Slider>)}
            </div>
            <Footer></Footer>
            <TawkTo />
        </div>
    )
}