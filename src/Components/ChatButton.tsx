import {faComments} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome"

export function ChatButton() {
    return (
        <div className="fixed bottom-0 right-5">
            <button id="chatButton" className="mb-8 bg-white shadow-lg rounded text-gray-600 px-1 py-2">
                <p><FontAwesomeIcon className="text-black text-2xl px-1" icon={faComments}></FontAwesomeIcon><span id="supportHidden" className="text-black font-bold px-2">Support</span></p>
            </button>
        </div>
    )
}