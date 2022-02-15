const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");

const createProduct = async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLink = [];
  for (let index = 0; index < images.length; index++) {
    const result = await cloudinary.v2.uploader.upload(images[index], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  //req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
//----------------------------------------------
const getAllProducts = async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  const { keyword, category, price, ratings, page, limit } = req.query;
  const queryObject = {};
  //----search-------------------------
  if (keyword) {
    queryObject.name = { $regex: keyword, $options: "i" };
  }
  //----filter-------------------------
  if (category) {
    queryObject.category = category;
  }
  //------price-----------------------
  if (price) {
    let newPrice = JSON.stringify(price);
    newPrice = newPrice.replace(
      /\b(gt|gte|eq|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryObject.price = JSON.parse(newPrice);
  }
  //-----ratings------------------------
  if (ratings) {
    let newRatings = JSON.stringify(ratings);
    newRatings = newRatings.replace(
      /\b(gt|gte|eq|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryObject.ratings = JSON.parse(newRatings);
  }

  let result = Product.find(queryObject);
  //---------pagination----------------------------
  const resultPerPage = 8;
  const currentPage = Number(page) || 1;
  const skip = resultPerPage * (currentPage - 1);
  result = result.skip(skip).limit(resultPerPage);

  const products = await result;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
};
//----------------------------------------------
const getProductDetails = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};
//-----------------------------------------------
const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLink = [];
    for (let index = 0; index < images.length; index++) {
      const result = await cloudinary.v2.uploader.upload(images[index], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
      req.body.images = imagesLink;
    }
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};
//-----------------------------------------------
const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  //deleting images from cloudinary

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    product,
  });
};
// ------------------------R E V I E W S   R O U T E ------------------------------------------------

const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
};
/// ---------------------------------------------
const getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({ success: true, reviews: product.reviews });
};
// ----------------------------------------------
const deleteProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
};
// ------------------------------------------------

const getAdminProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
};
