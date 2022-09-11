import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome"
import {faCartShopping} from "@fortawesome/free-solid-svg-icons"
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
    icon: IconProp
}

export function IconItem(props:Props) {
    return (
        <li className="text-black text-2xl hover:cursor-pointer">
            <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
        </li>
    )
}