import { useState } from "react"
import { Modal } from "./Modal"


export function ChangePassword() {

    const [showModal, setShowModal] = useState(false)
    const handleOnClose = () => setShowModal(false)

    return (

        <div className="bg-blue-400 bg-opacity-30">
            <div className="max-w-3xl mx-auto">
                <div className="text-center py-3">
                    <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-400 text-white px-3 py-2 rounded hover:scale-95 transition text-xl">
                        Open Modal
                    </button>
                </div>

            </div>

            <Modal onClose={handleOnClose} visible={showModal}/>
        </div>
    )
}