import {Link} from "react-router-dom";

export function Logo() {
    return (
        <div className="font-bold flex gap-1 text-3xl hover:cursor-pointer">
            <Link to="/">
                <span className="text-green" >Fresh</span>
                <span>Market</span>
            </Link>
        </div>
    )
}