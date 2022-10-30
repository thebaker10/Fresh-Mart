import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { IconItem } from "./IconItem";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { SearchBar } from "./SearchBar";
import { UserIcon } from "./UserIcon";

export function Nav() {
    return (
        <nav className="flex justify-evenly py-4 bg-white shadow-lg">
            <Logo></Logo>
            <ul className="flex gap-7">
                <NavItem text="Home" link= "http://localhost:3000/" active/>
                <NavItem text="Category" link= "http://localhost:3000/Category"/>
                <NavItem text="About" link= "http://localhost:3000/About"/>
                <NavItem text="Contact Us" link="http://localhost:3000/Contact"/>
            </ul>

            <ul className="flex gap-8">
                {/* <IconItem icon={faUser} /> */}
                <SearchBar/>
                <IconItem icon={faHeart} />
                <IconItem icon={faCartShopping} />
                <UserIcon/>
                
            </ul>
        </nav>
    )
}