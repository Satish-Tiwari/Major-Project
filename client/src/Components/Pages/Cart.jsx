import {React,useContext,useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import createUserContext from '../../Context/createUserContext'
import {Buffer} from "buffer";

function Cart() {
  const {cartItemsState} = useContext(createUserContext);

  const navigate = useNavigate();

  const [totalPriceState,setTotalPriceState] = useState(0);
  useEffect(()=>{
    let price = 0;
    cartItemsState.forEach((e)=>{
        price += parseFloat(e.price);
    })
    setTotalPriceState(price);
    // eslint-disable-next-line
  },[]);

  //    //! Checkout Products...
  const checkoutProducts = ()=>{
    // console.log(cartItemsState);
    navigate("/checkout",{state:{cartItemsState,totalPriceState}});
  }


  return (
    <>
        <div className=''>
            <div className={`flex justify-center items-center overflow-x-scroll md:overflow-x-hidden`}>
                <table className="border rounded-lg">
                    <thead className='bg-blue-700 text-white rounded-md'>
                        <tr>
                            <th className='px-6 py-3'>Product</th>
                            <th className='px-6 py-3'>Name</th>
                            <th className='px-6 py-3'>Price</th>
                            <th className='px-6 py-3'>Quantity</th>
                            <th className='px-6 py-3'>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cartItemsState.length < 1?<tr className='text-center text-red-700'><td></td></tr>:
                        cartItemsState.map((e,i)=>{
                        return <tr key={i} className='border text-center'>
                                <td className='px-6 py-3'>
                                    <img
                                        src={`data:${e.images[0].mimetype};base64,${Buffer.from(e.images[0].buffer.data).toString("base64")}`}
                                        alt={`${e.images[0].originalname}`}
                                        className="w-[50px] md:w-[50px] h-[50px] rounded-lg"
                                    />
                                </td>
                                <td className='px-6 py-3'>{String(e.name).split(' ')[0]} {String(e.name).split(' ')[1]}</td>
                                <td className='px-6 py-3'>₹ {e.price}</td>
                                <td className='px-6 py-3'>
                                    <input type="number" name="quantity" className='text-center w-[50px] outline-none border rounded-sm' defaultValue={1}/>
                                </td>
                                <td className='px-6 py-3'>{e.price}</td>
                            </tr>
                            })
                        }
                        <tr className='text-center text-green-700 font-extrabold'>
                            <td className='px-6 py-5'>Total Amount</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='px-6 py-5'>₹  {totalPriceState}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={`w-[100%] mt-10 text-white ${cartItemsState.length < 1?"hidden":"block"}`}>
                <div className='w-[70%] flex justify-end'>
                    <button onClick={()=>{checkoutProducts()}} className='px-5 py-3 bg-green-500 hover:bg-green-600 rounded-sm'>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart