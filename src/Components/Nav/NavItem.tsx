type Props = {
    text: string,
    active?: boolean,
}

export function NavItem(props:Props) {
    return (
        <li className={`text-xl hover:cursor-pointer ${ props.active ? "text-green" : null}`}>
            {props.text}
        </li>
    )
}