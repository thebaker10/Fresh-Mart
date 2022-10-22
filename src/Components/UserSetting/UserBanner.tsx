import { faCameraRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "../Form/Input"

type Props = {
    onClose?: () => void
}

export function UserBanner(props: Props) {

    return (
        <div className="relative overflow-hidden">

            <img className="w-full h-24 overflow-hidden blur-md" onClick={props.onClose} src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Large avatar" />
            <img className="w-20 h-20 rounded-full block mx-auto my-auto absolute inset-0" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Large avatar" />
            <label htmlFor="file" className="cursor-pointer w-7 h-7 rounded-full bg-white absolute my-auto mx-auto inset-0 left-16 top-12 grid justify-center items-center text-black">

                <FontAwesomeIcon icon={faCameraRotate} />

            </label>
            <input className="hidden" id="file" type="file" />

        </div>
    )
}