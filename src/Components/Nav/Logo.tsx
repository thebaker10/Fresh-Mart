import { useNavigate} from "react-router-dom"
export function Logo() {
    const navigate = useNavigate();

    function goHome(){
        navigate('/');
    }

    return (
        <div className="font-bold flex gap-1 text-3xl hover:cursor-pointer">
            <a onClick={goHome}>
                <span className="text-green" >Fresh</span>
                <span>Market</span>
            </a>
        </div>
    )
}