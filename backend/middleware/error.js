const errorHandler = require("../utils/errorhandler");

const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    err.statusCode = 404;
    err.message = `No item found with id:${err.value}`;
  }
  if (err.code === 11000) {
    err.statusCode = 404;
    err.message = `Email ${Object.keys(
      err.keyValue
    )} already exists, Please register with new Email`;
  }
  if (err.name === "JsonWebTokenError") {
    err.statusCode = 404;
    err.message = `Json Web Token is invalid Try Again`;
  }
  if (err.name === "TokenExpiredError") {
    err.statusCode = 404;
    err.message = `Json Web Token is Expired, Try Again`;
  }
  res.status(err.statusCode).json({ success: false, message: err.message });
};

module.exports = errorHandlerMiddleware;
