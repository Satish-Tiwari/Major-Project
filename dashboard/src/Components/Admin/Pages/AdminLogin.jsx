import {React,useState,useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import PandaPics from "../../Photos/panda-png.png"
import createAdminContext from '../../../Context/Admin/createAdminContext';
import { toast } from 'react-toastify';

import {useCookies} from "react-cookie";

import Loading from '../../Utils/Loading';

function AdminLogin() {

  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);
  const {loadingState, adminLogin} = useContext(createAdminContext);

  useEffect(()=>{
    if(cookie.adminToken){
      navigate("/admin/dashboard");
    }
    // eslint-disable-next-line
  },[]);

  const [loginDataState,setLoginDataState] = useState({email:"user@demo.com",password:"12345678"});
  const onChangeLoginData = (e)=>{
    setLoginDataState({...loginDataState,[e.target.name]:e.target.value});
  }
  const onSubmitLogin = async(e)=>{
    e.preventDefault()
    if(loginDataState.email.length<5){
      toast.info("Invalid Email");
    }else if(loginDataState.password.length<8){
      toast.info("Password must be 8 char long");
    }else{
      await adminLogin(loginDataState);
      navigate("/admin/dashboard");
      e.target.reset();
    }
  }


  return (
    <>
      <div className='bg-gray-900 h-[100vh]'>
        <div className='flex justify-center items-center h-[80vh]'>
          <div className='bg-white shadow-xl md:px-16 px-10 py-10 mt-10 rounded-3xl md:w-[30%]'>
            <div className=''>
              <h1 className='font-extrabold text-lg uppercase text-red-900'>Admin Login</h1>
            </div>
            <div className='flex justify-center'>
              <img src={PandaPics} alt="Panda_Picture" className='w-[150px]'/>
            </div>
            <div className=''>
              <form onSubmit={onSubmitLogin}>
                <div className='my-1 flex flex-col'>
                  <label htmlFor="email" className='my-1 font-extralight'>Email</label>
                  <input onChange={onChangeLoginData} defaultValue={loginDataState.email} className='px-3 py-2 outline-none ring-1 focus:ring-green-600 rounded-sm' type="email" id='email' name='email' placeholder='admin@admin.com'/>
                </div>
                <div className='my-1 flex flex-col'>
                  <label htmlFor="password" className='my-1 font-extralight'>Password</label>
                  <input onChange={onChangeLoginData} defaultValue={loginDataState.password} className='px-3 py-2 outline-none ring-1 focus:ring-green-600 rounded-sm' type="password" id='password' name='password' placeholder='admin@123'/>
                </div>
                <div className='mt-3 mb-1 flex flex-col'>
                  <button type='submit' className='px-3 py-2 bg-green-800 hover:bg-green-700 text-white flex justify-center items-center'>
                    {loadingState?<Loading/>:"Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin