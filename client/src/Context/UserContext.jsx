import { React, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";

import CreateUserContext from "../Context/createUserContext";

function UserContext(props) {
  const baseUrl = "http://127.0.0.1:8000/api/v1";

  const [loadingState, setLoadingState] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["userToken"]);

  //  //! Add Product to Cart...
  const [cartItemsState,setCartItemsState] = useState([]);
  const [cartItemsCountState,setCartItemsCountState] = useState(0);
  const cartItemsFunction = (cartItems)=>{
    if(cartItems){
      setCartItemsState([...cartItemsState,cartItems]);
      setCartItemsCountState(cartItemsState.length+1);
    }else{
      setCartItemsState([]);
      setCartItemsCountState(0);
    }
  }
  //    //! [...................  PRODUCTS   ....................]
  const [productsState, setProductsState] = useState([]);
  const [productDataState, setProductDataState] = useState({totalProducts:0,totalProductView:0});
  const getAllProducts = async (str) => {
    setLoadingState(true);
    await axios
      .get(`${baseUrl}/product/products?category=${str}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        // console.log(res)
        setProductDataState({totalProducts:res.data.totalProducts,totalProductView:res.data.totalProductView});
        setProductsState(res.data.products);
      }).catch((err)=>{
        // console.log(err);
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //! View Single Products...
  const [singleProductState,setSingleProductState] = useState([]);
  const fetchSingleProduct = async(id)=>{
    setLoadingState(true);
    await axios.get(`${baseUrl}/product/${id}`,{
      headers:{'Content-Type':'application/json'}
    }).then((res)=>{
      setSingleProductState(res.data.singleProduct);
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    })
  }

  //  //! Write a products Review...
  const uploadReviewFunction = async(formData)=>{
    setLoadingState(true);
    await axios.put(`${baseUrl}/user/product/add-review`,formData,{
      headers:{'Content-Type':'application/json',userToken: cookie.userToken,}
    }).then((res)=>{
      toast.warn(res.data.message);
      setSingleProductState(res.data.singleProduct);
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    })
    setLoadingState(false);
  }

  //    //! [...................  USER   ....................]

  //    //! Create new User...
  const createNewUser = async (formData) => {
    setLoadingState(true);

    const fetchData = await fetch(`${baseUrl}/user/signup`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...formData})
    });

    const json = await fetchData.json();
    if(json.success){
      toast.success(json.message);
      setCookie("userToken",json.awthToken);
      setLoadingState(false);
      return true;
    }else{
      console.log(json);
      toast.warn(json.message);
    }
    setLoadingState(false);
    return false;
  };

  //    //! Login User...
  const loginUser = async (formData) => {
    console.log(formData)
    setLoadingState(true);
    const fetchData = await fetch(`${baseUrl}/user/login`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...formData})
    });

    const json = await fetchData.json();
    if(json.success){
      toast.success(json.message);
      setCookie("userToken",json.awthToken);
      setLoadingState(false);
      return true;
    }else{
      console.log(json);
      toast.warn(json.message);
    }
    setLoadingState(false);
  };

  //  //! Logout User...
  const logoutUserFun = async () => {
    await removeCookie("userToken", { path: "/", expires: Date.now() });
    toast.info("Logout Successfully");
  };

  //    //! Get User Details...
  const [userDetailsState, setUserDetailsState] = useState([]);
  const getUserDetails = async (formData) => {
    setLoadingState(true);
    await axios
      .get(`${baseUrl}/user/me`, {
        headers: {
          "Content-Type": "application/json",
          userToken: cookie.userToken,
        },
      })
      .then((res) => {
        // console.log(res);
        setUserDetailsState(res.data.user);
        setCookie(res.data.awthToken);
      })
      .catch((err) => {
        // console.log(err);
        toast.warn(err.response.data.message);
      });
    setLoadingState(false);
  };

  //  //! Update User Password...
  const updatePassword = async(formData)=>{
    await axios.put(`${baseUrl}/user/update-password`,formData,{
      headers:{'Content-Type':'application/json',userToken: cookie.userToken,}
    }).then((res)=>{
      toast.success(res.data.message);
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    });
  }

  //  //! [..................  Order  ..................]

  //  //! Get All Orders...
  const [myOrderState,setMyOrderState] = useState([]);
  const getAllMyOrders = async()=>{
    await axios.get(`${baseUrl}/user/order/myOrders`,{
      headers:{'Content-Type':'application/json',userToken: cookie.userToken,}
    }).then((res)=>{
      setMyOrderState(res.data.myOrder);
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    });
  }

  //  //! Get Single Order Details...
  const [singleOrderDetailsState,setSingleOrderDetailsState] = useState([]);
  const getSignleOrderDetails = async(id)=>{
    await axios.get(`${baseUrl}/user/order/myOrder/${id}`,{
      headers:{'Content-Type':'application/json',userToken: cookie.userToken,}
    }).then((res)=>{
      setSingleOrderDetailsState(res.data.singleOrder);
    }).catch((err)=>{
      toast.warn(err.response.data.message);
    });
  }

  return (
    <CreateUserContext.Provider
      value={{
        loadingState,
        cartItemsFunction,
        cartItemsState,
        cartItemsCountState,
        getAllProducts,
        productsState,
        productDataState,
        fetchSingleProduct,
        singleProductState,
        uploadReviewFunction,
        createNewUser,
        loginUser,
        logoutUserFun,
        getUserDetails,
        userDetailsState,
        updatePassword,
        getAllMyOrders,
        myOrderState,
        getSignleOrderDetails,
        singleOrderDetailsState
      }}
    >
      {props.children}
    </CreateUserContext.Provider>
  );
}

export default UserContext;
