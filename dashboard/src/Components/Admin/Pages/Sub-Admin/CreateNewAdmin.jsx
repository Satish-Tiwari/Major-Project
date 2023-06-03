import {React,useState,useContext,useEffect} from "react";
import {Link} from "react-router-dom"
import createAdminContext from "../../../../Context/Admin/createAdminContext";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function CreateNewAdmin() {

  const {createAdmin} = useContext(createAdminContext);

  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);

  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    // eslint-disable-next-line
  },[])

  //    //! Create new Admin...  
  const [adminDataState,setAdminDataState] = useState({name:"",email:"",password:""});
  const onChangeAdminData = (e)=>{
    setAdminDataState({...adminDataState,[e.target.name]:e.target.value});
  }
  const uploadNewAdmin = (e)=>{
    e.preventDefault();
    if(adminDataState.name.length < 3 ){
      toast.info("Admin name is required");
      return;
    }
    if(adminDataState.email.length < 3 ){
      toast.info("Admin email is required");
      return;
    }
    if(adminDataState.password.length < 8 ){
      toast.info("Password must be 8 char long");
      return;
    }
    createAdmin(adminDataState);
    e.target.reset();
  }  


  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Create Admin</h1>
          </div>
        </div>
        {/*  */}
        <div className="">
          <div className="p-5">
            <div className="mb-10">
                <Link to={"/admin/view-admin"} className="px-3 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded-sm">View All</Link>
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={uploadNewAdmin}>
                    <div className="my-2 flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="px-3 py-2 ring-1 focus:ring-green-400 outline-none rounded-sm" onChange={onChangeAdminData} value={adminDataState.name} name="name" id="name"/>
                    </div>
                    <div className="my-2 flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="px-3 py-2 ring-1 focus:ring-green-400 outline-none rounded-sm" onChange={onChangeAdminData} value={adminDataState.email} name="email" id="email"/>
                    </div>
                    <div className="my-2 flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="px-3 py-2 ring-1 focus:ring-green-400 outline-none rounded-sm" onChange={onChangeAdminData} value={adminDataState.password} name="password" id="password"/>
                    </div>
                    <div className="mt-5 mb-2 flex flex-col">
                        <button type="text" className="px-3 py-2 text-lg uppercase ring-1 outline-none rounded-sm bg-blue-500 hover:bg-blue-600 text-white">Create</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewAdmin;
