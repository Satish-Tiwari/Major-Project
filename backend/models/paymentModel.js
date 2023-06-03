const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    default: 0,
  },
  totalProductOrder: {
    type: Number,
    default: 0,
  },
  amountPaidBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("payment-received", paymentSchema);
