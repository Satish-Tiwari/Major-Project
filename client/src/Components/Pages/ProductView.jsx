import {React,useContext} from 'react'
import {useNavigate} from "react-router-dom";

import {Buffer} from "buffer";

import createUserContext from '../../Context/createUserContext';

function ProductView(props) {
  const {e} = props.state;  

  const navigate = useNavigate();

  const {cartItemsFunction} = useContext(createUserContext);

  //  //! Add to Cart Function...
  const addToCartBTN = (e)=>{
    cartItemsFunction(e)
  }

  //  //! Navigate To Single Page View...
  const navigateToSinglePageView = (id)=>{
    navigate(`/product/${id}`,{state:id});
  }

  return (
    <>
    <div  className='min-w-[300px] ring-1 ring-blue-200 rounded-md px-3 py-2 m-2 hover:ring-blue-400 text-gray-600'>
        <div className='flex justify-center hover:opacity-70'>
          <img
              onClick={()=>{navigateToSinglePageView(e._id)}}
              src={`data:${e.images[0].mimetype};base64,${Buffer.from(e.images[0].buffer.data).toString("base64")}`}
              alt={`${e.images[0].originalname}`}
              className="w-[200px] md:w-[200px] h-[200px] rounded-lg cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
            <h1 className='text-sm my-2 font-light'>{e.category}</h1>
            <h1 className='text-base font-medium min-w-fit'>{String(e.name).split(' ')[0]} {String(e.name).split(' ')[1]}</h1>
            <div className="flex justify-start items-center text-sm my-2 text-yellow-500">
                <i className="far fa-star"></i>
                <span className='ml-1 text-sm text-gray-500'>{e.ratings}</span>
            </div>
        </div>
        <div className='flex justify-between text-[#088178]'>
            <h1 className='text-lg font-semibold'>₹ {e.price}</h1>
            <button onClick={()=>{addToCartBTN(e)}} className='hover:text-[#088100] text-2xl md:text-3xl'><i className="fas fa-cart-plus"></i></button>
        </div>
    </div>
    </>
  )
}

export default ProductView;

