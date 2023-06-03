const ProductModel = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeature = require("../utils/apiFeature");

const request = require("request");


//  //! Create a new Product...
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const { name, short_description, long_description, unit, price, discountedPrice, category, stock } = req.body;

  // console.log(req.body);

  const getImages = req.files;

  if(getImages.length < 1){
    return res.status(400).json({success:false,message:"Product Image is required."})
  }

  const storeImages = [];
  getImages.forEach((e) => {
    let localData = {
      originalname: e.originalname,
      mimetype: e.mimetype,
      size: e.size,
      buffer: e.buffer,
    };
    storeImages.push(localData);
  });

  const newProduct = await ProductModel.create({
    name,
    short_description,
    long_description,
    unit,
    price,
    discountedPrice,
    category,
    stock,
    images: storeImages,
  });

  await newProduct.save({ validateBeforeSave: false });
  const product = await ProductModel.findById(newProduct._id);

  return res
    .status(200)
    .json({ success: true, message: "Product Added Successfully", product });
});

//  //! Get All Categories....
exports.getCategories = catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.find({}).select("category -_id");
  const productCategory = [];
  for (let i in products) {
    if (productCategory.includes(products[i].category)) {
      continue;
    } else {
      productCategory.push(products[i].category);
    }
  }
  return res.status(200).json({
    success: true,
    totalProductCategory: productCategory.length,
    productCategory,
  });
});

//  //! Get All Product...
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const totalProducts = await ProductModel.countDocuments();
  let resultPerPage = totalProducts; //TODO:  Currently we can displaying all Products [On View & After Del]
  //  Use Search feature to search the products by [DESCRIPTION keyword]...
  const searchFeature = new ApiFeature(ProductModel.find(), req.query)
    .searchFeature()
    .filterCategory()
    .pagination(resultPerPage);
  const products = await searchFeature.query.sort({ranking:-1})     //.select("-images");
  //  Count total products...
  let totalProductView = 0;
  for (count in products) totalProductView++;
  return res
    .status(200)
    .json({ success: true, totalProducts, totalProductView, products });
});

//  //! Get Single Product...
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const singleProduct = await ProductModel.findById({ _id: req.params.id });
  if (!singleProduct) {
    return next(
      new ErrorHandler(`Product not found. Invalid ${req.params.id}`, 400)
    );
  }
  return res.status(200).json({ success: true, singleProduct });
});

//  //! Delete a product...
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const deleteProduct = await ProductModel.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deleteProduct) {
    return next(
      new ErrorHandler(`Product not found. Invalid ${req.params.id}`, 400)
    );
  }
  const totalProducts = await ProductModel.countDocuments();
  let resultPerPage = totalProducts; //TODO:  Currently we can displaying all Products [On View & After Del]
  //  Use Search feature to search the products by [DESCRIPTION keyword]...
  const searchFeature = new ApiFeature(ProductModel.find(), req.query)
    .searchFeature()
    .filterCategory()
    .pagination(resultPerPage);
  const products = await searchFeature.query.sort({ranking:-1});
  //  Count total products...
  let totalProductView = 0;
  for (count in products) totalProductView++;
  return res.status(200).json({
    success: true,
    message: "Product removed successfully",
    totalProducts,
    totalProductView,
    products,
  });
});

//  //! Create New Review...
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  if (!rating || !productId || !comment) {
    return next(new ErrorHandler("Field's can't be empty", 400));
  }
  //  Create a object of the body data...
  const review = {
    userId: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await ProductModel.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }
  //  Check user is already reviewed or not...
  const isReviewed = product.reviews.find(
    (rev) => rev.userId.toString() === req.user._id.toString()
  );
  //  Update Ranking on the basis of Sentiment analysis...
  const checkSentiment = [];
  checkSentiment.push(comment)
  const options = {
    url:"http://127.0.0.1:5000",
    method:"POST",
    json:{sentences:checkSentiment}
  }  
  await request(options,(err,res,body)=>{
    let ranking = product.ranking;
    // console.log(ranking);
    if(err) throw err;
    const rankData = body[0];
    if(rankData.pos > rankData.neg){
      product.ranking = ranking+1;
    }
    else if(rankData.pos < rankData.neg){
      product.ranking = ranking-1;
    }
    else{
      product.ranking = ranking;
    }
    product.save({validateBeforeSave:false});
  });

  //  If revewied then replace rating & comments...
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.userId.toString() === req.user._id.toString()) {
        rev.rating = review.rating;
        rev.comment = review.comment;
      }
    });
  } else {
    //  Else push new user review...
    product.reviews.push(review);
  }
  //  Count total number of reviews...
  product.numberOfReviews = product.reviews.length;
  //  Count total no of ratings...
  let avgRatings = 0;
  product.reviews.forEach((e) => {
    avgRatings += Number(e.rating);
  });

  //  Add avgRatings...
  product.ratings = (await avgRatings) / product.numberOfReviews;
  //  Save the data...
  await product.save({ validateBeforeSave: false });
  const singleProduct = await ProductModel.findById(product._id);
  return res.status(200).json({ success: true,message:"Thanks for your review", singleProduct });
});

//  //! Get all reviews of a single product...
exports.getAllReviewsOfSingleProduct = catchAsyncError(
  async (req, res, next) => {
    const { productId } = req.query;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({ success: true, reviews: product.reviews });
  }
);
