const ErrorHandler = require("../utils/errorHandler");

const errors = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;


  //  //! User Validation Error...
  if (err._message === "users validation failed") {
    const message = `Invalid: ${err._message}`;
    err = new ErrorHandler(message, 401);
  }

  //  //! Wrong MongoDB ID Error...
  if (err.name === "CastError") {
    const message = `Recource not found, Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //  //! MongoDB Duplicate key error...
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //  //! JWT Error...
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid Token, Try again`;
    err = new ErrorHandler(message, 400);
  }

  //  //! JWT Expire Error...
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message });
};

module.exports = errors;
