import {useState} from "react";
import {useLocation} from "react-router-dom";
import AdminNavbar from "./Tools/AdminNavbar";
import AdminRoutes from "./AdminRoutes";
import AdminSideNavbar from "./Tools/AdminSideNavbar";

function Admin() {

  
  const location = useLocation();
  
  const [showSidebarState,setShowSidebarState] = useState("HideSideBar"); 
  const [changeBarState, setChangeBarState] = useState("bars");

  const showHamburger = ()=>{
    if(showSidebarState==="showSideBar"){
      setShowSidebarState("HideSideBar")
      setChangeBarState("bars")
    }else{
      setShowSidebarState("showSideBar")
      setChangeBarState("xmark")
    }
    console.log(location);
  } 


  return (
    <>
    <div className="">
      <div className={`${location.pathname!=='/'?'block':'hidden'} fixed w-[100vw] top-0 z-10`}>
        <AdminNavbar state={{showHamburger,changeBarState}}/>
      </div>
      <div className={`${location.pathname!=='/'?'grid grid-cols-12 mt-16':''}`}>
        <div className={`${location.pathname!=='/'?'block':'hidden'} ${showSidebarState==="showSideBar"?"col-span-3":"col-span-1"} z-10`}>
          <AdminSideNavbar state={{showSidebarState}}/>
        </div>
        <div className={`${showSidebarState==="showSideBar"?"col-span-9":"md:col-span-11 col-span-12"}`}>
          <AdminRoutes />
        </div>
      </div>
    </div>
    </>
  );
}

export default Admin;

