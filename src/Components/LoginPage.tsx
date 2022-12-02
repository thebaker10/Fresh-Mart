import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import env from "./../env.json"
import { $User } from "../Services/State";
import { User } from "../Types/User";
import { Login } from "../Types/Login";

export function LoginPage() {
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Something went wrong while registering.');
    const [loading, setLoading] = React.useState(false);
    let navigate = useNavigate();

    const loginFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        //@TODO Add Loading Indicator

        const data:{[key:string]:FormDataEntryValue} = {};

        formData.forEach((value:FormDataEntryValue,key:string) => {
            data[key] = value;
        });

        setLoading(true);

        //CF 2022-10-16
        //Fetch is asynchronous, so it returns a Promise.  When it is resolved (the request is completed),
        // it moves onto the then block. If an error is thrown, it is caught in the catch block.
        fetch(env.REACT_APP_API_BASE + '/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then( async (response) => {
            //response.json() returns a promise
            const body:Login = await response.json()

            if(!response.ok) {
                setAlertMessage(body.data.message);
                setAlertVisible(true);
                return;
            }
            const user:User = await fetch(env.REACT_APP_API_BASE + '/users/' + body.data.user_id, {credentials: 'include'}).then(b => b.json())
            $User.next(user.data)
            setLoading(false);
            navigate(`/`);
        }).catch((error) => {
            setAlertVisible(true);
            console.error(error);
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
                            Sign in to your account
                        </h1>
                        { alertVisible && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{alertMessage}</div> }
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={loginFormSubmitHandler}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 
                                        dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to="/ForgotPassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-blue">Forgot password?</Link>
                            </div>
                            <p className={(loading) ? 'visible text-center' : 'invisible text-center'}>
                                <FontAwesomeIcon icon={faSpinner} spinPulse={true} color={'white'} size={"2x"} />
                            </p>
                            <button type="submit" className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="http://localhost:3000/RegistrationPage" className="font-medium text-primary-600 hover:underline dark:text-blue">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}