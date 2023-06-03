import {React,useContext,useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate,useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';

import createUserContext from '../../../Context/createUserContext'

function ViewSingleOrder() {

  const {getSignleOrderDetails,singleOrderDetailsState}  = useContext(createUserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [cookie] = useCookies(["userToken"]);

  useEffect(()=>{
    if(!cookie.userToken){
      navigate("/")
    }else{
      getSignleOrderDetails(location.state.id)
    }
    // eslint-disable-next-line
  },[]);

  return (
    <>
    <div className="">
        <div className="fixed top-16 shadow-md w-full bg-white py-5 px-16 z-10">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Order No</h1>
            <h1 className="text-2xl text-gray-600 font-bold">{location.state!==null?location.state.orderNo:0}</h1>
          </div>
        </div>
        {/*  */}
        <div className="pt-10">
          <div className="p-5">
            {singleOrderDetailsState.price !== undefined?
            <div className="my-2 p-5">

                <div className='flex flex-wrap'>
                  <div className="md:w-[50%] w-full my-2 shadow-lg rounded-md p-5">
                      <details open >
                      <summary className="p-5 cursor-pointer bg-blue-500 text-white rounded-sm font-bold">Basic Info</summary>
                      <div className="my-3 px-5">
                          <p className="my-1">Item Price: <span className="font-medium ml-3">{singleOrderDetailsState.price.itemPrice}</span></p>
                          <p className="my-1">Tax Price: <span className="font-medium ml-3">{singleOrderDetailsState.price.taxPrice}</span></p>
                          <p className="my-1">Shipping Price: <span className="font-medium ml-3">{singleOrderDetailsState.price.shippingPrice}</span></p>
                          <p className="my-1">Total Price: <span className="font-medium ml-3">{singleOrderDetailsState.price.totalPrice}</span></p>
                          <p className="my-1">Paid At: <span className="font-medium ml-3 uppercase">{new Date(singleOrderDetailsState.paidAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span></p>
                      </div>
                      </details>
                  </div>

                  <div className="md:w-[50%] w-full my-2 shadow-lg rounded-md p-5">
                      <details open>
                      <summary className="p-5 cursor-pointer bg-blue-500 text-white rounded-sm font-bold">Shipping Info</summary>
                      <div className="my-3 px-5">
                          <p className="my-1">Name: <span className="font-medium ml-3">{singleOrderDetailsState.shippingInfo.name}</span></p>
                          <p className="my-1">Address: <span className="font-medium ml-3">{singleOrderDetailsState.shippingInfo.address}</span></p>
                          <p className="my-1">City: <span className="font-medium ml-3">{singleOrderDetailsState.shippingInfo.city}</span></p>
                          <p className="my-1">State: <span className="font-medium ml-3">{singleOrderDetailsState.shippingInfo.state}</span></p>
                          <p className="my-1">Country: <span className="font-medium ml-3">{singleOrderDetailsState.shippingInfo.country}</span></p>
                          <p className="my-1">Pin Code: <span className="font-medium ml-3">{singleOrderDetailsState.shippingInfo.pinCode}</span></p>
                          <p className="my-1">Phone: <span className="font-medium ml-3">{singleOrderDetailsState.shippingInfo.phoneNumber}</span></p>
                      </div>
                      </details>
                  </div>
                </div>
                <div className="my-2 shadow-lg rounded-md p-5">
                    <details open>
                    <summary className="p-5 cursor-pointer bg-blue-500 text-white rounded-sm font-bold">Order Items <span className="font-bold ml-5 float-right">Total Items : {singleOrderDetailsState.orderItems.length}</span></summary>
                      {singleOrderDetailsState.orderItems.map((e,index)=>{
                        return <div className="my-5 px-5" key={e._id}>
                          <hr />
                          <span className="font-semibold bg-yellow-400 px-3 py-2">{index+1}</span>
                          <div className='flex'>
                            {e.productId.images.map((e)=>{
                              return <div key={e._id} className="w-fit">
                                  <img
                                      key={e._id}
                                      src={`data:${e.mimetype};base64,${Buffer.from(e.buffer.data).toString("base64")}`}
                                      alt={`${e.originalname}`}
                                      className="h-[150px] rounded-md"
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
                    <summary className="p-5 cursor-pointer bg-blue-500 text-white rounded-sm font-bold">Payment Info</summary>
                    <div className="my-3 px-5">
                        <p className="my-1">Payment Id: <span className="font-medium ml-3">{singleOrderDetailsState.paymentInfo.paymentId}</span></p>
                        <p className="my-1">Payment Status: <span className="font-medium ml-3">{singleOrderDetailsState.paymentInfo.paymentStatus}</span></p>
                    </div>
                    </details>
                </div>
            </div>
            :""}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewSingleOrder;


