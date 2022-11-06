

type Props = {
    visible: boolean,
    onClose: () => void
}

export function SearchBarModal(props: Props) {

    if (!props.visible) return null
    return (
        <div className="fixed inset-0">
            <div className=" bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-screen h-screen absolute z-20" onClick={props.onClose}></div>

            <form className="bg-white rounded px-4 py-4 max-w-[40vw] absolute inset-0 m-auto max-h-fit">
                
            </form>
        </div>


    )
}