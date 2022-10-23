import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';

export default function TawkTo() {
    const tawkMessengerRef = useRef<typeof TawkMessengerReact>();

    
    // Sets attributes for the current user
    // TODO: Populate attributes with database user info on sign in
    const onLoad = () => {
        if(!tawkMessengerRef.current) return
        
        tawkMessengerRef.current.setAttributes({
            id : 'A1234',
            name : 'Bob Smith',
            email: 'bsmith@mail.com'
        }, function(error:string) {
            console.error(error)
        });
       
    };

    return (
        <div className="App">
        <TawkMessengerReact propertyId="634a1a2b37898912e96eb7c6" widgetId="1gfcncerp" onLoad={onLoad}
                ref={tawkMessengerRef}/>
        </div>
    )
}