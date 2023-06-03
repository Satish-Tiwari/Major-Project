import {React,useEffect} from "react";
import {Link} from "react-router-dom";
import "../CSS/SideNavbar.css";
import dashboard_icon from "../../Photos/dashboard-icon.png";
import graph_icon from "../../Photos/graph-icon.png";
import products_icon from "../../Photos/products-icon.png";
import promotion_icon from "../../Photos/promotion-icon.avif";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AdminSideNavbar(props) {

  const {showSidebarState} = props.state;

  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);

  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/");
    }
    // eslint-disable-next-line
  },[])

  return (
    <>
      <div className={`shadow-sm border fixed md:w-[8.3%] w-[25%] h-[100vh] ${showSidebarState==="showSideBar"?"block":"hidden md:block"}`}>
        <div className="flex flex-col items-center">
          <div className="my-5 p-5 w-full flex justify-center" title="Dashboard">
            <Link to={"/admin/dashboard"}>
              <img src={dashboard_icon} className="w-8" alt="dashboard" />
            </Link>
          </div>
          <div className="my-5 p-5 w-full flex justify-center" id="sideBarMenu">
            <Link to={"/admin/orders"}>
              <img src={graph_icon} className="w-7" alt="graph"  title="Sales Graph"/>
            </Link>
            <div className="shadow-sm bg-white border-r-2 border-emerald-500 rounded-t-sm p-3 absolute left-[97px] md:left-[120px] w-[10rem]" id="showSideBarMenu">
              <ul className="">
                <li className="my-1 hover:text-blue-500 hover:cursor-pointer">
                  <Link to={"/admin/orders"}> Orders </Link>
                </li>
                <li className="my-1 hover:text-blue-500 hover:cursor-pointer">
                  <Link to={"/admin/order/invoice"}> Invoice </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-5 p-5 w-full flex justify-center" id="sideBarMenu">
            <Link to={"/admin/products"}>
              <img src={products_icon} className="w-7" alt="graph"  title="Products"/>
            </Link>
            <div className="shadow-sm bg-white border-r-2 border-emerald-500 rounded-t-sm p-3 absolute left-[97px] md:left-[120px] w-[10rem]" id="showSideBarMenu">
              <ul className="">
                <li className="my-1 hover:text-blue-500 hover:cursor-pointer">
                  <Link to={"/admin/products"}> Products </Link>
                </li>
                <li className="my-1 hover:text-blue-500 hover:cursor-pointer">
                  <Link to={"/admin/products/add-product"}> Add Product </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-5 p-5 w-full flex justify-center" id="sideBarMenu">
            <Link to={"/admin/customers"}>
              <i className="fa-solid fa-user scale-150 text-gray-700" title="Customers"></i>
            </Link>
            <div className="shadow-sm bg-white border-r-2 border-emerald-500 rounded-t-sm p-3 absolute left-[97px] md:left-[120px] w-[10rem]" id="showSideBarMenu">
              <ul className="">
                <li className="my-1 hover:text-blue-500 hover:cursor-pointer">
                  <Link to={"/admin/customers"}> Customers </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-5 p-5 w-full flex justify-center" title="Settings" id="sideBarMenu">
            <Link to={"/admin/view-admin"}>
              <i className="fa-solid fa-gear scale-150"></i>
            </Link>
            <div className="shadow-sm bg-white border-r-2 border-emerald-500 rounded-t-sm p-3 absolute left-[97px] md:left-[120px] w-[10rem]" id="showSideBarMenu">
              <ul className="">
                <li className="my-1 hover:text-blue-500 hover:cursor-pointer">
                  <Link to={"/admin/create-admin"}> Add Admin </Link>
                </li>
                <li className="my-1 hover:text-blue-500 hover:cursor-pointer">
                  <Link to={"/admin/view-admin"}> View Admin </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-5 p-5 w-full flex justify-center" title="">
            <img src={promotion_icon} className="w-8" alt="promotion" />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSideNavbar;
