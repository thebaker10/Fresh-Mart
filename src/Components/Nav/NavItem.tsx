type Props = {
    text: string,
    link: string,
    active?: boolean,
}

export function NavItem(props:Props) {
    return (
        <li className={`text-xl hover:cursor-pointer ${ props.active ? "text-green" : null}`}>
            <a href={props.link}>{props.text}</a>
        </li>
    )
}