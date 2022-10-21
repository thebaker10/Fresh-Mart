import { Input } from "../Form/Input"

type Props = {
    visible: boolean,
    onClose: () => void
}

export function Modal(props: Props) {

    if (!props.visible) return null
    return (

        <form className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
            <div className="bg-white rounded px-2.5 py-2.5">
                <div className="flex justify-end">
                    <button onClick={props.onClose}>X</button>
                </div>

                {/* <h1 className="font-semibold text-center text-xl text-gray-700">
                    Setting
                </h1> */}
                <div className="relative ">
                    <img className="w-full h-24 overflow-hidden blur-md" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Large avatar" />
                    <img className="w-16 h-16 rounded-full block mx-auto my-4 absolute inset-0 " src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Large avatar" />
                </div>


                <div className="p-5 px-4">
                    <div className="flex gap-4">
                        <Input label="First Name" placeHolder="Jack" onChange={console.log} />
                        <Input label="Last Name" placeHolder="Green" onChange={console.log} />
                    </div>

                    <Input type="email" label="Email" placeHolder="email@example.com" onChange={console.log} />
                    <Input type="password" label="Current password" placeHolder="Current password" onChange={console.log} />
                    <Input type="password" label="New Password" placeHolder="New Password" onChange={console.log} />
                    <Input type="password" label="New Password" placeHolder="New Password" onChange={console.log} />
                </div>




                {/* <div className=" px-5 py-5 gap-x-4">



                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Green" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="email@example.com" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Current password" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Password" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Conform password" />
                </div> */}
                <div className="text-center">
                    <button className="px-5 py-2 bg-green text-white rounded">
                        Save Setting
                    </button>
                </div>
            </div>
        </form>

    )
}