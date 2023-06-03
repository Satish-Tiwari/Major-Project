import { useContext, useEffect, useState,useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import createUserContext from "../../Context/createUserContext";

const ProceedToCheckout = () => {
    const [cookie] = useCookies(["userToken"]);
    const baseUrl = "http://localhost:8000/api/v1";
    const referenceToSubmitButton = useRef(null);
    const navigate = useNavigate();

    const {cartItemsFunction} = useContext(createUserContext);


    const location = useLocation();
    const {cartItemsState,totalPriceState} = location.state || "";

    const [shippingInfo, setShippingInfo] = useState({ address: "", city: "", state: "", name: "", pinCode: "", phoneNumber: "", country: "", });
    const [price, setPrice] = useState({ itemPrice: '', taxPrice: '', shippingPrice: '', totalPrice: '' })
    const [orderItems,setOrderItems] = useState([]);

    //  //! Set some data default...
    useEffect(()=>{
        if(!cookie.userToken){
            toast.dark("Please login to checkout");
            navigate("/login");
            return;
        }else{
            let storeData = []
            cartItemsState.forEach((e)=>{
                let obj = {
                    productId:e._id,
                    name:e.name,
                    quantity: parseInt(String(e.unit)[0]),
                    price:e.price  
                }
                storeData.push(obj);
            });
    
            setPrice({
                itemPrice:totalPriceState,
                taxPrice:0,
                shippingPrice:totalPriceState>500?0:50,
                totalPrice:totalPriceState>500?0+totalPriceState:totalPriceState+50,
            })
    
            setOrderItems(storeData);
        }
        // eslint-disable-next-line
    },[])

    //  //! Handle Shipping Info ...
    const handleChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
    }

    //  //! Get Payment Id...
    let paymentId;
    const setPaymentIdAndStatus = (paymentIdData)=>{
        paymentId = paymentIdData;
    }
    //  //! Handle Form on Submit...
    const submitOrderForm = async (e) => {
        e.preventDefault();
        const paymentInfo = {
            paymentId:paymentId,
            paymentStatus:"done"
        }

        //  //! Save order data in DB...
        const fetchData = await fetch(`${baseUrl}/user/order/new`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                userToken:cookie.userToken
            },
            body:JSON.stringify({shippingInfo,orderItems,price,paymentInfo})
        });

        const json = await fetchData.json();
        // console.log(json);
        if(json.success){
            toast.success(json.message);
            await cartItemsFunction();
            navigate("/my-orders")
        }else{
            toast.warn(json.message);
        }
    }


    //  //! Payment Gatway Integration...
    const initPayment = async(initData) => {

        //  //? Get Razorpay Key...
        const fetchKey = await fetch(`${baseUrl}/user/order/razorpay-key`,{
            method:"GET",headers:{'Content-Type':'application/json',userToken: cookie.userToken}
        }) ;
        const fetchKeyJSON = await fetchKey.json();

		const options = {
			key: fetchKeyJSON.key,
			amount: initData.amount,
			currency: initData.currency,
            name: fetchKeyJSON.user,
			description: "Test Transaction",
			order_id: initData.id,
			handler: async (response) => {
				try {
					const { data } = await axios.post(`${baseUrl}/user/order/payment-verify`, response,{
                        headers:{
                            'Content-Type':'application/json',
                            userToken: cookie.userToken
                        }
                    });
                    await setPaymentIdAndStatus(data.paymentId);
                    toast.success(data.message);
                    await referenceToSubmitButton.current.click();
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};


    //  //! Check Input Fields...
    const checkDataFilled = (shippingInfo)=>{
        if(shippingInfo.name.length < 2){
            toast.warn("Name is required"); //{ address: "", city: "", state: "", name: "", pinCode: "", phoneNumber: "", country: "", }
            return true;
        }
        else if(shippingInfo.phoneNumber.length < 10){
            toast.warn("Enter Valid Phone no.");
            return true;
        }
        else if(shippingInfo.address.length < 5){
            toast.warn("Address must be 5 char long");
            return true;
        }
        else if(shippingInfo.city.length < 1){
            toast.warn("City is required");
            return true;
        }
        else if(shippingInfo.state.length < 1){
            toast.warn("State is required");
            return true;
        }
        else if(shippingInfo.country.length < 3){
            toast.warn("Country is required");
            return true;
        }
        else if(shippingInfo.pinCode.length < 3){
            toast.warn("Pin-code is required");
            return true;
        }
        return false;
    }

    //  //! handle payment after submitting address
    const handlePayment = async () => {

        //  //! If not logged in then don't proceed...
        if(!cookie.userToken){
            toast.dark("Please login to checkout");
            navigate("/login");
            return;
        }

        const conf = await checkDataFilled(shippingInfo);
        if(conf){
            return;
        }else{
            try {
                const { data:{data} } = await axios.post(`${baseUrl}/user/order/payment-checkout`, { amount: price.totalPrice },{
                    headers:{
                        'Content-Type':'application/json',
                        userToken: cookie.userToken
                    }
                });
                initPayment(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="w-full h-full">

                {/* //! ...Price Detail & Shipping Info... */}
                <div className="w-[90%] mx-auto my-7 h-full">
                    <div className="md:flex">
                        {/* //- Left Part */}
                        <div className="lg:basis-[40%]">
                            <div className="w-[90%] mx-auto">
                                <h1 className="font-serif text-gray-500 lg:text-3xl text-2xl font-semibold  lg:text-center my-8">Price Details</h1>
                            </div>
                            <div className=" flex items-center justify-center  lg:w-[100%] lg:ml-0 my-5">
                                <form className="lg:w-full w-[100%]" onSubmit={submitOrderForm}>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="text" name="itemPrice" defaultValue={`${totalPriceState} ₹`} id="floating_price" className="block text-right font-thin text-gray-600 py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" readOnly/>
                                        <label htmlFor="floating_price" className="text-yellow-800 font-semibold peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="text" name="taxPrice" id="floating_taxPrice" defaultValue={"18 % GST includes"} className="text-right text-sm text-gray-600 font-thin block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" readOnly/>
                                        <label htmlFor="floating_taxPrice" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tax Include</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="text" name="shippingPrice" defaultValue={`${totalPriceState > 500 ? 0 :50} ₹`} id="floating_shippingPrice" className=" text-right font-thin text-gray-700 block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" readOnly/>
                                        <label htmlFor="floating_shippingPrice" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shipping Price</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input type="text" name="totalPrice" defaultValue={`${totalPriceState > 500 ? totalPriceState + 0 : totalPriceState  + 50} ₹`} id="floating_totalPrice" className="text-right text-gray-700 font-bold block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" readOnly/>
                                        <label htmlFor="floating_totalPrice" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Price</label>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* //- Right Part */}
                        <div className="lg:basis-[60%] w-full h-full">
                            <div className="w-[90%] mx-auto">
                                <h1 className="font-serif text-gray-500 lg:text-3xl text-2xl font-semibold lg:text-center my-8">Shipping Details</h1>
                            </div>
                            {/* //? Signup form */}
                            <div className="flex items-center justify-center h-full lg:w-[80%] lg:ml-20 ">
                                <form className="lg:w-full w-full" onSubmit={submitOrderForm}>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 mb-6 w-full group">
                                            <input type="text" name="name" id="floating_name" className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" onChange={handleChange} required/>
                                            <label htmlFor="floating_name" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                        </div>
                                        <div className="relative z-0 mb-6 w-full group">
                                            <input type="text" name="phoneNumber" id="floating_phoneNumber" className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" onChange={handleChange} required/>
                                            <label htmlFor="floating_phoneNumber" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 mb-6 w-full group">
                                            <input type="text" name="address" id="floating_address" className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" onChange={handleChange} required/>
                                            <label htmlFor="floating_address" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                        </div>
                                        <div className="relative z-0 mb-6 w-full group">
                                            <input type="text" name="city" id="floating_city" className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" onChange={handleChange} required/>
                                            <label htmlFor="floating_city" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 mb-6 w-full group">
                                            <input type="text" name="state" id="floating_state" className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" onChange={handleChange} required/>
                                            <label htmlFor="floating_state" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                                        </div>
                                        <div className="relative z-0 mb-6 w-full group">
                                            <input type="text" name="country" id="floating_country" className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" onChange={handleChange} required/>
                                            <label htmlFor="floating_country" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                                        </div>
                                    </div>
                                    <div className='grid md:grid-cols-2 md:gap-6'>
                                        <div className="relative w-full">
                                            <input type="number" name="pinCode" id="floating_pinCode" className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" onChange={handleChange} />
                                            <label htmlFor="floating_pinCode" className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pin Code</label>
                                        </div>
                                        <div>
                                            <button ref={referenceToSubmitButton} type='submit' className="hidden">Order</button>
                                            <p onClick={handlePayment} className="text-center cursor-pointer px-3 py-2 bg-green-700 hover:bg-green-800 focus:bg-green-900 text-white w-full">Proceed to Pay</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}
export default ProceedToCheckout;
