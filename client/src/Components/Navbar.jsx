import {React,useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'

import Logo from "./Images/logo.png"
import createUserContext from '../Context/createUserContext';

import { useCookies } from 'react-cookie';

function Navbar() {

  const {cartItemsCountState} = useContext(createUserContext);  

  const [cookie] = useCookies(["userToken"]);

  useEffect(()=>{
    if(!cookie.userToken){
        // navigate("/")
    }
    // eslint-disable-next-line
  },[]);

  //    //! Hide & Show Sub-Menu...
  const [subMenuState,setSubMenuState] = useState("hidden");  
  const onClickHamburger = ()=>{
    if(subMenuState==="hidden")
        setSubMenuState("block")
    else    
        setSubMenuState("hidden");
  }

  //    //! onClickedLink
  const onClickedLink = ()=>{
    window.scroll(0,0)
  }

  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-blue-500 dark:border-gray-700 fixed w-full top-0 z-50">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link onClick={onClickedLink} to="/" className="flex items-center">
            <img src={Logo} className="h-8 mr-3" alt="Dark Store" />
        </Link>
        <div className='md:order-3'>
            <Link to={"/cart"} onClick={()=>{onClickedLink()}} className='text-white flex justify-center items-center'><i className="fa-solid fa-cart-shopping animate-pulse"></i> <span className='relative -top-2 font-bold text-xl text-white'>{cartItemsCountState}</span></Link>
        </div>
        <button onClick={onClickHamburger} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-blue-800 focus:ring-1 focus:ring-gray-200 dark:text-white dark:hover:bg-blue-700">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
        </button>
        <div className={`${subMenuState} w-full h-[100vh] md:h-5 md:block md:w-auto`}>
            <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-blue-500 md:dark:bg-blue-500 dark:border-gray-700`}>
                <li>
                    <Link onClick={onClickedLink} to="/mobiles" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-800 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:text-white md:dark:hover:bg-transparent">Mobiles</Link>
                </li>

                {/* DorpDown  */}
                {/* <li>
                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 md:w-auto dark:text-white md:dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-blue-400 md:dark:hover:bg-transparent">Dropdown <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                    <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-2 text-sm text-white dark:text-white" aria-labelledby="dropdownLargeButton">
                        <li>
                            <Link onClick={onClickedLink} to="/mobile" className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-500 dark:hover:text-white">Mobile</Link>
                        </li>
                        <li aria-labelledby="dropdownNavbarLink">
                            <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" className="flex items-center justify-between w-full px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-500 dark:hover:text-white">Dropdown<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></button>
                            <div id="doubleDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-500">
                                <ul className="py-2 text-sm text-white dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                    <li>
                                        <Link onClick={onClickedLink} to="#" className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-500 dark:text-white dark:hover:text-white">Overview</Link>
                                    </li>
                                    <li>
                                        <Link onClick={onClickedLink} to="#" className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-500 dark:text-white dark:hover:text-white">My downloads</Link>
                                    </li>
                                    <li>
                                        <Link onClick={onClickedLink} to="#" className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-500 dark:text-white dark:hover:text-white">Billing</Link>
                                    </li>
                                    <li>
                                        <Link onClick={onClickedLink} to="#" className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-500 dark:text-white dark:hover:text-white">Rewards</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link onClick={onClickedLink} to="#" className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-500 dark:hover:text-white">Earnings</Link>
                        </li>
                        </ul>
                        <div className="py-1">
                            <Link onClick={onClickedLink} to="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-800 dark:hover:bg-blue-500 dark:text-white dark:hover:text-white">Sign out</Link>
                        </div>
                    </div>
                </li> */}

                <li>
                    <Link onClick={onClickedLink} to="/books" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-800 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:text-white md:dark:hover:bg-transparent">Books</Link>
                </li>
                <li>
                    <Link onClick={onClickedLink} to={"/clothes"} className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-800 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:text-white md:dark:hover:bg-transparent">Colthes</Link>
                </li>
                <li>
                    <Link onClick={onClickedLink} to="/kitchen-accessories" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-800 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:text-white md:dark:hover:bg-transparent">Kitchen Accessories</Link>
                </li>
                <li>
                    <Link onClick={onClickedLink} to="/dairy-breakfast" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-800 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:text-white md:dark:hover:bg-transparent">Dairy & Breakfast</Link>
                </li>
                <li>
                    <Link onClick={onClickedLink} to="/fruits" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-800 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:text-white md:dark:hover:bg-transparent">Fruits</Link>
                </li>
            </ul>
        </div>
        <div className={`md:order-4 order-3 ${cookie.userToken?"hidden":"block"}`}>
            <Link title='Login' onClick={onClickedLink} to="/login" className="block py-2 pl-3 pr-4 text-white rounded hover:text-blue-800 hover:bg-blue-800 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:text-white md:dark:hover:bg-transparent"><i className="fa-solid fa-user-plus"></i></Link>
        </div>
        <div className={`md:order-4 order-3 ${cookie.userToken?"block":"hidden"}`}>
            <Link to={"/my-account"} className="px-3 py-2 text-white rounded-sm hover:bg-slate-800"><i className="fa-solid fa-user"></i></Link>
        </div>
    </div>
    </nav>
    </>
  )
}

export default Navbar