import React,{useState,useEffect, useContext} from "react";
import {Link,useNavigate} from "react-router-dom";
import createAdminContext from "../../../Context/Admin/createAdminContext";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

import { useCookies } from "react-cookie";

function Dashboard() {

  const navigate = useNavigate();
  const {showDashboardData,showDashboardState} = useContext(createAdminContext);

  const [cookie] = useCookies(["adminToken"]);

  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      showDashboardData();
    }
    // eslint-disable-next-line
  },[])

  //  //!  Navigate by Order Status...
  const onClickLink = (orderStatus)=>{
    navigate("/admin/orders",{state:orderStatus})
  }


  //  //! Show Chart....
  Chart.register(CategoryScale);
  // eslint-disable-next-line
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "Sales",
        borderColor: "yellowgreen",
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="">
            <h1 className="text-2xl text-gray-600 font-bold">Dashboard</h1>
          </div>
        </div>
        {/*  */}
        <div className="">
          <div className="p-5">
            <div className="grid md:grid-cols-4 gap-5">
              <Link to={"/admin/view-admin"} className="bg-white shadow-md p-5 rounded-md">
                <h1 className="text-gray-600">TOTAL ADMINS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalAdmins}</h1>
                  <p className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></p>
                </div>
              </Link>
              <Link to={"/admin/customers"} className="bg-white shadow-md p-5 rounded-md">
                <h1 className="text-gray-600">TOTAL CUSTOMERS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalUsers}</h1>
                  <p className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></p>
                </div>
              </Link>
              <Link to={"/admin/products"} className="bg-white shadow-md p-5 rounded-md">
                <h1 className="text-gray-600">TOTAL PRODUCTS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalProducts}</h1>
                  <p className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></p>
                </div>
              </Link>
              <Link to={"/admin/orders"} className="bg-white shadow-md p-5 rounded-md">
                <h1 className="text-gray-600">TOTAL ORDERS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalOrders}</h1>
                  <p className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></p>
                </div>
              </Link>
              <div onClick={()=>{onClickLink("processing")}} className="bg-white shadow-md p-5 rounded-md cursor-pointer">
                <h1 className="text-gray-600">ORDERS IN PROCESSING</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalOrderProcessing}</h1>
                  <button className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></button>
                </div>
              </div>
              <div onClick={()=>{onClickLink("shipped")}} className="bg-white shadow-md p-5 rounded-md cursor-pointer">
                <h1 className="text-gray-600">TOTAL SHIPPED ORDERS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalOrderShipped}</h1>
                  <button className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></button>
                </div>
              </div>
              <div onClick={()=>{onClickLink("delevered")}} className="bg-white shadow-md p-5 rounded-md cursor-pointer">
                <h1 className="text-gray-600">TOTAL DELEVERED ORDERS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalOrderDelevered}</h1>
                  <button className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></button>
                </div>
              </div>
              <div onClick={()=>{onClickLink("returned")}} className="bg-white shadow-md p-5 rounded-md cursor-pointer">
                <h1 className="text-gray-600">TOTAL RETURNED ORDERS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalOrderReturned}</h1>
                  <button className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></button>
                </div>
              </div>
              <div onClick={()=>{onClickLink("cancled")}} className="bg-white shadow-md p-5 rounded-md cursor-pointer">
                <h1 className="text-gray-600">TOTAL CANCLED ORDERS</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-xl text-orange-500">{showDashboardState.totalOrderCancled}</h1>
                  <button onClick={()=>{onClickLink("cancled")}} className="text-xl text-green-800 hover:text-green-600"><i className="fa-solid fa-circle-right"></i></button>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="p-5 overflow-hidden bg-white">
            <div className="md:h-[60vh] flex justify-center items-center">
              <Line data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
