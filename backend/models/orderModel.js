const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  shippingInfo: {
    name: { type: String, required: [true, "Name is required"] },
    address: { type: String, required: [true, "Address is required"] },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    country: {
      type: String,
      required: [true, "Country is required"],
      default: "India",
    },
    pinCode: {
      type: Number,
      required: [true, "Pin code is required"],
    },
    phoneNumber: {
      type: String,
      minLength: [10, "Phone number must be 10 digit"],
      required: true,
    },
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  paymentInfo: {
    paymentId: { type: String },
    paymentStatus: { type: String },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  price: {
    itemPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  orderStatus: { type: String, required: true, default: "processing" },
  deleveredAt: { type: Date },
  orderCreatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", orderSchema);
