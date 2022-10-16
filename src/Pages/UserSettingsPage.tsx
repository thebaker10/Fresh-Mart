import { Nav } from "../Components/Nav/Nav";
import { Footer } from "../Components/Footer";
import { ChangePassword } from "../Components/UserSettingPage/ChangePassword";
import { ChatButton } from "../Components/ChatButton";
import { ChangeUserIcon } from "../Components/UserSettingPage/ChangeUserIcon";


export function UserSettingsPage() {
    return (
        <div className="bg-lightGray">
            <Nav></Nav>
            
            <div className="mx-auto max-w-4xl my-5 px-5 py-5 bg-white rounded-xl">
                <ChangeUserIcon/>
                
                <ChangePassword/>
            </div>

            
            <Footer></Footer>
            <ChatButton></ChatButton>
        </div>
    )
}