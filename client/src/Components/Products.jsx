import {React,useContext,useEffect} from 'react'
import ProductView from './Pages/ProductView'
import createUserContext from '../Context/createUserContext'

import Loading from "./Utils/Loading";

function Products() {

  const {loadingState,getAllProducts,productsState} = useContext(createUserContext);

  useEffect(()=>{
    getAllProducts("");
    // eslint-disable-next-line
  },[]);

  return (
    <>
      <div>
        <div className='flex justify-center items-center flex-wrap'>
          {loadingState?<Loading/>:
            productsState!==undefined?
              productsState.map((e)=>{
                return <div className='flex' key={e._id}><ProductView state={{e}}/></div>
              }):""
          }
        </div>
      </div>
    </>
  )
}

export default Products