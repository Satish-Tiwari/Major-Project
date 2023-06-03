const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  short_description: {
    type: String,
    required: [true, "Product description is required"],
  },
  long_description:{
    type: String,
  },
  unit: {
    type: String,
    required: [true, "Unit is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    maxLength: [6, "Price can't exceed 8 character"],
  },
  discountedPrice: {
    type: Number,
    maxLength: [2, "Discounted Price can't exceed 2 character"],
    default: 0,
  },
  images: [
    {
      buffer: { type: Buffer },
      originalname: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
  ],
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    maxLength: [2, "Stock can't be acceed 4 character"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  shelfLife: {
    type: String,
    default: "Please refer to the product",
  },
  expirayDate: {
    type: String,
    default: "Please refer to the packaging of the product for expiry date.",
  },
  countryOfOrigin: {
    type: String,
    default: "India",
  },
  ranking: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Products", productSchema);
