import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function ResetPasswordPage() {
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while resetting your password.');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    let { resetToken, email } = useParams();

    const resetPasswordSubmitHandler = (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.target as HTMLFormElement);
        let data:any = {};


        formData.forEach((value:any,key:any) => {
            data[key] = value;
        });

        setLoading(true);

        fetch(process.env.REACT_APP_API_BASE + '/users/password-reset', {
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
                    setAlertSuccess(false)
                    setLoading(false);
                    return;
                }

                setLoading(false);
                setAlertMessage(body.data.message);
                setAlertSuccess(true);
                setAlertVisible(true);
                navigate('/');
            });
        }).catch((error) => {
            setAlertVisible(true);
            setAlertSuccess(false);
            setAlertMessage(error);
            setLoading(false);
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
                            Reset Password
                        </h1>
                        { (alertVisible && !alertSuccess) && <div className="p-4 mb-4 text-sm text-red-900 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900" role="alert">{alertMessage}</div> }
                        { (alertVisible && alertSuccess) && <div className="p-4 mb-4 text-sm text-alertGreen-900 bg-alertGreen-200 rounded-lg dark:bg-alertGreen-900 dark:text-alertGreen-200" role="alert">{alertMessage}</div> }
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={resetPasswordSubmitHandler}>
                                <input type="hidden" name="reset_token" id="reset_token" required value={resetToken}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Email</label>
                                <input type="email" name="email" id="email" required autoComplete="username" disabled value={email}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" required
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" name="confirm_password" id="confirm_password" required
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <p className={(loading) ? 'visible text-center' : 'invisible text-center'}>
                                <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"2x"} />
                            </p>
                            <button type="submit" className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}