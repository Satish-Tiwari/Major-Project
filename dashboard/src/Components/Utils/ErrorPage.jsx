import React from 'react'
import Error_404 from "../Photos/404_Error.jpg";

function ErrorPage() {
  return (
    <div className='-mt-28'>
      <img src={Error_404} alt="error" width={"100%"} height={"100vh"}/>
    </div>
  )
}

export default ErrorPage;