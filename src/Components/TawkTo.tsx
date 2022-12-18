import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';
import React, { useState, useEffect } from 'react';

export default function TawkTo() {
    const tawkMessengerRef = useRef<typeof TawkMessengerReact>();
    let [userData, setUserData] = useState<any[any]>([]);
    const [loading, setLoading] = React.useState(true);

    function getCookie() {
        function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('freshMartUserId') + '=([^;]*)'));
        return match ? match[1] : null;
    }

    useEffect(() => {
        let cookie = getCookie();
        fetch(process.env.REACT_APP_API_BASE+"/users/details/"+cookie)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.data);
                console.log(data.data)
                setLoading(false);
        })
      },[]);

    
    // Sets attributes for the current user
    const onLoad = () => {
        if(!tawkMessengerRef.current) return
        tawkMessengerRef.current.setAttributes({
            id : userData[0].userId,
            name : userData[0].firstName+" "+userData[0].lastName,
            email: userData[0].email
        }, function(error:string) {
            console.error(error)
        });  
    };

    return (
        <div className="App">
        {!loading && <TawkMessengerReact propertyId="634a1a2b37898912e96eb7c6" widgetId="1gfcncerp" onLoad={onLoad}
                ref={tawkMessengerRef}/>}
        </div>
    )
}