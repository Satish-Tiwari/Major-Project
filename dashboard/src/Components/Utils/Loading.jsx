import React from 'react'
import LoadingImage from "../Photos/loading.png";

function Loading() {
  return (
    <>
    <img src={LoadingImage} className={`w-[22px] animate-spin`} alt="loading" />
    </>
  )
}

export default Loading;

