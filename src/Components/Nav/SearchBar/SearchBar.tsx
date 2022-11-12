import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { IconItem } from "../IconItem"
import { SearchBarModal } from "./SearchBarModal"


type Props = {
    className?: string,

}

export function SearchBar(props: Props) {
    const [showModal, setShowModal] = useState(false)
    const handleOnClose = () => {
        setShowModal(false)
        console.log()
    }

    return (
        <div>

            <span onClick={() => setShowModal(true)} className={props.className} ><IconItem icon={faSearch} /></span>

            

            <SearchBarModal onClose={handleOnClose} visible={showModal} />

        </div>

    )

}