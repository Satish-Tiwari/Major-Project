import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import logo from "../Images/logo.png"
import {toast} from "react-toastify"

import createUserContext from '../../Context/createUserContext';
import Loading from './Loading';

const Login = () => {

    const navigate = useNavigate();

    const {loadingState,loginUser} = useContext(createUserContext);

    const [crediential, setCredientials] = useState({ email: "", password: "" });
    // - Handle Form data and update state
    const handleChange = (e) => {
        setCredientials({ ...crediential, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(crediential.email.length < 5){
            toast.info("Invalid Email");
        }else if(crediential.password.length < 8){
            toast.info("Invalid Password");
        }else{
            //  //? Call Login Function...
            const conf = await loginUser(crediential);
            if(conf){
                navigate("/")
            }
        }
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="w-[90%] mx-auto my-7 h-full">
                    <div className=" md:flex">
                        {/* //- Left Part */}
                        <div className="lg:basis-[40%] flex items-center">
                            <img src={logo} alt="logo" className="object-cover" />
                        </div>
                        {/* //- Right Part */}
                        <div className="lg:basis-[60%] w-full h-full lg:mt-20">
                            <div className="w-[90%] mx-auto">
                                <h1 className="lg:text-3xl text-2xl font-semibold  lg:text-center my-8">Login to your Store</h1>
                            </div>
                            {/* //? Signup form */}
                            <div className=" flex items-center justify-center h-full lg:w-[80%] lg:ml-20 ">

                                <form className="lg:w-full w-[90%]" onSubmit={handleSubmit}>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required="" name='email' onChange={handleChange} />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="password" name='password' id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required="" onChange={handleChange} />
                                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                    </div>
                                    <div className={`${loadingState?"block":"hidden"} scale-50`}>
                                        <div className='h-[50px]'>
                                            <Loading/>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
                                </form>

                            </div>
                        </div>
                    </div>

                    {/* //- If user is not registered */}
                    <div className="w-full text-center mt-6">
                        <span className=' md:text-lg'>If You don't have Account please <Link to='/signup' className='underline text-green-500'>signup</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;


