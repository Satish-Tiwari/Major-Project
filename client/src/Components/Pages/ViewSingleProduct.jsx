import {React,useEffect,useContext,useState} from 'react'
import {useLocation} from "react-router-dom";
import createUserContext from '../../Context/createUserContext';
import { Buffer } from 'buffer';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function ViewSingleProduct() {

  const location = useLocation();  
  const {cartItemsFunction,fetchSingleProduct,singleProductState,uploadReviewFunction} = useContext(createUserContext);
  
  useEffect(()=>{
    window.scroll(0,0);
    fetchSingleProduct(location.state)
    // eslint-disable-next-line
  },[]);


  //  //! Add to Cart Function...
  const addToCartBTN = (e)=>{
    cartItemsFunction(singleProductState)
  }


  //  //! Write a review...
  const [reviewDataState,setReviewDataState] = useState({productId:location.state,rating:"",comment:""});
  const onChnageReview = (e)=>{
    setReviewDataState({...reviewDataState,[e.target.name]:e.target.value});
  }
  const submitReviewForm = async(e)=>{
    e.preventDefault();
    await uploadReviewFunction(reviewDataState);
    e.target.reset();
  }

  return (
    <>
    <div>
      <div>
        <div className="p-5 flex justify-evenly flex-wrap">
          <div className="w-[100%] md:w-[50%] h-[50%] flex flex-col justify-center items-center my-5 p-3">
              <Carousel showThumbs={false} centerMode={true} showIndicators={false}>
                  {singleProductState.images !== undefined ? singleProductState.images.map((e)=>{
                      return <div key={e._id} className="w-fit">
                          <img
                              key={e._id}
                              src={`data:${e.mimetype};base64,${Buffer.from(e.buffer.data).toString("base64")}`}
                              alt={`${e.originalname}`}
                              className="h-[300px] rounded-md"
                          />
                      </div>
                  }):<div></div>}
              </Carousel>
              <div className='mt-10'>
                  <button className='px-3 py-2 bg-green-700 rounded-md text-white hover:bg-green-900' onClick={()=>{addToCartBTN()}}>Add to Cart <i className="fa-solid fa-cart-shopping"></i></button>
              </div>
          </div>
          <div className="w-[100%] md:w-[50%] my-5 p-3">
              <div className="px-5 pb-5">
                  <div className="flex items-center justify-between flex-wrap">
                      <h5 className="text-2xl font-semibold tracking-tight text-gray-700">{singleProductState.name}</h5>
                      <p className="text-xl font-bold text-gray-900">{singleProductState.unit}</p>
                  </div>
                  <div className="flex items-center justify-between flex-wrap my-5">
                      <p className="text-2xl font-bold text-gray-900 my-2"><span className="opacity-80"><i className="fa-solid fa-indian-rupee-sign mr-3"></i></span>{singleProductState.price}</p>
                      <p className="text-2xl font-bold text-gray-900 my-2"><span className="opacity-80">Discount % </span>{singleProductState.discountedPrice}</p>
                  </div>
                  <div className="flex items-center justify-between flex-wrap my-5">
                      <p className="flex flex-wrap">
                          <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{singleProductState.ratings}</span>
                      </p>
                  </div>
                  <div className="flex items-center justify-between flex-wrap my-5">
                      <p className="text-lg text-gray-900 font-medium">Category : <span className="font-normal">{singleProductState.category}</span></p>
                      <p className="text-lg text-gray-900 font-medium">Country Of Origin : <span className="font-normal">{singleProductState.countryOfOrigin}</span></p>
                  </div>
                  <div className="flex flex-col flex-wrap my-5">
                      <p className="text-lg text-gray-900 font-medium my-2">Expiray Date : <span className="font-normal">{singleProductState.expirayDate}</span></p>
                      <p className="text-lg text-gray-900 font-medium my-2">Short Description : <p className="font-normal h-[200px] overflow-y-scroll">{singleProductState.short_description}</p></p>
                  </div>
              </div>
          </div>
        </div>

        {/*  */}
        <div className="p-5 mt-0 border-t-2 border-blue-600">
          <div className="flex justify-between flex-wrap mt-5">
            <p className="font-semibold text-xl">Reviews</p>
          </div>
          <div className="flex justify-between">
            <div className=''>
              {singleProductState.reviews !== undefined ? singleProductState.reviews.map((e)=>{
                  return <div key={e._id} className="mt-10 shadow-md px-5 rounded-lg">
                  <div className="flex justify-between">
                      <p>{e.name}</p>
                      <p>Rating : {e.rating}</p>
                  </div>
                  <div className="mt-5 pb-5">
                      <p className="font-semibold">Comment : </p>
                      <p className="my-1">{e.comment}</p>
                  </div>
                  {/* <div className="flex justify-end pb-5">
                      <button onClick={()=>{deleteReview(e._id)}}><i className="fa-solid fa-trash mx-2 cursor-pointer opacity-70 text-red-600 hover:text-red-900"></i></button>
                  </div> */}
              </div>
              }):""}
            </div>
            <div className=''>
              <div className="flex justify-between flex-wrap mt-5">
                <p  className="font-semibold text-xl">Write your Review</p>
              </div>
              <div className=''>
                  <form onSubmit={submitReviewForm}>
                    <div className='flex flex-col'>
                      <label htmlFor="rating">Rating</label>
                      <input type="number" name="rating" onChange={onChnageReview} className='px-3 py-2 ring-1 outline-none' placeholder='1....5'/>
                    </div>
                    <div className='flex flex-col'>
                      <textarea name="comment" onChange={onChnageReview} placeholder='Write your comment' className='outline-none ring-1 p-3' cols="30" rows="5"></textarea>
                    </div>
                    <div className='my-2 flex flex-col'>
                      <button type='submit' className='px-3 py-2 bg-green-700 hover:bg-green-800 text-white flex justify-center'>Comment</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
      </div>  
      </div>
    </div>
    </>
  )
}

export default ViewSingleProduct