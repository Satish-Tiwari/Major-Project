const AdminModel = require("../models/adminModel");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const Order = require("../models/orderModel");
const PaymentReceived = require("../models/paymentModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//  //! [  ........................ADMINS........................   ]

//  //! Create a Admin...
exports.createAdmin = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 401));
  }
  const isAdminExist = await AdminModel.findOne({ email:String(email).toLowerCase() });
  if (isAdminExist) {
    return next(new ErrorHandler(`Admin already exist with ${email}`, 401));
  }
  await AdminModel.create({
    name,
    email:String(email).toLowerCase(),
    password,
  });
  const totalAdmins = await AdminModel.countDocuments();
  const allAdmins = await AdminModel.find({});
  return res.status(200).json({ success: true,message:"New ADMIN Created", totalAdmins, allAdmins });
});

//  //! Login a Admin...
exports.loginAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required", 401));
  }
  const isAdminExist = await AdminModel.findOne({ email:String(email).toLowerCase() }).select("+password");
  if (!isAdminExist) {
    return next(new ErrorHandler(`Invalid Email or Password`, 401));
  }
  const isValidPassword = await isAdminExist.comparePassword(password);
  if (!isValidPassword) {
    return next(new ErrorHandler(`Invalid Email or Password`, 401));
  }
  const adminToken = await isAdminExist.getToken();
  return res.status(200)
  .json({ success: true,message:"Log in Successfully", adminToken });
});

//  //! Admin Profile...
exports.getMyAccountDetails = catchAsyncError(async(req,res,next)=>{
  return res.status(200).json({success:true,myData:req.admin});
})

//  //! Admin Password Update...
exports.updateAdminPassword = catchAsyncError(async(req,res,next)=>{
  const {oldPassword,newPassword,confirmPassword} = req.body;
  if(!oldPassword || !newPassword || oldPassword.length<8 || String(newPassword).length<8){
    return next(new ErrorHandler(`Password must 8 char long 😒`));
  }
  if(String(newPassword)!==String(confirmPassword)){
    return next(new ErrorHandler(`New Password & Confirm Password is Mis-matched 😒`));
  }

  const adminPassword = await AdminModel.findById(req.admin._id).select("+password");
  const isValidPassword = await adminPassword.comparePassword(oldPassword);
  if(isValidPassword){
    adminPassword.password = newPassword;
    await adminPassword.save({validateBeforeSave:true});
    const adminToken = await adminPassword.getToken();
    return res.status(200).json({success:true,message:"Password updated",adminToken});
  }else{
    return next(new ErrorHandler(`Invalid Old Password 🚫😒🚫`,401))
  }
});

//  //! Show Data on Dashboard...
exports.showDashboard = catchAsyncError(async (req, res, next) => {
  const totalAdmins = await AdminModel.countDocuments();
  const totalUsers = await UserModel.countDocuments();
  const totalProducts = await ProductModel.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalOrderProcessing = await Order.find({orderStatus:"processing"}).countDocuments();
  const totalOrderShipped = await Order.find({orderStatus:"shipped"}).countDocuments();
  const totalOrderDelevered = await Order.find({orderStatus:"delevered"}).countDocuments();
  const totalOrderReturned = await Order.find({orderStatus:"returned"}).countDocuments();
  const totalOrderCancled = await Order.find({orderStatus:"cancled"}).countDocuments();
  return res.status(200).json({
    success: true,
    totalAdmins,
    totalUsers,
    totalProducts,
    totalOrders,
    totalOrderProcessing,
    totalOrderShipped,
    totalOrderDelevered,
    totalOrderReturned,
    totalOrderCancled,
  });
});

//  //! All Admins...
exports.getAllAdmins = catchAsyncError(async (req, res, next) => {
  const totalAdmins = await AdminModel.countDocuments();
  const allAdmins = await AdminModel.find({});
  return res.status(200).json({ success: true, totalAdmins, allAdmins });
});

//  //! Update Admin Role and Status...
exports.updateRoleOrStatus = catchAsyncError(async (req, res, next) => {
  const { role, status } = req.body;
  if(String(req.admin._id)===String(req.params.id)){
    return next(new ErrorHandler("You don't have access 🚫",401));
  }
  const isAdmin = await AdminModel.findById({_id:req.params.id});
  if (!isAdmin) {
    return next(new ErrorHandler(`Invalid Id: ${req.params.id}`, 401));
  }
  await AdminModel.findByIdAndUpdate({_id:req.params.id},{
    role:role!==""?role:isAdmin.role,
    status:status!==""?status:isAdmin.status
  });
  const allAdmins = await AdminModel.find({});
  const totalAdmins = await AdminModel.countDocuments();
  return res.status(200).json({ success: true, message:`[ ${isAdmin.name} ] data Updated `, totalAdmins, allAdmins });
});

//  //! Delete Admin...
exports.deleteAdmin = catchAsyncError(async (req, res, next) => {
  if(String(req.admin._id)===String(req.params.id)){
    return next(new ErrorHandler("You don't have access 🚫",401));
  }
  const isAdmin = await AdminModel.findByIdAndDelete({_id:req.params.id});
  if (!isAdmin) {
    return next(new ErrorHandler(`Invalid Id: ${req.params.id}`, 401));
  }
  const allAdmins = await AdminModel.find({});
  const totalAdmins = await AdminModel.countDocuments();
  return res.status(200).json({ success: true,message:`[ ${isAdmin.name} ] deleted ✅`, totalAdmins, allAdmins });
});

//  //! [  ........................USERS........................   ]

//  //! Get all Users...
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const totalUsers = await UserModel.countDocuments();
  const users = await UserModel.find({}).select("-password");
  return res.status(200).json({ success: true, totalUsers, users });
});

//  //! Delete a User...
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return next(new ErrorHandler(`Invalid Id: ${req.params.id}`, 401));
  }
  const totalUsers = await UserModel.countDocuments();
  const users = await UserModel.find({}).select("-password");
  return res
    .status(200)
    .json({ success: true, message: "User Deleted", totalUsers, users });
});

//  //! Update User Status...
exports.updateUserStatus = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;
  const userUpdate = await UserModel.findByIdAndUpdate(req.params.id, {
    status,
  });
  if (!userUpdate) {
    return next(new ErrorHandler(`Invalid Id: ${req.params.id}`, 401));
  }
  const totalUsers = await UserModel.countDocuments();
  const users = await UserModel.find({}).select("-password");
  return res.status(200).json({
    success: true,
    message: `${userUpdate.name}'s Status Updated`,
    totalUsers,
    users,
  });
});

//  //! Get a User All Orders By User Id...
exports.getUserOrders = catchAsyncError(async (req, res, next) => {
  const totalOrders = await Order.find({
    user: req.params.id,
  }).countDocuments();
  const orders = (await Order.find({ user: req.params.id })).reverse();
  return res.status(200).json({ success: true, totalOrders, orders });
});


//  //! [  ........................ORDERS........................   ]

//  //! Get all Orders...
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const query = req.query;
  const allOrders = (await Order.find(query).populate("user","name email")).reverse();
  const totalOrders = await Order.find(query).countDocuments();
  return res.status(200).json({ success: true, totalOrders, allOrders });
});

//  //! Get Single Order By Order Id...
exports.getSingleOrderDetails = catchAsyncError(async (req, res, next) => {
  const singleOrder = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!singleOrder) {
    return next(new ErrorHandler("Order not found", 401));
  }
  return res.status(200).json({ success: true, singleOrder });
});

//  //! Update Order Status...
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const {orderStatus} = req.body;
  if(!orderStatus){
    return next(new ErrorHandler(`Order Status is required`,401));
  }
  const singleOrder = await Order.findById(req.params.id).populate("user","name email");
  if(!singleOrder){
    return next(new ErrorHandler(`Product not found`,401));
  }
  if(singleOrder.orderStatus==="processing"){

    //  //? Update Order Status...
    singleOrder.orderStatus = await orderStatus;
    await singleOrder.save({validateBeforeSave:false});
    //  //? Update Product Stocks...
    await singleOrder.orderItems.forEach(async(e)=>{
      const {productId,quantity} = e;
      let product = await ProductModel.findById(productId).select("-images");
      if(!product){
        return next(new ErrorHandler("Product not found."));
      }
      await ProductModel.findByIdAndUpdate(productId,{
        stock:product.stock-quantity
      });
    });
  }
  //  //TODO  Implement Cancle & Other Order Status method...
  if(singleOrder.orderStatus !== "processing"){
    //  //? Update Order Status...
    singleOrder.orderStatus = await orderStatus;
    await singleOrder.save({validateBeforeSave:false});
  }
  return res.status(200).json({success:true,message:`Order status updated to ${String(orderStatus).toUpperCase()}`,singleOrder});
});
