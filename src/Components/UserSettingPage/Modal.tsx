type Props = {
    visible: boolean, 
    onClose: () => void
}

export function Modal(props:Props) {

    if (!props.visible) return null
    return (

        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-2 rounded w-72">
                <button onClick={props.onClose}>X</button>
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Setting
                </h1>

                

                <div className="grid grid-cols-2 px-5 py-5 gap-x-4">
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="First Name" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Last Name" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="email@example.com" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Current password" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Password" />
                    <input type="text" className="border border-gray-700 p-2 rounded mb-5" placeholder="Conform password" />
                </div>
                <div className="text-center">
                    <button className="px-5 py-2 bg-green text-white rounded">
                        Save Setting
                    </button>
                </div>
            </div>
        </div>

    )
}