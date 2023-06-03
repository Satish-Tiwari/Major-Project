import { useContext, useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../../Photos/logo.png";
import createAdminContext from "../../../Context/Admin/createAdminContext";
import { useCookies } from "react-cookie";

function AdminNavbar(props) {

  const {logoutAdminFun,adminProfileData, adminProfileDataState} = useContext(createAdminContext);

  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);

  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      adminProfileData();
    }
    // eslint-disable-next-line
  },[])

  const {showHamburger,changeBarState} = props.state;

  const [showSubMenuState, setShowSubMenuState] = useState("hidden");
  const showSubMenu = () => {
    if (showSubMenuState === "hidden") {
      setShowSubMenuState("block");
    } else {
      setShowSubMenuState("hidden");
    }
  };

  //  //! Logout Admin....
  const logoutAdmin = async()=>{
    await logoutAdminFun();
    navigate("/");
  }

  return (
    <>
      {/* //! Navigation Bar... */}
      <div className="px-3 border-b-2 bg-white">
        <div className="h-[63px] flex justify-between items-center">

          {/* //! Hamburger... */}
          <div className={`md:hidden`}> {/* md:hidden */}
            <i className={`fa-solid fa-${changeBarState} scale-125 ml-3 cursor-pointer text-lg text-gray-600`} onClick={showHamburger}></i>
          </div>

          <div className="hidden md:block scale-75 md:scale-100 -ml-3 md:ml-0">
            <Link to={"/admin/dashboard"}>
              <img
                src={logo}
                alt="logo"
                className="w-28 inline-block rounded-md mr-5"
              />
            </Link>
          </div>

          <div className="flex h-full items-center">
            <div className="h-full md:px-5 px-2 flex items-center border-l-2">
              <Link to={"http://localhost:3001"} target="_blank">
                <i
                  className="fa-solid fa-store md:scale-150 scale-125 text-gray-400"
                  title="Shop"
                ></i>
              </Link>
            </div>
            <div className="h-full md:px-5 px-2 flex items-center border-l-2">
              <i
                className="fa-solid fa-bell fa-fade md:scale-150 scale-125 text-gray-400"
                title="Notification"
              ></i>
            </div>
            <div
              className="h-full md:px-5 px-2 flex items-center border-l-2 hover:cursor-pointer"
              onClick={() => {
                showSubMenu();
              }}
            >
              <i className="fa-solid fa-user md:scale-150 scale-125 text-gray-400"></i>
              <p className="ml-3">{adminProfileDataState.name}</p>
              <div
                className={`absolute w-[100%] top-16 -ml-3 bg-white shadow-lg rounded-sm cursor-default`}
              >
                <div className={`py-2 z-20 bg-white ${showSubMenuState}`}>
                  <div className="px-3">
                    <p className="text-xl text-gray-500 font-semibold">
                      Account
                    </p>
                    <hr className=" my-2" />
                    <p className="my-1 hover:text-blue-500 hover:underline hover:cursor-pointer">
                      <Link to={"/admin/my-profile"}>
                        My Account
                      </Link>
                    </p>
                    <button onClick={()=>{logoutAdmin()}} className="my-1 hover:text-blue-500 hover:underline hover:cursor-pointer">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNavbar;
