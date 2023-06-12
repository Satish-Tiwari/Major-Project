import React, { useState } from "react";
import CreateAdminContext from "./createAdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import {useCookies} from "react-cookie";

function AdminContext(props) {

  const [cookie,setCookie,removeCookie] = useCookies(["adminToken"])

  const baseUrl = "http://localhost:8000/api/v1";
  const [loadingState, setLoadingState] = useState(false);

  //  //!  [  .......... Admins Controller ..........  ]

  const [totalAdminState, setTotalAdminState] = useState(0);
  const [adminState, setAdminState] = useState([]);

  //  //! Login Admin...
  const adminLogin = async(formData)=>{
    setLoadingState(true);

    await axios.post(`${baseUrl}/admin/login`, formData ,{
      headers:{
        "Content-Type":"application/json",
      },
    }).then((res)=>{
      toast.success(res.data.message);
      setCookie("adminToken",res.data.adminToken,{maxAge:7200});  // ? Expire Cookie after 2hrs
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    });
    setLoadingState(false);
  }

  //  //! Logout Admin...
  const logoutAdminFun = async()=>{
    //  Remove Admin Token
    await removeCookie("adminToken",{path:"/admin", expires:Date.now()});
    //  Remove Sub-Admin Token
    await removeCookie("adminToken",{path:"/", expires:Date.now()});
    toast.info("Logout Successfully");
  }

  //  //! Admin Profile Data...
  const [adminProfileDataState,setAdminProfileDataState] = useState({name:"",email:"",role:""});
  const adminProfileData = async()=>{
    await axios.get(`${baseUrl}/admin/my-account`,{
      headers:{
        'Content-Type':'application/json',
        "adminToken":cookie.adminToken
      }
    }).then((res)=>{
      setAdminProfileDataState({name:res.data.myData.name,email:res.data.myData.email,role:res.data.myData.role})
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    })
  }

  //  //! Admin Password Update...
  const updateAdminPassword = async(data)=>{
    setLoadingState(true);
    await axios.put(`${baseUrl}/admin/update-password`,data,{
      headers:{
        'Content-Type':'application/json',
        "adminToken":cookie.adminToken
      }
    }).then((res)=>{
      toast.success(res.data.message);
      setCookie("adminToken",res.data.adminToken,{maxAge:7200});  // ? Expire Cookie after 2hrs
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    })
    setLoadingState(false);
  }

  //  //! Show Dashboard Data...
  const [showDashboardState, setShowDashboardState] = useState({
    totalAdmins: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalOrderProcessing: 0,
    totalOrderShipped: 0,
    totalOrderDelevered: 0,
    totalOrderReturned: 0,
    totalOrderCancled: 0,
  });
  const showDashboardData = async () => {
    await axios
      .get(`${baseUrl}/admin/dashboard`,{
        headers:{
          'Content-Type':'application/json',
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setShowDashboardState({
          totalAdmins: res.data.totalAdmins,
          totalUsers: res.data.totalUsers,
          totalProducts: res.data.totalProducts,
          totalOrders: res.data.totalOrders,
          totalOrderProcessing: res.data.totalOrderProcessing,
          totalOrderShipped: res.data.totalOrderShipped,
          totalOrderDelevered: res.data.totalOrderDelevered,
          totalOrderReturned: res.data.totalOrderReturned,
          totalOrderCancled: res.data.totalOrderCancled,
        });
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
  };

  //  //! Create new Admin...
  const createAdmin = async (formData) => {
    setLoadingState(true);
    await axios
      .post(`${baseUrl}/admin/create-new`, formData, {
        headers: {
          "Content-Type": "application/json",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setTotalAdminState(res.data.totalAdmins);
        setAdminState(res.data.allAdmins);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //! Get All Admins...
  const getAllAdmins = async () => {
    setLoadingState(true);
    await axios
      .get(`${baseUrl}/admin/all`, {
        headers: {
          "Content-Type": "application/json",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setTotalAdminState(res.data.totalAdmins);
        setAdminState(res.data.allAdmins);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //! Update a Admin Role or Status...
  const updateAdminRoleOrStatus = async (id, formData) => {
    setLoadingState(true);
    await axios
      .put(`${baseUrl}/admin/update/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setTotalAdminState(res.data.totalAdmins);
        setAdminState(res.data.allAdmins);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //! Delete a Admin...
  const deleteAdmin = async (id) => {
    setLoadingState(true);
    await axios
      .delete(`${baseUrl}/admin/update/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setTotalAdminState(res.data.totalAdmins);
        setAdminState(res.data.allAdmins);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //!  [  .......... Product Controller ..........  ]

  //    //! Add Product...
  const addProduct = async (formData) => {
    setLoadingState(true);
    await axios
      .post(`${baseUrl}/admin/product/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //! Get All Categories...
  const [categoriesState, setCategoriesState] = useState([]);
  const getAllCategories = async () => {
    await axios
      .get(`${baseUrl}/admin/product/all-categories`, {
        headers: {
          "Content-Type": "application/json",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setCategoriesState(res.data.productCategory);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
  };

  //  //TODO:    IMPLEMENT AXIOS PENDING

  //    //! Get All Products...
  const [productsState, setProductsState] = useState([]);
  const [productDetailsState, setProductDetailsState] = useState({
    totalProductView: "",
    totalProducts: "",
  });
  const getAllProductsDetails = async (page) => {
    setLoadingState(true);
    const fetchData = await fetch(`${baseUrl}/admin/product/products?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
    });
    const json = await fetchData.json();
    // console.log(json);
    if (json.success === true) {
      setProductsState(json.products);
      setProductDetailsState({
        totalProductView: json.totalProductView,
        totalProducts: json.totalProducts,
      });
    }else{
      toast.info(json.message);
    }
    setLoadingState(false);
  };

  //    //! Get Single Product Details...
  const [singleProductState, setSingleProductState] = useState([]);
  const getSingleProductsDetails = async (id) => {
    setLoadingState(true);
    const fetchData = await fetch(`${baseUrl}/admin/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
    });
    const json = await fetchData.json();
    // console.log(json);
    if (json.success === true) {
      setSingleProductState(json.singleProduct);
    }
    setLoadingState(false);
  };

  //  //! Delete the Product...
  const deleteProduct = async (id) => {
    const fetchData = await fetch(`${baseUrl}/admin/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
    });
    const json = await fetchData.json();
    // console.log(json);
    if (json.success === true) {
      setProductsState(json.products);
      setProductDetailsState({
        totalProductView: json.totalProductView,
        totalProducts: json.totalProducts,
      });
      toast.info(json.message);
    }else{
      toast.info(json.message);
    }
  };

  //  //!  [  .......... User Controller ..........  ]

  //  //! Get All Users...
  const [usersState, setUsersState] = useState([]);
  const [totalUsersState, setTotalUsersState] = useState(0);
  const getAllUsers = async () => {
    setLoadingState(true);
    const fetchData = await fetch(`${baseUrl}/admin/user/get-all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
    });
    const json = await fetchData.json();
    // console.log(json);
    if (json.success === true) {
      setUsersState(json.users);
      setTotalUsersState(json.totalUsers);
    }
    setLoadingState(false);
  };

  //  //! Get a User all Orders...
  const [userOrdersState, setUserOrdersState] = useState([]);
  const [userTotalOrdersState, setUserTotalOrdersState] = useState(0);
  const getUserOrders = async (id) => {
    setLoadingState(true);
    const fetchData = await fetch(`${baseUrl}/admin/user/all-orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
    });
    const json = await fetchData.json();
    // console.log(json);
    if (json.success === true) {
      setUserOrdersState(json.orders);
      setUserTotalOrdersState(json.totalOrders);
    }
    setLoadingState(false);
  };

  //  //! Delete a User...
  const deleteUser = async (id) => {
    const fetchData = await fetch(`${baseUrl}/admin/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
    });
    const json = await fetchData.json();
    if (json.success === true) {
      setUsersState(json.users);
      setTotalUsersState(json.totalUsers);
      toast.info(json.message);
    }else{
      toast.info(json.message);
    }
  };

  //  //! Update a User Status...
  const updateUserStatus = async (id, status) => {
    const fetchData = await fetch(`${baseUrl}/admin/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
      body: JSON.stringify({ status }),
    });
    const json = await fetchData.json();
    if (json.success === true) {
      setUsersState(json.users);
      setTotalUsersState(json.totalUsers);
      toast.info(json.message);
      return true;
    }else{
      toast.info(json.message);
    }
  };

  //  //!  [  .......... Order Controller ..........  ]

  //  //! Get All Orders...
  const [totalOrderState, setTotalOrderState] = useState(0);
  const [allOrdersState, setAllOrdersState] = useState([]);
  const allOrders = async (orderStatus) => {
    setLoadingState(true);
    const fetchData = await fetch(`${baseUrl}/admin/orders/get-all-orders${orderStatus}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "adminToken":cookie.adminToken
      },
    });
    const json = await fetchData.json();
    if (json.success === true) {
      setTotalOrderState(json.totalOrders);
      setAllOrdersState(json.allOrders);
    }
    setLoadingState(false);
  };

  //  //! Get a Order By Order Id...
  const [singleOrderState, setSingleOrderState] = useState([]);
  const getSingleOrder = async (id) => {
    setLoadingState(true);
    await axios
      .get(`${baseUrl}/admin/orders/get-all-orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setSingleOrderState(res.data.singleOrder);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //! Update Order Status By Order Id...
  const updateOrderStatus = async (id,orderStatus) => {
    setLoadingState(true);
    await axios
      .put(`${baseUrl}/admin/orders/get-all-orders/${id}`,orderStatus,{
        headers: {
          "Content-Type": "application/json",
          "adminToken":cookie.adminToken
        },
      })
      .then((res) => {
        setSingleOrderState(res.data.singleOrder);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  return (
    <CreateAdminContext.Provider
      value={{
        loadingState,
        adminLogin,
        logoutAdminFun,
        adminProfileData,
        adminProfileDataState,
        updateAdminPassword,
        totalAdminState,
        adminState,
        createAdmin,
        getAllAdmins,
        updateAdminRoleOrStatus,
        deleteAdmin,
        showDashboardData,
        showDashboardState,
        addProduct,
        getAllCategories,
        categoriesState,
        getAllProductsDetails,
        productsState,
        productDetailsState,
        deleteProduct,
        getSingleProductsDetails,
        singleProductState,
        getAllUsers,
        totalUsersState,
        usersState,
        getUserOrders,
        userTotalOrdersState,
        userOrdersState,
        deleteUser,
        updateUserStatus,
        allOrders,
        totalOrderState,
        allOrdersState,
        singleOrderState,
        getSingleOrder,
        updateOrderStatus
      }}
    >
      {props.children}
    </CreateAdminContext.Provider>
  );
}

export default AdminContext;
