import {Link} from "react-router-dom";
import React from "react";
type Props = {
    text: string,
    link: string,
    active?: boolean,
}

export function NavItem(props:Props) {

    return (
        <li className={`text-xl hover:cursor-pointer ${ props.active ? "text-green" : null}`}>
            <Link to={props.link}>{props.text}</Link>
        </li>
    )
}