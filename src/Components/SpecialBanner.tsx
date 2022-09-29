
type Props={
    text: string,
    subtext: string
}

export function SpecialBanner(props:Props) {
    return (
    
        <div className="flex w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full bg-cover relative">
                {<img src={"https://source.unsplash.com/2000x200/?" + " fruit"} alt="" />}
                <h1 className="absolute text-black font-bold text-7xl top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-4">{props.text}</h1>
                <p className="absolute mt-2 text-black text-sm top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/5">{props.subtext}</p>
          </div> 
        </div>
    )
}