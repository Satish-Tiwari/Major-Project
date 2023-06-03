import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <>
            <div className="bg-blue-500 text-white mt-20 md:h-[155vh] lg:h-[65vh] relative">
                <div className="w-[90%] mx-auto flex items-center justify-between lg:h-[45vh] flex-wrap lg:flex-nowrap">
                    {/* //- Quick Links */}
                    <div className="basis-[100%] md:basis-[50%] lg:basis-[25%] h-full">
                        <h1 className="text-xl font-semibold mb-6 mt-20">Quick Links</h1>
                        <div>

                            <Link to='/' className="block mb-2 py-2 md:py-1">
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="ml-3 hover:tracking-wider duration-500">
                                    About Us
                                </span>
                            </Link>
                            <Link to='/' className="block mb-2 py-2 md:py-1">
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="ml-3 hover:tracking-wider duration-500">
                                    Contact Us
                                </span>
                            </Link>
                            <Link to='/' className="block mb-2 py-2 md:py-1">
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="ml-3 hover:tracking-wider duration-500">
                                    Privacy Policy
                                </span>
                            </Link>
                            <Link to='/' className="block mb-2 py-2 md:py-1">
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="ml-3 hover:tracking-wider duration-500">
                                    Terms and Conditions
                                </span>
                            </Link>
                            <Link to='/' className="block mb-2 py-2 md:py-1">
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="ml-3 hover:tracking-wider duration-500">
                                    FAQs & Help
                                </span>
                            </Link>
                            <Link to='/' className="block mb-2 py-2 md:py-1">
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="ml-3 hover:tracking-wider duration-500">
                                    Careers
                                </span>
                            </Link>
                        </div>
                    </div>
                    {/* //- Contact Block */}
                    <div className="basis-[100%] md:basis-[50%] lg:basis-[25%] h-[50vh]  md:h-full">
                        <h1 className="text-xl font-semibold mb-6 mt-20">Contact</h1>
                        <div className="flex items-center mb-3">
                            <h1 className="font-semibold tracking-wide"><i className="fa-solid fa-location-dot mr-3 text-xl"></i> Knowledge Park III, Gr. Noida, India</h1>
                        </div>
                        <div className="flex items-center mb-3">
                            <h1 className="font-semibold tracking-wide"><i className="fa-solid fa-phone mr-3 text-xl"></i> +91 9120226043</h1>
                        </div>
                        <div className="flex items-center mb-3">
                            <h1 className="font-semibold tracking-wide"><i className="fa-solid fa-envelope mr-3 text-xl"></i> bug9369@gmail.com</h1>
                        </div>
                        <div className="mt-5">
                            <Link to='/' className="text-lg hover:opacity-50 duration-500 mr-3" ><i className="fa-brands fa-twitter"></i></Link>
                            <Link to='/' className="text-lg hover:opacity-50 duration-500 mr-3" ><i className="fa-brands fa-instagram"></i></Link>
                            <Link to='/' className="text-lg hover:opacity-50 duration-500 mr-3" ><i className="fa-brands fa-youtube"></i></Link>
                            <Link to='/' className="text-lg hover:opacity-50 duration-500" ><i className="fa-brands fa-linkedin-in"></i></Link>

                        </div>
                    </div>
                    {/* //- Newsletter */}
                    <div className="relative basis-[100%] md:basis-[100%] lg:basis-[25%] h-[55vh]  md:h-full">
                        <h1 className="text-xl font-semibold mb-6 mt-20">Newsletter</h1>
                        <div>
                            <p>Subscribe our newsletter for latest info.</p>
                            <div className="relative bg-white h-14 w-full md:w-full lg:w-64 mt-7 ">
                                <input type="email" name="news_letter_email" placeholder="Enter Your Email" className="h-full text-black pl-3 outline-none w-full md:w-[83%] lg:w-[56%]" />
                                <button className=" text-white font-semibold h-10 my-1 w-24 md:ml-1 border-2 border-green-500 bg-green-500 hover:bg-green-600 hover:border-green-500 duration-500">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="md:mt-10 w-[90%] mx-auto mb-4">
                    <hr />
                </div>
                <div className="w-[90%] mx-auto pb-2">
                    <div className=" lg:mt-10 flex w-full flex-col lg:flex-row justify-center lg:justify-between items-center">
                        <div className="mb-6 lg:mb-0">
                            <h1>© <Link to="/" onClick={()=>{window.scroll(0,0)}} className="hover:underline">Dark Store</Link>, All Right Reserved.</h1>
                        </div>
                        <div className="w-[25%]">
                            <ul className="flex items- justify-center">
                                <li className="border-r-2 px-2 md:px-5">
                                    <Link to='/' className="hover:underline" >Home</Link>
                                </li>
                                <li className="border-r-2 px-2 md:px-5">
                                    <Link to='/' className="hover:underline">Cookies</Link>
                                </li>
                                <li className="border-r-2 px-2 md:px-5">
                                    <Link to='/' className="hover:underline">Help</Link>
                                </li>
                                <li className="px-2 md:px-5">
                                    <Link to='/' className="hover:underline">FAQs</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer;