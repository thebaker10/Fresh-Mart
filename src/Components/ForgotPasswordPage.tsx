import React from "react";
import {useNavigate} from "react-router-dom";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function ForgotPasswordPage() {
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while registering.');
    const [loading, setLoading] = React.useState(false);

    const forgotPasswordSubmitHandler = (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.target as HTMLFormElement);

        let data:any = {};

        formData.forEach((value:any,key:any) => {
            data[key] = value;
        });

        setLoading(true);

        fetch(process.env.REACT_APP_API_BASE + '/users/forgot-password', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((response) => {
            //response.json() returns a promise
            response.json().then((body) => {

                if(!response.ok) {
                    setAlertMessage(body.data.message);
                    setAlertVisible(true);
                    setAlertSuccess(false);
                    return;
                }

                setLoading(false);
                setAlertMessage(body.data.message);
                setAlertSuccess(true);
                setAlertVisible(true);
            });
        }).catch((error) => {
            setAlertVisible(true);
            setAlertSuccess(false);
            setAlertMessage(error);
            console.log(error);
        });
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white gap-2">
                    <span className="text-green">Fresh</span>
                    <span>Market</span>
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Forgot Password
                        </h1>
                        { (alertVisible && !alertSuccess) && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
                        { (alertVisible && alertSuccess) && <div className="p-4 mb-4 text-sm text-alertGreen-900 bg-alertGreen-200 rounded-lg dark:bg-alertGreen-900 dark:text-alertGreen-200" role="alert">{alertMessage}</div> }
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={forgotPasswordSubmitHandler}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" />
                            </div>
                            <p className={(loading) ? 'visible text-center' : 'invisible text-center'}>
                                <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"2x"} />
                            </p>
                            <button type="submit" className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Reset Email</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}