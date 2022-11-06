import { Input } from "../Form/Input"
import { UserBanner } from "./UserBanner"

type Props = {
    visible: boolean,
    onClose: () => void
}

export function UserSettingsModal(props: Props) {

    if (!props.visible) return null
    return (
        <div className="fixed inset-0">
            <div className=" bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-screen h-screen absolute z-20" onClick={props.onClose}></div>

            <form className="bg-white rounded px-4 py-4 max-w-[40vw] absolute inset-0 m-auto max-h-fit z-20">
                <div className="flex justify-end text-xl text-gray-300 font-bold">
                    <button onClick={props.onClose}>X</button>
                </div>


                <UserBanner />


                <div className="mt-4 grid grid-cols-2 gap-3">

                    <Input label="First Name" placeHolder="Jack" onChange={console.log} />
                    <Input label="Last Name" placeHolder="Green" onChange={console.log} />


                    <Input className="col-span-2" type="email" label="Email" placeHolder="email@example.com" onChange={console.log} />
                    <Input className="col-span-2" type="password" label="Current password"  onChange={console.log} />
                    <Input type="password" label="New Password"  onChange={console.log} />
                    <Input type="password" label="Confirm Password"  onChange={console.log} />
                    <Input className="col-span-2" type="text" label="Street Address" placeHolder="10 Street XYZ 654" onChange={console.log} />
                    <Input type="text" label="City" placeHolder="Minneapolis" onChange={console.log} />
                    <Input type="text" label="State" placeHolder="MN" onChange={console.log} />
                    <Input type="text" label="Zip Code" placeHolder="55555" onChange={console.log} />
                    <Input type="text" label="Country" placeHolder="USA" onChange={console.log} />

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