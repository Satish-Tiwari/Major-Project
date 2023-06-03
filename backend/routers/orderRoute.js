const orderRoute = require("express").Router();

const { isAuthenticatedUser } = require("../middleware/authentication");

const {
  newOrder,
  myOrders,
  getSingleOrderDetails,
  sendRazorPayKeyId,
  paymentCheckOut,
  verifyPayment,
} = require("../controller/orderController");

orderRoute.route("/api/v1/user/order/new").post(isAuthenticatedUser, newOrder);
orderRoute.route("/api/v1/user/order/myOrders").get(isAuthenticatedUser, myOrders);
orderRoute.route("/api/v1/user/order/myOrder/:id").get(isAuthenticatedUser, getSingleOrderDetails);

orderRoute.route("/api/v1/user/order/razorpay-key").get(isAuthenticatedUser,sendRazorPayKeyId)
orderRoute
  .route("/api/v1/user/order/payment-checkout")
  .post(isAuthenticatedUser, paymentCheckOut);
orderRoute
  .route("/api/v1/user/order/payment-verify")
  .post(isAuthenticatedUser, verifyPayment);

module.exports = orderRoute;
