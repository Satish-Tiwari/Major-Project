const Order = require("../models/orderModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

const Razorpay = require("razorpay");
const crypto = require("crypto");

//  //! Create a Order...
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { shippingInfo, orderItems, price,paymentInfo } = req.body;
  const newOrderPlaced = await Order.create({
    shippingInfo,
    orderItems,
    price,
    paymentInfo,
    user: req.user._id,
    paidAt: Date.now(),
  });
  return res
    .status(200)
    .json({ success: true, message: "Order Placed", newOrderPlaced });
});

//  //! My Orders [Logged User]...
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const totalOrders = await Order.find({
    user: req.user._id,
  }).countDocuments();
  const myOrder = await Order.find({ user: req.user._id }).sort({_id:-1});
  return res
    .status(200)
    .json({ success: true, totalOrders, myOrder });
});

//  //! Get Single Order by Order Id [Logged User]...
exports.getSingleOrderDetails = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  const singleOrder = await Order.findById(id).populate({ path:"orderItems",strictPopulate:false,populate:"productId"});
  if(!singleOrder){
    next(new ErrorHandler("Order Not Found",400));
  }
  return res.status(200).json({success:true,singleOrder});
});

//  //! Send RazorPay Key Id through API...
exports.sendRazorPayKeyId = catchAsyncError(async(req,res,next)=>{
  const key = process.env.RAZORPAY_KEY_ID;
  return res.status(200).json({success:true,key,user:req.user.name});
})

//  //! Payment CheckOut...
exports.paymentCheckOut = catchAsyncError(async(req,res,next)=>{
  const {amount} = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
  
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ success:false,message: "Something Went Wrong!" });
      }
      return res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success:false,message: "Internal Server Error!" });
  }
});

//  //! Payment Verify...
exports.verifyPayment = catchAsyncError(async(req,res,next)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
  try {
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ success:true,paymentId:razorpay_payment_id,message: "Payment successfully done" });
		} else {
			return res.status(400).json({ success:false,message: "Invalid signature sent!" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success:false,message: "Internal Server Error!" });
	}
})