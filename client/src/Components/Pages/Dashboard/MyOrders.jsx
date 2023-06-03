import { useEffect,useContext } from "react"
import createUserContext from "../../../Context/createUserContext"
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

function MyOrders() {

  const {getAllMyOrders,myOrderState} = useContext(createUserContext);
  const navigate = useNavigate();
  const [cookie] = useCookies(["userToken"]);

  useEffect(()=>{
    if(!cookie.userToken){
      navigate("/");
    }else{
      window.scroll(0,0);
      getAllMyOrders();
    }
    // eslint-disable-next-line
  },[]);


  const viewSingleOrderDetails = (id,orderNo)=>{
    navigate(`/my-order/${id}`,{state:{id,orderNo:orderNo+1}});
  }


  return (
    <>
      <div className='mx-5'>
        <div className="">
          <div className="flex justify-center mt-10">
            <h1 className="font-semibold text-3xl uppercase text-red-900">🛍️ My Orders 🛍️</h1>
          </div>
          <div>
            <div className="relative overflow-x-auto sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs bg-blue-500 uppercase">
                        <tr className="">
                            <th scope="col" className="px-6 py-3">
                              Order No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Shipped To
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Payment Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Total Items
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Order Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Order Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {myOrderState.length<1?<tr className="px-6 py-4 text-center text-yellow-400"><td>No Order Found</td></tr>:<tr><td></td></tr>}
                      {myOrderState!==undefined?myOrderState.map((e,index)=>{
                        return <tr key={e._id} className="border-b bg-transparent text-black border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              {index+1}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              {e.shippingInfo.name}
                            </th>
                            <td className="px-6 py-4">
                              <span className="ml-5 capitalize">{e.paymentInfo.paymentStatus}</span>
                            </td>
                            <td className="px-6 py-4">
                              {e.orderItems.length}
                            </td>
                            <td className="px-6 py-4 flex">
                              <span className="mr-1">₹</span> {e.price.totalPrice}
                            </td>
                            <td className="px-6 py-4 uppercase">
                              {String(new Date(e.orderCreatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}
                            </td>
                            <td className="px-6 py-4 uppercase">
                              {String(e.orderStatus)}
                            </td>
                            <td className="px-6 py-4 capitalize">
                              <i onClick={()=>{viewSingleOrderDetails(e._id,index)}} className="fa-solid fa-eye hover:text-green-500 cursor-pointer text-cyan-600"></i>
                            </td>
                        </tr>
                       }):<tr><td></td></tr>} 
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyOrders