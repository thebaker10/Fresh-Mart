import { Slider } from "../Components/Card/Slider";
import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import { SpecialBanner } from "../Components/SpecialBanner";
import TawkTo from "../Components/TawkTo";
import React, { useState, useEffect } from 'react';
import { SliderPlaceholder } from "../Components/Card/SliderPlaceholder";
import env from "./../env.json"

export function Category() {
    let [categories, setCategories] = useState<any[]>([]);
    let arr:number[] = [1,2,3,4];
    useEffect(() => {
        fetch(env.REACT_APP_API_BASE+"/categories")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data)
        })  
    },[]);

    return (
        <div className="min-h-screen bg-lightGray">
            <Nav></Nav>
            
            <div className="px-10 py-5">
                <SpecialBanner text={"Special Deals"} subtext={"see our specials and save!"}></SpecialBanner>
            </div>
            {categories.length != 0 ? categories.map((r) => <Slider categoryID={r.categoryId} title={r.categoryName}></Slider>) : arr.map((a) => <SliderPlaceholder></SliderPlaceholder> )}
            
            
            
            <Footer></Footer>
            <TawkTo />
        </div>
    )
}