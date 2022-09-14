import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { IconItem } from "./IconItem";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export function Nav() {
    return (
        <nav className="flex justify-evenly py-4 bg-white shadow-lg">
            <Logo></Logo>
            <ul className="flex gap-7">
                <NavItem text="Home" active/>
                <NavItem text="Category"/>
                <NavItem text="About"/>
                <NavItem text="Contact Us"/>
            </ul>

            <ul className="flex gap-8">
                <IconItem icon={faUser} />
                <IconItem icon={faHeart} />
                <IconItem icon={faCartShopping} />
            </ul>
        </nav>
    )
}