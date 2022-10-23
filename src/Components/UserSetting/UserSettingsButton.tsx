import { useState } from "react"
import { UserSettingsModal } from "./UserSettingsModal"

type Props = {
    className?: string,

}

export function UserSettingsButton(props: Props) {
    const [showModal, setShowModal] = useState(false)
    const handleOnClose = () => {
        setShowModal(false)
        console.log()
    }

    return (
        <div>

            <span onClick={() => setShowModal(true)} className={props.className} >Settings</span>


            <UserSettingsModal onClose={handleOnClose} visible={showModal} />

        </div>

    )

}