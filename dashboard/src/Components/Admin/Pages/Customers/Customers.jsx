import React, { useContext, useEffect, useState } from "react";
import createAdminContext from "../../../../Context/Admin/createAdminContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Customers() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);
  const {
    getAllUsers,
    totalUsersState,
    usersState,
    deleteUser,
    updateUserStatus,
  } = useContext(createAdminContext);

  useEffect(() => {
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      getAllUsers();
    }
    // eslint-disable-next-line
  }, []);

  //    //! View Users Order...
  const onViewOrder = (data) => {
    navigate(`/admin/customer/view-order/${data._id}`, { state: data });
  };

  //    //! Delete a User...
  const onDeleteUser = (id, name) => {
    let conf = window.confirm(`Are you sure want to delete ${name}`);
    if (conf) {
      deleteUser(id);
    }
  };

  //    //! Edit/Update User...
  const [updatePopUpState, setUpdatePopUpSate] = useState(false);
  const [editUserState, setEditUserState] = useState({
    _id: "",
    name: "",
    email: "",
    status: "",
  });
  const onEditUser = (e) => {
    setEditUserState({
      _id: e._id,
      name: e.name,
      email: e.email,
      status: e.status,
    });
    setUpdatePopUpSate(true);
  };
  const changeUserUpdateStatus = (e) => {
    setEditUserState({ ...editUserState, [e.target.name]: e.target.value });
  };
  const updateStatus = async (e) => {
    e.preventDefault();
    const closePopup = await updateUserStatus(
      editUserState._id,
      editUserState.status
    );
    console.log(closePopup);
    if (closePopup) {
      setUpdatePopUpSate(false);
    } else {
      setUpdatePopUpSate(true);
    }
  };

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Customers</h1>
            <h1 className="text-2xl text-gray-600 font-normal">
              Total Customers : {totalUsersState}
            </h1>
          </div>
        </div>
        {/*  */}

        {updatePopUpState && (
          <div className="absolute w-full bg-[rgb(0,0,0,0.5)] z-50 h-screen top-0 left-0">
            <div className="md:w-[400px] w-[300px] h-[400px] flex flex-col justify-center items-center absolute top-1/2 left-1/2 bg-white rounded-md -translate-x-[50%] -translate-y-[50%]">
              <div className="w-full text-right px-5">
                <p onClick={()=>{setUpdatePopUpSate(false);}} className="text-2xl text-red-500 hover:opacity-80 cursor-pointer"><i className="fa-solid fa-circle-xmark"></i></p>
              </div>
              <div className={`bg-white`}>
                <div className="flex flex-col justify-center items-center px-5 rounded-md">
                  <h1 className="text-center text-2xl font-medium py-5">
                    Update Status
                  </h1>
                  <form onSubmit={updateStatus}>
                    <div className="flex flex-col">
                      <input
                        onChange={changeUserUpdateStatus}
                        className="ring-1 px-3 py-2 my-2 outline-none rounded-sm focus:ring-green-600"
                        type="text"
                        name="name"
                        value={editUserState.name}
                        readOnly
                      />
                      <input
                        onChange={changeUserUpdateStatus}
                        className="ring-1 px-3 py-2 my-2 outline-none rounded-sm focus:ring-green-600"
                        type="text"
                        name="email"
                        value={editUserState.email}
                        readOnly
                      />
                      <select
                        onChange={changeUserUpdateStatus}
                        className="ring-1 px-3 py-2 my-2 outline-none rounded-sm focus:ring-green-600"
                        name="status"
                       defaultValue={editUserState.status === 'Active' ? 'Active':'Block'}
                      >
                        <option
                          value="Active"
                          selected={
                            editUserState.status === "Active" ? true : false
                          }
                          
                          
                        >
                          Active
                        </option>
                        <option
                          value="Block"
                          selected={
                            editUserState.status === "Block" ? true : false
                          }
                        >
                          Block
                        </option>
                      </select>
                      <input
                        className="px-3 py-2 my-2 outline-none rounded-sm bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                        type="submit"
                        value={"Update"}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="p-5">
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
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Account Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Orders
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersState !== undefined ? (
                  usersState.map((e, i) => {
                    return (
                      <tr key={e._id} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {i + 1}.
                        </th>
                        <td className="px-6 py-4">{e.name}</td>
                        <td className="px-6 py-4">{e.email}</td>
                        <td className="px-6 py-4">{e.phone}</td>
                        <td
                          className={`px-6 py-4 text-black ${
                            e.status === "Block"
                            ? "bg-red-400"
                            : "bg-green-500 "
                          }`}
                        >
                          {e.status}
                        </td>
                        <td className="px-6 py-4 uppercase">{new Date(e.accountCreatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                        <td className="px-6 py-4">
                          <i
                            onClick={() => {
                              onViewOrder(e);
                            }}
                            className="fa-solid fa-eye mr-2 cursor-pointer opacity-70 text-blue-600 hover:text-blue-900"
                          ></i>
                        </td>
                        <td className="px-6 py-4">
                          <i
                            onClick={() => {
                              onDeleteUser(e._id, e.name);
                            }}
                            className="fa-solid fa-trash mx-2 cursor-pointer opacity-70 text-red-600 hover:text-red-900"
                          ></i>
                          <i
                            onClick={() => {
                              onEditUser(e);
                            }}
                            className="fa-solid fa-pen-to-square ml-2 cursor-pointer opacity-70 text-green-600 hover:text-blue-900"
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
            {usersState.length < 1 ? 
            <div className="text-center mt-10 text-red-500 font-semibold my-5">No Customer found</div>
            :""}
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
