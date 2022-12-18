import { faCameraRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, {useRef, useState} from "react";
import {$User} from "../../Services/State";
import {UserData} from "../../Types/User";

type Props = {
    onClose?: () => void,
    userId?: number
}

export function UserBanner(props: Props) {
    let initialValue = $User.value;
    let [user, setUser] = useState<UserData|null>(initialValue);

    const fileInput = useRef(null);
    const profileImage = user?.profileImage ?? 'https://flowbite.com/docs/images/people/profile-picture-5.jpg';

    const uploadImage = (e:React.FormEvent) => {
        let input = e.target as HTMLInputElement;
        let file = (input.files) ? input.files.item(0) : null;
        let formData = new FormData();
        // @ts-ignore
        formData.append('profile-image', file);

        fetch(process.env.REACT_APP_API_BASE + '/users/' + props.userId + '/profile-image', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then(async (res) => {
            if(!res.ok){
                let jsonError = await res.json();
                throw new Error(jsonError.data.message);
            }

            let response = await res.json();
            let filename = response?.data?.filename;
            if(filename && user){
                user.profileImage = filename;
                setUser({
                    ...user,
                    'profileImage': filename
                });
            }

            console.log(filename);
        }).catch((error) => {
            console.error(error);
        });
    };
    let photoClass = "w-full h-24 overflow-hidden blur-md bg-repeat-round bg-[url('"+ profileImage +"')]";
    return (
        <div className="relative overflow-hidden">

            <div className={photoClass} onClick={props.onClose}></div>
            <img className="w-20 h-20 rounded-full block mx-auto my-auto absolute inset-0" src={profileImage} alt="Large avatar" />
            <label htmlFor="file" className="cursor-pointer w-7 h-7 rounded-full bg-white absolute my-auto mx-auto inset-0 left-16 top-12 grid justify-center items-center text-black">

                <FontAwesomeIcon icon={faCameraRotate} />

            </label>
            <input ref={fileInput} onChange={uploadImage} name="profile-image-upload" className="hidden" id="file" type="file" accept="image/png,image/jpeg" />
        </div>
    )
}