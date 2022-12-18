import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { $User } from "../../Services/State";
import { removeCookies } from "../../Services/Util";
import { UserData } from "../../Types/User";
import { UserSettingsButton } from "../UserSetting/UserSettingsButton";

export function UserIcon() {


    const [user, setUser] = useState<UserData | null>(null)
    const [showDropDown, setShowDropDown] = useState(false)

    useEffect(() => {
        $User.subscribe(setUser)
        $User.subscribe(console.log)

        //    return $User.unsubscribe()        
    }, [])




    const onMouseLeaveHandler = (v: boolean) => {
        // setTimeout(() => {
        //     setShowDropDown(v)
        // }, 500);
    }

    const logoutClickHandler = async () => {
        // MDN https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
        await fetch(process.env.REACT_APP_API_BASE + "/users/logout")
        $User.next(null)
        removeCookies()
        //Reload and go to home page
        document.location = '/';
    }

    if (user) return (
        <div className="relative">
            <button onClick={() => setShowDropDown(!showDropDown)} id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
                className={` ${showDropDown ? "ring-green ring-4" : null} flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0`} type="button">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user.profileImage} alt="user" />
            </button>


            <div id="dropdownAvatar" onMouseLeave={() => onMouseLeaveHandler(false)}
                className={`${showDropDown ? null : "hidden"} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-10`}
                data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom"
            >
                <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    <div>{user?.firstName} {user?.lastName}</div>
                    <div className="text-xs truncate">{user?.email}</div>
                </div>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>

                        <Link to="/OrderHistory" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Order History</Link>

                    </li>

                    <li>
                        <Link to="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reviews</Link>
                    </li>

                    <li>
                        <UserSettingsButton className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" />
                    </li>
                </ul>
                <div className="py-1">
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logoutClickHandler}>Sign out</a>
                </div>
            </div>

        </div>
    )



    return (
        <div className="relative">
            <button onClick={() => setShowDropDown(!showDropDown)} id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
                className={`block my-0 text-2xl`} type="button">
                <span className="sr-only">Open user menu</span>
                <div className="flex gap-8"></div>
                <FontAwesomeIcon icon={faUserLarge} />
            </button>


            <div id="dropdownAvatar" onMouseLeave={() => onMouseLeaveHandler(false)}
                className={`${showDropDown ? null : "hidden"} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-10`}
                data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom"
            >
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <Link to="/LoginPage" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign In</Link>
                    </li>

                    <li>
                        <Link to="/RegistrationPage" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Register</Link>
                    </li>
                </ul>

            </div>

        </div>

    )
}