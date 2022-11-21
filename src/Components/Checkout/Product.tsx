import { useNavigate} from "react-router-dom"

type Props={
    productID: number,
    name: string,
    imageLink: string,
    quantity: number,
    price: number,
}

export function Product(props:Props) {
    const navigate = useNavigate();

    function goToProductPage(){
        navigate('/product/'+props.productID);
    }
    return (
        <div className="cursor-pointer" onClick={goToProductPage}>
            <li className="grid grid-cols-6 gap-2 border-b-1">
                <div className="col-span-1 self-center">
                    <img src={"https://source.unsplash.com/400x400/?" + props.name + " food"} alt="Product" className="rounded w-full" />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                    <span className="text-gray-600 text-md font-semi-bold">{props.name}</span>
                </div>
                <div className="col-span-2 pt-3">
                    <div className="flex items-center space-x-2 text-sm justify-between">
                        <span className="text-gray-400">{props.quantity} x ${(props.price).toFixed(2)}</span>
                        <span className="text-green font-semibold inline-block">${(props.price * props.quantity).toFixed(2)}</span>
                    </div>
                </div>
            </li>
        </div>
    )
}