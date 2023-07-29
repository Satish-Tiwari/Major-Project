import {React,useEffect,useContext,useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import createAdminContext from '../../../../Context/Admin/createAdminContext'

import { useCookies } from 'react-cookie';

import Loading from '../../../Utils/Loading';
import {Buffer} from "buffer"

function ViewSingleOrder() {

  // 2001270100015
  // 2002160100111


  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);  
  const location = useLocation();  
  const {state} = location;

  const {loadingState, getSingleOrder, singleOrderState, updateOrderStatus} = useContext(createAdminContext);

  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      getSingleOrder(state);
    }
    // eslint-disable-next-line
  },[]);  


  //    //! Update Order Status...
  const [orderStatusState,setOrderStatusState] = useState({orderStatus:"processing"})
  const changeOrderStatus = (e)=>{
    setOrderStatusState({...orderStatusState,[e.target.name]:e.target.value});
  }
  const updateOrder = (id)=>{
    updateOrderStatus(id,orderStatusState);
  }

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Order History</h1>
            {singleOrderState.price !== undefined?
            <div>
                <h1>Order By : <span className='font-medium'>{singleOrderState.user ===null?'Undefined':singleOrderState.user.name}</span></h1>
                <h1>Email : <span className='font-medium'>{singleOrderState.user ===null?'Undefined':singleOrderState.user.email}</span></h1>
            </div>
            :""}
          </div>
        </div>
        {/*  */}
        <div className="">
          <div className="p-5">
            {singleOrderState.price !== undefined?
            <div className="my-2 p-5">
                <div className="my-2 shadow-lg rounded-md p-5">
                    <details open >
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Basic Info</summary>
                    <div className="my-3 px-5">
                        <p className="my-1">Item Price: <span className="font-medium ml-3">{singleOrderState.price.itemPrice}</span></p>
                        <p className="my-1">Tax Price: <span className="font-medium ml-3">{singleOrderState.price.taxPrice}</span></p>
                        <p className="my-1">Shipping Price: <span className="font-medium ml-3">{singleOrderState.price.shippingPrice}</span></p>
                        <p className="my-1">Total Price: <span className="font-medium ml-3">{singleOrderState.price.totalPrice}</span></p>
                        <div className="my-1">
                            <form onSubmit={(e)=>{e.preventDefault();updateOrder(singleOrderState._id)}}>
                                <label htmlFor='orderStatus' className="mr-3">Order Status:</label>
                                <select onChange={changeOrderStatus} name="orderStatus" id='orderStatus' className="bg-blue-400 px-3 py-2 text-black rounded-sm outline-none capitalize">
                                    <option value={singleOrderState.orderStatus} className='capitalize'>{singleOrderState.orderStatus}</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="outForDelivery">Out For Delivery</option>
                                    <option value="cancled">Cancled</option>
                                    <option value="returned">Returned</option>
                                    <option value="delevered">Delevered</option>
                                </select>
                                <button type='submit' className='mx-5 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-sm inline-flex'>
                                  {loadingState?<Loading/>:"Update"}
                                </button>
                            </form>
                        </div>
                        <p className="my-1">Paid At: <span className="font-medium ml-3 uppercase">{new Date(singleOrderState.paidAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span></p>
                    </div>
                    </details>
                </div>
              
                <div className="my-2 shadow-lg rounded-md p-5">
                    <details open>
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Order Items <span className="font-bold ml-5 float-right">Total Items : {singleOrderState.orderItems.length}</span></summary>
                      {singleOrderState.orderItems.map((e,index)=>{
                        return <div className="my-5 px-5" key={e._id}>
                          <hr />
                          <span className="font-semibold bg-yellow-400 px-3 py-2 rounded-br-lg">{index+1}</span>
                          <div className='flex'>
                            {e.productId.images.map((e)=>{
                              return <div key={e._id} className="w-fit">
                                  <img
                                      key={e._id}
                                      src={`data:${e.mimetype};base64,${Buffer.from(e.buffer.data).toString("base64")}`}
                                      alt={`${e.originalname}`}
                                      className="h-[150px] rounded-md object-contain mix-blend-color-burn aspect-[3/2]"
                                  />
                              </div>
                            })}
                            <div className='ml-20 flex flex-col justify-center text-gray-600'>
                              <p className="my-1 font-semibold text-gray-800">{e.productId.name}</p>
                              <p className="my-1">Quantity: <span className="font-medium ml-3">{e.quantity}</span></p>
                              <p className="my-1">Price: <span className="font-medium ml-3">{e.price}</span></p>
                            </div>
                          </div>
                        </div>
                      })}
                    </details>
                </div>
                <div className="my-2 shadow-lg rounded-md p-5">
                    <details open>
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Shipping Info</summary>
                    <div className="my-3 px-5">
                        <p className="my-1">Name: <span className="font-medium ml-3">{singleOrderState.shippingInfo.name}</span></p>
                        <p className="my-1">Address: <span className="font-medium ml-3">{singleOrderState.shippingInfo.address}</span></p>
                        <p className="my-1">City: <span className="font-medium ml-3">{singleOrderState.shippingInfo.city}</span></p>
                        <p className="my-1">State: <span className="font-medium ml-3">{singleOrderState.shippingInfo.state}</span></p>
                        <p className="my-1">Country: <span className="font-medium ml-3">{singleOrderState.shippingInfo.country}</span></p>
                        <p className="my-1">Pin Code: <span className="font-medium ml-3">{singleOrderState.shippingInfo.pinCode}</span></p>
                        <p className="my-1">Phone: <span className="font-medium ml-3">{singleOrderState.shippingInfo.phoneNumber}</span></p>
                    </div>
                    </details>
                </div>
                <div className="my-2 shadow-lg rounded-md p-5">
                    <details open>
                    <summary className="p-5 cursor-pointer bg-green-700 text-white rounded-sm font-bold">Payment Info</summary>
                    <div className="my-3 px-5">
                        <p className="my-1">Payment Id: <span className="font-medium ml-3">{singleOrderState.paymentInfo.paymentId}</span></p>
                        <p className="my-1">Payment Status: <span className="font-medium ml-3">{singleOrderState.paymentInfo.paymentStatus}</span></p>
                    </div>
                    </details>
                </div>
            </div>
            :""}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewSingleOrder;

