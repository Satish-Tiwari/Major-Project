import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from "../Images/logo.png"
import { toast } from 'react-toastify'

import Loading from './Loading';
import createUserContext from '../../Context/createUserContext';

const SignUp = () => {

    const navigate = useNavigate();

    const {loadingState,createNewUser} = useContext(createUserContext);

    const [credientials, setCredientials] = useState({ email: "", password: "", repeat_password: "", name: "",});
    // - Handle Form data and update state
    const handleChange = (e) => {
        setCredientials({ ...credientials, [e.target.name]: e.target.value })
    }
    // - Handle Form on Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credientials.password !== credientials.repeat_password) {
            toast.info("Confirm password not Matched")
        }

        if (credientials.email !== '' && credientials.name !== '' && credientials.password !== '') {
            if (credientials.password === credientials.repeat_password) {
            //  //? Call Signup function...
                const conf = await createNewUser(credientials);
                if(conf){
                    navigate("/")
                }
            }
        }else{
            toast.info("Field's are required")
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
                        <div className="lg:basis-[60%] w-full h-full">
                            <div className="w-[90%] mx-auto">
                                <h1 className="lg:text-3xl text-2xl font-semibold  lg:text-center my-8">Create An Account</h1>
                            </div>
                            {/* //? Signup form */}
                            <div className=" flex items-center justify-center h-full lg:w-[80%] lg:ml-20 ">
                                <form className="lg:w-full w-[90%]" onSubmit={handleSubmit}>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="text" name="name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required="" onChange={handleChange} />
                                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required="" onChange={handleChange} />
                                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required="" onChange={handleChange} />
                                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required="" onChange={handleChange} />
                                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                                    </div>
                                    <div className={`${loadingState?"block":"hidden"} scale-50`}>
                                        <div className='h-[50px]'>
                                            <Loading/>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Signup</button>
                                </form>

                            </div>
                        </div>
                    </div>
                    {/* //- If user Already registered */}
                    <div className="w-full text-center mt-6">
                        <span className=' md:text-lg'>Already Registered Please <Link to='/login' className='underline text-green-500'>Login</Link></span>
                    </div>

                </div>
            </div >

        </>
    )
}

export default SignUp