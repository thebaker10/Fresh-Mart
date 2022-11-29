import { isTemplateSpan } from "typescript"
import { CardFavoriteItem } from "./CardFavoriteItem"


type Props={
    items: Array<any>
}

export function FavoriteItem(props:Props) {
    return (
        <div>
            <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden divide-gray">
                
                <p className="font-bold pl-5 mb-2">ITEMS</p> 
                <hr className="my-2"></hr>
                {props.items && props.items.map((i)=> <CardFavoriteItem productID={i.product.productId} name={i.product.productName} price={i.product.product_price}/>)}
                
                
            </div>
        </div>
        
        
    )
}