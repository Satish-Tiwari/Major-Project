import React, { useContext,useEffect } from "react";
import createAdminContext from "../../../../Context/Admin/createAdminContext";
import { useLocation,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function ViewCustomerOrder() {

  const location = useLocation();
  const {state} = location;

  const { getUserOrders,userTotalOrdersState,userOrdersState } = useContext(createAdminContext);
  
  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);
  useEffect(() => {
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      getUserOrders(state._id);
    }
  // eslint-disable-next-line
  }, []);
  

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Order History</h1>
            <h1 className="text-2xl text-gray-600 font-normal">{state.name}</h1>
            <h1 className="text-2xl text-gray-600 font-normal">Total Order : {userTotalOrdersState}</h1>
          </div>
        </div>
        {/*  */}
        <div className="">
          {userOrdersState.length < 1 ? 
          <div className="text-center mt-10 text-red-500 font-semibold">No Order Found</div>
          :""}
          {userOrdersState !== undefined ? userOrdersState.map((e,index)=>{
          return <div className="p-5" key={e._id}>
            <details open={index===0?true:false}>
              <summary className="p-5 cursor-pointer bg-neutral-700 text-white rounded-sm font-bold">&nbsp;&nbsp; Order &nbsp; {index+1}</summary>
              <div className="my-2 p-5">

                <div className="my-2 shadow-lg rounded-md p-5">
                  <details open>
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Basic Info</summary>
                    <div className="my-3 px-5">
                      <p className="my-1">Item Price: <span className="font-medium ml-3">{e.price.itemPrice}</span></p>
                      <p className="my-1">Tax Price: <span className="font-medium ml-3">{e.price.taxPrice}</span></p>
                      <p className="my-1">Shipping Price: <span className="font-medium ml-3">{e.price.shippingPrice}</span></p>
                      <p className="my-1">Total Price: <span className="font-medium ml-3">{e.price.totalPrice}</span></p>
                      <p className="my-1">Order Status: <span className="font-medium ml-3 capitalize bg-yellow-300 text-red-900 px-2 py-1">{e.orderStatus}</span></p>
                      <p className="my-1">Paid At: <span className="font-medium ml-3 uppercase">{new Date(e.paidAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span></p>
                    </div>
                  </details>
                </div>
                
                <div className="my-2 shadow-lg rounded-md p-5">
                  <details>
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Order Items <span className="font-bold ml-5 float-right">Total Items : {e.orderItems.length}</span></summary>
                    {e.orderItems.map((items,index)=>{
                    return <div className="my-5 px-5" key={items._id}>
                      <hr />
                      <span className="font-semibold bg-yellow-400 px-3 py-2">{index+1}</span>
                      <p className="my-1">Product Id: <span className="font-medium ml-3">{items.productId}</span></p>
                      <p className="my-1">Name: <span className="font-medium ml-3">{items.name}</span></p>
                      <p className="my-1">Quantity: <span className="font-medium ml-3">{items.quantity}</span></p>
                      <p className="my-1">Price: <span className="font-medium ml-3">{items.price}</span></p>
                      <hr />
                    </div>
                    })}
                  </details>
                </div>

                <div className="my-2 shadow-lg rounded-md p-5">
                  <details>
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Shipping Info</summary>
                    <div className="my-3 px-5">
                      <p className="my-1">Name: <span className="font-medium ml-3">{e.shippingInfo.name}</span></p>
                      <p className="my-1">Address: <span className="font-medium ml-3">{e.shippingInfo.address}</span></p>
                      <p className="my-1">City: <span className="font-medium ml-3">{e.shippingInfo.city}</span></p>
                      <p className="my-1">State: <span className="font-medium ml-3">{e.shippingInfo.state}</span></p>
                      <p className="my-1">Country: <span className="font-medium ml-3">{e.shippingInfo.country}</span></p>
                      <p className="my-1">Pin Code: <span className="font-medium ml-3">{e.shippingInfo.pinCode}</span></p>
                      <p className="my-1">Phone: <span className="font-medium ml-3">{e.shippingInfo.phoneNumber}</span></p>
                    </div>
                  </details>
                </div>

                <div className="my-2 shadow-lg rounded-md p-5">
                  <details>
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Payment Info</summary>
                    <div className="my-3 px-5">
                      <p className="my-1">Payment Id: <span className="font-medium ml-3">{e.paymentInfo.paymentId}</span></p>
                      <p className="my-1">Payment Status: <span className="font-medium ml-3">{e.paymentInfo.paymentStatus}</span></p>
                    </div>
                  </details>
                </div>
                
              </div>
            </details>
          </div>
          }):""}
        </div>
      </div>
    </>
  );
}

export default ViewCustomerOrder;
