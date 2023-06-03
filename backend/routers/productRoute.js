const productRoute = require("express").Router();

const {
  getCategories,
  getAllProducts,
  getSingleProduct,
  getAllReviewsOfSingleProduct
} = require("../controller/productController");

productRoute.route("/api/v1/product/products").get(getAllProducts);
productRoute.route("/api/v1/product/all-categories").get(getCategories);
productRoute.route("/api/v1/product/:id").get(getSingleProduct);
productRoute.route("/api/v1/product").get(getAllReviewsOfSingleProduct);

module.exports = productRoute;


