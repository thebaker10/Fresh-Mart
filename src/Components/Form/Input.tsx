type Props = {
    label: string,
    onChange: (text:string) => void,
    value?: string,
    placeHolder?: string,
    type?: string,
    className?: string
}

export function Input(props:Props) {


    return (

        <div className={`block  ${props.className}`}>
            <label className="block mb-2 text-sm font-medium text-gray-900">{props.label}</label>
            <input className="border border-gray-700 p-2 rounded mb-5 w-full" placeholder={props.placeHolder} value={props.value} 
            onChange={e => props.onChange(e.currentTarget.value)} type={props.type}/>
        </div>
    )
}