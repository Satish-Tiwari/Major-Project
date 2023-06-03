import {React,useContext,useEffect} from 'react'
import {useNavigate} from "react-router-dom";

import MyProfile from './MyProfile';
import createUserContext from '../../../Context/createUserContext';

import { useCookies } from 'react-cookie';

function User() {

  const {logoutUserFun,getUserDetails,userDetailsState} = useContext(createUserContext);

  const navigate = useNavigate();
  const [cookie] = useCookies(["userToken"]);

  useEffect(()=>{
    if(!cookie.userToken){
      navigate("/");
    }else{
      window.scroll(0,0);
      getUserDetails();
    }
    // eslint-disable-next-line
  },[])

  //  //! Navigate to Orders Route...
  const onButtonClick = ()=>{
    navigate("/my-orders")
  }

  //  //! Logout Button...
  const onLogout = async()=>{
    await logoutUserFun()
    navigate("/");
  }

  return (
    <>
      <div className="my-5">

        {/* //! ...Show Buttons... */}
        <div className='flex justify-between mx-5'>
          <div className='flex'>
            <div>
              <button className='px-3 py-2 hover:bg-black text-white bg-[rgba(0,0,0,0.8)] rounded-sm mx-5'>My Account</button>
            </div>
            <div>
              <button onClick={()=>{onButtonClick()}} className='px-3 py-2 hover:bg-black text-white bg-[rgba(0,0,0,0.8)] rounded-sm mx-5'>My Orders</button>
            </div>
          </div>
          <div className=''>
            <button className='px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-green-800' onClick={onLogout}>Logout</button>
          </div>
        </div>

        {/* //! ...Show Data... */}
        <div className="">
            <div className={``}>
              <MyProfile state={{userDetailsState}}/>
            </div>
        </div>

      </div>
    </>
  )
}

export default User