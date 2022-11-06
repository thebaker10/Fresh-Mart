import { useState } from "react"
import { UserSettingsButton } from "../UserSetting/UserSettingsButton";

export function UserIcon() {

    

    const [showDropDown, setShowDropDown] = useState(false)
    const onMouseLeaveHandler = (v: boolean) => {
        // setTimeout(() => {
        //     setShowDropDown(v)
        // }, 500);
    }

    const logoutClickHandler = () => {
        fetch(process.env.REACT_APP_API_BASE + '/users/logout', {
            credentials: 'include'
        }).then((response) => {
            //response.json() returns a promise
                alert('Clear frontend user data');
        }).catch((error) => {
            console.log(error);
        });
    }





    return (
        <div className="relative">
            <button onClick={() => setShowDropDown(!showDropDown)} id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
                className={` ${showDropDown ? "ring-green ring-4" : null} flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0`} type="button">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user" />
            </button>


            <div id="dropdownAvatar" onMouseLeave={() => onMouseLeaveHandler(false)}
                className={`${showDropDown ? null : "hidden"} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-10`}
                data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom"
            >
                <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    <div>Jack Green</div>
                    <div className="font-medium truncate">name@email.com</div>
                </div>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">History</a>
                    </li>

                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reviews</a>
                    </li>

                    <li>
                        <UserSettingsButton className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"/>
                    </li>
                </ul>
                <div className="py-1">
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logoutClickHandler}>Sign out</a>
                </div>
            </div>
           
        </div>

    )
}