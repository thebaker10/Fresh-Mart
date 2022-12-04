import { useState } from "react"
import { Product } from "../../../types/Product"
import { Card } from "../../Card/Card"
import { Input } from "../../Form/Input"
import { UserBanner } from "../../UserSetting/UserBanner"
import { SearchBarCard } from "./SearchBarCard"


type Props = {
    visible: boolean,
    onClose: () => void
}

export function SearchBarModal(props: Props) {

    const [products, setProducts] = useState<Product[]>([])

    const onUserSearchHandler = async (userInputSearch: string) => {
        if(userInputSearch === ""){
            setProducts([])
            return
        }
    
        const results:Product[] = await fetch("http://localhost:5050/search/" + userInputSearch).then(data => data.json())
        setProducts([...results])
    }




    if (!props.visible) return null
    return (
        <div className="fixed z-10 inset-0">
            <div className=" bg-black bg-opacity-25 backdrop-blur-md flex items-center justify-center w-screen h-screen absolute z-20" onClick={props.onClose}></div>

            <form className="rounded px-4 py-4 max-w-[80vw] absolute inset-0 m-auto max-h-fit z-20">
                <div className="flex justify-end text-3xl text-green font-bold">
                    <button onClick={props.onClose}>X</button>
                </div>

                <div>
                    <input type="text" className="h-14 w-full bg-white rounded-full px-8" onChange={(e)=>onUserSearchHandler(e.currentTarget.value)}/>

                </div>

                <div className="flex flex-wrap w-full justify-center">
                    {products.map((p, i) => <SearchBarCard name={p.product_name} description={p.product_name} stars={0} price={p.product_price} image={p.productImageLink}/>)}  
                </div>
            </form>
        </div>
    )
}