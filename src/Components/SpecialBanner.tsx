
type Props={
    text: string,
    subtext: string
}

export function SpecialBanner(props:Props) {
    return (
    
        <div className="flex w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          <div className="w-full bg-cover relative p-6 text-center">
                <h1 className="text-green font-bold text-7xl">{props.text}</h1>
                <p className=" mt-2 text-white text-2xl ">{props.subtext}</p>
          </div> 
        </div>
    )
}