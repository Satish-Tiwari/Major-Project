import React from 'react'
import LoadingImage from "../Images/loading.png";

function Loading() {
  return (
    <>
    <div className='flex justify-center items-center z-0 h-[80vh]'>
      <img src={LoadingImage} className={`w-[200px] animate-spin`} alt="loading" />
    </div>
    </>
  )
}

export default Loading;

