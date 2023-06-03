import { React,useContext,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import createAdminContext from "../../../../Context/Admin/createAdminContext";

import { useCookies } from "react-cookie";

function Orders() {
  const [cookie] = useCookies(["adminToken"]);

  const navigate = useNavigate();  
  const location = useLocation();  
  const {state} = location;

  const {allOrders,totalOrderState,allOrdersState} = useContext(createAdminContext);  

  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      if(state){
        allOrders(`?orderStatus=${state}`);
      }else{
        allOrders("");
      }
    }
    // eslint-disable-next-line
  },[]);
  
  const showSingleOrder = (id)=>{
    navigate(`/admin/order/${id}`,{state:id});
  }


  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold capitalize">{state!==null?state:""} Orders</h1>
            <h1 className="text-2xl text-gray-600 font-normal capitalize">Total {state!==null?state:""} Orders : {totalOrderState}</h1>
          </div>
        </div>
        {/*  */}
        <div className="">
          <div className="p-5">
            <div className="overflow-x-scroll">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr className="bg-gray-900 text-white">
                            <th scope="col" className="px-6 py-3">
                                S No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Shipped To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrdersState !== undefined ? allOrdersState.map((e,index)=>{
                        return <tr className="bg-white border-b" key={e._id}>
                            <th scope="row" className="px-6 py-4 font-medium">
                                {index+1}
                            </th>
                            <td className="px-6 py-4">
                                {e.user===null?'Undefined':e.user.name}
                            </td>
                            <td className="px-6 py-4">
                                {e.shippingInfo.name}
                            </td>
                            <td className={`px-6 py-4 uppercase font-semibold ${e.orderStatus==="processing"?"text-yellow-600":"text-black"} ${e.orderStatus==="cancled"?"text-red-600":"text-black"} ${e.orderStatus==="shipped"?"text-green-500":"text-black"} ${e.orderStatus==="delevered"?"text-green-900":"text-black"}`}>
                                {e.orderStatus}
                            </td>
                            <td className="px-6 py-4">
                              ₹ {e.price.totalPrice}
                            </td>
                            <td className="px-6 py-4 uppercase">
                                {new Date(e.orderCreatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                            </td>
                            <td className="px-6 py-4">
                                <i onClick={()=>{showSingleOrder(e._id)}} className="fa-solid fa-eye mr-2 cursor-pointer opacity-70 text-blue-600 hover:text-blue-900"></i>
                            </td>
                        </tr>
                        }):<tr><td>No Order Found.</td></tr>}
                    </tbody>
                </table>
                {allOrdersState.length < 1 ? 
                <div className="text-center my-5 text-red-500 font-semibold">No Order Found</div>
                :""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
