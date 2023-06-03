import { useContext,useEffect, useState, useRef } from "react";
import createAdminContext from "../../../../Context/Admin/createAdminContext";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function MyProfile() {

  const ref = useRef();

  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);

  const {adminProfileData, adminProfileDataState,updateAdminPassword} = useContext(createAdminContext);
  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      adminProfileData();
    }
    // eslint-disable-next-line
  },[]);

  const checkFields = (old)=>{
    if(old.oldPassword.length < 8){
      toast.info("Password must be 8 char long 😒");
      return true;
    }
    if(old.newPassword.length < 8){
      toast.info("Password must be 8 char long 😒");
      return true
    }
    if(old.confirmPassword.length < 8){
      toast.info("Password must be 8 char long 😒");
      return true;
    }
    if(String(old.confirmPassword) !== String(old.newPassword)){
      toast.info("New Password & Confirm Password 😒")
      return true;
    }
    return false;
  }

  //  //! Update Admin Password...
  const [oldDataState,setOldDataState] = useState({newPassword:"",confirmPassword:"",oldPassword:""});
  const onChangePasswordData = (e)=>{
    setOldDataState({...oldDataState,[e.target.name]:e.target.value});
  }
  const updatePassword = async (e)=>{
    e.preventDefault();
    const conf = await checkFields(oldDataState);
    if(!conf){
      await updateAdminPassword(oldDataState);
      // setOldDataState({newPassword:"",confirmPassword:"",oldPassword:""})
    }
  }
  
  const updateByRef = ()=>{
    ref.current.click();
  }

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Profile</h1>
            <div className="">
              <button onClick={()=>{updateByRef()}} className="px-3 py-2 rounded-sm bg-blue-700 hover:bg-blue-600 text-white">Save</button>
            </div>
          </div>
        </div>
        <div className="p-5">
          <form onSubmit={updatePassword}>
            <div className="my-0">
              <details>
                <summary className="shadow-sm p-5 text-base cursor-pointer">General</summary>
                <div className="p-5 flex flex-col shadow-sm">
                  <div className="my-3 flex flex-col">
                    <label htmlFor="name" className="mb-2">Name</label>
                    <input className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]" defaultValue={adminProfileDataState.name} type="text" name="name" id="name" readOnly/>
                  </div>
                  <div className="my-3 flex flex-col">
                    <label htmlFor="email" className="mb-2">Email</label>
                    <input className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]" defaultValue={adminProfileDataState.email} type="email" name="email" id="email" readOnly/>
                  </div>
                </div>
                <hr />
              </details>
            </div>
            <div className="my-5">
              <details>
                <summary className="shadow-sm p-5 text-base cursor-pointer">Change Account Password</summary>
                <div className="p-5 flex flex-col shadow-sm">
                  <div className="my-3 flex flex-col">
                    <label htmlFor="newPassword" className="mb-2">New Password</label>
                    <input onChange={onChangePasswordData} defaultChecked={oldDataState.newPassword} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]" placeholder="Pass@12345#@" type="text" name="newPassword" id="newPassword"/>
                  </div>
                  <div className="my-3 flex flex-col">
                    <label htmlFor="confirmPassword" className="mb-2">Confirm Password</label>
                    <input onChange={onChangePasswordData} defaultChecked={oldDataState.confirmPassword} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]" placeholder="Pass@12345#@" type="password" name="confirmPassword" id="confirmPassword"/>
                  </div>
                </div>
                <hr />
              </details>
            </div>
            <div className="my-5">
              <details>
                <summary className="shadow-sm p-5 text-base cursor-pointer">Current Password</summary>
                <div className="p-5 shadow-sm flex flex-col">
                  <label htmlFor="oldPassword" className="mb-2">Current Password</label>
                  <input onChange={onChangePasswordData} defaultChecked={oldDataState.oldPassword} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]" placeholder="Pass@12345#@" type="password" name="oldPassword" id="oldPassword"/>
                </div>
              </details>
            </div>
            <button className="hidden" type="submit" ref={ref}>Update Password</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
