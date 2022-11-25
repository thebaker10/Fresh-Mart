import { Input } from "../Form/Input"
import { UserBanner } from "./UserBanner"
import {useEffect} from "react";

type Props = {
    visible: boolean,
    onClose: () => void,
    userData?: UserData
}

export function UserSettingsModal(props: Props) {

    //Replace with call to global user object
    useEffect(() => {
        let matches = /freshMartUserId=(\d+)/g.exec(document.cookie);
        let user_id = (matches !== null) ? matches[1] : '';
        fetch(process.env.REACT_APP_API_BASE + '/users/' + user_id, {
            credentials: 'include'
        }).then((response) => {
            response.json().then((body) => {
                props.userData = body.data;
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

                    <Input label="First Name" attrId="fName" placeHolder="Jack" onChange={console.log} />
                    <Input label="Last Name" attrId="lName" placeHolder="Green" onChange={console.log} />


                    <Input className="col-span-2" type="email" label="Email" attrId="email"  placeHolder="email@example.com" onChange={console.log} />
                    <Input className="col-span-2" type="password" label="Current password" attrId="password"   onChange={console.log} />
                    <Input type="password" label="New Password" attrId="newPassword"   onChange={console.log} />
                    <Input type="password" label="Confirm Password"  attrId="newPasswordConfirm"  onChange={console.log} />
                    <Input className="col-span-2" type="text" label="Street Address" attrId="address"  placeHolder="10 Street XYZ 654" onChange={console.log} />
                    <Input type="text" label="City" placeHolder="Minneapolis" attrId="city"  onChange={console.log} />
                    <Input type="text" label="State" placeHolder="MN" attrId="state"  onChange={console.log} />
                    <Input type="text" label="Zip Code" placeHolder="55555" attrId="zipCode"  onChange={console.log} />
                    <Input type="text" label="Country" placeHolder="USA" attrId="country"  onChange={console.log} />

                </div>





                <div className="text-center">
                    <button className="px-5 py-2 bg-green text-white rounded">
                        Save Setting
                    </button>
                </div>

            </form>
        </div>
    )
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