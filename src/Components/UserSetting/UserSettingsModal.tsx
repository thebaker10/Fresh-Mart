import { Input } from "../Form/Input"
import { UserBanner } from "./UserBanner"
import {useEffect, useState} from "react";

type Props = {
    visible: boolean,
    onClose: () => void,
    userData?: UserData
}

export function UserSettingsModal(props: Props) {

    let [user, setUser] = useState<UserData|null>(null)


    //Replace with call to global user object
    useEffect(() => {

        //I dont think I'll need this once the other branch is merged
        if(user !== null){
            return;
        }

        let matches = /freshMartUserId=(\d+)/g.exec(document.cookie);
        let user_id = (matches !== null) ? matches[1] : '';
        fetch(process.env.REACT_APP_API_BASE + '/users/' + user_id, {
            credentials: 'include'
        }).then((response) => {

            response.json().then((body) => {
                setUser(body.data);
            });
        });
    });

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

                    <Input label="First Name" autoComplete="given-name" placeHolder="Jack" value={user?.firstName} onChange={(value) => updateUser('firstName', value)} />
                    <Input label="Last Name" autoComplete="family-name" placeHolder="Green" value={user?.lastName}  onChange={(value) => updateUser('lastName', value)} />


                    <Input className="col-span-2" type="email" label="Email" autoComplete="email" value={user?.email} placeHolder="email@example.com"  onChange={(value) => updateUser('email', value)} />
                    <Input className="col-span-2" type="password" label="Current password" autoComplete="current-password"  onChange={(value) => updateUser('currentPassword', value)} />
                    <Input type="password" label="New Password" autoComplete="new-password"  onChange={(value) => updateUser('newPassword', value)} />
                    <Input type="password" label="Confirm Password"  autoComplete="new-password"   onChange={(value) => updateUser('confirmPassword', value)} />
                    <Input className="col-span-2" type="text" label="Street Address" autoComplete="street-address" value={user?.address} placeHolder="10 Street XYZ 654"  onChange={(value) => updateUser('address', value)} />
                    <Input type="text" label="City" placeHolder="Minneapolis" autoComplete="address-level2" value={user?.city}  onChange={(value) => updateUser('city', value)} />
                    <Input type="text" label="State" placeHolder="MN" autoComplete="address-level1" value={user?.state}  onChange={(value) => updateUser('state', value)} />
                    <Input type="text" label="Zip Code" placeHolder="55555" autoComplete="postal-code" value={user?.zip}  onChange={(value) => updateUser('zip', value)} />
                    <Input type="text" label="Country" placeHolder="USA" autoComplete="country" value={user?.country}  onChange={(value) => updateUser('country', value)} />

                </div>

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
        // @ts-ignore
        switch(prop){
            case 'firstName':
                user.firstName = value;
                break;
            case 'lastName':
                user.lastName = value;
                break;
            case 'address':
                user.address = value;
                break;
            case 'city':
                user.city = value;
                break;
            case 'state':
                user.state = value;
                break;
            case 'zip':
                user.zip = value;
                break;
            case 'country':
                user.country = value;
                break;

        }
        setUser(user);
    }

    function saveUser(e:any): void{

        e.preventDefault();
        if(user === null){
            return;
        }

        fetch(process.env.REACT_APP_API_BASE + '/users/' + user.userId, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(user)
        }).then(async (response) => {
            if(!response.ok){
                throw Error();
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

//Replace when user information branch is merged
interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    balance: string;
    shoppingCart: any[];
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}