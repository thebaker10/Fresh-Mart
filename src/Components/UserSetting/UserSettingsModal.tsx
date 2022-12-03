import { Input } from "../Form/Input"
import { UserBanner } from "./UserBanner"
import React, { useState } from "react";
import { $User } from "../../Services/State";
import {UserData} from "../../Types/User";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

type Props = {
    visible: boolean,
    onClose: () => void,
    userData?: UserData
}

export function UserSettingsModal(props: Props) {

    let initialValue = $User.value;
    let [user, setUser] = useState<UserData|null>(initialValue);
    let [loading, setLoading] = useState(false);
    let [alertVisible, setAlertVisible] = useState(false);
    let [alertMessage, setAlertMessage] = useState('');

    if (!props.visible) return null
    return (
        <div className="fixed inset-0">
            <div className=" bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-screen h-screen absolute z-20" onClick={props.onClose}></div>

            <form className="bg-white text-black rounded px-4 py-4 max-w-[40vw] max-h-[90vh] absolute inset-0 m-auto overflow-y-auto z-20">
                <div className="flex justify-end text-xl text-gray-300 font-bold">
                    <button onClick={props.onClose}>X</button>
                </div>


                <UserBanner />


                <div className="mt-4 grid grid-cols-2 gap-3">
                    { alertVisible && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
                    <Input label="First Name" autoComplete="given-name" placeHolder="Jack" value={user?.firstName} onChange={(value) => updateUser('firstName', value)} />
                    <Input label="Last Name" autoComplete="family-name" placeHolder="Green" value={user?.lastName}  onChange={(value) => updateUser('lastName', value)} />


                    <Input className="col-span-2" type="email" label="Email" autoComplete="email" value={user?.email} placeHolder="email@example.com"  onChange={(value) => updateUser('email', value)} />
                    <Input className="col-span-2" type="password" label="Current password" autoComplete="current-password"  onChange={(value) => updateUser('currentPassword', value)} />
                    <Input type="password" label="New Password" autoComplete="new-password"  onChange={(value) => updateUser('newPassword', value)} />
                    <Input type="password" label="Confirm Password"  autoComplete="new-password"   onChange={(value) => updateUser('confirmNewPassword', value)} />
                    <Input className="col-span-2" type="text" label="Street Address" autoComplete="street-address" value={user?.address} placeHolder="10 Street XYZ 654"  onChange={(value) => updateUser('address', value)} />
                    <Input type="text" label="City" placeHolder="Minneapolis" autoComplete="address-level2" value={user?.city}  onChange={(value) => updateUser('city', value)} />
                    <Input type="text" label="State" placeHolder="MN" autoComplete="address-level1" value={user?.state}  onChange={(value) => updateUser('state', value)} />
                    <Input type="text" label="Zip Code" placeHolder="55555" autoComplete="postal-code" value={user?.zip}  onChange={(value) => updateUser('zip', value)} />
                    <Input type="text" label="Country" placeHolder="USA" autoComplete="country" value={user?.country}  onChange={(value) => updateUser('country', value)} />

                </div>

                <p className={(loading) ? 'visible text-center' : 'invisible text-center'}>
                    <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'green'} size={"2x"} />
                </p>

                <div className="text-center">
                    <button className="px-5 py-2 bg-green text-white rounded" onClick={(e) => saveUser(e)}>
                        Save Setting
                    </button>
                </div>

            </form>
        </div>
    );

    function updateUser(prop:string, value:string): void{

        if(prop === null || user === null) {
            return;
        }

        setUser({
            ...user,
            [prop]: value
        });
    }

    function saveUser(e:any): void{

        e.preventDefault();
        if(user === null){
            return;
        }

        setLoading(true);
        setAlertVisible(false);

        fetch(process.env.REACT_APP_API_BASE + '/users/' + user.userId, {
            method: "POST",
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(user)
        }).then(async (response) => {
            $User.next(user);
            setLoading(false);
            setAlertVisible(false);
            props.onClose();
            if(!response.ok){
                throw Error();
            }
        }).catch((error) => {
            console.error(error);
            setAlertMessage(error.message);
            setAlertVisible(true);
        });
    }
}