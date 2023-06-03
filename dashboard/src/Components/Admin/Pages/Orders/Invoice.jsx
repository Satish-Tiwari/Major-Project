import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

function Invoice() {

    const navigate = useNavigate();
    const [cookie] = useCookies(["adminToken"]);
    useEffect(()=>{
        if(!cookie.adminToken){
            navigate("/")
        }
        // eslint-disable-next-line
    },[])
    
  return (
    <>
        <div className="">
      <div className="shadow-md w-full bg-white p-5">
        <div className="">
          <h1 className="text-2xl text-gray-600 font-bold">Invoice</h1>
        </div>
      </div>
      {/*  */}
      <div className="">
        <div className="p-5">
          <div className="overflow-x-scroll">
              <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase">
                      <tr className="bg-gray-900 text-white">
                          <th scope="col" className="px-6 py-3">
                              S No.
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Order Id
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Invoice Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Grand Total
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Actions
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="bg-white border-b">
                        <th>Coming Soon</th>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Invoice