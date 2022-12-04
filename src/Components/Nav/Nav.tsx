import { faCartShopping, faHeart, faSearch, faSearchDollar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "./AddToCart";
import { IconItem } from "./IconItem";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { SearchBar } from "./SearchBar";
import { SearchBarModal } from "./SearchBar/SearchBarModal";
import { UserIcon } from "./UserIcon";
import {Link} from "react-router-dom";

export function Nav() {
    const [showSearch, setShowSearch] = useState(false)

    return (

        <>
            <nav className="flex justify-evenly py-4 bg-white shadow-lg fixed w-screen z-20 top-0">
                <Logo></Logo>
                <ul className="flex gap-7">
                  <NavItem text="Home" link= "/" active/>
                  <NavItem text="Category" link= "/Category"/>
                  <NavItem text="About" link= "/About"/>
                  <NavItem text="Contact Us" link="/Contact"/>
                </ul>

                <ul className="flex gap-8">
                    <IconItem icon={faSearch} onClick={()=> setShowSearch(true)}/>
                    
                    <Link to={'/FavoritePage'}><IconItem icon={faHeart} />  </Link>
                    <Link to={'/CheckOut'}><IconItem icon={faCartShopping} />  </Link>  
                    <UserIcon />

                </ul>


            </nav>
            <SearchBarModal visible={showSearch} onClose={() => setShowSearch(false)} />

        </>


    )
}