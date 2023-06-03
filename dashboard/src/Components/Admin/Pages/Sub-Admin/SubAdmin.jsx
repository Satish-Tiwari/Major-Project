import { React,useEffect,useContext, useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import createAdminContext from "../../../../Context/Admin/createAdminContext";
import { useCookies } from "react-cookie";

function SubAdmin() {

  const {loadingState, totalAdminState,adminState,getAllAdmins,deleteAdmin,updateAdminRoleOrStatus} = useContext(createAdminContext);
 
  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);
 
  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      getAllAdmins();
    }
    // eslint-disable-next-line
  },[]);

  //  //! Delete Admin....
  const onDeleteAdmin = (role,name,id)=>{
    const conf = window.confirm(`You want to delete : ${String(role).toUpperCase()} [ ${name} ]`);
    if(conf){
      deleteAdmin(id);
    }
  }


  //  //! Update Admin Role or Status...
  const [displayEditBoxState,setDisplayEditBoxState] = useState("hidden");
  const [updateAdminDataState,setAdminDataState] = useState({id:"",name:"",email:"",role:"",status:""})
  const [changeAdminDataState,setChangeAdminDataState] = useState({role:"",status:""})
  const onEditAdmin = (data)=>{
    setDisplayEditBoxState("absolute");
    setAdminDataState({id:data._id,name:data.name,email:data.email,role:data.role,status:data.status});
  }
  const changeAdminUpdateData = (e)=>{
    setChangeAdminDataState({...changeAdminDataState,[e.target.name]:e.target.value});
  }
  const updateAdminData = (e)=>{
    e.preventDefault();
    updateAdminRoleOrStatus(updateAdminDataState.id,changeAdminDataState)
    setDisplayEditBoxState("hidden");
  }

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Admins</h1>
            <h1 className="text-2xl text-gray-600 font-normal">Total Admins : {totalAdminState}</h1>
          </div>
        </div>
        {/*  */}
        <div className="">
          <div className="p-5">
            <div className="mb-10">
              <Link to={"/admin/create-admin"} className="px-3 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded-sm">Add New</Link>
            </div>
            {/* //! ...Show Update Pop-Up...*/}
            <div className={`w-full h-full ${displayEditBoxState} top-1/2 left-1/2 z-[10] bg-[rgb(0,0,0,0.5)] -translate-x-[50%] -translate-y-[50%]`}>
              <div className={`flex h-full flex-col justify-center items-center`}>
                <div className="shadow-2xl p-5 w-[400px] bg-white rounded-md">
                  <div className="w-full text-right px-2">
                    <p onClick={()=>{setDisplayEditBoxState("hidden")}} className="text-2xl text-red-500 hover:opacity-80 cursor-pointer"><i className="fa-solid fa-circle-xmark"></i></p>
                  </div>
                  <div className="flex justify-center">
                    <h1 className="my-2 font-semibold text-2xl">Update Admin</h1>
                  </div>
                  <form onSubmit={updateAdminData}>
                    <div className="my-2 flex flex-col">
                      <input type="text" className="hidden" value={updateAdminDataState.id} id="name" readOnly/>
                      <input type="text" className="py-2 px-3 bg-blue-100 outline-none ring-1 rounded-sm" value={updateAdminDataState.name} id="name" readOnly/>
                    </div>
                    <div className="my-2 flex flex-col">
                      <input type="text" className="py-2 px-3 bg-blue-100 outline-none ring-1 rounded-sm" value={updateAdminDataState.email} id="email" readOnly/>
                    </div>
                    <div className="my-2 flex flex-col">
                      <label htmlFor="status" className="my-1 font-bold text-blue-600">Status</label>
                      <select name="status" id="status" className="py-2 px-3 ring-1 outline-none focus:ring-green-500 rounded-sm" onChange={changeAdminUpdateData} >
                        <option value="active" selected={updateAdminDataState.status === 'active'?true:false}  className="">Active</option>
                        <option value="block" selected={updateAdminDataState.status === 'block'?true:false} className="">Block</option>
                      </select>
                    </div>
                    <div className="my-2 flex flex-col">
                      <label htmlFor="role" className="my-1 font-bold text-blue-600">Role</label>
                      <select name="role" id="role" className="py-2 px-3 ring-1 outline-none focus:ring-green-500 rounded-sm" onChange={changeAdminUpdateData}>
                        <option value="admin" selected={updateAdminDataState.role === 'admin'?true:false} className="">Admin</option>
                        <option value="sub-admin" selected={updateAdminDataState.role === 'sub-admin'?true:false} className="">Sub-Admin</option>
                      </select>
                    </div>
                    <div className="mt-5 mb-2 text-right">
                      <button type="submit" className="bg-green-600 hover:bg-green-600 text-white px-3 py-2">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* //! ...Show Data on Table...*/}

            {loadingState?<h1>Loading...</h1>:
            <div className="overflow-x-scroll">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr className="bg-gray-900 text-white">
                    <th scope="col" className="px-6 py-3">
                      S No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adminState!==undefined ? adminState.map((e,i)=>{
                  return <tr key={e._id}>
                    <td className="px-6 py-4">{i+1}</td>
                    <td className="px-6 py-4">{e.name}</td>
                    <td className="px-6 py-4">{e.email}</td>
                    <td className="px-6 py-4 capitalize">{e.role}</td>
                    <td className="px-6 py-4 capitalize">{e.status}</td>
                    <td className="px-6 py-4">
                      {/* <i onClick={()=>{}} className="fa-solid fa-eye mr-2 cursor-pointer opacity-70 text-blue-600 hover:text-blue-900"></i> */}
                      <i onClick={()=>{onDeleteAdmin(e.role,e.name,e._id)}} className="fa-solid fa-trash mx-2 cursor-pointer opacity-70 text-red-600 hover:text-red-900"></i>
                      <i onClick={()=>{onEditAdmin(e)}} className="fa-solid fa-pen-to-square ml-2 cursor-pointer opacity-70 text-green-600 hover:text-blue-900"></i>
                    </td>
                  </tr>
                  }):<tr><td>Loading...</td></tr>}
                </tbody>
              </table>
              {adminState.length < 1 ? 
              <div className="text-center mt-10 text-red-500 font-semibold my-5">No Sub-Admins found</div>
              :""}
            </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default SubAdmin;
