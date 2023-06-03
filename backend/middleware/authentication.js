const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const AdminModel = require("../models/adminModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

//  //! Admin Authentication...
exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
  const {admintoken} = req.headers;
  if (!admintoken) {
    return next(new ErrorHandler("Please login to access this feature", 401));
  }
  const decodedData = await JWT.verify(
    admintoken,
    process.env.SECRET_KEY_OF_ADMIN_JWT
  );
  const isAdmin = await AdminModel.findById({_id:decodedData.id});
  if(!isAdmin){
    next(new ErrorHandler('Invalid User Id / Password',401));
  }
  req.admin = isAdmin;
  next();
});

//  //! Check Admin Role...
exports.authorizedAdminRole = (...role) => {
  return (req, res, next) => {
    if (role.includes(req.admin.role)) {
      return next(
        new ErrorHandler(`Role: ${req.admin.role} is not allowed to access this resouce `,403)
      );
    }
    next();
  };
};


//  //! User Authentication...
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const {usertoken} = req.headers;
  if (!usertoken) {
    return next(new ErrorHandler("Please login to access this feature", 401));
  }
  const decodedData = await JWT.verify(
    usertoken,
    process.env.SECRET_KEY_OF_JWT
  );
  const isUser = await UserModel.findById({_id:decodedData.id});
  if(!isUser){
    return next(new ErrorHandler('Invalid User Id / Password',401));
  }
  req.user = isUser;
  next();
});
