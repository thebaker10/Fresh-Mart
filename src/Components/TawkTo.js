import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';

export default function TawkTo() {
    const tawkMessengerRef = useRef();
    
    // Sets attributes for the current user
    // TODO: Populate attributes with database user info on sign in
    const onLoad = () => {
        console.log(tawkMessengerRef);
        tawkMessengerRef.current.setAttributes({
            id : 'A1234',
            name : 'Bob Smith',
            email: 'bsmith@mail.com'
        }, function(error) {
            // do something if error
        });
       
    };

    return (
        <div className="App">
        <TawkMessengerReact propertyId="634a1a2b37898912e96eb7c6" widgetId="1gfcncerp" onLoad={onLoad}
                ref={tawkMessengerRef}/>
        </div>
    )
}