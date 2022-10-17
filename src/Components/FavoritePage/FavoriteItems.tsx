import { CardFavoriteItem } from "./CardFavoriteItem"


type Props={
    
}

export function FavoriteItem(props:Props) {
    return (
        <div>
            <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden divide-gray">
                
                <p className="font-bold pl-5 mb-2">ITEMS</p> 
                <hr className="my-2"></hr>
                <CardFavoriteItem name={"apple"} price={42} qty={0}/>
                <CardFavoriteItem name={"orange"} price={1} qty={0}/>
                <CardFavoriteItem name={"milk"} price={22} qty={1}/>
                <CardFavoriteItem name={"milk"} price={22} qty={1}/>
            </div>
        </div>
        
        
    )
}