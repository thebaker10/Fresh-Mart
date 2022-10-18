import { Footer } from "../Components/Footer";
import { Nav } from "../Components/Nav/Nav";
import {faComments, faList} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome"
import { ChatButton } from "../Components/ChatButton";

export function ContactPage() {
    return (
        <div className="min-h-screen bg-lightGray">
            <Nav></Nav>
            <div className="rounded-md max-w-4xl m-auto">
                
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2 mt-8">Chat with our support team</h2>
                <div className="mb-8 bg-white shadow-lg rounded text-gray-600 flex">
                    
                    <p className="text-center px-2 py-3"><a href=""><FontAwesomeIcon className="text-black text-2xl px-2" icon={faComments}></FontAwesomeIcon></a>Use the chat button in the lower right of the screen to chat with our support in realtime.</p>
                </div>
                
                <form id="ticket-form" method="POST" action="">
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Create support ticket</h2>
                        <fieldset className="mb-8 px-3 bg-white shadow-lg rounded text-gray-600">
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Name</span>
                                <input name="name" className="focus:outline-none px-3" placeholder="First & Last Name" />
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Email</span>
                                <input name="email" className="focus:outline-none px-3" placeholder="support@mail.com" />
                            </label>
                            <label className="flex   h-12 pt-3 ">
                                <span className="text-right px-2">Description</span>
                            </label>
                            <label className="flex pt-0 pb-3">
                                <textarea name="description" rows={8} className="focus:outline-none px-2 w-full" placeholder="Describe the issue" />
                            </label> 
                            <div className="flex flex-col justify-center mb-3">
                                <button type="submit" className="px-2 pt-2 pb-1 bg-green text-white text-md font-bold uppercase rounded ">Submit Ticket</button>
                            </div>
                            
                        </fieldset>
                    </section>
                </form>
                
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">View chat & ticket history</h2>
                <div className="mb-8 bg-white shadow-lg rounded text-gray-600 flex">
                    <p className="text-center px-3 py-3"><a href="http://localhost:3000/Support"><FontAwesomeIcon className="text-black text-2xl pr-2" icon={faList}></FontAwesomeIcon></a><span className="align-top">Chat and Ticket history can be viewed by logging in to your account and navigating to the <span className="font-bold">Support</span> tab in the profile dropdown or by clicking <a className="text-green underline font-bold" href="http://localhost:3000/Support">here</a>.</span></p>
                </div>
            </div>
            <Footer></Footer>
            <ChatButton></ChatButton>
        </div>
    )
}