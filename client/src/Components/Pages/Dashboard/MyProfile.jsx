import {React,useState,useContext} from 'react'
import USER_LOGO from "../../Images/user_image.jpg";

import createUserContext from '../../../Context/createUserContext';
import { toast } from 'react-toastify';

function MyProfile(props) {

  const {userDetailsState} = props.state;

  const {updatePassword} = useContext(createUserContext);

  const [updatePasswordDataState,setUpdatePasswordDataState] = useState({oldPassword:"",newPassword:"",confirmPassword:""});
  const onChangeUpdatePassword = (e)=>{
    setUpdatePasswordDataState({...updatePasswordDataState,[e.target.name]:e.target.value});
  }
  const onSubmitUpdatePassword = async(e)=>{
    e.preventDefault();
    if(updatePasswordDataState.oldPassword.length<8 || updatePasswordDataState.newPassword.length<8 || updatePasswordDataState.confirmPassword.length<8){
      toast.warn("Password must be 8 char long.")
    }else if(String(updatePasswordDataState.newPassword) !== String(updatePasswordDataState.confirmPassword)){
      toast.warn("New Password & Confirm Password are mismatched");
    }else{
      await updatePassword(updatePasswordDataState);
      await updatePasswordButton(1)
    }
    setUpdatePasswordDataState({oldPassword:"",newPassword:"",confirmPassword:""});
    e.target.reset();
  }

  //  //! Show/Hide Update Password Form...
  const [showUpdateFormState,setShowUpdateFormState] = useState("hidden");
  const [showUserDataState,setShowUserDataState] = useState("flex");
  const updatePasswordButton = (bool)=>{
    window.scroll(0,0);
    if(bool===0){
      setShowUpdateFormState("flex")
      setShowUserDataState("hidden")
    }else if(bool===1){
      setShowUserDataState("flex")
      setShowUpdateFormState("hidden")
    }
  }

  return (
    <>
      <div className='mx-5'>
        <div className='flex flex-wrap justify-around my-10'>
          <div className='md:w-[50%] flex justify-center items-center'>
            <img src={USER_LOGO} alt="user_logo" className='w-[400px]'/>
          </div>
          <div className={`p-5 md:w-[50%] ${showUserDataState} flex-col justify-center items-center rounded-md bg-[rgba(0,0,5,0.1)]`}>
            <form>
              <div className='flex flex-col my-2'>
                <label htmlFor="name" className='text-sm mb-1 text-gray-600 font-serif'>Name</label>
                <input type="text" className='outline-none px-3 py-2 ring-2 rounded-sm' id='name' name='name' defaultValue={userDetailsState.name} readOnly/>
              </div>
              <div className='flex flex-col my-2'>
                <label htmlFor="email"  className='text-sm mb-1 text-gray-600 font-serif'>Email</label>
                <input type="text" className='outline-none px-3 py-2 ring-2 rounded-sm' id='email' name='email' defaultValue={userDetailsState.email} readOnly/>
              </div>
              <div className='flex flex-col my-2'>
                <label htmlFor="name" className='text-sm mb-1 text-gray-600 font-serif'>Phone No.</label>
                <input type="text" className='outline-none px-3 py-2 ring-2 rounded-sm' id='phone' name='phone' defaultValue={userDetailsState.phone} readOnly/>
              </div>
            </form>
            <div className='flex flex-wrap w-[80%] justify-around mt-10'>
              <button className='my-2 text-right w-fit bg-gray-700 hover:bg-[rgba(0,0,0,.5)] text-white cursor-pointer px-3 py-2 rounded-md'>Update</button>
              <button onClick={()=>{updatePasswordButton(0)}} className='my-2 text-right w-fit bg-gray-700 hover:bg-[rgba(0,0,0,.5)] text-white cursor-pointer px-3 py-2 rounded-md'>Change Password</button>
            </div>
          </div>
        </div>

        <div className={`my-10 ${showUpdateFormState} absolute bg-[rgba(0,0,0,0.8)] text-white w-full justify-center items-center h-[100vh] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]`}>
          <div className=''>
            <form onSubmit={onSubmitUpdatePassword}>
              <div className='my-2 flex flex-col'>
                <label htmlFor="oldPassword" className='text-sm font-mono'>Current Password</label>
                <input type="text" className='px-3 py-2 outline-none text-black ring-1 focus:ring-green-800 rounded-sm' name='oldPassword' onChange={onChangeUpdatePassword} id='oldPassword'/>
              </div>
              <div className='my-2 flex flex-col'>
                <label htmlFor="newPassword" className='text-sm font-mono'>New Password</label>
                <input type="text" className='px-3 py-2 outline-none text-black ring-1 focus:ring-green-800 rounded-sm' name='newPassword' onChange={onChangeUpdatePassword} id='newPassword'/>
              </div>
              <div className='my-2 flex flex-col'>
                <label htmlFor="confirmPassword" className='text-sm font-mono'>Confirm New Password</label>
                <input type="text" className='px-3 py-2 outline-none text-black ring-1 focus:ring-green-800 rounded-sm' name='confirmPassword' onChange={onChangeUpdatePassword} id='confirmPassword'/>
              </div>
              <div className='my-2 w-full flex justify-between'>
                <p onClick={()=>{updatePasswordButton(1)}} className='cursor-pointer px-3 py-2 bg-red-800 hover:bg-red-900 rounded-md w-fit text-white'>Close</p>
                <button type='submit' className='px-3 py-2 bg-green-800 hover:bg-green-900 rounded-md w-fit text-white'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile