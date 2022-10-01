import {Item} from "./Item"

type Props={
    
}

export function OrderItems(props:Props) {
    return (
        <div>
            <div className="p-3 my-5 bg-white shadow-lg rounded-lg overflow-hidden divide-gray">
                
                <p className="font-bold pl-5 mb-2">ITEMS</p> 
                <hr className="my-2"></hr>
                <Item name="Apple" price={1.25} qty={4}></Item>
                <Item name="Peach" price={1.09} qty={2}></Item> 
                <Item name="Orange" price={0.99} qty={5}></Item> 
                <Item name="Pear" price={1.20} qty={1}></Item> 
                <Item name="Grapes" price={3.49} qty={1}></Item>  
                
                
            </div>
        </div>
        
        
    )
}