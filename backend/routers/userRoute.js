const userRoute = require("express").Router();

//  //!  Using Multer To Upload Photos...
const multer = require("multer");
const upload = multer();

const { isAuthenticatedUser } = require("../middleware/authentication");

//  //! User Routes...
const {
  newUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  uploadProfilePicture
} = require("../controller/userController");

const {createProductReview} = require("../controller/productController");

userRoute.route("/api/v1/user/signup").post(newUser);
userRoute.route("/api/v1/user/login").post(loginUser);
userRoute.route("/api/v1/user/logout").get(logout);
userRoute.route("/api/v1/user/password/forgot-password").put(forgotPassword);
userRoute.route("/api/v1/user/me").get(isAuthenticatedUser,getUserDetails);
userRoute.route("/api/v1/user/update-password").put(isAuthenticatedUser, updatePassword);
//  //! Upload Profile Picture...
userRoute.route("/api/v1/user/upload-profile-picture").put(isAuthenticatedUser,upload.single("avatar"),uploadProfilePicture);

//  //!Send Reset Token Route...
userRoute.route("user/password/reset/:token").put(resetPassword);


//  //! ......................
userRoute.route("/api/v1/user/product/add-review").put(isAuthenticatedUser,createProductReview);

module.exports = userRoute;



