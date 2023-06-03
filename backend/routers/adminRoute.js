const adminRoute = require("express").Router();

//  //! Multer to uploads files...
const multer = require("multer");

// const path = require("path");
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req,file,cb)=>{
//     cb(null,file.originalname + "_" + Date.now() + path.extname(file.originalname));
//   }
// });

const upload = multer();


const {isAuthenticatedAdmin, authorizedAdminRole} = require("../middleware/authentication");

const {
  createAdmin,
  loginAdmin,
  getMyAccountDetails,
  updateAdminPassword,
  getAllAdmins,
  updateRoleOrStatus,
  deleteAdmin,
  showDashboard,
  getAllUsers,
  getUserOrders,
  updateUserStatus,
  deleteUser,
  getAllOrders,
  getSingleOrderDetails,
  updateOrderStatus
} = require("../controller/adminController");

const {getAllProducts, getCategories, getSingleProduct, createProduct, deleteProduct} = require("../controller/productController");

//  //! [       ..................  Admin    ..................]
adminRoute.route("/api/v1/admin/create-new").post(isAuthenticatedAdmin,authorizedAdminRole("sub-admin"),createAdmin);
adminRoute.route("/api/v1/admin/login").post(loginAdmin);
adminRoute.route("/api/v1/admin/my-account").get(isAuthenticatedAdmin,getMyAccountDetails);
adminRoute.route("/api/v1/admin/update-password").put(isAuthenticatedAdmin,updateAdminPassword);
adminRoute.route("/api/v1/admin/dashboard").get(isAuthenticatedAdmin,showDashboard);
adminRoute.route("/api/v1/admin/all").get(isAuthenticatedAdmin,getAllAdmins);
adminRoute.route("/api/v1/admin/update/:id").put(isAuthenticatedAdmin,authorizedAdminRole("sub-admin"),updateRoleOrStatus).delete(isAuthenticatedAdmin,authorizedAdminRole("sub-admin"),deleteAdmin);


//  //! [       ..................  Users    ..................]
adminRoute.route("/api/v1/admin/user/get-all-users").get(isAuthenticatedAdmin,getAllUsers);
adminRoute.route("/api/v1/admin/user/all-orders/:id").get(isAuthenticatedAdmin,getUserOrders);
adminRoute.route("/api/v1/admin/user/update/:id").put(isAuthenticatedAdmin,authorizedAdminRole("sub-admin"),updateUserStatus);
adminRoute.route("/api/v1/admin/user/delete/:id").delete(isAuthenticatedAdmin,authorizedAdminRole("sub-admin"),deleteUser);


//  //! [       ..................  Products    ..................]
adminRoute.route("/api/v1/admin/product/products").get(isAuthenticatedAdmin,getAllProducts);
adminRoute.route("/api/v1/admin/product/all-categories").get(isAuthenticatedAdmin,getCategories);
adminRoute.route("/api/v1/admin/product/:id").get(isAuthenticatedAdmin,getSingleProduct);
adminRoute.route("/api/v1/admin/product/new").post(isAuthenticatedAdmin, upload.array("images"),createProduct);
adminRoute.route("/api/v1/admin/product/:id").delete(isAuthenticatedAdmin, deleteProduct);

//  //! [       ..................  Orders    ..................]
adminRoute.route("/api/v1/admin/orders/get-all-orders").get(isAuthenticatedAdmin,getAllOrders);
adminRoute.route("/api/v1/admin/orders/get-all-orders/:id").get(isAuthenticatedAdmin,getSingleOrderDetails).put(isAuthenticatedAdmin,authorizedAdminRole("sub-admin"),updateOrderStatus);

module.exports = adminRoute;


