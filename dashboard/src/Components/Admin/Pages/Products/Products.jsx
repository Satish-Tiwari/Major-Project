import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAdminContext from "../../../../Context/Admin/createAdminContext";
import { useCookies } from "react-cookie";

function Products() {
  const navigate = useNavigate();  
  const [cookie] = useCookies(["adminToken"]);
  const {loadingState ,getAllProductsDetails, productsState,productDetailsState,deleteProduct } = useContext(createAdminContext);

  useEffect(() => {
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      getAllProductsDetails("");
    }
    // eslint-disable-next-line
  }, []);

  //!   View Product...
  const onViewProduct = (id)=>{
    navigate(`/admin/product/view/${id}`,{state:id});
  }
  
  //!   Edit Product...
  const onEditProduct = (id)=>{
    console.log(id);
  }
  //!   Delete Product...
  const onDeleteProduct = async(id,name)=>{
    let delConfirm = window.confirm(`You want to delete the Product : ${name}`);
    if(delConfirm){
      await deleteProduct(id);
    }
  }

  //  //! Next Button...
  // const onNextClick = async()=>{
  //   console.log("Next");
  // }
  //  //! Prev Button...
  // const onPrevClick = async()=>{
  //   console.log("Prev");
  // }

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Products</h1>
            <h1 className="text-2xl text-gray-600 font-normal">Total Products : {productDetailsState.totalProducts}</h1>
          </div>
        </div>
        {/*  */}
        <div className="">
            <div className="p-5">
              {loadingState?<h1 className="text-red-600">
                Loading Products...
              </h1>:
              <div className="overflow-x-scroll">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr className="bg-gray-900 text-white">
                    <th scope="col" className="px-6 py-3">
                      S No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productsState !== undefined ? productsState.map((e,index)=>{
                  return <tr key={e._id} className="bg-white border-b">
                    <td className="px-6 py-4">{index+1}</td>
                    <td className="px-6 py-4">{e.name}</td>
                    <td className="px-6 py-4">{e.category}</td>
                    <td className="px-6 py-4 flex"><i className="fa-solid fa-indian-rupee-sign mr-2 opacity-50"></i>{e.price}</td>
                    <td className="px-6 py-4 text-center">{e.stock}</td>
                    <td className="px-6 py-4 flex">
                        <i onClick={()=>{onViewProduct(e._id)}} className="fa-solid fa-eye mr-2 cursor-pointer opacity-70 text-blue-600 hover:text-blue-900"></i>
                        <i onClick={()=>{onDeleteProduct(e._id,e.name)}} className="fa-solid fa-trash mx-2 cursor-pointer opacity-70 text-red-600 hover:text-red-900"></i>
                        <i onClick={()=>{onEditProduct(e._id)}} className="fa-solid fa-pen-to-square ml-2 cursor-pointer opacity-70 text-green-600 hover:text-blue-900"></i>
                    </td>
                  </tr>
                  }):<tr><td>""</td></tr>}
                </tbody>
              </table>
              {productsState.length < 1 ? 
              <div className="text-center mt-10 text-red-500 font-semibold my-5">No Product found</div>
              :""}
              </div>
              }
            </div>
            {/* <div className="flex justify-end p-5">
              <button onClick={()=>{onPrevClick()}} className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-sm mx-2">Prev</button>
              <button onClick={()=>{onNextClick()}} className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-sm mx-2">Next</button>
            </div> */}
        </div>
      </div>
    </>
  );
}

export default Products;
